/**
 * 存cookie数据
 * @param {string} key 键
 * @param {string} val 值
 * @param {number} time 存储时长 
 */
function setCookie(key, val, time = 10) {
    if (typeof val == 'object') val = JSON.stringify(val)

    const d = new Date
    // setTime(毫秒):从1970年1月1日午夜到设置的日期已经走了a毫秒
    // getTime()：获取970年1月1日午夜到exp的毫秒数
    d.setTime(d.getTime() - 8 * 60 * 60 * 1000 + time * 10)
    document.cookie = `${key}=${val}; expires=${d}`
}


/**
 * 删除cookie数据
 * @param {string} key 键
 */
function removeCookie(key) {
    setCookie(key, null, -1)
}


/**
 * 获取cookie数据
 * @param {string} key 键
 * @return 键对应的数据
 */
function getCookie(key) {
    //获取所有cookie,按'; '切割成数组
    let arr = document.cookie.split('; ')
    //遍历数组
    for (let i = 0; i < arr.length; i++) {
        //每个item按'='继续切割
        let temp = arr[i].split('=')
        if (temp[0] === key) {
            return temp[1]
        }
    }
}

