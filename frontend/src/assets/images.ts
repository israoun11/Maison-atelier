// Photography used by the static parts of the public site (Unsplash).
const u = (id: string, w = 1800) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

export const images = {
  hero: u('1618221195710-dd6b41faaea6', 2400),
  intro: u('1600566753190-17f0baa2a6c3', 1400),
  about: u('1616137466211-f939a420be84', 1600),
  aboutSecond: u('1616486338812-3dadae4b4ace', 1400),
  contact: u('1586023492125-27b2c045efd7', 2000),
};
