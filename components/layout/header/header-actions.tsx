import { Button } from "@/components/ui/button";
import { Globe, Menu, X } from "lucide-react";

type Props = {
    isMobileOpen: boolean;
    toggleMobile: () => void;
};

export function HeaderActions({ isMobileOpen, toggleMobile }: Props) {
    return (
        <div className="flex items-center gap-2 font-semibold">
            <Button variant="ghost" className="gap-2 rounded-full cursor-pointer">
                <Globe size={18} />
                <span className="hidden sm:inline">En</span>
            </Button>

            <Button
                variant="outline"
                className="gap-2 rounded-full border-none bg-yellow text-xs sm:text-sm cursor-pointer"
            >
                Register
            </Button>

            <button
                className="rounded-full p-2 hover:bg-gray-100 md:hidden cursor-pointer"
                onClick={toggleMobile}
            >
                {isMobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
        </div>
    );
}
