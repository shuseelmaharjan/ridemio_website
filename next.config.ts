// next.config.ts
import type { NextConfig } from "next";
import type { RemotePattern } from "next/dist/shared/lib/image-config";

const serverUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "";

const remotePatterns: RemotePattern[] = [
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
];

// If you also serve images directly from your API base URL:
if (serverUrl) {
    try {
        const url = new URL(serverUrl);

        remotePatterns.push({
            protocol: url.protocol.replace(":", "") as "http" | "https",
            hostname: url.hostname,
            ...(url.port ? { port: url.port } : {}),
            pathname: "/**", // or "/media/**" if you want to be stricter
        });
    } catch (e) {
        console.warn("Invalid NEXT_APP_SERVER_URL:", serverUrl);
    }
}

const nextConfig: NextConfig = {
    env: {
        NEXT_APP_SERVER_URL: serverUrl,
    },
    images: {
        remotePatterns,
    },
};

export default nextConfig;
