// import Image from 'next/image';
import React from 'react'
import { Slider } from '@/core/components';
import { images_constant } from '@/constant/images';

const Index = () => {
    return (
        <div>
            <Slider className='w-full' images={images_constant} />
        </div>
    )
}

export default Index