import { apiHandler } from "@/api/apiHandler";
import { NavGroup } from "../types";

interface ApiParent {
    name: string;
    slug: string;
    submenus?: { name: string; slug: string }[];
}

export async function getNavigation(): Promise<NavGroup[]> {
    const data = await apiHandler<{ count: number; results: ApiParent[] }>(
        "get",
        "/api/website/api/navigation/"
    );

    return data.results.map((parent) => ({
        label: parent.name,
        items:
            parent.submenus?.map((s) => ({
                label: s.name,
                href: `/${parent.slug}/${s.slug}`,
            })) ?? [],
    }));
}
