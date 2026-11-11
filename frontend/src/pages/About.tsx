import { Link } from 'react-router-dom';
import { usePageTitle } from '../hooks/usePageTitle';
import { images } from '../assets/images';
import SmartImage from '../components/SmartImage';
import Reveal from '../components/Reveal';

const principles = [
  ['Material first', 'We start with stone, wood, linen and plaster, and let their texture and colour lead the design.'],
  ['Light as a material', 'Orientation, shade and reflection are designed as carefully as any piece of furniture.'],
  ['Built to last', 'Honest construction and timeless proportions, so that interiors improve with age.'],
];

export default function About() {
  usePageTitle('About', 'Atelier Maison is a small interior architecture studio with a material-led, restrained design philosophy.');
  return (
    <div className="pb-24 pt-36 md:pb-32 md:pt-44">
      <div className="container-x grid gap-12 md:grid-cols-12">
        <Reveal className="md:col-span-6">
          <p className="eyebrow">About the studio</p>
          <h1 className="mt-4 text-5xl leading-tight md:text-7xl">A quiet practice, built on craft.</h1>
          <p className="mt-8 max-w-lg text-sm leading-relaxed text-brown/80">
            Atelier Maison is an interior architecture and design studio based in Paris. We design homes, workplaces and hospitality spaces with a deliberately small team, so every project receives the full attention of its principals.
          </p>
        </Reveal>
        <Reveal className="md:col-span-5 md:col-start-8" delay={120}>
          <div className="aspect-[4/5] overflow-hidden">
            <SmartImage src={images.about} alt="Studio-designed living room with soft, natural materials" eager className="h-full w-full" />
          </div>
        </Reveal>
      </div>

      <section className="container-x mt-28 md:mt-40">
        <Reveal><p className="eyebrow">Design philosophy</p></Reveal>
        <div className="mt-8 grid gap-10 border-t border-taupe/50 pt-10 md:grid-cols-3">
          {principles.map(([t, d], i) => (
            <Reveal key={t} delay={i * 100}>
              <h2 className="text-3xl">{t}</h2>
              <p className="mt-3 text-sm leading-relaxed text-brown/80">{d}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="container-x mt-28 grid items-center gap-12 md:mt-40 md:grid-cols-2">
        <Reveal>
          <div className="aspect-[4/3] overflow-hidden">
            <SmartImage src={images.aboutSecond} alt="A serene bedroom in soft neutral tones" className="h-full w-full" />
          </div>
        </Reveal>
        <Reveal delay={120}>
          <p className="eyebrow">Our story</p>
          <h2 className="mt-4 text-4xl md:text-5xl">Founded on a single table.</h2>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-brown/80">
            Atelier Maison began in 2014 around one oak table and a belief that interiors should feel considered rather than decorated. Today the studio works across France, Portugal and Morocco with a trusted network of craftspeople, and still starts every project with a conversation and a sample of material.
          </p>
          <Link to="/contact" className="link-line mt-8 text-brown">Work with us <span aria-hidden>→</span></Link>
        </Reveal>
      </section>
    </div>
  );
}
