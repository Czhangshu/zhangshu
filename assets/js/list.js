$('.rementou').click(function() {
    $(this).next().slideToggle("slow");
})
var index = 0;
$(".xuanze").click(function() {
    index++;
    console.log(index);
    if (index % 2 == 0) {
        $(this).css("background-position", "-180px -150px");
    } else {
        $(this).css("background-position", "-180px -180px");
    }
})