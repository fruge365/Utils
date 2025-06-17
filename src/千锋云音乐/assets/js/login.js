
//显示登录框
//获取【登录/注册】按钮
var loginBtn = document.querySelector('header .member > div')
loginBtn.onclick = function () {
    var loginDialog = document.querySelector('.login')
    loginDialog.style.visibility = 'visible'
}

//登录框位置移动
// 获取登录框
var itemObj = document.querySelector('.item')
var menuObj = document.querySelector('.item .menu')
// 绑定鼠标按下事件
menuObj.onmousedown = function (evt) {
    let oldE = evt || window.event
    //跟随鼠标位置移动
    document.onmousemove = function (evt) {
        let e = evt || window.event         //获取事件对象
        itemObj.style.position = 'absolute'
        //优化，默认鼠标点击位置开始移动
        //边界设置，过滤
        let left = e.pageX - oldE.offsetX
        let maxLeft = (window.innerWidth || document.body.clientWidth) - itemObj.offsetWidth
        let maxTop = (window.innerHeight || document.body.clientHeight) - itemObj.offsetHeight
        if (left < 0) left = 0
        if (left > maxLeft) left = maxLeft
        let top = e.pageY - oldE.offsetY
        if (top < 0) top = 0
        if (top > maxTop) top = maxTop


        itemObj.style.left = left + 'px'
        itemObj.style.top = top + 'px'
    }
    //鼠标按下过程中检测到鼠标抬起跟随鼠标移动取消
    document.onmouseup = function () {
        document.onmousemove = null
    }
}

//关闭登录框
let closeBtn = document.querySelector('.item .form .close .icon-close')
closeBtn.onclick = function () {
    // console.log(11111);
    var loginDialog = document.querySelector('.login')
    loginDialog.style.visibility = 'hidden'     //检测到点击标签，更改login属性为隐藏
}



//短信倒计时
// 获取标签
let capObj = document.querySelector('.item .form .captcha')
//拖拽按钮
let dragBtn = document.querySelector('.captcha .drag .btn')
// 拖拽按钮图片
let dragImg = document.querySelector('.captcha .check img:nth-of-type(2)')
// 绑定点击事件
capObj.onclick = function () {

    // 行为验证码
    document.querySelector('.captcha').style.visibility = 'visible'
    //点击关闭
    document.querySelector('.captcha h2 i').onclick = function () {
        document.querySelector('.captcha').style.visibility = 'hidden'
    }
    //拖拽按钮
    dragBtn.onmousedown = function () {
        document.onmousemove = function (evt) {
            var e = evt || window.event
            // console.log(e.clientX);
            console.log(document.querySelector('.captcha').offsetLeft);
            var left = e.clientX - 570 - dragBtn.offsetWidth / 2
            if (left <= 0) left = 0
            if (left >= 350) left = 350
            dragBtn.style.left = left + 'px'
            dragImg.style.left = left + 'px'
        }
        document.onmouseup = function () {
            document.onmousemove = null

            //判断图片位置，决定是否通过验证
            //260-265通过验证
            // console.log(dragImg.style.left);
            var temp = parseInt(dragImg.style.left)
            if (temp >= 260 && temp <= 265) {
                let num = 60
                capObj.disabled = true      //可以点击
                //倒计时
                t = setInterval(function () {
                    num--
                    capObj.innerText = `${num}秒后重发`
                    //判断、过滤
                    if (num <= 0) {
                        clearInterval(t)        //清除计时器
                        capObj.innerText = `重新发送`
                        num = 60
                        capObj.disabled = false     //无法点击，避免重复点击bug
                        return
                    }
                }, 1000)

                //隐藏行为验证码
                document.querySelector('.captcha').style.visibility = 'hidden'
            }
            //还原到最初状态
            dragBtn.style.left = 0 + 'px'
            dragImg.style.left = 0 + 'px'
        }

    }
    return          //行为验证码通过才能继续进行

}



//登录框表单验证
let subObj = document.querySelector('.item .form .submit')
subObj.onclick = function () {
    let mobObj = document.querySelector('.item .form .mobile').value
    // if(mobObj = '' || mobObj.value.length != 11){

    // }
    //正则判断手机号
    let mobReg = new RegExp(/^1\d{10}$/)
    // let mobReg = new RegExp('^1[3578]\\d{9}$')
    if (mobReg.test(mobObj)) {
        document.querySelector('.item .form .msg').innerText = ''
    } else {
        document.querySelector('.item .form .msg').innerText = '手机号格式错误'
    }
    //判断验证码
    let pasObj = document.querySelector('.item .form .password').value
    let pasReg = new RegExp(/^\d{4}$/)
    if (pasReg.test(pasObj)) {
        // console.log(document.querySelector('.item .form > p:nth-of-type(5)'));
        document.querySelector('.item .form > p:nth-of-type(4)').innerText = ''
    } else {
        document.querySelector('.item .form > p:nth-of-type(4)').innerText = '验证码错误'
    }
}
