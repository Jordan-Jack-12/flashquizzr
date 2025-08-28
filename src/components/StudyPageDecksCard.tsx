import Link from 'next/link'

type PropsType = {
    title: string,
    desc: string | null,
    deck_id: string,
    count: number,
}

const StudyPageDecksCard = (props: PropsType) => {
    return (
        <div className='grid grid-cols-1 gap-3 p-4 bg-stone-800 rounded-lg'>
            <div>
                <p className='text-sm'>Total Cards: {props.count}</p>
                <hr className='text-stone-600'/>
            </div>
            <div>
                <h2 className='block text-2xl'>{props.title}</h2>
                <p className='block text-base line-clamp-2'>{props.desc}</p>
                <hr className='text-stone-600'/>
            </div>
            <div className='flex justify-stretch gap-2'>
                <Link className='bg-stone-800 rounded-lg w-full py-2 text-center hover:bg-stone-700' href={"deck/" + props.deck_id}>
                    Edit
                </Link>
                <Link
                    href={`/study/${props.deck_id}`}
                    className='button_gradient text-orange-950 rounded-lg w-full py-2 text-center hover:button_gradient_rev'
                >
                    Study
                </Link>
            </div>
        </div>
    )
}

export default StudyPageDecksCard