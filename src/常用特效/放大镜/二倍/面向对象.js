/**
 * 放大镜
 * 面向对象
 */
class BcLarge
{
    //el,element简写，最大盒子
    //options 选项，放一些配置
    constructor(el,options ={})
    {
        this.el = document.querySelector(el)
        // console.log(this.el);
        //多出要用的标签提前获取、定义
        this.img = this.el.querySelector('.img')
        this.mask = this.el.querySelector('.mask')
        this.enlarge = this.el.querySelector('.enlarge')
        
        //调用特效
        this.init()
    }

    init(){
        // console.log('-----');
        this.mouseOut()
        this.mousemove()
    }

    /**
     * 鼠标移入移出，放大镜遮罩框显示与隐藏
     */
    mouseOut(){
        this.img.onmouseover = () => this.mask.style.display = this.enlarge.style.display = 'block'
        this.img.onmouseout = () => this.mask.style.display = this.enlarge.style.display = 'none'
    }
    /**
     * 遮罩框位置移动
     * 同步放大镜
     */
    mousemove(){
            //箭头函数改变this指向
        this.img.onmousemove = (evt) => {
            // 获取事件对象
            let e = evt || window.evt
            let left = e.pageX - this.el.offsetLeft - this.mask.offsetWidth/2
            let top = e.pageY - this.el.offsetTop - this.mask.offsetHeight/2

            //遮罩框限制范围
            if(left < 0) left = 0
            let maxLeft = this.img.offsetWidth - this.mask.offsetWidth
            if(left > maxLeft) left = maxleft
            if(top < 0) top = 0
            let maxTop = this.img.offsetHeight - this.mask.offsetHeight
            if( top > maxTop) top = maxTop

            this.mask.style.left = left + 'px'
            this.mask.style.top = top + 'px'
            this.enlarge.style.backgroundPosition = `-${left*2}px -${top*2}px`



        }
    }
}




//默认导出
export default BcLarge  