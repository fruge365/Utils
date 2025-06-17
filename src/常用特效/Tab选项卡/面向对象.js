function Tab(el,options = {})      
//el element元素，存放最大的盒模型
//options   选项 后期存一些配置
{
    this.el = document.querySelector(el)
    //实例化对象.最大盒模型 = document.qs(最大盒模型)
    this.init()
    //调用init函数，自身没有就去原型链上找
}

Tab.prototype.init = function(){        //原型对象上追加方法，this指向实例化对象
    this.titleOver();
}

Tab.prototype.titleOver = function(){     //原型上追加方法
    let UlLiObjs= this.el.querySelectorAll('ul li')     //获取自身ul下所有li
     UlLiObjs.forEach((item,i) => {         //遍历伪数组
        item.onmouseover = () => {
            this.el.querySelector('ul li.active').className = ''
            item.className = 'active'
            this.changecontent(i)       //同步内容
        }
     })
}
Tab.prototype.changecontent = function(i){
    this.el.querySelector('ol li.active').className = ''
    this.el.querySelector(`ol li:nth-of-type(${i+1})`).className = 'active'
}

export default Tab      //默认导出