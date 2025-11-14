"use client";
import * as React from "react";
import * as HoverCardPrimitive from "@radix-ui/react-hover-card";

export const HoverCard = HoverCardPrimitive.Root;
export const HoverCardTrigger = HoverCardPrimitive.Trigger;
export const HoverCardPortal = HoverCardPrimitive.Portal;
export const HoverCardContent = React.forwardRef<
  React.ElementRef<typeof HoverCardPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof HoverCardPrimitive.Content>
>(
  ({ className = "", align = "end", side = "bottom", sideOffset = 6, ...props }, ref) => (
    <HoverCardPrimitive.Content
      ref={ref}
      align={align}
      side={side}
      sideOffset={sideOffset}
      className={`z-50 w-screen bg-white text-neutral-900 shadow-lg ring-none ${className}`}
      {...props}
    />
  )
);
HoverCardContent.displayName = "HoverCardContent";
