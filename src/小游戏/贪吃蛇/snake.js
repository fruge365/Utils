function Snake(ele) {
    // 保存地图对象
    this.ele = ele
    //蛇长度
    this.len = 20

    this.snakeObj = [
        { x: 3, y: 2, color: 'red', ele: null }, //蛇头
        { x: 2, y: 2, color: 'black', ele: null },   //蛇身
        { x: 1, y: 2, color: 'black', ele: null }    //蛇身
    ]

    this.direction = 'right'
}
Snake.prototype.remove = function () {
    //父.removeChild(子)
    //this.ele.removeChild(子)
    //移除{x:3,y:2,color:'red',ele:null}中的ele
    for (let i = 0; i < this.snakeObj.length; i++) {
        // 单独保存蛇节对象
        // this.snakeObj[i].ele
        if (this.snakeObj[i].ele) {
            this.ele.removeChild(this.snakeObj[i].ele)
        }

    }
}
Snake.prototype.create = function () {
    // 从地图上清除蛇
    this.remove()
    //循环遍历创建蛇
    for (let i = 0; i < this.snakeObj.length; i++) {
        // 1.设置蛇标签对象
        let divObj = document.createElement('div')
        // 2.设置宽高、坐标、颜色
        divObj.style.width = this.len + 'px'
        divObj.style.height = this.len + 'px'
        divObj.style.position = 'absolute'
        divObj.style.left = this.snakeObj[i].x * this.len + 'px'
        divObj.style.top = this.snakeObj[i].y * this.len + 'px'
        divObj.style.background = this.snakeObj[i].color

        // 单独保存蛇节对象
        this.snakeObj[i].ele = divObj
        // 3.放到页面
        this.ele.appendChild(divObj)
    }
}

Snake.prototype.move = function () {

    //蛇头  上  y-1
    //蛇头  下  y+1
    //蛇头  左  x-1
    //蛇头  右  x+1

    //构造函数中蛇的X坐标+1
    // for(let i = 0;i<this.snakeObj.length;i++){
    //     this.snakeObj[i].x += 1
    // }

    for (let i = this.snakeObj.length - 1; i > 0; i--) {
        this.snakeObj[i].x = this.snakeObj[i - 1].x
        this.snakeObj[i].y = this.snakeObj[i - 1].y
    }

    switch (this.direction) {
        case 'top':
            this.snakeObj[0].y -= 1
            break;
        case 'bottom':
            this.snakeObj[0].y += 1
            break;
        case 'left':
            this.snakeObj[0].x -= 1
            break;
        case 'right':
            this.snakeObj[0].x += 1
            break;
    }

    this.create()
}