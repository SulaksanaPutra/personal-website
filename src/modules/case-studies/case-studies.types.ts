import { Link } from '@/core/types/link.types.ts';
import { DrawerItem } from '@/core/types/drawer.types.ts';
import { GlossaryItem } from '@/core/types/glossary.types';

export interface CaseStudy {
    id: string;
    title: string;
    heading: string;
    highlight: string;
    description: string;
    systemId: string;
    link: Link;
}
export type CaseStudies = CaseStudy[];

export interface CaseStudyArticle {
    id: string;
    backLink: Link;
    title: string;
    heading: string;
    subtitle?: string;
    highlight: string;
    description?: string;
    systemId: string;
    sections: {
        id: string;
        label?: string;
        paragraphs?: string[];
        items?: string[];
    }[];
    glossary?: GlossaryItem[];
}
export type CaseStudyArticles = CaseStudyArticle[];

export interface CaseStudiesDrawerItem extends DrawerItem {
    cases: Link[];
}
export type CaseStudiesDrawer = CaseStudiesDrawerItem[];

export interface CaseStudyArticleDrawerItem extends DrawerItem { }
export type CaseStudyArticleDrawer = CaseStudyArticleDrawerItem[];
