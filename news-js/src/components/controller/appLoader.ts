import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        const apiUrl = process.env.API_URL;
        if (!apiUrl) {
            throw new Error('Error');
        }
        super(apiUrl, {
            apiKey: process.env.API_KEY,
        });
    }
}

export default AppLoader;
