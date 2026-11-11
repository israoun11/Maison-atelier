// Unsplash photos. If a photo is ever removed upstream, replace its ID here and re-run `npm run seed`.
const img = (id, w = 1800) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

const P = {
  livingA: '1618221195710-dd6b41faaea6',
  livingB: '1600210492486-724fe5c67fb0',
  livingC: '1616137466211-f939a420be84',
  livingD: '1586023492125-27b2c045efd7',
  livingE: '1503174971373-b1f69850bded',
  bedroomA: '1616486338812-3dadae4b4ace',
  bedroomB: '1540518614846-7eded433c457',
  kitchen: '1556911220-bff31c812dba',
  detail: '1600566753190-17f0baa2a6c3',
  house: '1600585154340-be6161a56a0c',
  officeA: '1497366216548-37526070297c',
  officeB: '1497366811353-6870744d04b2',
};

// Listed in display order. The seed script inserts them in reverse so the first one is the newest.
const projects = [
  {
    title: 'Maison Calcaire',
    category: 'Residential',
    location: 'Aix-en-Provence, France',
    description:
      'A family home restored around limestone, lime plaster and reclaimed oak. Rooms open onto one another through deep arched thresholds, and the palette stays within a single warm register so that light does the decorating.',
    coverImage: img(P.livingA),
    gallery: [img(P.bedroomA, 1400), img(P.detail, 1400), img(P.kitchen, 1400)],
    featured: true,
    year: '2024',
    area: '320 m²',
  },
  {
    title: 'Appartement Lumière',
    category: 'Residential',
    location: 'Paris, France',
    description:
      'A Haussmann apartment reduced to its essentials: original mouldings kept, partitions removed, and a continuous run of custom joinery that hides storage and frames the views to the courtyard.',
    coverImage: img(P.livingC),
    gallery: [img(P.livingD, 1400), img(P.bedroomB, 1400)],
    featured: true,
    year: '2023',
    area: '145 m²',
  },
  {
    title: 'Studio Sable',
    category: 'Commercial',
    location: 'Lisbon, Portugal',
    description:
      'Headquarters for a small architecture practice. Long oak tables, linen curtains and a quiet reception sequence create a workplace that feels closer to a private residence than an office.',
    coverImage: img(P.officeA),
    gallery: [img(P.officeB, 1400), img(P.livingE, 1400)],
    featured: true,
    year: '2024',
    area: '480 m²',
  },
  {
    title: 'Villa Argile',
    category: 'Residential',
    location: 'Marrakech, Morocco',
    description:
      'A courtyard villa finished in tadelakt, travertine and hand-woven wool. Deep shade, thick walls and a restrained palette give the house a cool, monastic calm against the heat outside.',
    coverImage: img(P.house),
    gallery: [img(P.livingB, 1400), img(P.bedroomA, 1400), img(P.detail, 1400)],
    featured: true,
    year: '2022',
    area: '410 m²',
  },
  {
    title: 'Maison Ardoise',
    category: 'Renovation',
    location: 'Lyon, France',
    description:
      'The renovation of a 1930s townhouse. We kept the structure and the staircase, replaced everything else, and introduced slate, walnut and soft plaster to give the house a calmer, more contemporary character.',
    coverImage: img(P.kitchen),
    gallery: [img(P.livingD, 1400), img(P.bedroomB, 1400)],
    featured: false,
    year: '2023',
    area: '210 m²',
  },
];

const services = [
  {
    title: 'Interior Architecture',
    description:
      'Spatial planning, structural coordination and detailed technical drawings. We reshape volumes, light and circulation so that a space feels inevitable.',
    image: img(P.house, 1400),
  },
  {
    title: 'Residential Interior Design',
    description:
      'Complete homes designed from first sketch to final cushion: layouts, materials, custom furniture, lighting and art, all within a single coherent vision.',
    image: img(P.livingB, 1400),
  },
  {
    title: 'Commercial Interior Design',
    description:
      'Offices, boutiques and hospitality spaces with a clear identity. We balance brand, comfort and durability with the same quiet precision.',
    image: img(P.officeA, 1400),
  },
  {
    title: 'Renovation & Styling',
    description:
      'Careful renovation of existing spaces and finishing styling: selecting, editing and arranging so that the final result feels collected, never staged.',
    image: img(P.bedroomA, 1400),
  },
];

module.exports = { projects, services };
