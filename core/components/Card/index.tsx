import React from 'react';
import { MdFacebook, MdLocationOn, MdPhoneIphone } from "react-icons/md";

const MyCard = () => {
    return (
        <div className='bg-white text-left flex flex-col gap-10 max-w-[80%] py-20 px-10'>
            <h2 className='text-2xl font-black'>Find Us</h2>
            <p className=''>
                1159 National Road Nº 2
                <br />
                Phnom Penh Phnom Penh,
                <br />
                Cambodia 12354
            </p>
            <div className='flex items-center'>
                <MdLocationOn className='w-10 h-10 text-blue-600' />
                <div>
                    <h2 className='text-xl font-bold'>Goolge Map</h2>
                    <p>Agile in Cambodia</p>
                </div>
            </div>
            <div className='flex items-center'>
                <MdPhoneIphone className='w-10 h-10 text-blue-500' />
                <div>
                    <h2 className='text-xl font-bold'>Telephone</h2>
                    <p>(+855) 17350544</p>
                </div>
            </div>
            <div className='flex  gap-x-5 '>
                <MdFacebook className='w-10 h-10 text-blue-500' />
                <MdFacebook className='w-10 h-10 text-blue-500' />
                <MdFacebook className='w-10 h-10 text-blue-500' />
            </div>
        </div>
    );
};

export default MyCard;
