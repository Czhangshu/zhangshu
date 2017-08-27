$(".input3").focus(function() {
    $(this).parent().siblings(".shuru").css("display", "block");
})



var input4 = document.querySelector('#input4');
var span = document.querySelector('#shuru1');


input4.onblur = function() {
    var pre = input4.value;
    var reg = /^1[3|4|5|8][0-9]\d{4,8}$/;
    if (pre == "") {
        span.style.display = "none";
    } else if (!reg.test(pre)) {
        console.log(111);
        span.innerHTML = "请输入可用的手机号码";
    } else {
        span.innerHTML = "手机号码可用";
    }
}


var input5 = document.querySelector('#input5');
var span2 = document.querySelector('#shuru2');
input5.onblur = function() {
    var pre1 = input5.value;
    var reg1 = /^[a-zA-Z\d]{6,16}$/;
    if (pre1 == "") {
        span2.style.display = "none";
    } else if (!reg1.test(pre1)) {
        console.log(111);
        span2.innerHTML = "请输入6-16位的数字或字符";
    } else {
        span2.innerHTML = "密码可用";
    }
}

var input6 = document.querySelector('#input6');
var span3 = document.querySelector('#shuru3');
input6.onblur = function() {
    var pre2 = input6.value;
    var reg2 = /^[a-zA-Z\d]{6,16}$/;
    if (pre2 == "") {
        span2.style.display = "none";
    } else if (!reg2.test(pre2)) {
        console.log(111);
        span3.innerHTML = "请输入6-16位的数字或字符";
    } else {
        span3.innerHTML = "密码可用";
    }
}