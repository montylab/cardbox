var res = {
    main_sky: 'resources/main/sky.png',
    main_back: 'resources/main/back.png',
    main_garden: 'resources/main/garden.png',
    main_shrubes1: 'resources/main/shrubes1.png',
    main_shrubes2: 'resources/main/shrubes2.png',
    main_stick: 'resources/main/stick.png',
    main_grass: 'resources/main/grass.png',
    main_owl: 'resources/main/owl.png',
    main_leaves: 'resources/main/leaves.png',
    main_card: 'resources/main/card.png',
    main_box: 'resources/main/box.png',
    main_birdRed: 'resources/main/birdRed.png',
    main_birdYellow: 'resources/main/birdYellow.png',

    howToPlay_image: 'resources/howToPlay/image.png',
    howToPlay_board: 'resources/howToPlay/board.png',
    howToPlay_howToPlay: 'resources/howToPlay/howToPlay.png',
    howToPlay_owl: 'resources/howToPlay/owl.png',
    howToPlay_owlScreen2: 'resources/howToPlay/owlScreen2.png',

    leaderboard_board: 'resources/leaderboard/board.png',
    leaderboard_leaderboard: 'resources/leaderboard/leaderboard.png',
    leaderboard_birdRed: 'resources/leaderboard/birdRed.png',
    leaderboard_birdYellow: 'resources/leaderboard/birdYellow.png',

    gameplay_birdRed: 'resources/gameplay/birdRed.png',
    gameplay_birdYellow: 'resources/gameplay/birdYellow.png',
    gameplay_score: 'resources/gameplay/score.png',
    gameplay_leaves: 'resources/gameplay/leaves.png',
    gameplay_owl: 'resources/gameplay/owl.png',
    gameplay_timeline: 'resources/gameplay/timeline.png',
    gameplay_tree: 'resources/gameplay/tree.png',
    gameplay_shrubes: 'resources/gameplay/shrubes.png',
    gameplay_grass: 'resources/gameplay/grass.png',
    gameplay_stick: 'resources/gameplay/stick.png',
    gameplay_garden: 'resources/gameplay/garden.png',
    gameplay_sky: 'resources/gameplay/sky.png',
    gameplay_back: 'resources/gameplay/back.png',
    gameplay_square: 'resources/gameplay/square.png',
    gameplay_board: 'resources/gameplay/board.png',
    gameplay_cellWhite: 'resources/gameplay/cellWhite.png',
    gameplay_cellDark: 'resources/gameplay/cellDark.png',
    gameplay_leavesBack: 'resources/gameplay/leavesBack.png',
    gameplay_definitionIcon: 'resources/gameplay/definitionIcon.png',

    congratulations_congratulations: 'resources/congratulations/congratulations.png',
    congratulations_board: 'resources/congratulations/board.png',
    congratulations_stars: 'resources/congratulations/stars.png',
    congratulations_cong_01: 'resources/animation/cong_01.png',
    congratulations_cong_02: 'resources/animation/cong_02.png',
    congratulations_cong_03: 'resources/animation/cong_03.png',
    congratulations_cong_04: 'resources/animation/cong_04.png',
    congratulations_cong_05: 'resources/animation/cong_05.png',
    congratulations_cong_06: 'resources/animation/cong_06.png',
    congratulations_cong_07: 'resources/animation/cong_07.png',
    congratulations_cong_08: 'resources/animation/cong_08.png',
    congratulations_cong_09: 'resources/animation/cong_09.png',
    congratulations_cong_10: 'resources/animation/cong_10.png',

    gameover_gameover: 'resources/gameover/gameover.png',
    gameover_score: 'resources/gameover/score.png',
    gameover_stick: 'resources/gameover/stick.png',
    gameover_birdYellow: 'resources/gameover/birdYellow.png',
    gameover_box: 'resources/gameover/box.png',
    gameover_card: 'resources/gameover/card.png',
    gameover_board: 'resources/gameover/board.png',
    gameover_owl: 'resources/gameover/owl.png',
    gameover_over_01: 'resources/animation/over_01.png',
    gameover_over_02: 'resources/animation/over_02.png',
    gameover_over_03: 'resources/animation/over_03.png',
    gameover_over_04: 'resources/animation/over_04.png',
    gameover_over_05: 'resources/animation/over_05.png',
    gameover_over_06: 'resources/animation/over_06.png',
    gameover_over_07: 'resources/animation/over_07.png',
    gameover_over_08: 'resources/animation/over_08.png',
    gameover_over_09: 'resources/animation/over_09.png',
    gameover_over_10: 'resources/animation/over_10.png',

    button_start: 'resources/button/start.png',
    button_howToPlay: 'resources/button/howToPlay.png',
    button_leaderboard: 'resources/button/leaderboard.png',
    button_mainMenu: 'resources/button/mainMenu.png',
    button_menu: 'resources/button/menu.png',
    button_refreshLeaderboard: 'resources/button/refreshLeaderboard.png',
    button_retry: 'resources/button/retry.png',
    button_submitScore: 'resources/button/submitScore.png',
    button_gm_mainMenu: 'resources/button/gm_mainMenu.png',

    button_close: 'resources/button/close.png',
    button_back: 'resources/button/back.png',
    button_next: 'resources/button/next.png',
    button_submit: 'resources/button/submit.png',
    button_nextWordRack: 'resources/button/nextWordRack.png',
};


$(function () {
    var sources = res;
    loadImages(sources, initGame);  // calls initGame after *all* images have finished loading

    function loadImages(sources, callback) {
        var images = {};
        var loadedImages = 0;
        var numImages = 0;
        for (var src in sources) {
            numImages++;
        }
        for (var src in sources) {
            images[src] = new Image();
            images[src].onload = function(){
                if (++loadedImages >= numImages) {
                    callback(images);
                }

            };
            images[src].src = sources[src];
            $('.preloadHolder').append('<img src="'+images[src].src+'" alt="">');
        }
    }

    function initGame(images) {
        /*if (fontLoaded == 1) {
            App.init();
        }else */
        //setTimeout(App.init, 500);
        App.init();
    }
});
