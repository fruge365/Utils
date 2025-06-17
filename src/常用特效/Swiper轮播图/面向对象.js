/**
 * 构造函数Tab
 * el，元素element简写   形参
 * options  选项，放一些配置
 */
function Tab(el,options = {}){
    this.el = document.querySelector(el)        //this指向实例化对象
    this.init()
    this.num = 1
    this.t 
}
/**
 * 原型对象中追加init方法
 */
Tab.prototype.init = function(){            
    this.StartLbt()                         //this指向实例化对象，调用StartLbt方法和mouseover方法
    this.mouseover()                        //自身没有到原型对象中找
}
/**
 * 间隔计时器，1s轮播图片
 */
Tab.prototype.StartLbt = function(){        //原型方法中的this指向实例化对象
    this.t = setInterval(() => {            //箭头函数改变this指向，指向实例化对象  
        this.num++
        if(this.num > 6) this.num = 1
        this.el.querySelector('img').src = `./imgs/img${this.num}.jpg`      //拼接字符串改变图片地址
        this.el.querySelector('ul li.active').className = ''
        this.el.querySelectorAll('ul li')[this.num - 1].className = 'active'    //同步分页器
    }, 1000);
}
/**
 * mouseover方法包含鼠标移入和移出事件
 */
Tab.prototype.mouseover = function(){
    let UlLiObjs = this.el.querySelectorAll('ul li')            //获取所有的li形成伪数组
    UlLiObjs.forEach((item,i) => {                              //遍历伪数组，item就是li
        item.addEventListener('mouseover', () => {              //给每个li绑定移入事件
            // 1. 清除定时器
            clearInterval(this.t)
            // 2. 图片改为当前鼠标移入li的
            this.el.querySelector('img').src = `./imgs/img${i+1}.jpg`
            // 3. 同步分页器
            this.num = i+1
            this.el.querySelector('ul li.active').className = ''
            this.el.querySelectorAll('ul li')[this.num - 1].className = 'active'
        })

        // 离开之后启动定时器
        item.addEventListener('mouseout', () => {
            this.StartLbt()
        })
        
    })
}

/**
 * 默认导出
 */
export default Tab     