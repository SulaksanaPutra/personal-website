import { DrawerItem } from '@/core/types/drawer.types.ts';
import { Link } from '@/core/types/link.types.ts';
import { GlossaryItem } from '@/core/types/glossary.types';

export interface HomeDrawerItem extends DrawerItem {}
export type HomeDrawer = HomeDrawerItem[];

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

export interface Writing {
    title: string;
    descriptions: string[];
}

export interface Projects {
    title: string;
    descriptions: string[];
}

export interface UsesCategory {
    title: string;
    groups: {
        label: string;
        items: string[];
    }[];
    glossary: {
        term: string;
        definition: string;
    }[];
}

export interface Hobbies {
    title: string;
    descriptions: string[];
}
