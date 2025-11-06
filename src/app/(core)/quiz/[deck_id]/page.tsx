import QuizPane from "@/components/quizPage/quiz-pane"

type PageParams = {
    params: Promise<{
        deck_id: string;
    }>
}

async function QuizDeckPage(props: PageParams) {

    const { deck_id } = await props.params;

    return (
        <QuizPane deck_id={deck_id} />
    )
}

export default QuizDeckPage