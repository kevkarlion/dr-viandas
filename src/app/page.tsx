import { Hero } from "@/components/home/Hero/Hero";
import { Features } from '@/components/home/Features'
import { AboutMe } from '@/components/home/AboutMe'
import { Menu } from '@/components/home/Menu'



const Page = ( ) => {
  return (
    <>
      <Hero />
      <Features />
      <AboutMe />
      {/* <Menu /> */}
    </>
  );
}

export default Page;
