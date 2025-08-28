import Link from "next/link"
import React from "react"

type SideBarButtonType = {
    href: string,
    icon: React.ReactNode,
    content: string,
    active: boolean
}

const SideBarButton = (props: SideBarButtonType) => {
    return (
        <Link href={props.href} className={`flex gap-x-2 text-sm items-center rounded-lg px-4 py-2 font-semibold ${props.active ? "bg-orange-100/50 text-orange-500 dark:bg-stone-800": "bg-transparent"} hover:bg-gray-200 dark:hover:bg-stone-800`} >
            <div>
                {props.icon}
            </div>
            {props.content}
        </Link>
    )
}

export default SideBarButton