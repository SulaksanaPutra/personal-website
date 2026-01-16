import { Link } from '@/types/link.ts';

export interface Systems {
    id: string;
    title: string;
    highlight?: string;
    description: string;
    tags: string[];
    sections: {
        label: string;
        description: string;
    }[];
    link?: Link;
}
