let $$ = Dom7;

(function() {
    var coords, delay, transitionEndEvents;

    delay = function(ms, fn) {
        return window.setTimeout(fn, ms);
    };

    transitionEndEvents = {
        'WebkitTransition': 'webkitTransitionEnd',
        'MozTransition': 'transitionend',
        'OTransition': 'oTransitionEnd otransitionend',
        'msTransition': 'MSTransitionEnd',
        'transition': 'transitionend'
    };

    coords = function(e, type) {
        var touchEvent, x;
        touchEvent = e.type.toLowerCase() === 'touchstart';
        switch (type) {
            case 'top':
                x = 'pageY';
                break;
            case 'left':
                x = 'pageX';
        }
        if (touchEvent) {
            return e.originalEvent.touches[0][x];
        } else {
            return e[x];
        }
    };

    $(document).on('mousedown touchstart', function(e) {
        var $clicker;
        // create the effect element
        $clicker = $('<div class="clicker"></div>');
        // set element coords
        $clicker.css({
            left: coords(e, 'left'),
            top: coords(e, 'top')
        });
        // add element to DOM
        $('body').append($clicker);
        // window.setTimeout fix for transitions on dynamically
        // created elements
        return delay(0, function() {
            // remove/cleanup effect element from DOM
            // when transition effect has ended
            $clicker.on(transitionEndEvents[Modernizr.prefixed('transition')], function() {
                return $clicker.remove();
            });
            // trigger transition
            return $clicker.addClass('is-active');
        });
    });

    /*
  Q: Why create a new element instead of showing/hiding
     an existing one?
  A: A single element cannot be in two places at once, so
     clicking/tapping in rapid succession would not show
     the effect all of the time. Using multiple elements
     mitigates this, and using JS to create elements allows
     us to bind events for that specific element alone,
     meaning that each element's transitionEnd removal handler
     is completely independent of other elements.
  */
    /*
    Things that can be done to improve this script:

    The effect element uses pointer-events: none
    in the CSS to prevent interference with the
    interactivity of elements behind it.
    pointer-events is not supported in IE10 and below,
    so a technique that forwards mouse events through
    layers or a polyfill will be required for this to work
    perfectly in older browsers.

    Multiple touch events at the same time would be cool.

    jQuery fallbacks for transitions using Modernizr feature
    detection
    */

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiPGFub255bW91cz4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQSxNQUFBLE1BQUEsRUFBQSxLQUFBLEVBQUE7O0VBQUEsS0FBQSxHQUFRLFFBQUEsQ0FBQyxFQUFELEVBQUssRUFBTCxDQUFBO1dBQVksTUFBTSxDQUFDLFVBQVAsQ0FBa0IsRUFBbEIsRUFBc0IsRUFBdEI7RUFBWjs7RUFFUixtQkFBQSxHQUNFO0lBQUEsa0JBQUEsRUFBcUIscUJBQXJCO0lBQ0EsZUFBQSxFQUFxQixlQURyQjtJQUVBLGFBQUEsRUFBcUIsK0JBRnJCO0lBR0EsY0FBQSxFQUFxQixpQkFIckI7SUFJQSxZQUFBLEVBQXFCO0VBSnJCOztFQU1GLE1BQUEsR0FBUyxRQUFBLENBQUMsQ0FBRCxFQUFJLElBQUosQ0FBQTtBQUNULFFBQUEsVUFBQSxFQUFBO0lBQUUsVUFBQSxHQUNFLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBUCxDQUFBLENBQUEsS0FBd0I7QUFDMUIsWUFBTyxJQUFQO0FBQUEsV0FDTyxLQURQO1FBQ2tCLENBQUEsR0FBSTtBQUFmO0FBRFAsV0FFTyxNQUZQO1FBRW1CLENBQUEsR0FBSTtBQUZ2QjtJQUdBLElBQUcsVUFBSDthQUNFLENBQUMsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUQsQ0FBRyxDQUFDLENBQUQsRUFENUI7S0FBQSxNQUFBO2FBRUssQ0FBQyxDQUFDLENBQUQsRUFGTjs7RUFOTzs7RUFVVCxDQUFBLENBQUUsUUFBRixDQUFXLENBQUMsRUFBWixDQUFlLHNCQUFmLEVBQXVDLFFBQUEsQ0FBQyxDQUFELENBQUE7QUFDdkMsUUFBQSxRQUFBOztJQUNFLFFBQUEsR0FBVyxDQUFBLENBQUUsNkJBQUYsRUFEYjs7SUFHRSxRQUNFLENBQUMsR0FESCxDQUNPO01BQUEsSUFBQSxFQUFNLE1BQUEsQ0FBTyxDQUFQLEVBQVUsTUFBVixDQUFOO01BQXlCLEdBQUEsRUFBSyxNQUFBLENBQU8sQ0FBUCxFQUFVLEtBQVY7SUFBOUIsQ0FEUCxFQUhGOztJQU1FLENBQUEsQ0FBRSxNQUFGLENBQVMsQ0FBQyxNQUFWLENBQWlCLFFBQWpCLEVBTkY7OztXQVNFLEtBQUEsQ0FBTSxDQUFOLEVBQVMsUUFBQSxDQUFBLENBQUEsRUFBQTs7O01BR1AsUUFBUSxDQUFDLEVBQVQsQ0FDRSxtQkFBbUIsQ0FBQyxTQUFTLENBQUMsUUFBVixDQUFtQixZQUFuQixDQUFELENBRHJCLEVBRUUsUUFBQSxDQUFBLENBQUE7ZUFBRyxRQUFRLENBQUMsTUFBVCxDQUFBO01BQUgsQ0FGRixFQUZKOzthQU9JLFFBQVEsQ0FBQyxRQUFULENBQWtCLFdBQWxCO0lBUk8sQ0FBVDtFQVZxQyxDQUF2Qzs7RUFuQkE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBIiwic291cmNlc0NvbnRlbnQiOlsiZGVsYXkgPSAobXMsIGZuKSAtPiB3aW5kb3cuc2V0VGltZW91dChmbiwgbXMpXG5cbnRyYW5zaXRpb25FbmRFdmVudHMgPVxuICAnV2Via2l0VHJhbnNpdGlvbicgOiAnd2Via2l0VHJhbnNpdGlvbkVuZCdcbiAgJ01velRyYW5zaXRpb24nICAgIDogJ3RyYW5zaXRpb25lbmQnXG4gICdPVHJhbnNpdGlvbicgICAgICA6ICdvVHJhbnNpdGlvbkVuZCBvdHJhbnNpdGlvbmVuZCdcbiAgJ21zVHJhbnNpdGlvbicgICAgIDogJ01TVHJhbnNpdGlvbkVuZCdcbiAgJ3RyYW5zaXRpb24nICAgICAgIDogJ3RyYW5zaXRpb25lbmQnXG5cbmNvb3JkcyA9IChlLCB0eXBlKSAtPlxuICB0b3VjaEV2ZW50ID1cbiAgICBlLnR5cGUudG9Mb3dlckNhc2UoKSBpcyAndG91Y2hzdGFydCdcbiAgc3dpdGNoIHR5cGVcbiAgICB3aGVuICd0b3AnIHRoZW4geCA9ICdwYWdlWSdcbiAgICB3aGVuICdsZWZ0JyB0aGVuIHggPSAncGFnZVgnXG4gIGlmIHRvdWNoRXZlbnRcbiAgICBlLm9yaWdpbmFsRXZlbnQudG91Y2hlc1swXVt4XVxuICBlbHNlIGVbeF1cbiAgXG4kKGRvY3VtZW50KS5vbiAnbW91c2Vkb3duIHRvdWNoc3RhcnQnLCAoZSkgLT5cbiAgIyBjcmVhdGUgdGhlIGVmZmVjdCBlbGVtZW50XG4gICRjbGlja2VyID0gJCgnPGRpdiBjbGFzcz1cImNsaWNrZXJcIj48L2Rpdj4nKVxuICAjIHNldCBlbGVtZW50IGNvb3Jkc1xuICAkY2xpY2tlclxuICAgIC5jc3MobGVmdDogY29vcmRzKGUsICdsZWZ0JyksIHRvcDogY29vcmRzKGUsICd0b3AnKSlcbiAgIyBhZGQgZWxlbWVudCB0byBET01cbiAgJCgnYm9keScpLmFwcGVuZCgkY2xpY2tlcilcbiAgIyB3aW5kb3cuc2V0VGltZW91dCBmaXggZm9yIHRyYW5zaXRpb25zIG9uIGR5bmFtaWNhbGx5XG4gICMgY3JlYXRlZCBlbGVtZW50c1xuICBkZWxheSAwLCAtPlxuICAgICMgcmVtb3ZlL2NsZWFudXAgZWZmZWN0IGVsZW1lbnQgZnJvbSBET01cbiAgICAjIHdoZW4gdHJhbnNpdGlvbiBlZmZlY3QgaGFzIGVuZGVkXG4gICAgJGNsaWNrZXIub24oXG4gICAgICB0cmFuc2l0aW9uRW5kRXZlbnRzW01vZGVybml6ci5wcmVmaXhlZCgndHJhbnNpdGlvbicpXSxcbiAgICAgIC0+ICRjbGlja2VyLnJlbW92ZSgpXG4gICAgKVxuICAgICMgdHJpZ2dlciB0cmFuc2l0aW9uXG4gICAgJGNsaWNrZXIuYWRkQ2xhc3MoJ2lzLWFjdGl2ZScpXG4gICAgXG4gICMjI1xuICBROiBXaHkgY3JlYXRlIGEgbmV3IGVsZW1lbnQgaW5zdGVhZCBvZiBzaG93aW5nL2hpZGluZ1xuICAgICBhbiBleGlzdGluZyBvbmU/XG4gIEE6IEEgc2luZ2xlIGVsZW1lbnQgY2Fubm90IGJlIGluIHR3byBwbGFjZXMgYXQgb25jZSwgc29cbiAgICAgY2xpY2tpbmcvdGFwcGluZyBpbiByYXBpZCBzdWNjZXNzaW9uIHdvdWxkIG5vdCBzaG93XG4gICAgIHRoZSBlZmZlY3QgYWxsIG9mIHRoZSB0aW1lLiBVc2luZyBtdWx0aXBsZSBlbGVtZW50c1xuICAgICBtaXRpZ2F0ZXMgdGhpcywgYW5kIHVzaW5nIEpTIHRvIGNyZWF0ZSBlbGVtZW50cyBhbGxvd3NcbiAgICAgdXMgdG8gYmluZCBldmVudHMgZm9yIHRoYXQgc3BlY2lmaWMgZWxlbWVudCBhbG9uZSxcbiAgICAgbWVhbmluZyB0aGF0IGVhY2ggZWxlbWVudCdzIHRyYW5zaXRpb25FbmQgcmVtb3ZhbCBoYW5kbGVyXG4gICAgIGlzIGNvbXBsZXRlbHkgaW5kZXBlbmRlbnQgb2Ygb3RoZXIgZWxlbWVudHMuXG4gICMjI1xuICBcbiAgIyMjXG4gIFRoaW5ncyB0aGF0IGNhbiBiZSBkb25lIHRvIGltcHJvdmUgdGhpcyBzY3JpcHQ6XG5cbiAgVGhlIGVmZmVjdCBlbGVtZW50IHVzZXMgcG9pbnRlci1ldmVudHM6IG5vbmVcbiAgaW4gdGhlIENTUyB0byBwcmV2ZW50IGludGVyZmVyZW5jZSB3aXRoIHRoZVxuICBpbnRlcmFjdGl2aXR5IG9mIGVsZW1lbnRzIGJlaGluZCBpdC5cbiAgcG9pbnRlci1ldmVudHMgaXMgbm90IHN1cHBvcnRlZCBpbiBJRTEwIGFuZCBiZWxvdyxcbiAgc28gYSB0ZWNobmlxdWUgdGhhdCBmb3J3YXJkcyBtb3VzZSBldmVudHMgdGhyb3VnaFxuICBsYXllcnMgb3IgYSBwb2x5ZmlsbCB3aWxsIGJlIHJlcXVpcmVkIGZvciB0aGlzIHRvIHdvcmtcbiAgcGVyZmVjdGx5IGluIG9sZGVyIGJyb3dzZXJzLlxuXG4gIE11bHRpcGxlIHRvdWNoIGV2ZW50cyBhdCB0aGUgc2FtZSB0aW1lIHdvdWxkIGJlIGNvb2wuXG5cbiAgalF1ZXJ5IGZhbGxiYWNrcyBmb3IgdHJhbnNpdGlvbnMgdXNpbmcgTW9kZXJuaXpyIGZlYXR1cmVcbiAgZGV0ZWN0aW9uXG4gICMjIyJdfQ==
//# sourceURL=coffeescript
//# sourceURL=pen.js

// let directory = '';
// let baseUrl = './';

let directory = '/tap-tap-stackey';
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

$(document).on("click", ".daily-select", function() {
    $(".daily-select").removeClass("active");
    $(this).addClass("active");
});