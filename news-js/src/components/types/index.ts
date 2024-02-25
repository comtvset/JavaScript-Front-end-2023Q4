export default interface NewsData {
    author: string | null;
    content: string;
    description: string;
    publishedAt: string;
    source: {
        id: string | null;
        name: string;
    };
    title: string;
    url: string;
    urlToImage: string | null;
}

export default interface SourcesData {
    category: string;
    country: string;
    description: string;
    id: string;
    language: string;
    name: string;
    url: string;
}

interface Article extends NewsData {
    category: string;
    country: string;
    description: string;
    id: string;
    language: string;
    name: string;
    status: string;
    totalResults: number;
    articles: Article[];
    sources: Sources[];
}

export default interface ViewDataArticle {
    articles: Article[];
}

interface Sources extends Article {}

export default interface ViewDataSources {
    sources: Sources[];
}

export type Callback<T> = (data: T | void) => void;
