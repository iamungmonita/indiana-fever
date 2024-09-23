import React, { useEffect, useState } from 'react'

type SliderType = {
    images: string[]
    className?: string
}

const Slider = ({ images, className }: SliderType) => {
    const [currentIndex, setCurrentIndex] = useState(0)
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 5000);
        return () => clearInterval(interval); // Cleanup interval on component unmount
    }, []);

    return (
        <div className={className}>
            <div className='relative w-full h-screen overflow-hidden'>
                <div className='transition-transform duration-1000 whitespace-nowrap ease-in-out' style={{
                    transform: `translateX(-${currentIndex * 100}%`
                }}>
                    {images.map((image, index) =>
                        <div key={index} className='inline-block w-full h-screen' style={{
                            backgroundImage: `url(${image})`,
                            backgroundPosition: 'center',
                            backgroundSize: 'cover'

                        }}></div>
                    )}
                </div>
                <div className='absolute inset-x-0 bottom-5 justify-center space-x-3 flex'>
                    {images.map((_, index) =>
                        <button
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                            className={`h-0.5 w-10 transition-transform duration-1000 ${currentIndex === index ? 'bg-gray-500/50' : 'bg-slate-200'}`}>
                        </button>)}
                </div>
            </div>
        </div >
    )
}

export default Slider