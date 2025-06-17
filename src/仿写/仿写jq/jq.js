// 构造函数jq
function jq(ele) {
    //获取所有元素，形成伪数组
    let eles = document.querySelectorAll(ele)

    // 遍历
    for (let i = 0; i < eles.length; i++) {
        // this 指向实例化对象
        this[i] = eles[i]
    }
    this.length = eles.length
}

// 追加原型方法
jq.prototype.css = function (cssname, cssvalue) {
    
    // 遍历
    for (let i = 0; i < this.length; i++) {
        this[i].style[cssname] = cssvalue
    }
}
function $(ele) {
    return new jq(ele)
}