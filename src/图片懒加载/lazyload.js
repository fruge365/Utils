/**
 * 图片懒加载
 * @amoureux555 
 * 封装函数 函数名lazyload
 */
    function lazyload() {
    var a = window.innerHeight || document.documentElement.clientHeight
        //a 默认课件视口
    var b = document.documentElement.scrollTop || document.body.scrollTop
        //b 滚动高度
    var showImgHeight = a + b
        //获取总高度 = 默认可见视口 + 滚动高度
    var imgObjs = document.querySelectorAll('img')
    imgObjs.forEach(function(item) {
        if (item.offsetTop <= showImgHeight)
        {
            item.src = item.getAttribute('realsrc') 
                //获取自定义标签： 标签对象.getAttribute(属性名)
        }
    })
}
