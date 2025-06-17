//自定义构造函数Map
function Map(ele){
    // 1.保存地图
    this.ele = ele
    // 2.地图宽高
    this.width = 800
    this.height = 400
}
Map.prototype.create = function(){
    //设置div的宽、高、背景、边框

    // this 代表 map构造函数的实例化对象
    //this能够使用map构造函数中的属性   

    this.ele.style.width = this.width + 'px'
    this.ele.style.height = this.height + 'px'
    // this.ele.style.background = 'url(./imgs/bg.png)'
    this.ele.style.background = 'url(./imgs/lbxx.png)'
    this.ele.style.border = '10px groove gray'
    this.ele.style.position = 'relative'
}
