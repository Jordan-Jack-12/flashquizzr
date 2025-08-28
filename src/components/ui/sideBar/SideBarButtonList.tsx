'use client';

import React from 'react'
import SideBarButton from './SideBarButton'
import { Brain, ChartColumnBig, GraduationCap, House, PencilRuler } from 'lucide-react'
import { usePathname } from 'next/navigation';

const SideBarButtonList = () => {
    const pathname = usePathname();
    
    return (
        <div className='flex flex-col gap-1'>
            <SideBarButton
                content={"Home"}
                href='/dashboard'
                icon={<House size={18} />}
                active={pathname.split("/").includes("dashboard") ? true : false}
            />
            <SideBarButton
                content={"Create"}
                href='/create'
                icon={<PencilRuler size={18} />}
                active={pathname.split("/").includes("create") ? true : false}
            />
            <SideBarButton
                content={"Study"}
                href='/study'
                icon={<GraduationCap size={18} />}
                active={pathname.split("/").includes("study") ? true : false}
            />
            <SideBarButton
                content={"Quiz"}
                href='/quiz'
                icon={<Brain size={18} />}
                active={pathname.split("/").includes("quiz") ? true : false}
            />
            <SideBarButton
                content={"Stats"}
                href='/stats'
                icon={<ChartColumnBig size={18} />}
                active={pathname.split("/").includes("stats") ? true : false}
            />
        </div>
    )
}

export default SideBarButtonList    