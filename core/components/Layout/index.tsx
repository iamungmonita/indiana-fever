
import React, { ReactNode } from 'react'
type ChildrenType = {
    children: ReactNode
}
const index = ({ children }: ChildrenType) => {
    return (
        <div>
            <div>{children}</div>
        </div>
    )
}

export default index