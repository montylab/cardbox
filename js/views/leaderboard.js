// main screen view
(function () {
	var leaderboardView = {
		name: 'leaderboard',
		images: [],

		imageInit: function () {
			var prefix = 'leaderboard';
			var nameArray = ['birdYellow', 'birdRed', 'leaderboard', 'board'];

			for (var i = 0; i < nameArray.length; i++) {
				this.images[nameArray[i]] = new Image();
				this.images[nameArray[i]].src = res[prefix + '_' + nameArray[i]];
			}

			this.imagesInitialized = true;
		},

		render: function (ctx) {
			this.imageInit();

			this.drawImage('board', ctx, {top: 40, left: 8});
			this.drawImage('leaderboard', ctx, {top: 13, left: 268});

			this.drawImage('birdRed', ctx, {top: 189, left: 159});
			this.drawImage('birdYellow', ctx, {top: 850, left: 746});

			buttonsManager.drawButton('close', ctx);
			buttonsManager.drawButton('refreshLeaderboard', ctx);
			buttonsManager.drawButton('mainMenu', ctx);


			// view logic
			ctx.font = '30px calibrib';
			ctx.fillStyle = '#483219';
			ctx.textBaseline = 'top';

			var list = this.getLeaderList();
			for (var i = 0; i < 10; i++) {
				ctx.fillText(list.pop(), 410, 170 + i * 48);
			}

		},

		drawImage: function (name, ctx, options) {
			var top = (options && options.top) ? options.top : 0;
			var left = (options && options.left) ? options.left : 0;

			ctx.drawImage(this.images[name], left, top);
		},

		getLeaderList: function () {
			var list = [];

			for (var i = 0; i < 10; i++) {
				list.push('Unregistered: 0');
			}

			return list;
		}

	};

	viewManager.addView(leaderboardView);
})();
