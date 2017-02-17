// main screen view
(function () {
    var howToPlayView = {
        name: 'howToPlay',
        images: [],

        imageInit: function () {
            var prefix = 'howToPlay';
            var nameArray = ['board', 'image', 'howToPlay', 'owl', 'owlScreen2'];

            for (var i=0; i<nameArray.length; i++) {
                this.images[nameArray[i]] = new Image();
                this.images[nameArray[i]].src = res[prefix+'_'+nameArray[i]];
            }

            this.imagesInitialized = true;
        },

        render: function(ctx, state) {
            this.imageInit();

            ctx.fillStyle = '#000000';
            ctx.globalAlpha=0.5;
            ctx.fillRect(0,0,1000,1000);
            ctx.globalAlpha=1;


            this.drawImage('board', ctx, {top: 40, left: 8});
            this.drawImage('howToPlay', ctx, {top: 12, left: 282});

            buttonsManager.drawButton('mainMenu', ctx);
            buttonsManager.drawButton('close', ctx);

            if (state == 'first' || !state) {
                this.drawImage('image', ctx, {top: 319, left: 197});
                this.drawImage('owl', ctx, {top: 532, left: 135} );

                ctx.font = '29px calibriz';
                ctx.fillStyle = '#483219';
                ctx.textBaseline = 'top';
                ctx.fillText('The objective is to place the tiles', 300, 183);
                ctx.fillText('to make a word with the highest points', 258, 220);
                ctx.fillText('value and get your score onto the leaderboard', 216, 256);

                ctx.font = '29px calibrib';
                ctx.fillStyle = '#FFFFFF';
                ctx.fillText('Next', 471, 729);

                buttonsManager.drawButton('next', ctx);
            } else if (state == 'second') {
                this.drawImage('owlScreen2', ctx, {top: 520, left: 680} );

                ctx.font = '29px calibriz';
                ctx.fillStyle = '#483219';
                ctx.textBaseline = 'top';
                ctx.fillText(' The board is a 10 by 10 grid. Every time', 258, 184);
                ctx.fillText('you place a correct word or words ', 292, 221);
                ctx.fillText('and hit submit the alphagram resets. ', 281, 257);
                ctx.fillText('The more words you play the more points ', 255, 293);
                ctx.fillText('you gain.', 427, 329);



                ctx.fillText('To gain points you need to increase your', 259, 402);
                ctx.fillText('multiplier by using each alphagram', 293, 438);
                ctx.fillText('to make multiple words. More words', 280, 474);
                ctx.fillText('means a high multiplier which means', 279, 510);
                ctx.fillText('a higher score', 418, 546);


                ctx.font = '29px calibrib';
                ctx.fillStyle = '#FFFFFF';
                ctx.fillText('Back', 471, 729);

                buttonsManager.drawButton('back', ctx);
            }

        },

        drawImage: function (name, ctx, options) {
            var top = (options && options.top)?options.top:0;
            var left = (options && options.left)?options.left:0;

            ctx.drawImage(this.images[name], left,top);
        }
    };

    viewManager.addView(howToPlayView);
})();
