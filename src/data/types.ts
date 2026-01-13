export interface Footer {
  copyright: string;
  availability: string;
  email: string;
}

export interface Header {
  searchLinks: {
    label: string;
    url: string;
    description: string;
  }[];
  navLinks: {
    label: string;
    to: string;
    hiddenOnMd: boolean;
  }[];
}

export interface Skills {
  title: string;
  description: string;
}

export interface SkillsDrawer {
  type: string;
  id: string;
  label: string;
  description: string;
  details: {
    label: string;
    text: string;
  }[];
  tags: string[];
}

export interface Contact {
  title: string;
  paragraphs: string[];
  email: string;
}

export interface ContactDrawer {
  type: string;
  id: string;
  label: string;
  description: string;
  details: {
    label: string;
    text: string;
  }[];
  tags: string[];
}

export interface Systems {
  id: string;
  title: string;
  titleHighlight?: string;
  description: string;
  tags: string[];
  sections: {
    label: string;
    content: string;
  }[];
  link?: {
    to: string;
    text: string;
  };
}

export interface SystemsDrawer {
  type: string;
  id: string;
  label: string;
  description: string;
  details: {
    label: string;
    text: string;
  }[];
  tags: string[];
}

export interface CaseStudies {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  link: string;
}

export interface CaseStudiesDrawer {
  type: string;
  id: string;
  label: string;
  description: string;
  details: {
    label: string;
    text: string;
  }[];
  tags: string[];
}

export interface VatChangeCase {
  backLink: {
    to: string;
    text: string;
  };
  header: {
    title: string;
    subtitle: string;
  };
  sections: {
    title: string;
    paragraphs?: string[];
    items?: string[];
  }[];
}

export interface Writing {
  title: string;
  paragraphs: string[];
}

export interface Uses {
  title: string;
  paragraphs: string[];
  items: string[];
}

export interface Projects {
  title: string;
  paragraphs: string[];
}

export interface HomeDrawer {
  type: string;
  to: string;
  label: string;
  description: string;
}
