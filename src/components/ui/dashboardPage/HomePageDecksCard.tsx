import Link from 'next/link'

type PropsType = {
    title: string,
    deck_id: string,
    count: number,
    desc: string | null,
}

const HomePageDecksCard = (props: PropsType) => {
    return (
        <div className='flex flex-col justify-between gap-3 p-4 rounded-lg bg-stone-800 '>
            <div className='flex flex-col gap-1 grow'>
                <div className='text-sm font-semibold text-stone-400'><p className=''>Due Cards: {props.count}</p></div>
                <hr className='text-stone-600' />
                <h2 className='text-2xl text-wrap line-clamp-1'>{props.title}</h2>
                <p className='text-base text-stone-400 text-wrap line-clamp-2'>{props.desc}</p>

            </div>
            <hr className='text-stone-600' />
            <div className='flex gap-2'>
                <Link className='bg-stone-800 rounded-lg w-full py-2 text-center hover:bg-stone-700' href={"deck/" + props.deck_id}>
                    Edit
                </Link>

                <Link
                    href={`/study/${props.deck_id}`}
                    className='button_gradient rounded-lg w-full py-2 text-center font-semibold text-orange-950 hover:button_gradient_rev'
                >
                    Study
                </Link>
            </div>
        </div>
    )
}

export default HomePageDecksCard