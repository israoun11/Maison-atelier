import { useState } from 'react';

interface Props {
  src: string;
  alt: string;
  className?: string;
  eager?: boolean;
}

// Image with a graceful, on-brand fallback so a removed photo never shows a broken icon.
export default function SmartImage({ src, alt, className = '', eager = false }: Props) {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return (
      <div className={`flex items-center justify-center bg-sand text-[11px] uppercase tracking-widest2 text-taupe ${className}`} role="img" aria-label={alt}>
        Maison Karima
      </div>
    );
  }
  return (
    <img
      src={src}
      alt={alt}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      onError={() => setFailed(true)}
      className={`bg-sand object-cover ${className}`}
    />
  );
}
