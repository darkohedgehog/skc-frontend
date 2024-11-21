import LangSwitch from '@/components/header/LangSwitch';
import SearchBar from '@/components/header/SearchBar';
import BlogSection from '@/components/mainpage/BlogSection';
 
export default function HomePage() {
 
  return (
    <>
    <LangSwitch />
    <SearchBar />
      <BlogSection />
    </>
  );
}