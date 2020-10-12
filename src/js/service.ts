// 메인메뉴
function navMain(url: string) {
    const navigation = document.getElementById('navigation')!;
    const route = navigation.querySelectorAll('.route');

    route.forEach( function(items) {
        items.classList.remove('selected');

        if (items.getAttribute('href') === url) {
            items.classList.add('selected');
        }
    })
}

export { navMain };