// 轮播图效果

//定义一个数组,对应属性translateX、scale、z-index
let arr = [
    { x: -64, s: .83, z: 1 },
    { x: 140, s: 1, z: 2 },        //最前面的图片
    { x: 338, s: .83, z: 1 },
    { x: 960, s: .83, z: 1 },
    { x: 960, s: .83, z: 1 },
    { x: 960, s: .83, z: 1 },
    { x: 960, s: .83, z: 1 }
]




function ChangeSwiper() {
    //获取所有图片
    let SwiperObjs = document.querySelectorAll('.swiper .swiper-wrapper .swiper-slide')
    // 遍历
    SwiperObjs.forEach(function (item, i) {
        item.style.transform = `translateX(${arr[i].x}px) scale(${arr[i].s})`
        item.style.zIndex = `${arr[i].z}`
        // console.log('-----');
    })
}
ChangeSwiper()
//下一张图片
//数组后弹与前压,实现图片属性值变化
function next() {
    var temp = arr.pop()
    // console.log(temp);
    arr.unshift(temp)
    ChangeSwiper()
}
//上一张图片
function previous() {
    var temp1 = arr.shift()
    arr.push(temp1)
    ChangeSwiper()
}

//定时器间隔触发轮播特效,每隔1s进行轮播
let t1 = setInterval(function () {
    next()
}, 1000)

//下一张图片
let SwiperNext = document.querySelector('.swiper-next')
let temp1 = null
SwiperNext.onclick = function () {
    if (temp1) clearTimeout(temp1)     //当temp1为真时清除倒计时，即倒计时不会叠加

    next()
    clearInterval(t1)

    temp1 = setTimeout(function () {          //未点击2s后会轮播下一张图片


        t1 = setInterval(function () {
            next()
        }, 1000)
    }, 2000)
}


//上一张图片
let SwiperPrevious = document.querySelector('.swiper-prev')
let temp2 = null
SwiperPrevious.onclick = function () {
    if (temp2) clearTimeout(temp2)      //当temp2为真时清除倒计时，即倒计时不会叠加

    previous()
    clearInterval(t1)
    
    temp2 = setTimeout(function () {

        t1 = setInterval(function () {
            next()
        }, 1000)
    }, 2000)
}


//点击图片实现切换
let SwiperObjs = document.querySelectorAll('.swiper .swiper-wrapper .swiper-slide')
SwiperObjs.forEach(function (item, i) {
    item.onclick = function () {
        var temp = item.style.transform
        if (temp.indexOf('64px') != -1) previous()
        if (temp.indexOf('338px') != -1) next()
    }
})