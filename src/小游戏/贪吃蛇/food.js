function Food(ele){
    // 1.保存地图对象
    this.ele = ele
    //2.保存食物属性
    this.len = 20
    this.foodObj = null
    this.foodX = 0
    this.foodY = 0
}


Food.prototype.create = function(){
    //行内元素需要宽、高、边距  display
    // 块元素同行展示   float或flex
    //一个元素在另一个元素上面     定位

    //1.创建div标签对象
    let divObj = document.createElement('div')
    // 2.设置样式(w20、h20、background、position:absolute)
    divObj.style.width = this.len + 'px'
    divObj.style.height = this.len + 'px'
    divObj.style.background = 'blue'
    

    divObj.style.position = 'absolute'

    // 单独保存食物对象
    this.foodObj = divObj

    //单独创建move提供食物方法，随机定位
    // 3.在页面中展示
    this.ele.appendChild(divObj)
    // 4.默认移动食物
    this.move()
}

Food.prototype.move = function(){
    //注意，每次打开页面刷新食物位置都会不一样

    let foodXMaxNum = this.ele.clientWidth / this.len - 1//40
    let foodYMaxNum = this.ele.clientHeight / this.len - 1//20
    // 食物位置 min     max
    //          0       40  
    //          0       20
    //随机公式：Math.floor(Math.random()*(max-min+1)+min)
    //  坐标随机
    this.foodX = Math.floor(Math.random()*(foodXMaxNum+1))*this.len
    this.foodY = Math.floor(Math.random()*(foodYMaxNum+1))*this.len

    this.foodObj.style.left = this.foodX + 'px'
    this.foodObj.style.top = this.foodY + 'px'
}