import { Link } from '@/types/link.ts';

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
