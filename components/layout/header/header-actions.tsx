import { Button } from "@/components/ui/button";
import { Globe, Menu, X } from "lucide-react";

type Props = {
  isMobileOpen: boolean;
  toggleMobile: () => void;
};

export function HeaderActions({ isMobileOpen, toggleMobile }: Props) {
  return (
    <div className="flex items-center gap-2 font-semibold py-2">
      <div className="flex items-center gap-2 mr-2">
        <Button
          variant="ghost"
          className="gap-2 !rounded-full cursor-pointer px-3 py-1 text-xs sm:text-sm"
        >
          <Globe className="h-4 w-4" />
          <span className="hidden sm:inline">En</span>
        </Button>

        <Button
          variant="outline"
          className="gap-2 !rounded-full border-none bg-yellow cursor-pointer px-4 py-1 text-xs sm:text-sm"
        >
          Register
        </Button>
      </div>

      <button
        className="rounded-full p-1 hover:bg-gray-100 md:hidden cursor-pointer w-8 h-8 flex items-center justify-center"
        onClick={toggleMobile}
        type="button"
        aria-label="Toggle mobile menu"
      >
        {isMobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
      </button>
    </div>
  );
}
