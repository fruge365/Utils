
function Page(el, options = {}) {
    //公共属性
    //this === 实例化对象  ===  构造函数中this
    this.el = document.querySelector(el)

    this.options = options

    //
    this.init()
}


Page.prototype.init = function () {

    // 1.创建分页标签(首页、上一页、下一页、末页)、分页页码(1/2/3/4....)
    this.createTag()
    this.parentTag()
    // 2.绑定点击事件(事件委托，给div盒子绑定)
}


//创建分页标签
Page.prototype.createTag = function(){
    //根据传递的第二个实参 中的 pageTag键
    for(let key in this.options.pageTag){
        // console.log(key,this.options.pageTag[key]);
        let pObj = document.createElement('p')
        pObj.innerText = this.options.pageTag[key]
        if(pObj.innerText){

            pObj.style.border = '1px solid black'
            pObj.style.margin = '0 5px'
            pObj.style.padding = '0 5px'
            pObj.style.display = 'inline-block'
        }
            
        this.el.appendChild(pObj)
    }

    this.createNum()
}

Page.prototype.parentTag = function(){
    this.el.style.display = 'flex'
    this.el.style.justifyContent = 'center'
    this.el.style.alignItems = 'center'
}


Page.prototype.createNum = function(){

    //获取第三个分页标签 
    let box = this.el.querySelector('p:nth-child(3)')
    //for循环创建n（10）个页码
    for(let i = 1;i<11;i++){
        let pObj = document.createElement('p')
        pObj.innerText =i 
        pObj.style.border = 'solid 1px black'
        pObj.style.margin = '0 5px'
        pObj.style.padding = '0 5px'
        pObj.style.display = 'inline-block'

        //追加到第三个p标签中
        box.appendChild(pObj)
    }
}