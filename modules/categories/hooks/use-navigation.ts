"use client";

import { useEffect, useState } from "react";
import { apiHandler } from "@/api/apiHandler";
import type { NavGroup } from "../types";

type ApiNavGroup = {
  id: string;
  name: string;
  submenus: { name: string; slug: string }[];
};

type ApiResponseWrapped = {
  value: ApiNavGroup[];
  Count?: number;
};

function isWrappedResponse(data: unknown): data is ApiResponseWrapped {
  return (
    typeof data === "object" &&
    data !== null &&
    "value" in data &&
    Array.isArray((data as any).value)
  );
}

export function useNavigation() {
  const [navItems, setNavItems] = useState<NavGroup[]>([]);
  const [activeParentIndex, setActiveParentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function fetchNavigation() {
      setLoading(true);
      setError(null);

      try {
        // allow either shape: ApiNavGroup[] OR { value: ApiNavGroup[] }
        const data = await apiHandler<ApiNavGroup[] | ApiResponseWrapped>(
          "get",
          "/api/website/public/v1/navigation/"
        );

        if (!mounted) return;

        const navigationData: ApiNavGroup[] = Array.isArray(data)
          ? data
          : isWrappedResponse(data)
            ? data.value
            : [];

        const groups: NavGroup[] = navigationData.map((group) => ({
          label: group.name,
          items: (group.submenus ?? []).map((submenu) => ({
            label: submenu.name,
            href: `/${submenu.slug}`,
          })),
        }));

        setNavItems(groups);
        setActiveParentIndex(0);
      } catch (err: any) {
        if (!mounted) return;
        console.error("Navigation API Error:", err);
        setError(typeof err?.message === "string" ? err.message : "Failed to load navigation");
      } finally {
        if (mounted) setLoading(false);
      }
    }

    fetchNavigation();
    return () => {
      mounted = false;
    };
  }, []);


  return { navItems, activeParentIndex, setActiveParentIndex, loading, error };
}
