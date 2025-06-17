/**
 * Json数据格式转普通对象
 * @amoureux555    
 * @returns obj 普通对象
 */
function Jsontrans(str){
    // let str = '{ "name": "Jack", "age": 18, "gender": "男" }'
    str = str.replaceAll(/( |"|{|})/g,'')
    //删除空格、""、{}
    str = str.split(',')
    //将字符串切割成数组，逗号分隔
    let obj = {}
    //定义空对象

    // 遍历数组
    str.forEach( item => {
        let temp = item.split(':')
        //继续切割数组
        let key = temp[0]
        obj[key] = temp[1]
    })
    return obj
}

// 普通对象转Json数据格式
/**
 * 
 * @amoureux555
 * @returns Json数据
 */
function Json(str){
    // let str = {name:'zhangwu',age:22}
    // '{ "name": "Jack", "age": 18, "gender": "男" }'
    let arr = []
    for(let key in str){
    arr.push(`"${key}":${str[key]}`)
    }
    return `'{${arr.join(',')}}'`
}
// console.log(Json({name:'zhangwu',age:22}));