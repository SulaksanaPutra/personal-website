export interface UsesCategory {
    title: string;
    descriptions: string[];
    groups: {
        label: string;
        items: string[];
    }[];
    glossary: {
        term: string;
        definition: string;
    }[];
}
