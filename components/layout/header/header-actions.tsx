import { Button } from "@/components/ui/button";
import { Globe, Menu, X } from "lucide-react";

type Props = {
    isMobileOpen: boolean;
    toggleMobile: () => void;
};

export function HeaderActions({ isMobileOpen, toggleMobile }: Props) {
    return (
        <div className="flex items-center !gap-2 font-semibold !py-2">
            <div>
                <Button variant="ghost" className="gap-2 !rounded-full cursor-pointer px-3 py-1">
                <Globe size={16} />
                <span className="hidden sm:inline">En</span>
            </Button>

            <Button
                variant="outline"
                className="gap-2 !rounded-full border-none bg-yellow text-xs sm:text-sm cursor-pointer px-4 py-1"
            >
                Register
            </Button>
            </div>

            <button
                className="!rounded-full p-1 hover:bg-gray-100 md:hidden cursor-pointer w-8 flex items-center justify-center"
                onClick={toggleMobile}
            >
                {isMobileOpen ? <X size={16} /> : <Menu size={16} />}
            </button>
        </div>
    );
}
