
type cardType = {
    id: string;
    deckId: string;
    type: 'BASIC' | 'MCQ' | 'CLOZE' | 'LIST' | 'IMAGE_OCCLUSION',
    front: string;
    back: string;
    frontImages: string[];
    backImages: string[];
    options: string[];

}

type reviewedCardType = Pick<cardType, "id" | "deckId" >