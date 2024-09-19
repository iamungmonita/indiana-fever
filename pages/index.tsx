import { imagesCon } from "@/constant/images";
import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Fade } from 'react-awesome-reveal'
import { ContactForm, Card } from "@/core/components";

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Automatically change the background every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % imagesCon.length);
    }, 5000);

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  return (
    <div className="w-full h-full overflow-hidden">
      <div className="w-screen h-screen overflow-y-scroll hide-scrollbar overflow-x-hidden scroll-smooth snap-y snap-mandatory">
        <nav className="fixed w-full bg-white z-10 shadow p-2 flex items-center justify-between">
          <div>
            <Image src={'/hawkeyes.png'} alt="logo" width={100} height={100} />
          </div>
          <ul className="flex justify-center items-center gap-x-10 p-5">
            <Link href="#home">Home</Link>
            <Link href="#one">About</Link>
            <Link href="#two">Contact</Link>
            <Link href="#three">Location</Link>
            <Link href="#four">Shop</Link>
          </ul>
        </nav>
        <section id="home"
          className="whitespace-nowrap transition-transform duration-1000 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {imagesCon.map((image, index) => (
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
        </section>
        <section id="both" className="grid grid-cols-2">
          <Fade direction="left"
            className="text-center bg-red-200 flex justify-center items-center w-full mx-auto h-screen flex-col"
            style={{
              backgroundImage: `url(${imagesCon[0]})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}>
            <div
              className="px-10">
              <h2>about</h2>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque quo, illum laboriosam voluptate quasi ullam a assumenda omnis pariatur quidem, iure laborum eum tenetur fuga, molestias quas doloremque exercitationem minus.</p>
            </div>
          </Fade>
          <Fade
            direction="right"
            className="text-center flex justify-center items-center w-full h-screen flex-col"
            style={{
              backgroundImage: `url(${imagesCon[1]})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}>
            <div
              className="px-10">
              <h2>about</h2>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque quo, illum laboriosam voluptate quasi ullam a assumenda omnis pariatur quidem, iure laborum eum tenetur fuga, molestias quas doloremque exercitationem minus.</p>
            </div>
          </Fade>
        </section>
        <Fade>
          <section
            className="grid grid-cols-2">
            <section
              id="one"
              className="text-center flex justify-center items-center h-screen flex-col">
            </section>
            <div
              className="w-full h-screen flex justify-center items-center mx-auto max-w-[80%]">
              <h2>about</h2>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque quo, illum laboriosam voluptate quasi ullam a assumenda omnis pariatur quidem, iure laborum eum tenetur fuga, molestias quas doloremque exercitationem minus.</p>
            </div>
          </section>
        </Fade>
        <Fade>
          <section
            id="two"
            className=" w-screen h-screen">
            <div className="w-[80%] h-screen text-center mx-auto grid grid-cols-6 items-center">
              <div className="col-span-2">
                <Card />
              </div>
              <div className="col-span-4">
                <ContactForm />
              </div>
            </div>
          </section>
        </Fade>
        <Fade>
          <section
            id="three"
            className="text-center flex justify-center items-center max-w-[80%] mx-auto  h-screen flex-col">
            <div>
              <h2>location</h2>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius, itaque pariatur! Sunt quos corporis illum repellat fugiat quia ab quis impedit inventore explicabo, aperiam, sapiente sint quam perspiciatis vel possimus?</p>
            </div>
          </section>
        </Fade>
        <Fade>
          <section
            id="four"
            className="text-center flex justify-center items-center w-screen h-screen flex-col">
            <div>
              <h2>shop</h2>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus, deleniti? Quae est libero quisquam ipsam, repellendus enim nam eligendi unde ullam officia in? Distinctio repellat enim ad nostrum quis cumque!</p>
            </div>
          </section>
        </Fade>
      </div>
    </div >
  );
}
