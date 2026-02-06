const serverUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "";

const remotePatterns = [
  // Local backend (dev)
  {
    protocol: "http",
    hostname: "localhost",
    port: "8000",
    pathname: "/media/**",
  },

  // S3 bucket for images (prod & dev)
  {
    protocol: "https",
    hostname: "ridesewa.s3.amazonaws.com",
    pathname: "/**",
  },
  
  // Ridemio S3 bucket
  {
    protocol: "https",
    hostname: "s3.ridemio.com",
    pathname: "/**",
  },
];

if (serverUrl) {
  try {
    const url = new URL(serverUrl);

    remotePatterns.push({
      protocol: url.protocol.replace(":", ""), // "http" or "https"
      hostname: url.hostname,
      ...(url.port ? { port: url.port } : {}),
      pathname: "/**", // or "/media/**"
    });
  } catch (e) {
    console.warn("Invalid NEXT_PUBLIC_API_BASE_URL:", serverUrl);
  }
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_APP_SERVER_URL: serverUrl,
  },
  images: {
    remotePatterns,
  },
};

export default nextConfig;
