import { GlossaryItem } from '@/core/types/glossary.types';

export interface Uses {
    title: string;
    descriptions: string[];
    items: string[];
    glossary?: GlossaryItem[];
}
