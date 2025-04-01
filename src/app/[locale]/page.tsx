import dynamic from 'next/dynamic';

const HeroSection = dynamic(() => import('@/components/mainpage/HeroSection'));
const BlogSection = dynamic(() => import('@/components/mainpage/BlogSection'));
const AboutSection = dynamic(() => import('@/components/mainpage/AboutSection'));
const LibrarySection = dynamic(() => import('@/components/mainpage/LibrarySection'));
const OurPublication = dynamic(() => import('@/components/library/OurPublication'));
const ArchiveSection = dynamic(() => import('@/components/mainpage/ArchiveSection'));
 
export default function HomePage() {
 
  return (
    <>
      <HeroSection />
      <BlogSection />
      <AboutSection />
      <LibrarySection />
      <OurPublication />
      <ArchiveSection />
    </>
  );
}