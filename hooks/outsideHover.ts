import { useEffect } from "react";

export interface OutsideHover {
    reference: React.RefObject<HTMLDivElement>
    toggle: () => void;
}

const useOutsideHover = ({ reference, toggle }: OutsideHover) => {
    useEffect(() => {
        const outsideClick = (event: MouseEvent) => {
            if (!reference.current || reference.current.contains(event.target as Node)) {
                return
            }
            toggle()
        }
        document.addEventListener('mouseover', outsideClick)
        return () => {
            document.removeEventListener('mouseover', outsideClick)
        }
    }, [reference, toggle])
}

export default useOutsideHover