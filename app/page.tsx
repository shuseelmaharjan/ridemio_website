// /project/app/page.tsx
import { HeroSlide } from "@/components/home/hero-slide";
// import { DownloadBar } from "@/components/downloadbar/DownloadBar";
// import { AppDownloadShowcase } from "@/components/downloadbar/AppDownloadShowcase";
// import Categories from "@/components/categories/Categories";
// import Features from "@/components/features/features";
import { getHomepageData } from "@/modules/homepage/api/get-homepage";

export default async function HomePage() {
    // const { banners, categories, adFeatureSections } = await getHomepageData();

    return (
        <div>
            {/* <HeroSlide data={banners} /> */}
            {/*<DownloadBar />*/}
            {/*<Categories sections={categories} />*/}
            {/*<Features sections={adFeatureSections} />*/}
            {/*<AppDownloadShowcase />*/}
        </div>
    );
}
