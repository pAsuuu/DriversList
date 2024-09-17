// next.config.mjs

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Indique à Next.js d'exporter le site en HTML statique
  output: 'export',

  // Désactive l'optimisation des images, car `next export` ne supporte pas les optimisations dynamiques
  images: {
    unoptimized: true,
  },

  // Autres configurations optionnelles peuvent être ajoutées ici
};

export default nextConfig;
