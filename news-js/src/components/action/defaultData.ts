import NewsData from '../types/index';
import { formattedDate } from '../action/createDate';

export const defaultData: NewsData[] = [
    {
        author: 'RS School',
        content: 'Content',
        description:
            'RS School is free-of-charge and community-based education program conducted by The Rolling Scopes developer community since 2013.',
        publishedAt: `${formattedDate()}`,
        source: { id: '0', name: 'www.rs.school' },
        title: 'RS School',
        url: 'https://rs.school/',
        urlToImage: 'https://rs.school/images/rs_school.svg',
        category: 'Education',
        country: 'All the around the world',
        id: '1',
        language: 'en',
        name: 'Breaking News',
        articles: [],
        sources: [],
    },
    {
        author: 'The Rolling Scopes',
        content: 'Content',
        description:
            'This is not just another community of developers, this is something more. For years we have been organizing meetups and conferences, where you can always learn something new, share your knowledge, discover new technologies, meet old and find new friends. Web-related technologies stack is so broad that it is impossible to enumerate all the topics that have been covered at our events: JavaScript, HTML, CSS, Node, UX, UI, Testing, VR, React ... Each time our events take place in a different city, so that makes it hard to say where the next one will take place.',
        publishedAt: `${formattedDate()}`,
        source: { id: '0', name: 'www.rollingscopes.com' },
        title: 'The Rolling Scopes',
        url: 'https://rollingscopes.com/',
        urlToImage: 'https://rollingscopes.com/images/logo_rs2.svg',
        category: 'Education',
        country: 'All the around the world',
        id: '1',
        language: 'en',
        name: 'Breaking News',
        articles: [],
        sources: [],
    },
];
