import { generateFlashcardsByTexts } from "@/actions/generate/Flashcards";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const { text, aiModel, noOfCards } = await request.json();

    if (!text || text.length === 0 || !aiModel || !noOfCards) return NextResponse.json({ text: "Prompt is Required!" }, { status: 200 });

    try {
        const response = await generateFlashcardsByTexts({text: text, aiModel: aiModel, noOfCards: noOfCards});
        if (!response) return NextResponse.json({message: "Something went wrong"}, {status: 500});
        return NextResponse.json({deck: response}, {status: 200})
    } catch (error) {
        console.log(error);
        return NextResponse.json({message: error}, {status: 500})
    }
}