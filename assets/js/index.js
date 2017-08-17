var index = 0,
    len = $('.lunbo ul li').length,
    timer = 0;

function run() {
    timer = setInterval(function() {
        lun(function() {
            index++;
            if (index > len - 1) {
                index = 0;
            }
        })
    }, 5000);
}
run();

$('.lunbo').mouseover(function() {
    clearInterval(timer);
}).mouseout(function() {
    run();
});

$('.lunbo ol li').mouseover(function() {
    var that = $(this);
    lun(function() {
        index = that.index();
    });
});

function lun(cb) {

    $('.lunbo ul li').eq(index).fadeOut();
    $('.lunbo ol li').eq(index).removeClass('active');

    cb();

    $('.lunbo ul li').eq(index).fadeIn();
    $('.lunbo ol li').eq(index).addClass('active');
}