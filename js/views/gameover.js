// main screen view
(function () {
	var gameoverView = {
		name: 'gameover',
		images: [],

		imageInit: function () {
			var prefix = 'gameover';
			var nameArray = ['gameover', 'score', 'stick', 'birdYellow', 'box', 'card', 'board', 'owl', 'over_01', 'over_02', 'over_03', 'over_04', 'over_05', 'over_06', 'over_07', 'over_08', 'over_09', 'over_10'];

			for (var i = 0; i < nameArray.length; i++) {
				this.images[nameArray[i]] = new Image();
				this.images[nameArray[i]].src = res[prefix + '_' + nameArray[i]];
			}

			this.imagesInitialized = true;
		},

		render: function (ctx) {
			this.imageInit();

			ctx.fillStyle = '#000000';
			ctx.globalAlpha = 0.8;
			ctx.fillRect(0, 0, 1000, 1000);
			ctx.globalAlpha = 1;


			//this.drawImage('board', ctx, {top: 190, left: 174});
			this.drawImage('card', ctx, {top: 26, left: 215});
			this.drawImage('box', ctx, {top: 31, left: 534});
			//this.drawImage('gameover', ctx, {top: 246, left: 389});
			//this.drawImage('score', ctx, {top: 339, left: 475});
			this.drawImage('stick', ctx, {top: 779, left: 433});
			this.drawImage('birdYellow', ctx, {top: 578, left: 664});
			//this.drawImage('owl', ctx, {top: 123, left: 204});

			buttonsManager.drawButton('submitScore', ctx);
			buttonsManager.drawButton('gm_mainMenu', ctx);
			buttonsManager.drawButton('retry', ctx);

			ctx.font = '29px calibriz';
			ctx.fillStyle = '#483219';
			ctx.textBaseline = 'top';
			ctx.fillText('Your Score is:', 273, 358);

			ctx.font = '48px calibrib';
			ctx.fillStyle = '#FFED00';
			ctx.fillText(App.score, 576, 348);

			this.drawAnimations();
		},

		drawAnimations: function () {
			var frames = 1;
			var _this = this;
			var ctx = App.anCtx;
			var interval = setInterval(function () {

				var frame = frames < 10 ? '0' + frames : frames;
				ctx.clearRect(0, 0, 1000, 1000);
				_this.drawImage('over_' + frame, ctx, {top: 125, left: 176});


				_this.drawImage('gameover', ctx, {top: 246, left: 389});
				_this.drawImage('score', ctx, {top: 339, left: 475});


				ctx.font = '29px calibriz';
				ctx.fillStyle = '#483219';
				ctx.textBaseline = 'top';
				ctx.fillText('Your Score is:', 273, 358);

				ctx.font = '48px calibrib';
				ctx.fillStyle = '#FFED00';
				ctx.fillText(App.score, 576, 348);

				if (frames == 10) clearInterval(interval);
				frames++;
			}, 60);
		},

		clearAnimation: function () {
			App.anCtx.clearRect(0, 0, 1000, 1000);
		},

		drawImage: function (name, ctx, options) {
			var top = (options && options.top) ? options.top : 0;
			var left = (options && options.left) ? options.left : 0;

			ctx.drawImage(this.images[name], left, top);
		}
	};

	viewManager.addView(gameoverView);
})();
