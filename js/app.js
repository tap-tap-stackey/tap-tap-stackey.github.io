(function(){var n,t,i;t=function(n,t){return window.setTimeout(t,n)},i={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd otransitionend",msTransition:"MSTransitionEnd",transition:"transitionend"},n=function(n,t){var i,o;switch(i="touchstart"===n.type.toLowerCase(),t){case"top":o="pageY";break;case"left":o="pageX"}return i?n.originalEvent.touches[0][o]:n[o]},$(document).on("mousedown touchstart",function(o){var e;return(e=$('<div class="clicker"></div>')).css({left:n(o,"left"),top:n(o,"top")}),$("body").append(e),t(0,function(){return e.on(i[Modernizr.prefixed("transition")],function(){return e.remove()}),e.addClass("is-active")})})}).call(this);

let fullUrl = window.location.href;
let environment = fullUrl.includes("https://") ? "production" : "local";
let directory = (environment === "production") ? '/tap-tap-stackey' : '';
let baseUrl = (environment === "production") ? 'https://bernardhistorillo.github.io/tap-tap-stackey/' : './';

let app;
let introductionSheet;

$(document).ready(function() {
    app = new Framework7({
        el: '#app',
        // App Name
        name: 'My App',
        // Enable swipe panel
        panel: {
            swipe: true,
        },
        sheet: {
            swipeToClose :true,
            closeByBackdropClick : true,
            closeByOutsideClick : true,
            closeOnEscape : true,
            backdrop: true,
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

    let sheetContent = '    <div class="sheet-modal introduction-sheet background-image-cover" style="background-image:url(\'img/bg-3.webp\')">';
    sheetContent += '           <div class="sheet-modal-inner">';
    sheetContent += '               <div class="page-content display-flex flex-direction-column justify-content-space-between" style="padding:14px 12px">';
    sheetContent += '                   <div class="display-flex justify-content-end">';
    sheetContent += '                       <div class="display-flex justify-content-center align-items-center rounded-8 hide-introduction-sheet" style="padding:6px; border:1px solid #ffffff; line-height:0">';
    sheetContent += '                           <i class="f7-icons text-color-white display-block" style="font-size:1.3em; font-weight:800">xmark</i>';
    sheetContent += '                       </div>';
    sheetContent += '                   </div>';
    sheetContent += '                   <div class="display-flex flex-direction-column align-items-center">';
    sheetContent += '                       <div class="text-color-white text-align-center" style="font-size:1.6em; margin-bottom:24px">DESCRIPTION</div>';
    sheetContent += '                       <div class="text-align-center">';
    sheetContent += '                           <button type="button" class="button button-fill bg-color-5 rounded-8 text-color-white hide-introduction-sheet" style="font-size:1.2em; padding:22px 80px; width:initial; margin-bottom:24px">Let\'s Play!</button>';
    sheetContent += '                       </div>';
    sheetContent += '                   </div>';
    sheetContent += '               </div>';
    sheetContent += '           </div>';
    sheetContent += '       </div>';

    introductionSheet = app.sheet.create({
        content: sheetContent,
        on: {
            opened: function () {
                console.log('Sheet opened')
            }
        }
    })

    setTimeout(function () {
        $(".navbar-inner .title").css("left", "0!important");
        introductionSheet.open()
    }, 1000);
});

$(document).on("click", ".hide-introduction-sheet", function () {
    introductionSheet.close()
});

$(document).on("click", ".daily-select", function () {
    $(".daily-select").removeClass("active");
    $(this).addClass("active");
});
