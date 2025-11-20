import type { NextConfig } from "next";
import type { RemotePattern } from "next/dist/shared/lib/image-config";

const serverUrl = process.env.NEXT_APP_SERVER_URL || "";

const remotePatterns: RemotePattern[] = [
    // Local backend
    {
        protocol: "http",
        hostname: "localhost",
        port: "8000",
        pathname: "/media/**", // <-- add this, helps avoid surprises
    },
];

if (serverUrl) {
    try {
        const url = new URL(serverUrl);

        remotePatterns.push({
            protocol: url.protocol.replace(":", "") as "http" | "https",
            hostname: url.hostname,
            ...(url.port ? { port: url.port } : {}),
            pathname: "/**",
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
