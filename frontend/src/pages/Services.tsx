import { Link } from 'react-router-dom';
import { getServices } from '../services/api';
import { useFetch } from '../hooks/useFetch';
import { usePageTitle } from '../hooks/usePageTitle';
import SmartImage from '../components/SmartImage';
import PageHeader from '../components/PageHeader';
import Reveal from '../components/Reveal';
import Icon, { serviceIcon } from '../components/Icon';
import { ErrorState, Loader } from '../components/StateViews';

export default function Services() {
  usePageTitle('Services', 'Interior architecture, residential and commercial interior design, renovation and styling by Maison Karima.');
  const { data, loading, error, reload } = useFetch(getServices, []);

  return (
    <>
      <PageHeader eyebrow="Services" title="From first sketch to final detail.">Every engagement is led by the studio and tailored to the space, the people and the budget.</PageHeader>

      <div className="container-x space-y-20 py-20 md:space-y-28 md:py-28">
        {loading && <Loader label="Loading services" />}
        {error && <ErrorState message={error} onRetry={reload} />}
        {data && data.length === 0 && <p className="text-center text-sm text-brown/70">Our services will appear here soon.</p>}
        {data?.map((s, i) => (
          <Reveal key={s._id}>
            <div className="grid items-center gap-10 md:grid-cols-12">
              <div className={`aspect-[4/3] overflow-hidden rounded-md md:col-span-7 ${i % 2 ? 'md:order-2 md:col-start-6' : ''}`}>
                <SmartImage src={s.image} alt={`${s.title} by Maison Karima`} className="h-full w-full" />
              </div>
              <div className={`md:col-span-4 ${i % 2 ? 'md:order-1 md:col-start-1' : 'md:col-start-9'}`}>
                <span className="flex h-12 w-12 items-center justify-center rounded-full border border-brown/30"><Icon name={serviceIcon(s.title)} className="h-5 w-5" /></span>
                <h2 className="mt-5 text-4xl md:text-5xl">{s.title}</h2>
                <p className="mt-5 text-sm leading-relaxed text-brown/80">{s.description}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <section className="bg-olive py-16 text-center text-ivory">
        <div className="container-x">
          <h2 className="text-4xl !text-ivory md:text-5xl">Start with a conversation.</h2>
          <Link to="/contact" className="btn btn-light mt-8">Book a consultation <span aria-hidden>→</span></Link>
        </div>
      </section>
    </>
  );
}
