import LandingBanner from '@/components/landing/LandingBanner';
import LandingFeaturesDetail from '@/components/landing/LandingFeaturesDetail';
import LandingIntroduction from '@/components/landing/LandingIntroduction';

export default function Home() {
  return (
    <>
      <section className="mb-200 sm:mb-140 md:mb-200">
        <LandingBanner />
      </section>

      <section className="sm:mb-100 md:mb-200 lg:mb-240">
        <LandingIntroduction />
      </section>

      <section className="mb-300">
        <LandingFeaturesDetail />
      </section>
    </>
  );
}
