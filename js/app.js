// let directory = '';
// let baseUrl = './';

let directory = '/tap-tap-stackey/';
let baseUrl = 'https://bernardhistorillo.github.io/tap-tap-stackey/';

var app = new Framework7({
    el: '#app',
    // App Name
    name: 'My App',
    // Enable swipe panel
    panel: {
        swipe: true,
    },
    routes: [
        {
            name: 'home',
            path: directory + '/',
            url: baseUrl + 'pages/home.html',
        },
        {
            name: 'settings',
            path: directory + '/settings',
            url: baseUrl + 'pages/settings.html',
        },
        // {
        //     name: 'news',
        //     path: '/news/',
        //     url: './pages/news.html',
        //     options: {
        //         animate: false,
        //     },
        // },
        // {
        //     name: 'users',
        //     path: '/users/',
        //     componentUrl: './pages/users.html',
        //     options: {
        //         props: {
        //             users: ['John Doe', 'Vladimir Kharlampidi', 'Timo Ernst'],
        //         },
        //     },
        //     on: {
        //         pageAfterIn: function test (e, page) {
        //             // do something after page gets into the view
        //         },
        //         pageInit: function (e, page) {
        //             // do something when page initialized
        //         },
        //     }
        // },
        // Default route, match to all pages (e.g. 404 page)
        {
            path: '(.*)',
            url: './pages/404.html',
        },
    ],
});

var mainView = app.views.create('.view-main');