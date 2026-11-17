import { Link } from 'react-router-dom';
import { usePageTitle } from '../hooks/usePageTitle';
import { images } from '../assets/images';
import SmartImage from '../components/SmartImage';
import PageHeader from '../components/PageHeader';
import Reveal from '../components/Reveal';

const principles = [
  ['Material first', 'We start with stone, wood, linen and plaster, and let their texture and colour lead the design.'],
  ['Light as a material', 'Orientation, shade and reflection are designed as carefully as any piece of furniture.'],
  ['Built to last', 'Honest construction and timeless proportions, so that interiors improve with age.'],
];

export default function About() {
  usePageTitle('About', 'Maison Karima is a small interior design studio with a material-led, restrained design philosophy.');
  return (
    <>
      <PageHeader eyebrow="About the studio" title="A quiet practice, built on craft." />

      <div className="container-x grid items-center gap-12 py-20 md:grid-cols-12 md:py-28">
        <Reveal className="md:col-span-5">
          <p className="font-serif text-3xl leading-snug md:text-4xl">Interiors that feel considered rather than decorated.</p>
          <p className="mt-6 max-w-lg text-sm leading-relaxed text-brown/80">
            Maison Karima is an interior design studio based in Paris. We design homes, workplaces and hospitality spaces with a deliberately small team, so every project receives the full attention of its principals.
          </p>
        </Reveal>
        <Reveal className="md:col-span-6 md:col-start-7" delay={120}>
          <div className="aspect-[4/3] overflow-hidden rounded-md">
            <SmartImage src={images.about} alt="Studio-designed living room with soft, natural materials" eager className="h-full w-full" />
          </div>
        </Reveal>
      </div>

      <section className="bg-olive py-20 text-ivory md:py-24">
        <div className="container-x">
          <Reveal><p className="eyebrow !text-ivory/60">Design philosophy</p></Reveal>
          <div className="mt-8 grid gap-10 md:grid-cols-3">
            {principles.map(([t, d], i) => (
              <Reveal key={t} delay={i * 100}>
                <h2 className="text-3xl !text-ivory">{t}</h2>
                <p className="mt-3 text-sm leading-relaxed text-ivory/75">{d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="container-x grid items-center gap-12 py-20 md:grid-cols-2 md:py-28">
        <Reveal>
          <div className="aspect-[4/3] overflow-hidden rounded-md">
            <SmartImage src={images.aboutSecond} alt="A serene bedroom in soft neutral tones" className="h-full w-full" />
          </div>
        </Reveal>
        <Reveal delay={120}>
          <p className="eyebrow">Our story</p>
          <h2 className="mt-4 text-4xl md:text-5xl">Founded on a single table.</h2>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-brown/80">
            Maison Karima began in 2014 around one oak table and a belief that rooms should be shaped by how people live in them. Today the studio works across France, Portugal and Morocco with a trusted network of craftspeople, and still starts every project with a conversation and a sample of material.
          </p>
          <Link to="/contact" className="link-line mt-8 text-brown">Work with us <span aria-hidden>→</span></Link>
        </Reveal>
      </section>
    </>
  );
}
