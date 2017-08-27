window.onload = function() {
    // 1.获取对象
    var li = document.querySelectorAll('.xuanxiang li');
    var item = document.querySelectorAll('.one>div');

    var index = 0;
    for (var i = 0; i < li.length; i++) {
        li[i].index = i;

        li[i].onclick = function() {
            // 当前的隐藏
            item[index].style.display = 'none';

            // 指定的现实
            index = this.index;
            item[index].style.display = 'block';
        }
    }
}