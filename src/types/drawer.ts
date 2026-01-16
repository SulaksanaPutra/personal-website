import { Link } from '@/types/link';

type BaseDrawerItem = {
    id: string;
    label: string;
    description?: string;
    href?: string;
    isActive?: boolean;
};

export interface SystemsDrawerItem extends BaseDrawerItem {}

export interface CaseStudiesDrawerItem extends BaseDrawerItem {
    cases: Link[];
}

export interface HomeDrawerItem extends BaseDrawerItem {}
