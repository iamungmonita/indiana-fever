import { images_constant } from "@/constant/images";
import Link from "next/link";
import Image from "next/image";
import { Fade } from 'react-awesome-reveal'
import { Slider } from "@/core/components";
import { Footer, SideNav } from "@/core/Layout";
import { nav_constant } from "@/constant/nav";
import { MdMenu } from "react-icons/md";
import { useState } from "react";
import { useRouter } from "next/router";


// export const Component = (link: string) => {
//   const openLink = () => {
//     window.open(link, '_blank')
//   }
//   return <button onClick={openLink}>Open Example Page in New Tab</button>;

// }

export default function Home() {
  const [toggle, setToggle] = useState<boolean>(false)
  const router = useRouter()

  return (
    <div className="w-full h-full overflow-hidden relative">
      <div className="w-screen h-screen overflow-y-scroll hide-scrollbar overflow-x-hidden scroll-smooth snap-y snap-mandatory">
        <nav className="fixed w-full bg-white z-10 shadow p-2 flex items-center justify-between">
          <div>
            <Image src={'/hawkeyes.png'} alt="logo" width={100} height={100} />
          </div>
          <ul className="hidden md:flex justify-center items-center gap-x-10 p-5">
            {
              nav_constant.map((navlink) =>
                <Link key={navlink.id} href={navlink.pathname}>
                  {navlink.name}
                </Link>)
            }
          </ul>
          <MdMenu
            onClick={() => setToggle(!toggle)}
            className="md:hidden h-10 w-10 text-gray-600" />
          <div className={`absolute top-0 ${toggle ? 'right-0' : ' right-[-100%]'} animation duration-500 ease-in-out `}>
            <SideNav setToggle={setToggle} />
          </div>
        </nav>
        <section id="home">
          <Slider className="w-full" images={images_constant} />
        </section>
        <Fade>
          <section
            className="grid grid-cols-2">
            <div
              className="w-full h-screen flex justify-center items-center mx-auto max-w-[80%]">
              <h2>about</h2>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque quo, illum laboriosam voluptate quasi ullam a assumenda omnis pariatur quidem, iure laborum eum tenetur fuga, molestias quas doloremque exercitationem minus.</p>
            </div>
            <section
              id="about"
              className="text-center flex justify-center items-center h-screen flex-col">
            </section>
          </section>
        </Fade>
        <Fade>
          <section
            className="grid grid-cols-2">
            <section
              id="achievement"
              className="text-center flex justify-center items-center h-screen flex-col">
            </section>
            <div
              className="w-full h-screen flex justify-center items-center mx-auto max-w-[80%]">
              <h2>about</h2>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque quo, illum laboriosam voluptate quasi ullam a assumenda omnis pariatur quidem, iure laborum eum tenetur fuga, molestias quas doloremque exercitationem minus.</p>
            </div>
          </section>
        </Fade>
        <Fade className="relative">
          <section
            onClick={() => router.push('https://www.pacersteamstore.com/collections/fever-name-number-t-shirts#')}
            id="shop"
            className="text-center flex justify-center items-center w-full  h-screen flex-col p-10">
            <div className="overlay absolute top-0 left-0">  </div>

          </section>
        </Fade>
        {/* <Fade>
          <section
            id="two"
            className="grid grid-cols-2">
            <div
              className="w-full lg:max-w-[70%] mx-auto h-screen col-span-2 lg:col-span-1 flex justify-center items-center p-10">

            </div>
          </section>
        </Fade> */}
        <Footer />
      </div >
    </div >
  );
}
