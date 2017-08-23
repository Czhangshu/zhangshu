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

$('.lunbo').mouseover(function() {
    $('.left').css("display", "block");
    $('.right').css("display", "block");
})

$('.lunbo').mouseout(function() {
    $('.left').css("display", "none");
    $('.right').css("display", "none");
})

$('.left').click(function() {
    lun(function() {
        index--;
        if (index < 0) {
            index = len - 1;
        }
    })
})

$('.right').click(function() {
    lun(function() {
        index++;
        if (index > len - 1) {
            index = 0;
        }
    })
})
window.onload = function() {
    // 1.获取对象
    var li = document.querySelectorAll('.shoufatou li');
    var item = document.querySelectorAll('.shoufaliebiao ul');

    var index = 0;
    li[0].style.color = '#009af3';
    for (var i = 0; i < li.length; i++) {
        li[i].index = i;
        li[i].onmouseover = function() {
            this.style.color = '#009af3';
            item[index].style.display = 'none';

            index = this.index;
            item[index].style.display = 'block';
        }
        li[i].onmouseout = function() {
            this.style.color = '';
        }
    }


    var lunol = document.querySelectorAll('.lunol li');
    var geshou = document.querySelectorAll('.remengeshou>li');

    for (var i = 0; i < lunol.length; i++) {
        lunol[i].index = i;
        lunol[i].onmouseover = function() {
            this.style.background = '#009af3';
            geshou[index].style.display = 'none';

            index = this.index;
            geshou[index].style.display = 'block';
        }
        lunol[i].onmouseout = function() {
            this.style.background = '';
        }
    }

}