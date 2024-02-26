import News from '../view/news/news';
import { defaultData } from '../action/defaultData';

export function test() {
    const apiUrl = process.env.API_URL;
    const apiKey = process.env.API_KEY;

    const form = document.getElementById('form');
    const search = document.getElementById('search') as HTMLInputElement;

    if (!form) {
        throw new Error();
    }

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        if (!search) {
            throw new Error();
        }

        const searchValue = search.value;

        const searchResults = apiUrl + 'everything?q=' + searchValue + '&apiKey=' + apiKey;
        const result = await getData(searchResults);
        console.log(result);
        const newsInstance = new News();
        newsInstance.draw(result.articles);
    });

    async function getData(server: string) {
        try {
            const response = await fetch(server);

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            return response.json();
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
            throw error;
        }
    }

    const first = new News();
    first.draw(defaultData);
}
