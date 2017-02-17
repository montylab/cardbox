var buttonsManager = {
    buttonsNames: ['start', 'howToPlay', 'leaderboard', 'mainMenu', 'close', 'back', 'next', 'refreshLeaderboard', 'submit', 'menu', 'nextWordRack', 'submitScore', 'retry', 'gm_mainMenu'],
    buttons: {
        start: {
            top: 539,
            left: 353,
            width: 293,
            height: 100,

            action: function () {
                viewManager.switchTo('gameplay');
                viewManager.views.gameplay.hardReset();
                App.score = 0;
            },
            isActive: false
        },
        howToPlay: {
            top: 702,
            left: 353,
            width: 293,
            height: 100,
            action: function () {
                viewManager.switchTo('howToPlay');
            },
            isActive: false
        },
        leaderboard: {
            top: 821,
            left: 353,
            width: 293,
            height: 100,
            action: function () {
                viewManager.switchTo('leaderboard');
            },
            isActive: false
        },
        mainMenu: {
            top: 805,
            left: 353,
            width: 293,
            height: 100,
            action: function () {
                viewManager.switchTo('main');
            },
            isActive: false
        },
        menu: {
            top: 905,
            left: 797,
            width: 293,
            height: 100,
            action: function () {
                viewManager.switchTo('main');
            },
            isActive: false
        },
        submit: {
            top: 825,
            left: 797,
            width: 186,
            height: 66,
            action: function () {
                viewManager.views.gameplay.submit();
                //viewManager.switchTo('congratulations', null, 'second');
            },
            isActive: false
        },
        submitScore: {
            top: 822,
            left: 353,
            width: 293,
            height: 101,
            action: function () {
                viewManager.switchTo('leaderboard', null, 'second');
                viewManager.views.gameover.clearAnimation();
            },
            isActive: false
        },
        gm_mainMenu: {
            top: 702,
            left: 353,
            width: 293,
            height: 100,
            action: function () {
                viewManager.switchTo('main');
                viewManager.views.gameover.clearAnimation();
            },
            isActive: false
        },
        retry: {
            top: 565,
            left: 353,
            width: 293,
            height: 100,
            action: function () {
                viewManager.switchTo('gameplay');
                viewManager.views.gameover.clearAnimation();
                viewManager.views.gameplay.hardReset();
                App.score = 0;
            },
            isActive: false
        },
        nextWordRack: {
            top: 582,
            left: 343,
            width: 329,
            height: 66,
            action: function () {
                viewManager.switchTo('gameplay');
                viewManager.views.congratulations.clearAnimation();
                viewManager.views.gameplay.hardReset();

            },
            isActive: false
        },
        refreshLeaderboard: {
            top: 699,
            left: 353,
            width: 293,
            height: 100,
            action: function () {
                // transfer action into view
                // viewManager.switchTo('main');
            },
            isActive: false
        },
        close: {
            top: 26,
            left: 890,
            width: 69,
            height: 67,
            action: function () {
                //todo implement back logic
                viewManager.switchTo('main');
            },
            isActive: false
        },
        back: {
            top: 719,
            left: 353,
            width: 59,
            height: 57,
            action: function () {
                viewManager.switchTo('howToPlay', null, 'first');
            },
            isActive: false
        },
        next: {
            top: 719,
            left: 588,
            width: 58,
            height: 57,
            action: function () {
                viewManager.switchTo('howToPlay', null, 'second');
            },
            isActive: false
        },
    },
    images: [],
    activeButtons: [],
    mainCtx: null,

    initialize: function (options) {
        this.mainCtx = options.ctx;
        this.buttonsInit();

        //mouse events
        $(document.body).on('mousemove', '#gameCanvas, #gmCanvas, #animationCanvas', this.mouseHover.bind(this));
        $(document.body).on('click', '#gameCanvas, #gmCanvas, #animationCanvas', this.mouseClick.bind(this));
    },

    buttonsInit: function () {
        var prefix = 'button';

        for (var i=0; i<this.buttonsNames.length; i++) {
            this.images[this.buttonsNames[i]] = new Image();
            this.images[this.buttonsNames[i]].src = res[prefix+'_'+this.buttonsNames[i]];
            //console.log(this.buttonsNames[i]);
        }


        this.imagesInitialized = true;
    },

    drawButton: function (name, ctx, options) {
        var top = (options && options.top)?options.top:this.buttons[name].top;
        var left = (options && options.left)?options.left:this.buttons[name].left;

        this.buttons[name].isActive = true;
        ctx.drawImage(this.images[name], left,top);
    },

    mouseHover: function (e) {
        var btn;
        var x = e.offsetX;
        var y = e.offsetY;

        x = 1000/App.$gmCanvas.width() * x;
        y = 1000/App.$gmCanvas.width() * y;

        for (var i=0; i<this.buttonsNames.length; i++) {
            btn = this.buttons[this.buttonsNames[i]];
            if (btn.isActive && x > btn.left && x < btn.left+btn.width && y > btn.top && y < btn.top+btn.height) {
                //console.log(this.buttonsNames[i]);
                // inside the buttonName!
                $('#gameCanvas, #gmCanvas, #animationCanvas').css('cursor', 'pointer');
                return;
            }
            $('#gameCanvas, #gmCanvas, #animationCanvas').css('cursor', 'default');
        }
    },

    mouseClick: function (e) {
        var btn;
        var x = e.offsetX;
        var y = e.offsetY;

        //if ((e.pageX - App.$canvas.offset().left) == e.offsetX) {
        //    //console.log('px + offset: ' + ((e.pageX - App.$canvas.offset().left) == e.offsetX));
        //    x = e.pageX - App.$canvas.offset().left;
        //    x = e.pageY - App.$canvas.offset().top;
        //}
        //
        //alert(App.$gmCanvas.width());
        //alert(x);

        x = 1000/App.$gmCanvas.width() * x;
        y = 1000/App.$gmCanvas.width() * y;

        for (var i=0; i<this.buttonsNames.length; i++) {
            btn = this.buttons[this.buttonsNames[i]];
            if (btn.isActive && x > btn.left && x < btn.left+btn.width && y > btn.top && y < btn.top+btn.height) {
                console.log('click on: '+this.buttonsNames[i]);
                btn.action();
                // inside the buttonName!
                return;
            }
        }
    },

    disableButtons: function () {
        for (var i=0; i<this.buttonsNames.length; i++) {
            this.buttons[this.buttonsNames[i]].isActive = false;
        }
    }
};