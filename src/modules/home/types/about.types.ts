import { Link } from '@/core/types/link.types.ts';
import { GlossaryItem } from '@/core/types/glossary.types';

export interface About {
    intro: string[];
    principles: {
        title: string;
        items: {
            label: string;
            description: string;
        }[];
    };
    links: Link[];
    glossary?: GlossaryItem[];
}
