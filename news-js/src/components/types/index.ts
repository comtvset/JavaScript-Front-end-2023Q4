export default interface NewsData {
    author: string;
    content: string;
    description: string;
    publishedAt: string;
    source: {
        id: string;
        name: string;
    };
    title: string;
    url: string;
    urlToImage: string;
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
