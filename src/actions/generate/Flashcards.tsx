"use server";

import { GoogleGenAI } from '@google/genai';
const GEMINI_API_KEY = process.env.GEMINI_AI_API_KEY;
import { z } from "zod";
import { extract } from '@extractus/article-extractor';
import { htmlToText } from "html-to-text";

const genAI = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

const generateSchema = z.object({
    prompt: z.string().min(50, "Required minimum 50 characters."),
    aiModel: z.string().min(1, "Required a AI model"),
    noOfCards: z.number().min(1),
    type: z.string().min(1)
})

// const generateFromPdfSchema = z.object({

// })

type ReturnType = {
    data?: {
        name: string,
        desc?: string,
        cards: Omit<cardType, 'id' | 'deckId'>[],
    },
    message?: string,
    success: boolean,
    errors?: {
        prompt?: string[],
        aiModel?: string[],
        noOfCards?: string[],
        type?: string[],
    }
}

export async function generateFlashcard({ prompt, aiModel, noOfCards, type }: { prompt: string, aiModel: string, noOfCards: number, type: string }): Promise<ReturnType> {
    const { data, error } = generateSchema.safeParse({
        prompt,
        aiModel,
        noOfCards,
        type
    })

    if (error) {
        return {
            success: false,
            message: "All fields are required.",
            errors: error.flatten().fieldErrors
        }
    }

    const res = await generateFlashcardsByTexts({ text: data.prompt, aiModel: data.aiModel, noOfCards: data.noOfCards });

    if (!res) return { success: false, message: "Something went wrong" };

    const deck = JSON.parse(res)

    return { success: true, message: "Successfully generated", data: { name: deck.name, desc: deck.description, cards: deck.cards } }
}

export async function generateFlashcardsByTexts({ text, aiModel, noOfCards }: { text: string, aiModel: string, noOfCards: number }) {

    if (!text || !aiModel || !noOfCards) return null;


    if (aiModel === "gemini") {
        const prompt = `You are flashcard maker, who can make great front and back of flashcards, and also add 3 options for converting it multiple choice question. You have to generate ${noOfCards}. Do not repeat question for other types of cards. If necessary then choose MCQ type, otherwise stick to BASIC. Do not make any mistake. It is very important. Here is your resource from where you are going to generate it. ${text} 
        Use this JSON Schema: 
        Card = {'type': 'BASIC' | 'MCQ' | 'CLOZE' | 'LIST' | 'IMAGE_OCCLUSION',
        'front': string;
        'back': string;
        'options' : string[];}

        Deck = {'name': string; 'description': string; cards: Card[]}

        Return Deck`;

        const aiResponse = await genAI.models.generateContent({
            model: 'gemini-2.0-flash-001',
            contents: prompt
        });

        const result = aiResponse.text?.replace(/```json\n?/, "").replace(/\n?```$/, "");

        return result
    }

    return null;
}

export async function generateFlashcardFromPdf(formData: FormData): Promise<ReturnType> {
    const pdfFile = formData.get('file-pdf') as Blob
    // const aiModel = formData.get('ai-model')
    const noOfCards = formData.get('no-of-cards')

    if (!pdfFile) return {success: false, message: 'Couldn\'t process the PDF file'};

    if (pdfFile.size > 18000000) return {success: false, message: 'PDF size is larger than 15MB'}

    const pdfFileArrayBuffer = await pdfFile.arrayBuffer();

    const aiResponse = await genAI.models.generateContent({
        model: "gemini-2.0-flash",
        contents:[
            `You are flashcard maker, who can make great front and back of flashcards, and also add 3 options for converting it multiple choice question. You have to generate ${noOfCards}. Do not repeat question for other types of cards. If necessary then choose MCQ type, otherwise stick to BASIC. Do not make any mistake. It is very important. From above resources provided. 
            Use this JSON Schema: 
            Card = {'type': 'BASIC' | 'MCQ' | 'CLOZE' | 'LIST' | 'IMAGE_OCCLUSION',
            'front': string;
            'back': string;
            'options' : string[];}

            Deck = {'name': string; 'description': string; cards: Card[]}

            Return Deck`,
            {
                inlineData: {
                    mimeType: 'application/pdf',
                    data: Buffer.from(pdfFileArrayBuffer).toString('base64'),
                }
            },
        ]
    })

    const result = aiResponse.text?.replace(/```json\n?/, "").replace(/\n?```$/, "");

    if (!result) return { success: false, message: 'Something went wrong!' }

    const deck = await JSON.parse(result);

    return {
        success: true,
        data: {
            name: deck.name,
            desc: deck.description,
            cards: deck.cards,
        },
        message: 'Successfully Generated cards'
    }
}

