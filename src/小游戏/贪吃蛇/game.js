function Game(ele) {// element 元素/节点
    // 0.保存地图，最大盒子
    this.ele = document.querySelector(ele)
    //1.创建地图
    this.map = new Map(this.ele)    //标签对象传递给Map构造函数，里面设置宽高等
    this.map.create()

    // 2.生成食物
    this.food = new Food(this.ele)   //地图标签对象传递给Map构造函数，后续追加食物
    this.food.create()

    // 3.生成蛇
    this.snake = new Snake(this.ele)
    this.snake.create()
}
Game.prototype.start = function () {
    setInterval(() => {
        //蛇动
        this.snake.move()

        //蛇吃食
        let snakeX = this.snake.snakeObj[0].x * 20
        let snakeY = this.snake.snakeObj[0].y * 20

        //地图最大范围
        // let maxRight = this.snake.snakeObj[39].x*20
        // let maxBottom = this.snake.snakeObj[19].y*20
        // console.log(snakeX,snakeY);

        let foodX = this.food.foodX
        let foodY = this.food.foodY

        if(snakeX == foodX && snakeY == foodY){
            let last = this.snake.snakeObj[this.snake.snakeObj.length-1]

            this.snake.snakeObj.push({
                x:last.x,
                y:last.y,
                color:last.color,
                ele:null
            })
            //重新绘制蛇
            this.snake.create()
            //食物随机生成
            this.food.move()
        }

        //判断是否超出范围
        // if(snakeX >= maxRight || snakeY >= maxBottom){

        //     alert('游戏结束~')
        // }


    }, 150)

    //监控键盘上下左右键，改变蛇的方向direction
    document.addEventListener('keydown', (e) => {
        e = e || window.event
        //上    38
        //下    40
        //左    37
        //右    39

        switch (e.keyCode) {
            case 38:
                this.snake.direction = 'top'
                break;
            case 40:
                this.snake.direction = 'bottom'
                break;
            case 37:
                this.snake.direction = 'left'
                break;
            case 39:
                this.snake.direction = 'right'
                break;
            default:
                break;
        }
    })
}
