import { Link } from 'react-router-dom';
import { getProjects, getServices } from '../services/api';
import { useFetch } from '../hooks/useFetch';
import { usePageTitle } from '../hooks/usePageTitle';
import { images } from '../assets/images';
import ProjectCard from '../components/ProjectCard';
import SmartImage from '../components/SmartImage';
import Reveal from '../components/Reveal';
import { ErrorState, Loader } from '../components/StateViews';

export default function Home() {
  usePageTitle('', 'Atelier Maison is an interior architecture and interior design studio creating calm, material-led spaces.');
  const projects = useFetch(() => getProjects({ featured: true }), []);
  const services = useFetch(getServices, []);

  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[100svh] items-end overflow-hidden bg-brown">
        <SmartImage src={images.hero} alt="A warm, minimalist living room with a curved sofa and natural light" eager className="absolute inset-0 h-full w-full" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-charcoal/20 to-charcoal/30" aria-hidden />
        <div className="container-x relative pb-16 pt-40 text-ivory md:pb-24">
          <p className="eyebrow !text-ivory/80">Interior Architecture & Design</p>
          <h1 className="mt-6 max-w-4xl text-5xl leading-[1.02] !text-ivory sm:text-6xl md:text-8xl">
            Material. <em className="font-light">Light.</em> <br className="hidden md:block" />Quiet.
          </h1>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-ivory/85">
            Atelier Maison designs calm, tactile interiors for people who value restraint, craft and the way a room feels at four in the afternoon.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-8">
            <Link to="/projects" className="btn btn-light">View projects</Link>
            <Link to="/contact" className="link-line text-ivory">Get in touch <span aria-hidden>→</span></Link>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="container-x grid gap-12 py-24 md:grid-cols-12 md:py-36">
        <Reveal className="md:col-span-5">
          <p className="eyebrow">The studio</p>
          <h2 className="mt-5 text-4xl leading-tight md:text-5xl">Spaces designed to be lived in, not photographed.</h2>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-brown/80">
            We are a small studio of architects and interior designers. Every project begins with the light, the proportions and the people who will use the space, and is finished with natural materials chosen to age well.
          </p>
          <Link to="/about" className="link-line mt-8 text-brown">About the studio <span aria-hidden>→</span></Link>
        </Reveal>
        <Reveal className="md:col-span-6 md:col-start-7" delay={120}>
          <div className="aspect-[4/5] overflow-hidden">
            <SmartImage src={images.intro} alt="Architectural detail in warm stone and plaster" className="h-full w-full" />
          </div>
        </Reveal>
      </section>

      {/* Selected projects */}
      <section className="bg-sand/60 py-24 md:py-32">
        <div className="container-x">
          <Reveal className="mb-14 flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="eyebrow">Selected work</p>
              <h2 className="mt-4 text-4xl md:text-6xl">Recent projects</h2>
            </div>
            <Link to="/projects" className="link-line text-brown">All projects <span aria-hidden>→</span></Link>
          </Reveal>
          {projects.loading && <Loader label="Loading projects" />}
          {projects.error && <ErrorState message={projects.error} onRetry={projects.reload} />}
          {projects.data && (
            <div className="grid gap-x-8 gap-y-16 sm:grid-cols-2">
              {projects.data.slice(0, 4).map((p, i) => (
                <Reveal key={p._id} className={i % 2 === 1 ? 'sm:mt-20' : ''} delay={(i % 2) * 120}>
                  <ProjectCard project={p} />
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Services */}
      <section className="container-x py-24 md:py-32">
        <Reveal className="grid gap-8 md:grid-cols-12">
          <div className="md:col-span-4">
            <p className="eyebrow">Services</p>
            <h2 className="mt-4 text-4xl md:text-5xl">What we do</h2>
          </div>
          <div className="md:col-span-8">
            {services.loading && <Loader label="Loading services" />}
            {services.error && <ErrorState message={services.error} onRetry={services.reload} />}
            {services.data && (
              <ol className="border-t border-taupe/50">
                {services.data.map((s, i) => (
                  <li key={s._id} className="grid grid-cols-[3rem_1fr] gap-4 border-b border-taupe/50 py-7">
                    <span className="font-serif text-xl text-taupe">0{i + 1}</span>
                    <div>
                      <h3 className="text-2xl md:text-3xl">{s.title}</h3>
                      <p className="mt-2 max-w-xl text-sm leading-relaxed text-brown/75">{s.description}</p>
                    </div>
                  </li>
                ))}
              </ol>
            )}
            <Link to="/services" className="link-line mt-8 text-brown">Explore services <span aria-hidden>→</span></Link>
          </div>
        </Reveal>
      </section>

      {/* About preview */}
      <section className="bg-brown text-ivory">
        <div className="container-x grid items-center gap-12 py-24 md:grid-cols-2 md:py-32">
          <Reveal>
            <div className="aspect-[5/4] overflow-hidden">
              <SmartImage src={images.about} alt="A calm living space with soft furnishings" className="h-full w-full" />
            </div>
          </Reveal>
          <Reveal delay={120}>
            <p className="eyebrow">Our approach</p>
            <h2 className="mt-5 text-4xl !text-ivory md:text-5xl">Fewer things, chosen better.</h2>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-ivory/75">
              Stone, wood, linen and lime plaster. We work with a limited palette and a long view, so that each interior feels calm today and still relevant in twenty years.
            </p>
            <Link to="/about" className="link-line mt-8">Our philosophy <span aria-hidden>→</span></Link>
          </Reveal>
        </div>
      </section>

      {/* Contact invitation */}
      <section className="container-x py-24 text-center md:py-36">
        <Reveal>
          <p className="eyebrow">Begin a project</p>
          <h2 className="mx-auto mt-5 max-w-3xl text-4xl leading-tight md:text-6xl">Let us talk about your space.</h2>
          <Link to="/contact" className="btn btn-dark mt-10">Contact the studio</Link>
        </Reveal>
      </section>
    </>
  );
}
