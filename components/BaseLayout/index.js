import Footer from '@/components/BaseLayout/Footer';
import Navigation from '@/components/BaseLayout/Navigation';

export default function Home({children}) {
  return (
    <div>
      <Navigation />
      <div className="container mx-auto">{children}</div>
      <Footer />
    </div>
  );
}
