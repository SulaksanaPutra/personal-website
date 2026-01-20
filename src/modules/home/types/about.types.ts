import { Link } from '@/core/types/link.types.ts';

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
}
