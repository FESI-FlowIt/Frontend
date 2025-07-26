import LandingBanner from '@/components/landing/LandingBanner';
import LandingFeaturesDetail from '@/components/landing/LandingFeaturesDetail';
import LandingIntroduction from '@/components/landing/LandingIntroduction';

export default function Home() {
  return (
    <>
      <section className="mb-200">
        <LandingBanner />
      </section>

      <section className="mb-240">
        <LandingIntroduction />
      </section>

      <section className="mb-300">
        <LandingFeaturesDetail />
      </section>
    </>
  );
}
