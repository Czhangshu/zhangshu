$('.jian').click(function() {

    var num = $(this).siblings('.shuliang').val();

    num--;
    if (num < 1) {
        return false;
    }

    $(this).siblings('input').val(num);

    var jiage = $(this).siblings('.two').text();
    console.log(jiage);

    // var sum = num * jiage;

})

$('.jia').click(function() {

    var num = $(this).siblings('input').val();
    num++;
    $(this).siblings('input').val(num);

})