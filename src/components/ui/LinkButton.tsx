import Link from 'next/link'
import React from 'react'

type LinkButtonType = {
    href: string,
    bg: string | "#ff3432",
    color: string | "#ffffff",
    content: string |  React.ReactNode
}

const LinkButton = (props : LinkButtonType) => {
    return (
        <Link href={props.href} className='px-4 py-2 rounded-lg' style={{"background": `${props.bg}`, "color": `${props.color}`}}>
            {props.content}
        </Link>
    )
}

export default LinkButton