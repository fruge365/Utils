/**
 * 
 * @param {string} url 
 * @param {object} params 
 * @param {string} type 
 * @param {object} headers 
 */
 function get(url, params, type, headers = {}) {
    const p = new Promise((resolve, reject) => {


        //创建ajax对象
        const xhr = new XMLHttpRequest
        //实时监听状态
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    // let res = JSON.parse(xhr.responseText)
                    let res = xhr.responseText
                    if (type === 'json') res = JSON.parse(res)
                    resolve(res)
                    // console.log(res);
                } else {
                    // console.log(xhr.status);
                    reject(xhr.status)
                }
            }
        }

        //请求方式、请求地址
        let temp = []
        for (let key in params) {
            temp.push(`${key}=${params[key]}`)


        }
        xhr.open('get', `${url}?${temp.join('&')}`)
        //自定义请求头
        // headers{a:1,b:2}
        for (let key in headers) {
            xhr.setRequestHeader(key, headers[key])
        }

        //发送请求
        xhr.send(null)


    })

    return p
}


function post(url, params, type, headers = {}) {
    const p = new Promise((resolve, reject) => {


        //创建ajax对象
        const xhr = new XMLHttpRequest
        //实时监听状态
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    // let res = JSON.parse(xhr.responseText)
                    let res = xhr.responseText
                    if (type === 'json') res = JSON.parse(res)
                    resolve(res)
                    // console.log(res);
                } else {
                    // console.log(xhr.status);
                    reject(xhr.status)
                }
            }
        }

        //请求方式、请求地址
        let temp = []
        for (let key in params) {
            temp.push(`${key}=${params[key]}`)


        }
        xhr.open('post', url)
        //自定义请求头
        // headers{a:1,b:2}
        for (let key in headers) {
            xhr.setRequestHeader(key, headers[key])
        }
        xhr.setRequestHeader('content-type','application/x-www-form-urlencoded')
        //发送请求
        xhr.send(temp.join('&'))


    })

    return p
}

