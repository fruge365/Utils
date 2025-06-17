//定义一个函数
function Zw(){
    this.a = 1
    this.b = 2
    this.c = 3
}
//此时Zw()是一个普通函数
// 1.第一种使用方式：当变量赋值用
let data1 = Zw;
console.log(data1);//打印：Zw函数本身
// 2.第二种使用方法：当函数用
let data2 = Zw()
// 相当于
// let data2 = function Zw(){
//     this.a = 1
//     this.b = 2
//     this.c = 3
// }
console.log(data2);//打印:return返回值,默认undefined
// 3.第三种使用方法：new关键词
let data3 = new Zw()
console.log(data3);


//通过_new函数仿写new构造函数
function _new(当前new的构造函数){
    let obj = {}    //定义空对象
    obj.__proto__ = 当前new的构造函数.prototype //空对象原型对象指向当前new构造函数原型
    当前new的构造函数.call(obj)    //改变this指向
    return obj
}
let data4 = _new(Zw)
console.log('通过_new仿写new构造函数:',data4);

