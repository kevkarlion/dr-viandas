import { Hero } from "@/components/home/Hero/Hero";
import { Features } from '@/components/home/Features'
import { AboutMe } from '@/components/home/AboutMe'
import { Menu } from '@/components/home/Menu'
import { dishes } from "@/data/dishes";


const Page = () => {
  return (
    <>
      <Hero />
      <Features />
      <AboutMe />
      <Menu dishes={dishes}/>
    </>
  );
}

export default Page;
