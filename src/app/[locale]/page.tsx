import dynamic from 'next/dynamic';

const HeroSection = dynamic(() => import('@/components/mainpage/HeroSection'));
const BlogSection = dynamic(() => import('@/components/mainpage/BlogSection'));
const AboutSection = dynamic(() => import('@/components/mainpage/AboutSection'));
 
export default function HomePage() {
 
  return (
    <>
      <HeroSection />
      <AboutSection />
      <BlogSection />
    </>
  );
}