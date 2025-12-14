import { apiHandler } from "@/api/apiHandler";
import type { NavGroup } from "../types";

type ApiNavGroup = {
  id: string;
  name: string;
  submenus: { name: string; slug: string }[];
};

export async function getNavigation(): Promise<NavGroup[]> {
  const data = await apiHandler<ApiNavGroup[]>(
    "get",
    "/api/website/public/v1/navigation/"
  );

  return (data ?? []).map((group) => ({
    label: group.name,
    items: (group.submenus ?? []).map((s) => ({
      label: s.name,
      href: `/${s.slug}`,
    })),
  }));
}
