(function(){var n,t,i;t=function(n,t){return window.setTimeout(t,n)},i={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd otransitionend",msTransition:"MSTransitionEnd",transition:"transitionend"},n=function(n,t){var i,o;switch(i="touchstart"===n.type.toLowerCase(),t){case"top":o="pageY";break;case"left":o="pageX"}return i?n.originalEvent.touches[0][o]:n[o]},$(document).on("mousedown touchstart",function(o){var e;return(e=$('<div class="clicker"></div>')).css({left:n(o,"left"),top:n(o,"top")}),$("body").append(e),t(0,function(){return e.on(i[Modernizr.prefixed("transition")],function(){return e.remove()}),e.addClass("is-active")})})}).call(this);

let fullUrl = window.location.href;
let environment = fullUrl.includes("https://") ? "production" : "local";
let directory = (environment === "production") ? '/tap-tap-stackey' : '';
let baseUrl = (environment === "production") ? 'https://bernardhistorillo.github.io/tap-tap-stackey/' : './';

let app;

$(document).ready(function() {
    app = new Framework7({
        el: '#app',
        name: 'Tap Tap Stackey',
        panel: {
            swipe: true,
        },
        view: {
            browserHistory: true
        },
        theme: 'md',
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
            {
                name: 'select-language',
                path: directory + '/select-language',
                url: baseUrl + 'pages/select-language.html',
            },
            {
                path: '(.*)',
                url: './pages/404.html',
            },
        ],
    });

    app.views.create('.view-main');

    // Initialize Sheets
    initializeIntroductionSheet();
    initializeDeleteAccountSheet();
    initializeDailyRewardsSheet();
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
    let content = '    <div class="sheet-modal background-image-cover" style="background-image:url(\'img/bg-3.webp\')">';
    content += '           <div class="sheet-modal-inner">';
    content += '               <div class="page-content display-flex flex-direction-column justify-content-space-between" style="padding:14px 12px">';
    content += '                   <div class="display-flex justify-content-end">';
    content += '                       <div class="display-flex justify-content-center align-items-center rounded-8 hide-daily-rewards-sheet" style="padding:6px; border:1px solid #ffffff; line-height:0">';
    content += '                           <i class="f7-icons text-color-white display-block" style="font-size:1.3em; font-weight:800">xmark</i>';
    content += '                       </div>';
    content += '                   </div>';
    content += '                   <div class="display-flex flex-direction-column align-items-center">';
    content += '                       <div class="text-color-white text-align-center" style="font-size:1.4em; margin-bottom:30px; line-height:1.1em">Daily Rewards</div>';
    content += '                       <div class="display-flex" style="margin:-2px">';
    content += '                            <div class="" style="padding:2px; width:33.33333%">';
    content += '                                <div class="card bg-color-7 rounded-8 no-margin" style="border:1px solid white; height:55.8px">';
    content += '                                    <div class="card-content card-content-padding rounded-8" style="padding:6px">';
    content += '                                        <div class="text-color-white" style="font-size:0.8em; margin-bottom:8px">Amateur&nbsp;<span class="text-color-3">1/11</span></div>';
    content += '                                            <div style="padding:0 4px">';
    content += '                                                <div class="bg-color-1" style="margin-bottom:4px; border-radius:7px; width:calc(100% - 4px); padding:2px">';
    content += '                                                    <div class="bg-color-6" style="height:10px; width:60%; border-radius:5px"></div>';
    content += '                                                </div>';
    content += '                                            </div>';
    content += '                                        </div>';
    content += '                                    </div>';
    content += '                                </div>';
    content += '                                <div class="text-align-center" style="margin-bottom:12px">';
    content += '                                    <button type="button" class="button button-fill bg-color-5 rounded-8 text-color-white" style="font-size:1.2em; padding:22px 0; width:210px">Claim</button>';
    content += '                                </div>';
    content += '                            </div>';
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