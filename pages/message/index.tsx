import React from 'react'

import { Breadcrumb } from '@/core/components'
import { Breadcrumbs } from '@mui/material'
Breadcrumbs
const Index = () => {

    return (
        <div>
            <Breadcrumbs />
            <Breadcrumb />
            <p className='uppercase '>message</p>
        </div>
    )
}

export default Index