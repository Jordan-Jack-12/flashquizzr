// import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const { text } = await request.json()
    if (!text || text.length === 0) return NextResponse.json({ text: "Prompt is Required!" }, { status: 200 });
    // const genAI = new GoogleGenerativeAI(process.env.GEMINI_AI_API_KEY!);
    // const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    // const prompt = `You are greatest quiz generator, who can make great questions and answers of multiple choice questions. Here is your resource from where you are going to generate it. ${text} 
    // Use this JSON Schema: 
    // Card = {'question': string, 'answers' : {'correct': string, 'option1': string, 'option2': string, 'option3': string}}
    // Return Array<Card>`;

    // const result = await model.generateContent(prompt);

    const result = `\`\`\`json
[
  {
    "question": "According to the text, what is a common consequence of not understanding a book?",
    "answers": {
      "correct": "Avoiding reading altogether and choosing other forms of entertainment.",
      "option1": "Immediately starting another book to compensate.",
      "option2": "Blaming the author for poor writing.",
      "option3": "Seeking help from a reading comprehension expert."
    }
  },
  {
    "question": "What is the first step recommended for understanding what you read?",
    "answers": {
      "correct": "Choosing the right book that aligns with your goals.",
      "option1": "Reading the book from beginning to end without interruption.",
      "option2": "Memorizing key passages and vocabulary.",
      "option3": "Finding a quiet place to read without distractions."
    }
  },
  {
    "question": "Why is previewing the book before reading recommended?",
    "answers": {
      "correct": "To get an overview of the book's structure and key themes, helping you identify what to focus on.",
      "option1": "To determine the book's length and estimate how long it will take to read.",
      "option2": "To check the author's credentials and ensure their expertise.",
      "option3": "To decide if the book is worth buying or borrowing."
    }
  },
  {
    "question": "What does the text suggest about reading with a pen in hand?",
    "answers": {
      "correct": "It helps you engage actively with the book by making notes, highlighting passages, and marking key points.",
      "option1": "It allows you to correct grammatical errors in the book.",
      "option2": "It is primarily useful for academic reading and research.",
      "option3": "It's a way to prevent yourself from falling asleep while reading."
    }
  },
  {
    "question": "What is the purpose of pausing and reflecting after reading each section or chapter?",
    "answers": {
      "correct": "To process the information, connect it to your existing knowledge, and assess your understanding.",
      "option1": "To take a break and avoid eye strain.",
      "option2": "To check your email and social media.",
      "option3": "To plan your next reading session."
    }
  },
  {
    "question": "Why is summarizing each chapter in your own words helpful?",
    "answers": {
      "correct": "It improves comprehension and allows you to explain the ideas simply, demonstrating your understanding.",
      "option1": "It creates a condensed version of the book for future reference.",
      "option2": "It helps you practice your writing skills.",
      "option3": "It's required for most book club discussions."
    }
  },
  {
    "question": "According to the text, where might you share your book summaries?",
    "answers": {
      "correct": "Medium or Substack.",
      "option1": "A personal diary.",
      "option2": "A dream journal.",
      "option3": "Nowhere, they are for personal use only."
    }
  },
  {
    "question": "What upcoming features is mentioned for community engagement?",
    "answers": {
      "correct": "A Discord community for book discussions and events.",
      "option1": "A physical book club meeting in various cities.",
      "option2": "An online course on speed reading.",
      "option3": "A book exchange program."
    }
  }
]
\`\`\``;

    // const textResponse = result.response.text().replace(/```json\n?/, "").replace(/\n?```$/, "");
    const textResponse = result.replace(/```json\n?/, "").replace(/\n?```$/, "");

    console.log(textResponse)

    return NextResponse.json({ text: textResponse }, { status: 200 })
}