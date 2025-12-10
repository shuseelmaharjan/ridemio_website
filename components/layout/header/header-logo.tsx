import Image from "next/image";
import Link from "next/link";

export function HeaderLogo() {
    return (
        <Link href="/" className="flex items-center gap-2">
            <Image
                src="/logo/logo.jpg"
                alt="Ridemio logo"
                width={130}
                height={40}
                className="h-9 w-auto object-contain"
                priority
            />
        </Link>
    );
}
