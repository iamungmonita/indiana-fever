import Link from "next/link";
import { useState, useEffect } from "react";
const images = [
  'https://thefulcrum.us/media-library/caitlin-clark-in-her-iowa-uniform.jpg?id=52314531&width=1245&height=700&quality=85&coordinates=0%2C0%2C0%2C197',
  'https://media.cnn.com/api/v1/images/stellar/prod/2024-02-24t071013z-1827543648-mt1usatoday22603379-rtrmadp-3-ncaa-womens-basketball-penn-st-at-iowa.jpg?c=16x9&q=h_833,w_1480,c_fill',
  'https://ca-times.brightspotcdn.com/dims4/default/df07538/2147483647/strip/true/crop/2386x1591+0+0/resize/1200x800!/quality/75/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2F6d%2F01%2F592535ad4ab29e7cde3e992bddcf%2Fhttps-delivery-gettyimages.com%2Fdownloads%2F2125968992',
];

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Automatically change the background every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  return (
    <div className="w-full h-full overflow-hidden">
      <div className="w-screen h-screen overflow-y-scroll overflow-x-hidden scroll-smooth snap-y snap-mandatory">
        <nav className="fixed w-full bg-slate-200 z-10">
          <ul className="flex w-full justify-center items-center gap-x-10 p-5">
            <Link href="#one">About</Link>
            <Link href="#two">Contact</Link>
            <Link href="#three">Location</Link>
            <Link href="#four">Shop</Link>
          </ul>
        </nav>
        <section id="one"
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
        </section>

        <section id="two" className="text-center flex justify-center items-center max-w-[80%] mx-auto  h-screen flex-col">
          <h2>contact</h2>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque quo, illum laboriosam voluptate quasi ullam a assumenda omnis pariatur quidem, iure laborum eum tenetur fuga, molestias quas doloremque exercitationem minus.</p>
        </section>
        <section id="three" className="text-center flex justify-center items-center max-w-[80%] mx-auto  h-screen flex-col">
          <h2>location</h2>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius, itaque pariatur! Sunt quos corporis illum repellat fugiat quia ab quis impedit inventore explicabo, aperiam, sapiente sint quam perspiciatis vel possimus?</p>
        </section>
        <section id="four" className="text-center flex justify-center items-center max-w-[80%] mx-auto  h-screen flex-col">
          <h2>shop</h2>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus, deleniti? Quae est libero quisquam ipsam, repellendus enim nam eligendi unde ullam officia in? Distinctio repellat enim ad nostrum quis cumque!</p>
        </section>
      </div>
    </div>
  );
}
