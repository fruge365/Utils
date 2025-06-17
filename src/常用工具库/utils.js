/**
 * 日期格式化             
 * @amoureux555 
 * @returns 比较后的时间                             
 */
function dateFormat(date) {
    var d1 = new Date(date)
    var d2 = new Date()
    var seconds = (d2.getTime() - d1.getTime()) / 1000
    var minutes = seconds / 60
    var hours = minutes / 60
    var day = hours / 24
    var result = ''
    if (seconds < 0) {
        result = '还没到该时间点'
    } else if (seconds < 60) {
        result = '刚刚'
    } else if (minutes > 1 && minutes < 60) {
        result = Math.floor(minutes) + '分钟前<br>'
    } else if (hours >= 1 && hours < 24) {
        result = Math.floor(hours) + '小时前<br>'
    } else if (day > 1) {
        result = Math.floor(day) + '天前<br>'
    }

    return result
}

/**
 * 字符串补零（ 数字长度不足2位左侧补充0 )
 * @amoureux555
 * @returns 补充后的数据
 */
function zeroize(data) {
    return String(data).length === 1 ? '0' + data : data
}


/**
 * 快速获取当前时间
 * @amoureux555
 * @returns  当前时间
 */
function format() {
    var d = new Date()
    var y = d.getFullYear()
    var m = d.getMonth() + 1 // 0~11
    var r = d.getDate()
    var h = d.getHours()
    var i = String(d.getMinutes()).padStart(2, 0)
    var s = String(d.getSeconds()).padStart(2, 0)
    var week = d.getDay()
    var weekName = ['星期天', '星期一', '星期二', '星期三', '星期四', '星期五', '星球六']
    var result = y + '年' + m + '月' + r + '日' + ' ' + h + ':' + i + ':' + s + ' ' + weekName[week] + '<br>'

    return result
}

/**
 * 随机颜色
 * @amoureux555
 * @returns 随机16进制颜色代码
 */
function colorRandom() {
    var colorArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F']
    //定义数组colorArr，数组的数据为0-9，A-F  (16进制16位)
    var min = 0
    //定义随机数里的最小值
    var max = colorArr.length - 1
    //定义随机数里的最大值
    //随机数公式    Math.floor( Math.random()*(max-min+1)+min )
    var a = colorArr[Math.floor(Math.random() * (max - min + 1) + min)]
    //第一个随机数a
    var b = colorArr[Math.floor(Math.random() * (max - min + 1) + min)]
    //第二个随机数b...
    var c = colorArr[Math.floor(Math.random() * (max - min + 1) + min)]
    var d = colorArr[Math.floor(Math.random() * (max - min + 1) + min)]
    var e = colorArr[Math.floor(Math.random() * (max - min + 1) + min)]
    var f = colorArr[Math.floor(Math.random() * (max - min + 1) + min)]

    return '#' + a + b + c + d + e + f
}



/**
 * 判断浏览器
 * @returns browserName
 */
function browser() {
    var browserName = ''
    if (navigator.userAgent.indexOf('Edge') !== -1) {
        browserName = 'Edge浏览器';
    } else if (navigator.userAgent.indexOf('Chrome') !== -1) {
        browserName = 'Chrome浏览器';
    } else if (navigator.userAgent.indexOf('Firefox') !== -1) {
        browserName = '火狐浏览器';
    } else if (navigator.userAgent.indexOf('Opera') !== -1) {
        browserName = 'Opera浏览器';
    } else if (navigator.userAgent.indexOf('Safari') !== -1) {
        browserName = 'Safari浏览器';
    } else {
        browserName = '未知浏览器';
    }
    return browserName + '<br>'
}


/**
 * PC还是移动
 * @returns terminal
 */
function isPC() {
    var mobileArr = ['iPhone', 'iPad', 'iPod', 'IOS', 'Android', 'Linux armv8l', 'Linux armv7l', 'Linux aarch64']
    var pcArr = ['Windows', 'Win32', 'Win16', 'WinCE', 'Mac68K', 'MacIntel', 'MacIntel', 'MacPPC', 'Linux mips64']
    var terminal = ''
    mobileArr.forEach(function (item, i) {
        if (navigator.userAgent.indexOf(item) != -1) {
            terminal = '移动端'
            return
        }
    })
    if (terminal == '移动端') {
        return terminal + '<br>'
    } else {
        pcArr.forEach(function (item, i) {
            if (navigator.userAgent.indexOf(item) != -1) {
                terminal = 'PC端'
                return
            }
        })
        return terminal + '<br>'
    }
}

/**
 * 是否微信浏览器
 * @returns String
 */
function IsnotWeChat() {
    var weChat = ''
    var ua = navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        weChat = '是微信浏览器'
    } else {
        weChat = '不是微信浏览器'
    }
    return weChat + '<br>'
}


/**
 * 获取样式
 * @amoureux555 
 * TODO:a:标签对象  b:css属性值
 * return 想要获取的样式
 */
function getStyle(a, b) {
    if (window.getComputedStyle) {
        return getComputedStyle(a)[b]
    } else {
        return a.currentStyle[b]
    }
}

/**
 * 
 * @param {string} key 
 * @returns   object
 */
function getParam(key) {
    //把字符串沿着‘？’分割成数组，弹出后面一个
    let query = key.split('?').pop()
    //数组继续用split方法，分割成新数组
    let vars = query.split("&");
    let obj = {}
    //遍历新数组
    for (let i = 0; i < vars.length; i++) {
        let paramitem = vars[i]
        //把数组里面每个值继续分割成新数组
        let item = paramitem.split('=')
        obj[item[0]] = item[1]
    }
    return obj;
    // console.log(obj);
}