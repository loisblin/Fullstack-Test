import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    domains: ['api.dofusdb.fr'], // Ajouter le domaine d'où viennent les images
  },
};

export default nextConfig;
