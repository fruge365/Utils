/**
 * 面向对象实现等比放大
 */
class BcLarge{
    constructor(el,options = {}){
        this.el = document.querySelector(el)
        this.img = this.el.querySelector('.img')
        this.mask = this.el.querySelector('.mask')
        this.enlarge = this.el.querySelector('.enlarge')

        this.init()
    }
    

    init(){
        this.mouseOut()
        this.mouseOver()
    }

    /**
     * 遮罩框,放大镜的显示与隐藏
     */
    mouseOut(){
        this.img.onmouseover = () => {
            this.mask.style.display = 'block'
            this.enlarge.style.display = 'block'
        }
        this.img.onmouseout  = () =>{
            this.mask.style.display = 'none'
            this.enlarge.style.display = 'none'
        }
    }

    //遮罩框移动
    mouseOver(){
        this.img.onmousemove = (evt) => {
            let e = evt || window.event
            let left = e.pageX - this.img.offsetLeft - this.mask.offsetWidth/2
            let top = e.pageY - this.img.offsetTop -this.mask.offsetHeight/2

            //限制遮罩框X轴最大移动距离
            if(left < 0) left = 0
            let maxLeft = this.img.offsetWidth - this.mask.offsetWidth
            if(left > maxLeft) left = maxLeft
            //限制遮罩框Y轴最大移动距离
            if(top < 0) top = 0
            let maxTop = this.img.offsetHeight - this.mask.offsetHeight
            if(top > maxTop) top = maxTop
            //遮罩框位置
            this.mask.style.left =  left + 'px'
            this.mask.style.top = top + 'px'

            // 放大镜
            this.enlarge.style.backgroundPosition = `-${left*1.911}px -${top*1.911}px`
        }
        
    }

    // //获取非行内样式
    // getStyle(a,b){
    //     if(window.getComputedStyle){
    //         return getComputedStyle(a)[b]
    //     }else{
    //         return a.currentStyle[b]
    //     }
    // }
}
    

//默认导出
export default BcLarge