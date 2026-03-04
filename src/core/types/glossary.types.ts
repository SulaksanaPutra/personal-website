export interface GlossaryItem {
    term: string;
    definition: string;
}

export type Glossary = Record<string, GlossaryItem>;
