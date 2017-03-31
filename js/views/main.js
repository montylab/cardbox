// main screen view
(function () {
	var mainView = {
		name: 'main',
		images: [],

		imageInit: function () {
			var prefix = 'main';
			var nameArray = ['sky', 'back', 'garden', 'shrubes1', 'shrubes2', 'stick', 'grass', 'owl', 'leaves', 'card', 'box', 'birdRed', 'birdYellow'];

			for (var i = 0; i < nameArray.length; i++) {
				this.images[nameArray[i]] = new Image();
				this.images[nameArray[i]].src = res[prefix + '_' + nameArray[i]];
			}

			this.imagesInitialized = true;
		},

		render: function (ctx) {
			this.imageInit();


			this.drawImage('sky', ctx);
			this.drawImage('back', ctx, {top: 440, left: 0});
			this.drawImage('garden', ctx, {top: 534, left: 0});
			this.drawImage('shrubes1', ctx, {top: 776, left: -1});
			this.drawImage('shrubes2', ctx, {top: 698, left: 574});
			this.drawImage('stick', ctx, {top: 779, left: 433});
			this.drawImage('grass', ctx, {top: 944, left: 500});
			this.drawImage('owl', ctx, {top: 54, left: 347});
			this.drawImage('leaves', ctx, {top: 370, left: 242});
			this.drawImage('card', ctx, {top: 202, left: 256});
			this.drawImage('box', ctx, {top: 345, left: 312});
			this.drawImage('birdRed', ctx, {top: 129, left: 304});
			this.drawImage('birdYellow', ctx, {top: 128, left: 619});

			buttonsManager.drawButton('start', ctx);
			buttonsManager.drawButton('howToPlay', ctx);
			buttonsManager.drawButton('leaderboard', ctx);
		},

		drawImage: function (name, ctx, options) {
			var top = (options && options.top) ? options.top : 0;
			var left = (options && options.left) ? options.left : 0;

			ctx.drawImage(this.images[name], left, top);
		}


	};

	viewManager.addView(mainView);
})();
