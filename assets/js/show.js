var ul = document.querySelector('.lunbo ul');
var li = document.querySelectorAll('.lunbo ul li');
var num = document.querySelectorAll('.lunbo ol li');
var lunbo = document.querySelector('.lunbo');
var len = li.length;
var index = 0;
var timer = 0;

function run() {
    timer = setInterval(function() {
        num[index].className = '';
        index++;
        console.log(index);
        if (index > len - 1) {
            index = 0;
            ul.style.left = 0;
        } else {
            ul.style.left = index * -663 + 'px';
            num[index].className = 'active';
        }
    }, 2000)
}
run();
lunbo.onmouseover = function() {
    clearInterval(timer);
}
lunbo.onmouseout = function() {
    run();
}
for (var i = 0; i < len; i++) {
    num[i].onmouseover = function() {

        num[index].className = '';

        index = this.getAttribute('data-index');
        ul.style.left = index * -663 + 'px';
        num[index].className = 'active';
    }
}