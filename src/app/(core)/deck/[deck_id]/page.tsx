
type PageParams = {
    params: Promise<{
        deck_id: string;
    }>
}

const DeckPage = async (props : PageParams) => {


    return (
        <div className='max-h-screen flex flex-col gap-4 justify-items-start'>
            <div className='text-xl'>Deck Name: {(await props.params).deck_id}</div>
        </div>
    )
}

export default DeckPage