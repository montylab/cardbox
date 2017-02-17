var App = {
    $canvas: null,
    ctx: null,
    score: 0,

    init: function () {
        this.$canvas =  $('<canvas id="gameCanvas"></canvas>').appendTo($(document.body));
        this.$gmCanvas =  $('<canvas id="gmCanvas"></canvas>').appendTo($(document.body));
        this.$anCanvas =  $('<canvas id="animationCanvas"></canvas>').appendTo($(document.body));

        this.$canvas[0].width = 1000;
        this.$canvas[0].height = 1000;
        this.ctx = this.$canvas[0].getContext('2d');

        this.$gmCanvas[0].width = 1000;
        this.$gmCanvas[0].height = 1000;
        this.gmCtx = this.$gmCanvas[0].getContext('2d');

        this.$anCanvas[0].width = 1000;
        this.$anCanvas[0].height = 1000;
        this.anCtx = this.$anCanvas[0].getContext('2d');

        buttonsManager.initialize({ctx: this.ctx});

        viewManager.initialize({ctx: this.ctx});
        viewManager.switchTo('main');
        //you can swith to any view for debug;
        //viewManager.switchTo('gameplay');
    }
};

$(function () {
    //App.init();
});


function wrapText(context, text, x, y, maxWidth, lineHeight) {
    var words = text.split(' ');
    var line = '';

    for (var n = 0; n < words.length; n++) {
        var testLine = line + words[n] + ' ';
        var metrics = context.measureText(testLine);
        var testWidth = metrics.width;
        if (testWidth > maxWidth && n > 0) {
            context.fillText(line, x, y);
            line = words[n] + ' ';
            y += lineHeight;
        }
        else {
            line = testLine;
        }
    }
    context.fillText(line, x, y);
}