import { ContactForm } from '@/core/components';
import React from 'react'
import { MdOutlineFacebook, MdLocationOn, MdPhoneIphone } from "react-icons/md";
const Footer = () => {
    const year = new Date().getFullYear()

    return (
        <footer className='flex flex-col w-full'>
            <div className='flex-col md:grid grid-cols-2'>
                <div className='text-left flex flex-col gap-5 w-full p-10'>
                    <h2 className='text-2xl font-black'>Find Us</h2>
                    <p className='w-full'>
                        1159 National Road Nº 2, Phnom Penh Phnom Penh, Cambodia 12354
                    </p>
                    <div className='flex flex-col gap-10 items-start'>
                        <div className='flex items-center'>
                            <MdLocationOn className='w-12 h-12 text-gray-600' />
                            <div>
                                <h2 className='text-xl font-bold'>Goolge Map</h2>
                                <p>Agile in Cambodia</p>
                            </div>
                        </div>
                        <div className='flex items-center'>
                            <MdPhoneIphone className='w-12 h-12 text-gray-600' />
                            <div>
                                <h2 className='text-xl font-bold'>Telephone</h2>
                                <p>(+855) 17350544</p>
                            </div>
                        </div>
                    </div>
                    <div className='flex w-full justify-start gap-5 py-5 px-2'>
                        <MdOutlineFacebook className='w-10 h-10 text-gray-600' />
                        <MdOutlineFacebook className='w-10 h-10 text-gray-600' />
                        <MdOutlineFacebook className='w-10 h-10 text-gray-600' />
                    </div>
                </div>
                <div className='border-y md:border-x'>
                    <ContactForm />
                </div>
            </div>
            <div className='text-sm border-t p-3 w-full flex justify-center '>
                all right reserved @ bluehat {year}
            </div>
        </footer >
    )
}

export default Footer