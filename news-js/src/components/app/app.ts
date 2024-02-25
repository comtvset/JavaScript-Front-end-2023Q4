import AppController from '../controller/controller';
import { AppView } from '../view/appView';
import ViewDataArticle from '../types/index';
import ViewDataSources from '../types/index';

class App {
    private controller: AppController;
    private view: AppView;

    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    start() {
        const source = document.querySelector('.sources');

        if (source) {
            source.addEventListener('click', (e) => {
                if (e instanceof MouseEvent) {
                    this.controller.getNews(e, (data) => {
                        this.view.drawNews(<ViewDataArticle>data);
                        // console.log('News data:', data);
                    });
                }
            });
        }

        this.controller.getSources((data) => {
            this.view.drawSources(<ViewDataSources>data);
            // console.log('Sources data:', data);
        });
    }
}

export default App;
