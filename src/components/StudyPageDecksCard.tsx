import { chooseRandomCardId } from '@/app/(core)/study/action'
import Link from 'next/link'

type PropsType = {
    img_url: string,
    title: string,
    deck_id: string,
}

const StudyPageDecksCard = (props: PropsType) => {
    return (
        <div className='min-w-xs grid grid-cols-1 gap-3 p-4 bg-stone-800 rounded-lg'>
            <div>
                <div className='h-50 bg-red-300 rounded-lg'>

                </div>
            </div>
            <div>
                <h2 className='text-xl'>{props.title}</h2>
            </div>
            <div className='flex justify-stretch gap-2'>
                <Link className='bg-stone-800 rounded-lg w-full py-2 text-center hover:bg-stone-700' href={"edit/" + props.deck_id}>
                    Edit
                </Link>
                <form className='w-full' action={chooseRandomCardId}>
                    <input type="hidden" name='deck_id' value={props.deck_id} />
                    <button
                        className='button_gradient rounded-lg w-full py-2 text-center hover:button_gradient_rev'
                    >
                        Study
                    </button>
                </form>
            </div>
        </div>
    )
}

export default StudyPageDecksCard