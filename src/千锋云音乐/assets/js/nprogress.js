//网页顶部进度条
let num = 0
let over = false
let t= setInterval(function(){     //触发定时器，进度条进度增加
    
    var nprogress = document.querySelector('.nprogress')

    //进度条优化，判断浏览器是否加载完毕
    if(num >= 95 && !over) return
    num ++

    //判断nprogress是否存在
    if(nprogress){
        nprogress.style.width = num + '%'
    }else{
        let nprogress = document.createElement('div')
        nprogress.className = 'nprogress'
        nprogress.style.position = 'fixed'
        nprogress.style.top = 0
        nprogress.style.width = num + '%'
        nprogress.style.height = '3px'
        // nprogress.style.backgroundColor = '#ea1c17'
        // nprogress.style.backgroundColor = 'yellow'
        nprogress.style.backgroundColor = 'gray'
        document.body.appendChild(nprogress)    //追加元素节点

        //‘加载中’圆圈
        let nprogressRadius = document.createElement('div')
        nprogressRadius.className = 'nprogressRadius'
        document.body.appendChild(nprogressRadius)
    }

    //进度100%移除定时器
    if(num >= 100){
        document.body.removeChild(nprogress)
        clearInterval(t)

        document.body.removeChild(document.querySelector('.nprogressRadius'))
    }

},10)


// window.onload = function(){
//     over = true
// }
window.addEventListener('load',function(){
    over = true
})