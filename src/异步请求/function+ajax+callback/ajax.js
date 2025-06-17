/**
 * 发送GET请求
 * @param {string} url  '请求地址'
 * @param {object} params  请求参数   将{'参数名'：值,...'参数名'：值} 转化为 格式：'参数名=值&....&参数名=值'
 * @param {function} callback   回调函数(数据操作)
 * @param {string} type  接口数据格式  常用'json' 偶尔'xml'
 * @param {object} headers  自定义请求头   格式: '键'：'值'
 * @return undefined
 */
//封装get方法
function get(url, params = {}, callback, type, headers = {}) {
    //创建ajax对象
    const xhr = new XMLHttpRequest()
    //实时监听状态
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            //判断状态码
            if (xhr.status === 200) {
                let res = xhr.responseText
                //判断数据格式然后进行转换
                if (type === 'json') res = JSON.parse(res)
                callback(res)
            } else {
                console.error(res.status)
            }
        }
    }
    let temp = []
    //遍历参数params，将参数转换成'键'=值格式
    for (let key in params) {
        temp.push(`${key}=${params[key]}`)
    }
    //请求方式、请求地址    &连接符
    xhr.open('get', `${url}?${temp.join('&')}`)
    for (let key in headers) {
        xhr.setRequestHeader(key, headers[key])
    }
    //发送请求
    xhr.send(null)
}

/**
 * 发送POST请求
 * @param {string} url  '请求地址'
 * @param {object} params  请求参数   将{'参数名'：值,...'参数名'：值} 转化为 格式：'参数名=值&....&参数名=值'
 * @param {function} callback   回调函数(数据操作)
 * @param {string} type  接口数据格式  常用'json' 偶尔'xml'
 * @param {object} headers  自定义请求头   格式: '键'：'值'
 * @return undefined
 */
//封装post方法
function post(url, params = {}, callback, type, headers = {}) {
    //创建ajax对象
    const xhr = new XMLHttpRequest()
    //实时监听ajax状态
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            //判断状态码
            if (xhr.status === 200) {
                let res = xhr.responseText
                //判断数据类型是否需要进行转换
                if (type === 'json') res = JSON.parse(res)
                callback(res)
            } else {
                console.error(res.status)
            }
        }
    }
    //请求方式、请求地址
    xhr.open('post', url)

    let temp = []
    //遍历参数params
    for (let key in params) {
        temp.push(`${key}=${params[key]}`)
    }

    //自定义请求头
    // xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded')
    for (let key in headers) {
        xhr.setRequestHeader(key, headers[key])
    }
    
    //发送请求
    xhr.send(temp.join('&'))
}