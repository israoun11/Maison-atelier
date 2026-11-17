import { Link } from 'react-router-dom';
import { getProjects, getServices } from '../services/api';
import { useFetch } from '../hooks/useFetch';
import { usePageTitle } from '../hooks/usePageTitle';
import { images } from '../assets/images';
import SmartImage from '../components/SmartImage';
import Reveal from '../components/Reveal';
import Icon, { serviceIcon, type IconName } from '../components/Icon';
import { ErrorState, Loader } from '../components/StateViews';

const steps: { icon: IconName; title: string; text: string }[] = [
  { icon: 'listen', title: '01. Listen', text: 'Share your goals, needs and inspiration.' },
  { icon: 'assess', title: '02. Assess', text: 'We review the space and explore possibilities.' },
  { icon: 'plan', title: '03. Plan', text: 'Develop layouts, materials and design direction.' },
  { icon: 'guide', title: '04. Guide', text: 'Coordinate details and support every decision.' },
];

export default function Home() {
  usePageTitle('', 'Maison Karima is an interior design studio creating calm, material-led spaces.');
  const projects = useFetch(() => getProjects({ featured: true }), []);
  const services = useFetch(getServices, []);

  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[92svh] items-center overflow-hidden bg-charcoal">
        <SmartImage src={images.hero} alt="A calm, material-rich living room with natural light" eager className="absolute inset-0 h-full w-full" />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/90 via-charcoal/60 to-charcoal/25" aria-hidden />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-charcoal/60 to-transparent" aria-hidden />
        <div className="container-x relative pb-16 pt-32 text-ivory">
          <h1 className="text-6xl leading-none !text-ivory sm:text-7xl md:text-9xl">Maison Karima</h1>
          <p className="mt-6 text-sm uppercase tracking-[0.35em] text-ivory/60 md:text-2xl">Interior Design</p>
          <Link to="/contact" className="btn btn-ghost mt-12">Book a consultation <span aria-hidden>→</span></Link>
        </div>
      </section>

      {/* Statement + service cards */}
      <section className="container-x pb-24 pt-20 md:pb-44 md:pt-28">
        <Reveal className="mx-auto max-w-xl text-center">
          <div className="rule" />
          <p className="mt-10 font-serif text-3xl leading-snug md:text-4xl">Considered interiors shaped by how you live, work and gather.</p>
          <p className="mt-8 text-[11px] uppercase tracking-widest2 text-brown/70">Listen <span className="mx-2">•</span> Assess <span className="mx-2">•</span> Plan <span className="mx-2">•</span> Guide</p>
        </Reveal>

        <div className="mt-16">
          {services.loading && <Loader label="Loading services" />}
          {services.error && <ErrorState message={services.error} onRetry={services.reload} />}
          {services.data && services.data.length === 0 && <p className="text-center text-sm text-brown/70">Our services will appear here soon.</p>}
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {services.data?.slice(0, 4).map((s, i) => (
              <Reveal key={s._id} delay={i * 80}>
                <Link to="/services" className="group flex h-full flex-col overflow-hidden rounded-md border border-sand bg-paper transition-shadow duration-500 hover:shadow-float" aria-label={`${s.title}, learn more`}>
                  <div className="img-zoom aspect-[4/3] overflow-hidden">
                    <SmartImage src={s.image} alt={s.title} className="h-full w-full" />
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <div className="flex items-center gap-3 text-brown">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-brown/30"><Icon name={serviceIcon(s.title)} className="h-4 w-4" /></span>
                      <h3 className="font-sans text-[11px] font-normal uppercase tracking-widest2">{s.title}</h3>
                    </div>
                    <p className="mt-4 line-clamp-3 flex-1 text-xs leading-relaxed text-brown/70">{s.description}</p>
                    <span aria-hidden className="mt-4 self-end text-sm transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Approach band with floating consultation card */}
      <section className="bg-olive text-ivory">
        <div className="container-x grid gap-12 py-16 lg:grid-cols-12 lg:py-20">
          <Reveal className="lg:col-span-3">
            <p className="eyebrow !text-ivory/60">Our approach</p>
            <h2 className="mt-4 text-3xl leading-snug !text-ivory md:text-4xl">A clear process from start to finish.</h2>
            <p className="mt-5 max-w-xs text-xs leading-relaxed text-ivory/70">We guide each project with care, from the first conversation to the final details.</p>
          </Reveal>

          <ol className="grid grid-cols-2 gap-x-6 gap-y-10 lg:col-span-5">
            {steps.map((st, i) => (
              <li key={st.title} className="list-none">
                <Reveal delay={i * 80}>
                  <span className="flex h-12 w-12 items-center justify-center rounded-full border border-ivory/35"><Icon name={st.icon} className="h-5 w-5" /></span>
                  <p className="mt-5 text-[11px] uppercase tracking-widest2">{st.title}</p>
                  <p className="mt-2 text-xs leading-relaxed text-ivory/70">{st.text}</p>
                </Reveal>
              </li>
            ))}
          </ol>

          <Reveal className="lg:col-span-4 lg:-mt-40" delay={150}>
            <div className="relative z-10 ml-auto max-w-sm rounded-2xl bg-paper p-8 text-brown shadow-float">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-olive text-ivory"><Icon name="calendar" className="h-5 w-5" /></span>
              <h2 className="mt-6 text-4xl leading-tight">Book Consultation</h2>
              <p className="mt-4 text-sm leading-relaxed text-brown/75">Start with a conversation. We will listen, assess and outline the next steps.</p>
              <Link to="/contact" className="btn btn-dark mt-7 w-full">Book consultation <span aria-hidden>→</span></Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* About preview */}
      <section className="container-x grid items-center gap-12 py-24 md:grid-cols-2 md:py-32">
        <Reveal>
          <div className="aspect-[5/4] overflow-hidden rounded-md">
            <SmartImage src={images.about} alt="A calm living space with soft furnishings" className="h-full w-full" />
          </div>
        </Reveal>
        <Reveal delay={120}>
          <p className="eyebrow">The studio</p>
          <h2 className="mt-5 text-4xl leading-tight md:text-5xl">Fewer things, chosen better.</h2>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-brown/80">
            Stone, wood, linen and lime plaster. We work with a limited palette and a long view, so that each interior feels calm today and still relevant in twenty years.
          </p>
          <Link to="/about" className="link-line mt-8 text-brown">About the studio <span aria-hidden>→</span></Link>
        </Reveal>
      </section>

      {/* Selected work strip */}
      <section aria-labelledby="work-title">
        <div className="container-x mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Selected work</p>
            <h2 id="work-title" className="mt-3 text-4xl md:text-5xl">Recent projects</h2>
          </div>
          <Link to="/projects" className="link-line text-brown">All projects <span aria-hidden>→</span></Link>
        </div>
        {projects.loading && <Loader label="Loading projects" />}
        {projects.error && <ErrorState message={projects.error} onRetry={projects.reload} />}
        {projects.data && projects.data.length === 0 && <p className="container-x py-10 text-sm text-brown/70">Featured projects will appear here soon.</p>}
        {projects.data && projects.data.length > 0 && (
          <div className="grid grid-cols-2 gap-px bg-ivory lg:grid-cols-4">
            {projects.data.slice(0, 4).map((p) => (
              <Link key={p._id} to={`/projects/${p.slug}`} className="img-zoom group relative block aspect-[3/4] overflow-hidden" aria-label={`${p.title}, ${p.location}`}>
                <SmartImage src={p.coverImage} alt={`${p.title} interior`} className="h-full w-full" />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-charcoal/80 to-transparent p-5 pt-16 text-ivory">
                  <p className="font-serif text-2xl">{p.title}</p>
                  <p className="text-[11px] uppercase tracking-widest2 text-ivory/70">{p.location}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
