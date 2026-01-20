import { DrawerItem } from '@/core/types/drawer.types.ts';
import { Link } from '@/core/types/link.types.ts';

export interface System {
    id: string;
    title: string;
    highlight: string;
    tags: string[];
    sections: {
        label: string;
        description: string;
    }[];
    link?: Link;
}

export type Systems = System[];
export interface SystemsDrawerItem extends DrawerItem {}

export type SystemsDrawer = SystemsDrawerItem[];
