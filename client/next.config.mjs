/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['api.dicebear.com', 'res.cloudinary.com'],    
    dangerouslyAllowSVG: true,        
  },
};

export default nextConfig;
