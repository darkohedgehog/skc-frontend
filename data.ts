export type BlogType = {
    id: number;
    documentId: string;
    title: string;
    description: string;
    content: string;
    published: string;
    istaknuto: boolean;
    slug: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    locale: string;
    image?: {
      id: number;
      name: string;
      alternativeText?: string;
      caption?: string;
      url: string;
      formats?: {
        thumbnail?: { url: string };
        small?: { url: string };
        medium?: { url: string };
      };
    };
  };

  export type BlogSlugType = {
    id: number;
    slug: string;
    title: string;
    description: string;
    content: string;
    published: string;
    istaknuto: boolean;
    image?: {
      formats: {
        thumbnail?: { url: string };
        small?: { url: string };
        medium?: { url: string };
      };
      url: string;
    };
    gallery?: Array<{
      formats: {
        thumbnail?: { url: string };
        small?: { url: string };
        medium?: { url: string };
      };
      url: string;
    }>;
    category?: Array<{
      id: number;
      name: string;
      slug: string;
      description: string;
    }>;
    localizations?: Array<{
      id: number;
      title: string;
      description: string;
      content: string;
      slug: string;
      locale: string;
    }>;
  };