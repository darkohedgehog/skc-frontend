import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/routing';
import BlogSection from '@/components/mainpage/BlogSection';
 
export default function HomePage() {
  const t = useTranslations('HomePage');
  return (
    <div>
      <BlogSection />
      <Link href="/blog">{t('about')}</Link>
    </div>
  );
}