"use client";

import { useEffect, useState } from "react";
import { apiHandler } from "@/api/apiHandler";
import type { NavGroup } from "../types";

type NavigationApiResponse = {
  count: number;
  total_pages: number;
  current_page: number;
  next: string | null;
  previous: string | null;
  results: {
    id: string;
    name: string;
    submenus: { name: string; slug: string }[];
    serial: number;
  }[];
};

export function useNavigation() {
  const [navItems, setNavItems] = useState<NavGroup[]>([]);
  const [activeParentIndex, setActiveParentIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function fetchNavigation() {
      setLoading(true);
      setError(null);

      try {
        const data = await apiHandler<NavigationApiResponse>(
          "get",
          "/api/website/public/v1/navigation/"
        );

        if (!mounted) return;

        const groups: NavGroup[] = data.results
          .slice() // avoid mutating original
          .sort((a, b) => a.serial - b.serial)
          .map((group) => ({
            label: group.name,
            items: group.submenus.map((submenu) => ({
              label: submenu.name,
              // redirect to base_url/slug → in Next, this is just /slug
              href: `/${submenu.slug}`,
            })),
          }));

        setNavItems(groups);
        setActiveParentIndex(0);
      } catch (err: any) {
        if (!mounted) return;
        setError(
          typeof err?.message === "string"
            ? err.message
            : "Failed to load navigation"
        );
      } finally {
        if (mounted) setLoading(false);
      }
    }

    fetchNavigation();

    return () => {
      mounted = false;
    };
  }, []);

  return {
    navItems,
    activeParentIndex,
    setActiveParentIndex,
    loading,
    error,
  };
}
