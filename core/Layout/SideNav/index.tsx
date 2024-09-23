import { nav_constant } from '@/constant/nav'
import { useOutsideClick } from '@/hooks/outsideHover'
import Link from 'next/link'
import React, { useEffect, useState, useRef } from 'react'
import { MdClose } from 'react-icons/md'

type SideNav = {

    setToggle: (a: boolean) => void
}
const SideNav = ({ setToggle }: SideNav) => {
    const [width, setWidth] = useState<number>(0)
    const ref = useRef<HTMLDivElement>(null);
    const resize = () => {
        setWidth(window.innerWidth)
    }
    useEffect(() => {
        window.addEventListener('resize', resize)
        return () => {
            window.removeEventListener('resize', resize)
        }
    }, [])
    if (width >= 768) {
        setToggle(false)
    }
    useOutsideClick({ reference: ref, toggle: () => setToggle(false) });

    return (
        <div ref={ref} className={`bg-white duration-300 w-[414px] h-screen p-5 flex flex-col`}>
            <MdClose onClick={() => setToggle(false)} className={`h-10 w-10 self-end transition-transform duration-500 rotate-45 hover:rotate-90`} />
            <ul className='flex flex-col py-5'>
                {nav_constant.map((navlink) =>
                    <Link className='hover:bg-slate-100 rounded-md p-2' onClick={() => setToggle(false)} key={navlink.id} href={navlink.pathname}>{navlink.name}</Link>
                )}
            </ul>

        </div>
    )
}

export default SideNav