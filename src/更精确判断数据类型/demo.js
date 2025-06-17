// 以前
//历史遗留bug
console.log('------以前-------');
console.log(typeof(null));          //Object，其他原始类型都是自身
console.log(typeof(function(){}));      //对象类型function是function其他都是Object

//现在
// 更精准判断数据类型的公式
// Object.prototype.toString.call(要判断的内容)
console.log('------现在-------');
function Type(data){
    var data1 = Object.prototype.toString.call(data)
    console.log('输出结果为：',data1);
    var data2 = data1.slice(8,-1)
    console.log('对输出结果取舍后：',data2);
    console.log('----------');
    // return data1
}
Type(null)          //Null
Type(undefined)     //Undefined
Type(true)          //Boolean 
Type(false)         //Boolean
Type(123)           //Number  
Type('sdsd')        //String
Type('123a')        //String
Type(Symbol())      //Symbol
Type(111n)          //BigInt
Type(function(){})  //Function
Type({})            //Object
Type([])            //Array