import { useRouter } from 'next/router'
import React from 'react'

import { Breadcrumb } from '@/core/components'
const ID = () => {
    const router = useRouter()
    const { id } = router.query
    return (

        <div>
            <Breadcrumb />
            {id}</div>
    )
}

export default ID