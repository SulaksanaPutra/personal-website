import { Link } from '@/core/types/link.types.ts';
import { DrawerItem } from '@/core/types/drawer.types.ts';

export interface CaseStudy {
    id: string;
    title: string;
    highlight: string;
    description: string;
    link: Link;
}
export type CaseStudies = CaseStudy[];

export interface CaseStudyArticle {
    backLink: Link;
    title: string;
    highlight: string;
    description?: string;
    systemsId: string;
    sections: {
        id: string;
        label: string;
        paragraphs?: string[];
        items?: string[];
    }[];
}
export type CaseStudyArticles = CaseStudyArticle[];

export interface CaseStudiesDrawerItem extends DrawerItem {
    cases: Link[];
}
export type CaseStudiesDrawer = CaseStudiesDrawerItem[];

export interface CaseStudyArticleDrawerItem extends DrawerItem {}
export type CaseStudyArticleDrawer = CaseStudyArticleDrawerItem[];
