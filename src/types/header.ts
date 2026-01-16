import { Link } from '@/types/link.ts';

export interface Header {
    searchLinks: (Link & {
        description: string;
    })[];
    navigations: (Link & {
        hiddenOnMd: boolean;
    })[];
}
