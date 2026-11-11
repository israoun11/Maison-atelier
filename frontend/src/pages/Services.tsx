import { Link } from 'react-router-dom';
import { getServices } from '../services/api';
import { useFetch } from '../hooks/useFetch';
import { usePageTitle } from '../hooks/usePageTitle';
import SmartImage from '../components/SmartImage';
import Reveal from '../components/Reveal';
import { ErrorState, Loader } from '../components/StateViews';

export default function Services() {
  usePageTitle('Services', 'Interior architecture, residential and commercial interior design, renovation and styling.');
  const { data, loading, error, reload } = useFetch(getServices, []);

  return (
    <div className="pb-24 pt-36 md:pb-32 md:pt-44">
      <div className="container-x">
        <Reveal>
          <p className="eyebrow">Services</p>
          <h1 className="mt-4 max-w-3xl text-5xl md:text-7xl">From first sketch to final detail.</h1>
        </Reveal>
      </div>

      <div className="container-x mt-20 space-y-24 md:space-y-32">
        {loading && <Loader label="Loading services" />}
        {error && <ErrorState message={error} onRetry={reload} />}
        {data?.map((s, i) => (
          <Reveal key={s._id}>
            <div className="grid items-center gap-10 md:grid-cols-12">
              <div className={`aspect-[4/3] overflow-hidden md:col-span-7 ${i % 2 ? 'md:order-2 md:col-start-6' : ''}`}>
                <SmartImage src={s.image} alt={`${s.title} at Atelier Maison`} className="h-full w-full" />
              </div>
              <div className={`md:col-span-4 ${i % 2 ? 'md:order-1 md:col-start-1' : 'md:col-start-9'}`}>
                <p className="font-serif text-3xl text-taupe">0{i + 1}</p>
                <h2 className="mt-3 text-4xl md:text-5xl">{s.title}</h2>
                <p className="mt-5 text-sm leading-relaxed text-brown/80">{s.description}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <div className="container-x mt-28 text-center">
        <Link to="/contact" className="btn btn-dark">Discuss your project</Link>
      </div>
    </div>
  );
}
