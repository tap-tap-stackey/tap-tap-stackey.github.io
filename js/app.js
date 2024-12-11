(function(){var n,t,i;t=function(n,t){return window.setTimeout(t,n)},i={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd otransitionend",msTransition:"MSTransitionEnd",transition:"transitionend"},n=function(n,t){var i,o;switch(i="touchstart"===n.type.toLowerCase(),t){case"top":o="pageY";break;case"left":o="pageX"}return i?n.originalEvent.touches[0][o]:n[o]},$(document).on("mousedown touchstart",function(o){var e;return(e=$('<div class="clicker"></div>')).css({left:n(o,"left"),top:n(o,"top")}),$("body").append(e),t(0,function(){return e.on(i[Modernizr.prefixed("transition")],function(){return e.remove()}),e.addClass("is-active")})})}).call(this);

let fullUrl = window.location.href;
let environment = fullUrl.includes("https://") ? "production" : "local";

let app;
let routes = [
    {
        name: 'home',
        path: '/',
        url: './pages/home.html',
    },
    {
        name: 'troop',
        path: '/',
        url: './pages/troop.html',
    },
    {
        name: 'settings',
        path: '/settings',
        url: './pages/settings.html',
    },
    {
        name: 'select-language',
        path: '/settings/select-language',
        url: './pages/select-language.html',
    },
];

$(window).load(function() {
    routes.forEach(async function (route) {
        await $.get(route.url);
    });

    app = new Framework7({
        el: '#app',
        name: 'Tap Tap Stackey',
        panel: {
            swipe: true,
        },
        view: {
            browserHistory: true,
            cache: true,
            xhrCache: true, // Cache XHR requests
        },
        theme: 'md',
        routes: routes,
    });

    let mainView = app.views.create('.view-main');

    // Initialize Sheets
    initializeIntroductionSheet();
    initializeDeleteAccountSheet();
    initializeDailyRewardsSheet();

    setTimeout(function() {
        $("body").css("opacity", "1");

        if(environment === "local") {
            app.tab.show("#tab-tasks", true);
        }

        const swiper = app.swiper.create('.swiper-container', {
            navigation: {
                nextEl: '.custom-swiper-button-next',
                prevEl: '.custom-swiper-button-prev',
            },
            loop: true, // Optional: Enable looping
        });
    }, 500)
});

// Home
let introductionSheet;
let initializeIntroductionSheet = function() {
    let introductionSheetContent = '    <div class="sheet-modal introduction-sheet background-image-cover" style="background-image:url(\'img/bg-3.webp\')">';
    introductionSheetContent += '           <div class="sheet-modal-inner">';
    introductionSheetContent += '               <div class="page-content display-flex flex-direction-column justify-content-space-between" style="padding:14px 12px">';
    introductionSheetContent += '                   <div class="display-flex justify-content-end">';
    introductionSheetContent += '                       <div class="display-flex justify-content-center align-items-center rounded-8 hide-introduction-sheet" style="padding:6px; border:1px solid #ffffff; line-height:0">';
    introductionSheetContent += '                           <i class="f7-icons text-color-white display-block" style="font-size:1.3em; font-weight:800">xmark</i>';
    introductionSheetContent += '                       </div>';
    introductionSheetContent += '                   </div>';
    introductionSheetContent += '                   <div class="display-flex flex-direction-column align-items-center">';
    introductionSheetContent += '                       <div class="text-color-white text-align-center" style="font-size:1.6em; margin-bottom:24px">DESCRIPTION</div>';
    introductionSheetContent += '                       <div class="text-align-center">';
    introductionSheetContent += '                           <button type="button" class="button button-fill bg-color-5 rounded-8 text-color-white hide-introduction-sheet" style="font-size:1.2em; padding:22px 80px; width:initial; margin-bottom:24px">Let\'s Play!</button>';
    introductionSheetContent += '                       </div>';
    introductionSheetContent += '                   </div>';
    introductionSheetContent += '               </div>';
    introductionSheetContent += '           </div>';
    introductionSheetContent += '       </div>';

    introductionSheet = app.sheet.create({
        content: introductionSheetContent
    });

    setTimeout(function () {
        if(environment === "production") {
            introductionSheet.open()
        }
    }, 1000);
};

$(document).on("click", ".hide-introduction-sheet", function () {
    introductionSheet.close()
});

$(document).on("click", ".daily-select", function () {
    $(".daily-select").removeClass("active");
    $(this).addClass("active");
});

// Settings
let deleteAccountSheet;
let initializeDeleteAccountSheet = function() {
    let content = '    <div class="sheet-modal background-image-cover" style="background-image:url(\'img/bg-3.webp\')">';
    content += '           <div class="sheet-modal-inner">';
    content += '               <div class="page-content display-flex flex-direction-column justify-content-space-between" style="padding:14px 12px">';
    content += '                   <div class="display-flex justify-content-end">';
    content += '                       <div class="display-flex justify-content-center align-items-center rounded-8 hide-delete-account-sheet" style="padding:6px; border:1px solid #ffffff; line-height:0">';
    content += '                           <i class="f7-icons text-color-white display-block" style="font-size:1.3em; font-weight:800">xmark</i>';
    content += '                       </div>';
    content += '                   </div>';
    content += '                   <div class="display-flex flex-direction-column align-items-center">';
    content += '                       <div class="text-color-white text-align-center" style="font-size:1.4em; margin-bottom:30px; line-height:1.1em">Are you sure you want<br/> to delete your account?</div>';
    content += '                       <div class="text-align-center" style="margin-bottom:12px">';
    content += '                           <button type="button" class="button button-fill bg-color-5 rounded-8 text-color-white" id="delete-account" style="font-size:1.2em; padding:22px 0; width:210px">Delete Account</button>';
    content += '                       </div>';
    content += '                       <div class="text-align-center">';
    content += '                           <button type="button" class="button button-fill bg-color-5 rounded-8 text-color-white hide-delete-account-sheet" style="font-size:1.2em; padding:22px 0; width:210px; margin-bottom:16px">Cancel</button>';
    content += '                       </div>';
    content += '                   </div>';
    content += '               </div>';
    content += '           </div>';
    content += '       </div>';

    deleteAccountSheet = app.sheet.create({
        content: content
    });
};

$(document).on("click", ".hide-delete-account-sheet", function () {
    deleteAccountSheet.close()
});

$(document).on("click", "#delete-account-confirm", function () {
    deleteAccountSheet.open()
});

$(document).on("click", "#delete-account", function () {
    app.dialog.preloader("Processing", "white");

    setTimeout(function() {
        app.dialog.close();

        app.dialog.alert("You have successfully deleted your account.", "Success!", function() {
            deleteAccountSheet.close();
        });
    }, 2000);
});

// Daily Rewards
let dailyRewardsSheet;
let initializeDailyRewardsSheet = function() {
    let content = '    <div class="sheet-modal background-image-cover" id="daily-rewards-sheet" style="background-image:url(\'img/bg-3.webp\'); height:482px">';
    content += '           <div class="sheet-modal-inner">';
    content += '               <div class="page-content display-flex flex-direction-column justify-content-space-between" style="padding:14px 12px">';
    content += '                   <div class="display-flex justify-content-end">';
    content += '                       <div class="display-flex justify-content-center align-items-center rounded-8 hide-daily-rewards-sheet" style="padding:6px; border:1px solid #ffffff; line-height:0">';
    content += '                           <i class="f7-icons text-color-white display-block" style="font-size:1.3em; font-weight:800">xmark</i>';
    content += '                       </div>';
    content += '                   </div>';
    content += '                   <div class="display-flex flex-direction-column align-items-center">';
    content += '                       <div class="text-color-white text-align-center" style="font-size:1.6em; margin-bottom:30px; line-height:1.1em">Daily Rewards</div>';
    content += '                       <div class="display-flex" style="width:100%; padding:0 30px">';
    content += '                            <div class="" style="padding:5px; width:25%">';
    content += '                                <div class="card rounded-8 no-margin daily-reward-day active" style="height:80px">';
    content += '                                    <div class="card-content card-content-padding rounded-8" style="padding:6px">';
    content += '                                        <div class="text-align-center day-label" style="font-size:1em; margin-bottom:8px">Day 1</div>';
    content += '                                    </div>';
    content += '                                </div>';
    content += '                            </div>';
    content += '                            <div class="" style="padding:5px; width:25%">';
    content += '                                <div class="card rounded-8 no-margin daily-reward-day active" style="height:80px">';
    content += '                                    <div class="card-content card-content-padding rounded-8" style="padding:6px">';
    content += '                                        <div class="text-align-center day-label" style="font-size:1em; margin-bottom:8px">Day 2</div>';
    content += '                                    </div>';
    content += '                                </div>';
    content += '                            </div>';
    content += '                            <div class="" style="padding:5px; width:25%">';
    content += '                                <div class="card rounded-8 no-margin daily-reward-day" style="height:80px">';
    content += '                                    <div class="card-content card-content-padding rounded-8" style="padding:6px">';
    content += '                                        <div class="text-align-center day-label" style="font-size:1em; margin-bottom:8px">Day 3</div>';
    content += '                                    </div>';
    content += '                                </div>';
    content += '                            </div>';
    content += '                            <div class="" style="padding:5px; width:25%">';
    content += '                                <div class="card rounded-8 no-margin daily-reward-day" style="height:80px">';
    content += '                                    <div class="card-content card-content-padding rounded-8" style="padding:6px">';
    content += '                                        <div class="text-align-center day-label" style="font-size:1em; margin-bottom:8px">Day 4</div>';
    content += '                                    </div>';
    content += '                                </div>';
    content += '                            </div>';
    content += '                        </div>';
    content += '                       <div class="display-flex" style="width:100%">';
    content += '                            <div class="" style="padding:5px; width:25%">';
    content += '                                <div class="card rounded-8 no-margin daily-reward-day" style="height:80px">';
    content += '                                    <div class="card-content card-content-padding rounded-8" style="padding:6px">';
    content += '                                        <div class="text-align-center day-label" style="font-size:1em; margin-bottom:8px">Day 5</div>';
    content += '                                    </div>';
    content += '                                </div>';
    content += '                            </div>';
    content += '                            <div class="" style="padding:5px; width:25%">';
    content += '                                <div class="card rounded-8 no-margin daily-reward-day" style="height:80px">';
    content += '                                    <div class="card-content card-content-padding rounded-8" style="padding:6px">';
    content += '                                        <div class="text-align-center day-label" style="font-size:1em; margin-bottom:8px">Day 6</div>';
    content += '                                    </div>';
    content += '                                </div>';
    content += '                            </div>';
    content += '                            <div class="" style="padding:5px; width:25%">';
    content += '                                <div class="card rounded-8 no-margin daily-reward-day" style="height:80px">';
    content += '                                    <div class="card-content card-content-padding rounded-8" style="padding:6px">';
    content += '                                        <div class="text-align-center day-label" style="font-size:1em; margin-bottom:8px">Day 7</div>';
    content += '                                    </div>';
    content += '                                </div>';
    content += '                            </div>';
    content += '                            <div class="" style="padding:5px; width:25%">';
    content += '                                <div class="card rounded-8 no-margin daily-reward-day" style="height:80px">';
    content += '                                    <div class="card-content card-content-padding rounded-8" style="padding:6px">';
    content += '                                        <div class="text-align-center day-label" style="font-size:1em; margin-bottom:8px">Day 8</div>';
    content += '                                    </div>';
    content += '                                </div>';
    content += '                            </div>';
    content += '                        </div>';
    content += '                       <div class="display-flex" style="width:100%">';
    content += '                            <div class="" style="padding:5px; width:25%">';
    content += '                                <div class="card rounded-8 no-margin daily-reward-day" style="height:80px">';
    content += '                                    <div class="card-content card-content-padding rounded-8" style="padding:6px">';
    content += '                                        <div class="text-align-center day-label" style="font-size:1em; margin-bottom:8px">Day 9</div>';
    content += '                                    </div>';
    content += '                                </div>';
    content += '                            </div>';
    content += '                            <div class="" style="padding:5px; width:25%">';
    content += '                                <div class="card rounded-8 no-margin daily-reward-day" style="height:80px">';
    content += '                                    <div class="card-content card-content-padding rounded-8" style="padding:6px">';
    content += '                                        <div class="text-align-center day-label" style="font-size:1em; margin-bottom:8px">Day 10</div>';
    content += '                                    </div>';
    content += '                                </div>';
    content += '                            </div>';
    content += '                            <div class="" style="padding:5px; width:25%; visibility:hidden">';
    content += '                                <div class="card rounded-8 no-margin daily-reward-day" style="height:80px">';
    content += '                                    <div class="card-content card-content-padding rounded-8" style="padding:6px">';
    content += '                                        <div class="text-align-center day-label" style="font-size:1em; margin-bottom:8px">Day 11</div>';
    content += '                                    </div>';
    content += '                                </div>';
    content += '                            </div>';
    content += '                            <div class="" style="padding:5px; width:25%; visibility:hidden">';
    content += '                                <div class="card rounded-8 no-margin daily-reward-day" style="height:80px">';
    content += '                                    <div class="card-content card-content-padding rounded-8" style="padding:6px">';
    content += '                                        <div class="text-align-center day-label" style="font-size:1em; margin-bottom:8px">Day 12</div>';
    content += '                                    </div>';
    content += '                                </div>';
    content += '                            </div>';
    content += '                        </div>';
    content += '                        <div class="text-align-center" style="margin-top:30px; margin-bottom:18px">';
    content += '                            <button type="button" class="button button-fill bg-color-5 rounded-8 text-color-white" style="font-size:1.2em; padding:22px 0; width:210px">Claim</button>';
    content += '                        </div>';
    content += '                    </div>';
    content += '               </div>';
    content += '           </div>';
    content += '       </div>';

    dailyRewardsSheet = app.sheet.create({
        content: content
    });
};

$(document).on("click", "#show-daily-rewards-sheet", function () {
    dailyRewardsSheet.open()
});

$(document).on("click", ".hide-daily-rewards-sheet", function () {
    dailyRewardsSheet.close()
});