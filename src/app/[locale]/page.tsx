import dynamic from 'next/dynamic';

const HeroSection = dynamic(() => import('@/components/mainpage/HeroSection'));
const BlogSection = dynamic(() => import('@/components/mainpage/BlogSection'));
 
export default function HomePage() {
 
  return (
    <>
      <HeroSection />
      <BlogSection />
    </>
  );
}