import { navMain } from "./service";
import { Preloader } from "./preloader";

// const root = document.getElementById('app-root');
const navigation = document.getElementById('navigation')!;

navigation.addEventListener('click', function(e) {

    if (!(e.target as HTMLElement).matches('#navigation > a')) return;
    e.preventDefault();

    let url = (e.target as HTMLElement).getAttribute('href')!;

    // history에 현재 url 등록
    window.history.pushState({ 'url': url }, 'SPA with Typescript', url);

    // router(url);
    navMain(url);
});

const preloader = new Preloader();
preloader.loadImage('img1', './src/img/samp-00.jpg');
preloader.loadImage('img2', './src/img/samp-01.png');

preloader.whileLoading = function () {
    console.log(preloader.completeCount);
}

preloader.whenReady = function () {
    console.log(preloader.completeCount + "/" + preloader.totalCount);
}