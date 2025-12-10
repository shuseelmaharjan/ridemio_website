export type UploadedByUser = {
    id: string;
    first_name: string | null;
    last_name: string | null;
    email: string;
    user_type: string;
};

export type UploadedFile = {
    id: string;
    file: string;
    file_type: string;
    is_temporary: boolean;
    uploaded_at: string;
    uploaded_by: UploadedByUser;
};

export type ApiBanner = {
    id: string;
    title: string;
    subtitle: string;
    tagline: string;
    image: UploadedFile | null;
    image_url: string;
    image_base_url: string;
    is_active: boolean;
    created_at: string;
    updated_at: string;
};

export type HomepageCategorySection = {
    id: string;
    title: string;
    description: string;
    icon: UploadedFile | null;
    slug: string;
    is_active: boolean;
    created_at: string;
    updated_at: string;
};

export type AdFeatureSectionLite = {
    id: string;
    title: string;
    description: string;
    text_color: string;
    background_color: string;
    is_active: boolean;
    created_at: string;
    updated_at: string;
};

export type AdFeatureItem = {
    id: string;
    title: string;
    description: string;
    icon: UploadedFile | null;
    button_label: string;
    button_url: string;
    background_color: string;
    ad_feature_section: AdFeatureSectionLite;
    is_active: boolean;
    created_at: string;
    updated_at: string;
};

export type AdFeatureSection = AdFeatureSectionLite & {
    items: AdFeatureItem[];
};

export type HomepageResponse = {
    banners: ApiBanner[];
    homepage_category_sections: HomepageCategorySection[];
    ad_feature_sections: AdFeatureSection[];
};
