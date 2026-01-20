import { Link } from '@/types/link';

interface BaseDrawerItem {
    id: string;
    label: string;
    description?: string;
    href?: string;
    isActive?: boolean;
}

export interface SystemsDrawerItem extends BaseDrawerItem {}

export interface CaseStudiesDrawerItem extends BaseDrawerItem {
    cases: Link[];
}

export interface ArticleCaseStudyDrawerItem extends BaseDrawerItem {}

export interface HomeDrawerItem extends BaseDrawerItem {}
