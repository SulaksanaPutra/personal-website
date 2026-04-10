import { Link } from '@/core/types/link.types';
import { GlossaryItem } from '@/core/types/glossary.types';

export interface Writing {
    id: string;
    title: string;
    subtitle: string;
    thumbnail: string;
    date: string;
    link: Link;
}

export type Writings = Writing[];

export interface WritingArticle {
    id: string;
    backLink: Link;
    title: string;
    subtitle?: string;
    highlight: string;
    thumbnail: string;
    date: string;
    sections: {
        id: string;
        label?: string;
        paragraphs?: string[];
        items?: string[];
        codeBlock?: {
            language: string;
            code: string;
        };
    }[];
    glossary?: GlossaryItem[];
    qnas?: {
        question: string;
        answer: string;
    }[];
}

export type WritingArticles = WritingArticle[];
