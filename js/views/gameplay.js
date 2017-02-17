// main screen view
(function () {
    var letterSize = 57;
    var alphabet = 'A B C D E F G H I J K L M N O P Q R S T U V W X Y Z'.split(' ');
    var alphabetCnt = {
        A: 1,
        B: 3,
        C: 3,
        D: 2,
        E: 1,
        F: 4,
        G: 2,
        H: 4,
        I: 1,
        J: 8,
        K: 5,
        L: 1,
        M: 3,
        N: 1,
        O: 1,
        P: 3,
        Q: 10,
        R: 1,
        S: 1,
        T: 1,
        U: 1,
        V: 4,
        W: 4,
        X: 8,
        Y: 4,
        Z: 10,
    };

    var randomCnt = {
        A: 1,
        B: 3,
        C: 3,
        D: 2,
        E: 1,
        F: 4,
        G: 2,
        H: 4,
        I: 1,
        J: 8,
        K: 5,
        L: 1,
        M: 3,
        N: 1,
        O: 1,
        P: 3,
        Q: 20,
        R: 1,
        S: 1,
        T: 1,
        U: 1,
        V: 4,
        W: 4,
        X: 16,
        Y: 8,
        Z: 20,
    };


    var gameplayView = {
        name: 'gameplay',
        images: [],
        lettersOnBoard: [],
        gridStartX: 153,
        gridStartY: 249,
        gridSize: 575,
        cellSize: 57,
        interval: null,
        score: 0,
        mainWord: '',
        definition: '',

        imageInit: function () {
            var prefix = 'gameplay';
            var nameArray = ['sky', 'board', 'cellDark', 'cellWhite', 'definitionIcon', 'leavesBack', 'back', 'garden', 'shrubes', 'stick', 'grass', 'owl', 'leaves', 'birdRed', 'birdYellow', 'score', 'square', 'timeline', 'tree'];

            for (var i = 0; i < nameArray.length; i++) {
                this.images[nameArray[i]] = new Image();
                this.images[nameArray[i]].src = res[prefix + '_' + nameArray[i]];
            }

            this.imagesInitialized = true;
        },

        render: function (ctx) {
            this.imageInit();


            // init only one time per game
            if (!this.initialized) {
                $(document.body).on('mouseup', '#gmCanvas, #animationCanvas', this.mouseUp.bind(this));
                $(document.body).on('mousedown', '#gmCanvas, #animationCanvas', this.mouseDown.bind(this));
                $(document.body).on('mousemove', '#gmCanvas, #animationCanvas', this.mouseMove.bind(this));
                this.initialized = true;
            }

            this.generateMainWord();

            this.drawImage('sky', ctx);
            this.drawImage('back', ctx, {top: 440, left: 0});
            this.drawImage('leavesBack', ctx, {top: 0, left: 67});
            this.drawImage('garden', ctx, {top: 516, left: 0});
            this.drawImage('tree', ctx, {top: 3, left: 32});
            this.drawImage('shrubes', ctx, {top: 837, left: 5});
            this.drawImage('stick', ctx, {top: 966, left: 821});
            this.drawImage('grass', ctx, {top: 969, left: 788});
            this.drawImage('owl', ctx, {top: 9, left: 446});
            this.drawImage('leaves', ctx, {top: 0, left: 362});
            this.drawImage('birdRed', ctx, {top: 91, left: 637});
            this.drawImage('birdYellow', ctx, {top: 80, left: 343});

            this.drawImage('score', ctx, {top: 19, left: 0});
            this.drawImage('board', ctx, {top: 236, left: 141});
            this.drawImage('square', ctx, {top: 867, left: 195});
            //this.drawImage('timeline', ctx, {top: 330, left: 872});
            this.drawImage('definitionIcon', ctx, {top: 952, left: 200});

            this.drawDefinition();

            ctx.font = '48px calibrib';
            ctx.textBaseline = 'top';
            ctx.fillText(App.score, 178, 22);


            ctx.font = '35px bubblegumregular';
            ctx.fillStyle = '#FFEF00';
            ctx.textBaseline = 'top';
            ctx.fillText('SCORE:', 45, 37);

            buttonsManager.drawButton('submit', ctx);
            buttonsManager.drawButton('menu', ctx);
            buttonsManager.drawButton('close', ctx);

            this.startTime(ctx);
            this.generateUserLevelLetters();
        },

        drawDefinition: function () {
            var ctx = App.anCtx;
            ctx.font = '24px calibrib';
            ctx.fillStyle = '#FFFFFF';
            ctx.textBaseline = 'top';
            this.clearDefinition();
            ctx.fillText('Definition: ', 252, 946);
            wrapText(ctx, this.definition, 370, 946, 410, 24);
        },

        clearDefinition: function () {
            App.anCtx.clearRect(200,925, 600, 76);
        },

        destroy: function () {
            clearInterval(this.interval);
            this.lettersOnBoard = [];
            this.letterDragged = -1;
            this.tapped = -1;
            App.gmCtx.clearRect(0, 0, 1000, 1000);
            this.clearDefinition();
        },

        drawImage: function (name, ctx, options) {
            var top = (options && options.top) ? options.top : 0;
            var left = (options && options.left) ? options.left : 0;

            ctx.drawImage(this.images[name], left, top);
        },

        startTime: function (ctx) {
            var tCnt = 0;
            var _this = this;

            this.interval = setInterval(function () {
                tCnt++;
                var height = 461 - 461 * (tCnt / 2000);
                ctx.drawImage(_this.images['tree'], 828, 322, 65, 480, 860, 325, 65, 480);
                ctx.drawImage(_this.images['timeline'], 0, 461 - height, 50, height, 872, 329 + 461 - height, 50, height);
                if (height <= 0) {
                    //time is up!
                    clearInterval(_this.interval);
                    viewManager.switchTo('gameover');
                    console.log('time is up');
                }
            }, 15);
        },

        generateMainWord: function () {
            var word;
            while ((word = kids[Math.floor(Math.random() * kids.length)]).length < 4 || word.w.length > 8 && (word.d && word.d.length > 77)) {}

            this.definition = word.d || '';
            word = word.w.toUpperCase();
            this.mainWord = word;

            var startPosX = this.gridStartX + ~~(5 - word.length / 2) * this.cellSize;
            for (var i = 0; i < word.length; i++) {
                this.addLetter(word[i], startPosX + i * this.cellSize, this.gridStartY + this.cellSize * 4, (i % 2) ? 'cellDark' : 'cellWhite', false);
            }
            this.drawLetters();

            console.info(word, this.definition, word.length);
        },


        //consonants: 'BCDFGHJKLMNPQRSTVWXZ',
        generateUserLevelLetters: function () {
            var vCnt = 0, l, vowels = 'AEIOUY';
            for (var i = 0; i < 7; i++) {
                l = this.randomLetter();
                this.addLetter(l, 237 + i * this.cellSize, 875, (i % 2) ? 'cellDark' : 'cellWhite', true);
                if (vowels.indexOf(l) != -1) vCnt++;

            }
            if (vCnt < 2 || vCnt > 4) {
                this.lettersOnBoard = this.lettersOnBoard.slice(0, -7);
                this.generateUserLevelLetters();
            } else {
                this.reset();
                this.drawLetters();
            }
        },

        needU: false,
        randomLetter: function () {
            var randN = ~~(Math.random()*427);
            if (this.needU) {
                this.needU = false;
                return 'U';
            }

            for (var name in randomCnt) {
                randN -= (21-randomCnt[name]);
                if (randN < 0) {
                    this.needU = name=='Q';
                    return name;
                }
            }
        },

        addLetter: function (letter, x, y, image, draggable) {
            this.lettersOnBoard.push({name: letter, left: x, top: y, cellImage: image, draggable: draggable});
        },

        drawLetters: function (context) {
            var sym;
            var ctx = (context) ? context : App.gmCtx;

            ctx.clearRect(0, 0, 1000, 1000);
            var i = this.lettersOnBoard.length;
            while (i--) {
                sym = this.lettersOnBoard[i];
                this.drawImage(sym.cellImage, ctx, {left: sym.left, top: sym.top});
                ctx.font = '44px calibrib';
                ctx.fillStyle = '#6D0012';
                ctx.fillText(sym.name.toUpperCase(), sym.left + 29 - ctx.measureText(sym.name.toUpperCase()).width / 2, sym.top + 43);
                ctx.font = '16px calibrib';
                ctx.fillText(alphabetCnt[sym.name], sym.left+this.cellSize - 6 - ctx.measureText(alphabetCnt[sym.name]).width, sym.top + 51);
            }
        },

        snapToGrid: function (sym) {
            var goOut = false;
            if (sym.left > this.gridStartX - 28 && sym.left < this.gridStartX + this.gridSize - 28 && sym.top > this.gridStartY - 28 && sym.top < this.gridStartY + this.gridSize - 28) {
                var shiftX = (sym.left - this.gridStartX) % this.cellSize;
                var shiftY = (sym.top - this.gridStartY) % this.cellSize;

                sym.left -= shiftX;
                sym.top -= shiftY;

                sym.left += (shiftX > 28) ? this.cellSize : 0;
                sym.top += (shiftY > 28) ? this.cellSize : 0;
            } else {
                goOut = true;
            }

             var i= this.lettersOnBoard.length;
            while(i--) {
                if ((goOut && this.lettersOnBoard[i] == sym) || this.lettersOnBoard[i] != sym && this.lettersOnBoard[i].left == sym.left && this.lettersOnBoard[i].top == sym.top) {
                    setTimeout((function(dx, dy, frame) {
                        sym.left += dx/10;
                        sym.top += dy/10;
                        this.drawLetters(App.gmCtx);
                        if (frame--) setTimeout(arguments.callee.bind(this, dx, dy, frame), 14);

                    }).bind(this, sym.ix-sym.left, sym.iy-sym.top, 9), 140);

                }
            }
        },

        checkWords: function () {
            var matrix = [[], [], [], [], [], [], [], [], [], []];
            var words = [];
            var word;
            var x, y;
            var correctWords = [];

            var i = this.lettersOnBoard.length;
            while (i--) {
                x = (this.lettersOnBoard[i].left - this.gridStartX) / this.cellSize;
                y = (this.lettersOnBoard[i].top - this.gridStartY) / this.cellSize;
                if (x == Math.round(x) && y == Math.round(y)) {
                    matrix[y][x] = this.lettersOnBoard[i];
                }
            }

            for (y = 0; y < 10; y++) {
                word = '';
                for (x = 0; x < 10; x++) {
                    if (matrix[y][x]) {
                        if (x + 1 < 10 && matrix[y][x + 1]) {
                            word += matrix[y][x].name;
                        } else if (word) {
                            word += matrix[y][x].name ? matrix[y][x].name : '';
                            words.push(word);
                            word = '';
                        }
                    }
                }
            }

            for (x = 0; x < 10; x++) {
                word = '';
                for (y = 0; y < 10; y++) {
                    if (matrix[y][x]) {
                        if (y + 1 < 10 && matrix[y + 1][x]) {
                            word += matrix[y][x].name;
                        } else if (word) {
                            word += matrix[y][x].name ? matrix[y][x].name : '';
                            words.push(word);
                            word = '';
                        }
                    }
                }
            }

            i = words.length;
            while (i--) {
                if (words[i] != this.mainWord) { // don't count main word
                    x = clean.length;
                    while (x--) {
                        if (words[i].toUpperCase() == clean[x].w.toUpperCase()) {
                            correctWords.push(words[i]);
                        }
                    }
                }
            }

            console.info(words);
            console.info(correctWords);

            //countScores
            var levelScore = 0;
            if (words.length-1 == correctWords.length) { // we dont count main word
                i = correctWords.length;
                while (i--) {
                    x = correctWords[i].length;
                    while (x--) {
                        levelScore += alphabetCnt[correctWords[i][x]];
                    }
                }
                return levelScore * correctWords.length;
            } else {
                return 0;
            }
        },

        submit: function () {
            var score = this.checkWords();
            if (score) {
                App.score +=score;
                console.log('levelScore: ' + score + ', gameScore: ' + App.score);

                viewManager.switchTo('congratulations');
            } else {
                console.log('levelScore failed');
                this.reset();
            }
        },

        reset: function () {
            var cnt = 0;
            var i=this.lettersOnBoard.length;
            while (i--) {
                if (this.lettersOnBoard[i].draggable) {
                    this.lettersOnBoard[i].left = 237 + cnt++ * this.cellSize;
                    this.lettersOnBoard[i].top = 875;
                }
            }

            this.drawLetters();
        },

        hardReset: function () {
            this.lettersOnBoard = [];
            this.generateUserLevelLetters();
            this.generateMainWord();
            this.drawDefinition();
        },

        //mouse events
        letterDragged: -1,
        tapped: -1,
        mouseDown: function (e) {
            var x = e.offsetX;
            var y = e.offsetY;
            var sym;

            //conver x and y, if gameView is smaller
            x = 1000/App.$gmCanvas.width() * x;
            y = 1000/App.$gmCanvas.width() * y;
            if (this.tapped != -1 && (device.mobile() || device.tablet())) {
                var sym = this.lettersOnBoard[this.tapped];

                sym.left = x - sym.shiftX;
                sym.top = y - sym.shiftY;

                this.letterDragged = -1;
                this.tapped = -1;

                this.snapToGrid(sym);
                this.drawLetters();

                this.checkWords();
                return;
            }

            for (var i = 0; i < this.lettersOnBoard.length; i++) {
                sym = this.lettersOnBoard[i];
                if (sym.draggable && x > sym.left && x < sym.left + letterSize && y > sym.top && y < sym.top + letterSize) {
                    sym.ix = sym.ix || sym.left;
                    sym.iy = sym.iy || sym.top;

                    //enable shifts
                    sym.shiftX = x - sym.left;
                    sym.shiftY = y - sym.top;

                    if (device.mobile() || device.tablet()) {
                        this.tapped = this.letterDragged;
                    }

                    var p = this.lettersOnBoard[i];
                    this.lettersOnBoard.splice(i, 1);
                    this.lettersOnBoard.splice(0, 0, p);


                    this.letterDragged = 0;

                    return;
                }
            }
            this.letterDragged = -1;
            this.tapped = -1;
        },
        mouseMove: function (e) {
            var x = e.offsetX;
            var y = e.offsetY;

            x = 1000/App.$gmCanvas.width() * x;
            y = 1000/App.$gmCanvas.width() * y;

            if (this.letterDragged != -1) {
                var sym = this.lettersOnBoard[this.letterDragged];

                sym.left = x - sym.shiftX;
                sym.top = y - sym.shiftY;
                this.drawLetters();

                console.log('moved!');
            }
        },
        mouseUp: function (e) {
            if (device.mobile() || device.tablet()) return;

            var x = e.offsetX;
            var y = e.offsetY;

            x = 1000/App.$gmCanvas.width() * x;
            y = 1000/App.$gmCanvas.width() * y;

            if (this.letterDragged != -1) {
                var sym = this.lettersOnBoard[this.letterDragged];

                sym.left = x - sym.shiftX;
                sym.top = y - sym.shiftY;
                this.letterDragged = -1;

                this.snapToGrid(sym);
                this.drawLetters();

                console.log('dropped!');

                this.checkWords();
            }
        }
    };

    viewManager.addView(gameplayView);
})();
