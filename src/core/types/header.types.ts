import { Link } from '@/core/types/link.types.ts';

export interface Header {
    searchLinks: (Link & {
        description: string;
    })[];
    navigations: (Link & {
        hiddenOnMd: boolean;
    })[];
}
