class Enlarge
{
    constructor(el)
    {
        // 1. 保存全局信息
        this.el = document.querySelector(el)
        this.imgObj = this.el.querySelector('.img')
        this.maskObj = this.el.querySelector('.mask')
        this.enlargeObj = this.el.querySelector('.enlarge')
        this.UlLiObjs = this.el.querySelectorAll('ul li')
        // 2. 默认调用
        this.init()
    }
    
    init() {
        // 功能1
        // 功能2
        // 功能3
        // ....
        // 功能n
        this.overOut()
        this.enlargeSetWH()
        this.maskMove()
        this.imgClick()
    }

    enlargeSetBg(left, top)
    {
        // div.enlarge bc left =    (div.enlarge w / div.mask w) *  div.mask left
        let enlargeW = parseFloat(this.getStyle(this.enlargeObj, 'width'))
        let enlargeH = parseFloat(this.getStyle(this.enlargeObj, 'height'))
        // console.log(enlargeW, enlargeH);
        
        let maskW = parseInt(this.getStyle(this.maskObj, 'width'))
        let maskH = parseInt(this.getStyle(this.maskObj, 'height'))

        let x = (enlargeW/maskW) * left
        let y = (enlargeH/maskH) * top

        this.enlargeObj.style.backgroundPosition = `-${x}px -${y}px`
    }

    maskMove() 
    {
        // this enlarge1 / enlarge2
        // 步骤1：给img盒模型绑定鼠标移动事件
        // this.imgObj.onmousemove = function(evt) { // this this.imgObj
        this.imgObj.onmousemove = (evt) => { // this enlarge1 / enlarge2
            // 步骤2；事件处理函数中
            // 2.1 同步mask遮罩框的left和top - 获取事件对象
            let e = evt || window.event
            // 2.2 同步mask遮罩框的left和top - 计算left和top  公式鼠标的pageX - imgObj.offsetLeft  居中
            let left = e.pageX - this.imgObj.parentNode.offsetLeft - this.maskObj.offsetWidth/2
            let top = e.pageY - this.imgObj.parentNode.offsetTop - this.maskObj.offsetHeight/2

            // 2.3 同步mask遮罩框的left和top - 范围判断
            if (left<0) left = 0
            if (top<0) top = 0
            let maxLeft = this.imgObj.offsetWidth - this.maskObj.offsetWidth
            let maxTop = this.imgObj.offsetHeight - this.maskObj.offsetHeight
            if (left>maxLeft) left = maxLeft
            if (top>maxTop) top = maxTop
            // 2.4 同步mask遮罩框的left和top - 设置left和top
            this.maskObj.style.left = left + 'px'
            this.maskObj.style.top = top + 'px'

            // 同步背景移动
            this.enlargeSetBg(left, top)
        }
    }

    getStyle(tagObj, attrName) 
    {
        if (window.getComputedStyle)
        {
            // return window.getComputedStyle(tagObj).attrName
            return window.getComputedStyle(tagObj)[attrName]
        } else {
            // return tagObj.currentStyle.attrName
            return tagObj.currentStyle[attrNamea]  // 当对象的键是变量时，使用数组语法
        }
    }

    enlargeSetWH()
    {
        // div.enlarge w = div.mask w * (div.enlarge background / div.img background )
        // div.enlarge h = div.mask h * (div.enlarge background / div.img background )

        let maskW = parseInt(this.getStyle(this.maskObj, 'width'))
        let maskH = parseInt(this.getStyle(this.maskObj, 'height'))
        // 留心：offsetWidth、offsetHeight不能获取隐藏元素

        let enlarge = this.getStyle(this.enlargeObj, 'background-size')
        let enlargeW = parseInt( enlarge.split(' ')[0])
        let enlargeH = parseInt( enlarge.split(' ')[1])

        let imgW = this.imgObj.clientWidth
        let imgH = this.imgObj.clientWidth

        this.enlargeObj.style.width = maskW * (enlargeW / imgW) + 'px'
        this.enlargeObj.style.height = maskH * (enlargeH / imgH)  + 'px'
    }

    overOut()
    {
        // 左侧图移入
        // 事件处理函数中-遮罩框显示
        // 事件处理函数中-放大镜显示
        this.imgObj.onmouseover = () => this.maskObj.style.display = this.enlargeObj.style.display = 'block'
        this.imgObj.onmouseout = () => this.maskObj.style.display = this.enlargeObj.style.display = 'none'
    }

    //小图切换
    imgClick(){
        this.UlLiObjs.forEach((item,i) => {
            item.onclick = () => {
                this.el.querySelector('ul li.active').className = ''
                this.el.querySelector(`ul li:nth-of-type(${i+1})`).className = 'active'
                this.imgObj.style.background = `url(./imgs/${i+1}.jpg)`
                this.enlargeObj.style.background = `url(./imgs/${i+1}.big.jpg)`
            }
        })
    }
}