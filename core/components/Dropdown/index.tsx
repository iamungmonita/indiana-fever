import classNames from 'classnames';
import React, { useRef, useState } from 'react';
import Link from 'next/link';
import useOutsideHover from '@/hooks/outsideHover';

export interface DropdownInterface {
    items: {
        id: number,
        category: string,
    }[]
    title: string,
    selectId?: (id: number) => void
}
const Dropdown = ({ items, title, selectId }: DropdownInterface) => {
    const [dropdown, setDropdown] = useState(false)
    const ref = useRef<HTMLDivElement>(null);
    const handleDropdown = () => {
        setDropdown(!dropdown)
    }
    const handleSelectId = (id: number) => {
        if (selectId) {
            selectId(id)
        }
        setDropdown(!dropdown)
    }

    // const outsideClick = (event: MouseEvent) => {
    //     if (ref.current && !ref.current.contains(event.target as Node)) {
    //         setDropdown(false)
    //     }
    // }
    useOutsideHover({ reference: ref, toggle: () => setDropdown(false) });

    const dropdownClass = classNames({
        'opacity-0 top-[80%]': !dropdown,
        'opacity-100 top-[100%]': dropdown
    })
    return (
        <div
            ref={ref}
            className='border bg-slate-200 p-2 w-full relative rounded-lg' >
            <div
                className='font-semibold'
                onMouseOver={handleDropdown}>
                {title}
            </div>
            <div
                className={classNames(
                    dropdownClass,
                    'absolute animation duration-300 left-0 w-full px-2 pb-2 bg-slate-200 flex flex-col')}>
                {items.length > 0 &&
                    items.map((item) =>
                        <Link
                            className='hover:bg-slate-100 hover:font-bold cursor-pointer p-2'
                            href='#'
                            onClick={() => handleSelectId(item.id)}
                            key={item.id}>
                            {item.category}
                        </Link>)
                }
            </div>
        </div>
    )
}

export default Dropdown