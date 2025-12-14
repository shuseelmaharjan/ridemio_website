import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  // base styles
  "inline-flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-black",
  {
    variants: {
      variant: {
        default: "bg-black text-white hover:bg-black/90",
        destructive:
          "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/40",
        outline:
          "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost:
          "hover:bg-accent hover:text-accent-foreground",
        link:
          "text-primary underline-offset-4 hover:underline p-0 h-auto",
      },

      size: {
        /**
         * DEFAULT (PILL)
         * - py-2 enforced
         * - smaller text on mobile
         * - same feel on desktop
         */
        default:
          "rounded-full px-6 py-2 text-sm sm:text-base min-h-[40px]",

        /**
         * SMALL
         */
        sm:
          "rounded-full px-4 py-2 text-xs sm:text-sm min-h-[36px]",

        /**
         * LARGE
         */
        lg:
          "rounded-full px-8 py-2 text-base sm:text-lg min-h-[48px]",

        /**
         * ICON BUTTONS
         */
        icon:
          "rounded-full h-9 w-9 sm:h-10 sm:w-10",

        "icon-sm":
          "rounded-full h-8 w-8 sm:h-9 sm:w-9",

        "icon-lg":
          "rounded-full h-10 w-10 sm:h-11 sm:w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
