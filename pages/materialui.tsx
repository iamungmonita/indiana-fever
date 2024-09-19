import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const images = [
    'https://thefulcrum.us/media-library/caitlin-clark-in-her-iowa-uniform.jpg?id=52314531&width=1245&height=700&quality=85&coordinates=0%2C0%2C0%2C197',
    'https://media.cnn.com/api/v1/images/stellar/prod/2024-02-24t071013z-1827543648-mt1usatoday22603379-rtrmadp-3-ncaa-womens-basketball-penn-st-at-iowa.jpg?c=16x9&q=h_833,w_1480,c_fill',
    'https://ca-times.brightspotcdn.com/dims4/default/df07538/2147483647/strip/true/crop/2386x1591+0+0/resize/1200x800!/quality/75/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2F6d%2F01%2F592535ad4ab29e7cde3e992bddcf%2Fhttps-delivery-gettyimages.com%2Fdownloads%2F2125968992',
];

const BackgroundSlider = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Automatically change the background every 5 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 5000);

        return () => clearInterval(interval); // Cleanup interval on component unmount
    }, []);

    return (
        <main>
            <div className="relative w-full h-screen overflow-hidden">
                <div
                    className="whitespace-nowrap transition-transform duration-1000 ease-in-out"
                    style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                    {images.map((image, index) => (
                        <div
                            key={index}
                            className="inline-block w-full h-screen"
                            style={{
                                backgroundImage: `url(${image})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                            }}
                        />
                    ))}
                </div>

                {/* Content Overlay */}
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <Image
                        src="/hawkeyes.png"
                        alt="My Photo"
                        width={100}
                        height={100}
                        className='fixed inset-10'
                    />

                    <Link href="/auth/sign-in">Sign In</Link>
                </div>

                {/* Navigation Dots */}
                <div className="absolute bottom-5 left-0 right-0 flex justify-center space-x-2">
                    {images.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                            className={`w-3 h-3 rounded-full ${index === currentIndex ? 'bg-white' : 'bg-gray-400'}`}
                        ></button>
                    ))}
                </div>
            </div>
            <div id='main' className='bg-red-200 h-screen'>hello</div>
        </main>
    );
};

export default BackgroundSlider;