export async function generateFlashcardFromImage(formData: FormData): Promise<ReturnType> {
    const image = formData.get('images') as Blob
    // const aiModel = formData.get('ai-model')
    const noOfCards = formData.get('no-of-cards') ?? '10'

    if (!image) return { success: false, message: "Image not found." };

    const imageArrayBuffer = await image.arrayBuffer();
    const base64ImageData = Buffer.from(imageArrayBuffer).toString('base64')

    const aiResponse = await genAI.models.generateContent({
        model: "gemini-2.0-flash",
        contents: [
            {
                inlineData: {
                    mimeType: image.type,
                    data: base64ImageData,
                }
            },
            {
                text: `You are flashcard maker, who can make great front and back of flashcards, and also add 3 options for converting it multiple choice question. You have to generate ${noOfCards}. Do not repeat question for other types of cards. If necessary then choose MCQ type, otherwise stick to BASIC. Do not make any mistake. It is very important. From above resources provided. 
                Use this JSON Schema: 
                Card = {'type': 'BASIC' | 'MCQ' | 'CLOZE' | 'LIST' | 'IMAGE_OCCLUSION',
                'front': string;
                'back': string;
                'options' : string[];}

                Deck = {'name': string; 'description': string; cards: Card[]}

                Return Deck`
            }
        ]
    })
    const result = aiResponse.text?.replace(/```json\n?/, "").replace(/\n?```$/, "");

    if (!result) return { success: false, message: "Something went wrong!" }

    const deck = await JSON.parse(result);

    return {
        success: true,
        data: {
            name: deck.name,
            desc: deck.description,
            cards: deck.cards,
        },
        message: 'Successfully Generated cards'
    }
}

export async function generateFlashcardFromUrl(formData: FormData): Promise<ReturnType> {
    // const aiModel = formData.get('ai-model');
    const noOfCards = formData.get('no-of-cards');
    const link = formData.get('link');

    try {

        if (typeof link !== 'string') return { success: false, message: "URL is not valid." }
        const article = await extract(link, {}, {
            headers: {
                'user-agent': 'Opera/9.60 (Windows NT 6.0; U; en) Presto/2.1.1'
            }
        })

        if (!article?.content) return { success: false, message: "Couldn't fetch the content" }
        const text = htmlToText(article.content, {
            wordwrap: false,   // prevent auto line breaks
            selectors: [
                { selector: "img", format: "skip" },   // skip images
            ],
        });
        const aiResponse = await genAI.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `${text} \n\n You are flashcard maker, who can make great front and back of flashcards, and also add 3 options for converting it multiple choice question. You have to generate ${noOfCards}. Do not repeat question for other types of cards. If necessary then choose MCQ type, otherwise stick to BASIC. Do not make any mistake. It is very important. Use the above texts to make flashcards
            Use this JSON Schema: 
            Card = {'type': 'BASIC' | 'MCQ' | 'CLOZE' | 'LIST' | 'IMAGE_OCCLUSION',
            'front': string;
            'back': string;
            'options' : string[];}

            Deck = {'name': string; 'description': string; cards: Card[]}

            Return Deck
            `,
        });
        
        const result = aiResponse.text?.replace(/```json\n?/, "").replace(/\n?```$/, "");

        if (!result) return { success: false, message: "Something went wrong!" }

        const deck = await JSON.parse(result);

        return {
            success: true,
            data: {
                name: deck.name,
                desc: deck.description,
                cards: deck.cards,
            },
            message: 'Successfully Generated cards'
        }
    } catch (error) {
        console.log(error)
        return { success: false, message: "Something went wrong!" }
    }
}