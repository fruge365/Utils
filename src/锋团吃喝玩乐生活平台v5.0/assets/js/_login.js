$(function () {
    // ### 登录方式切换
    $('form button').click(function (e) {
        // 阻止默认动作
        e.preventDefault()
        // 获取内容
        let data = $(this).text()
        // 匹配内容切换
        let content = {
            账号登录: '.account-login',
            短信登录: '.sms-login',
            扫码登录: '.saoma-login',
        }
        let nowLogin = content[data]
        // 判断避免重复点击影响登录，例如：账号登录页，又点击了账号登录
        // console.log($(this).parent('div').find('p span').text(), data)
        if ($(this).parent('div').find('p span').text() == data) return
        // 切换-判断
        if (nowLogin) {
            // $('section > form').removeClass('animate__animated animate__fadeInRight')
            $('section > form').removeClass('wof-rightInLeft')

            // 切换-全部隐藏
            $('section form > div').hide()
            // 切换-当前显示
            $(nowLogin).show()
            // 切换-加特效
            // $('section > form').addClass('animate__animated animate__fadeInRight')
            $('section > form').addClass('wof-rightInLeft')
        }
    })

    // ### 老人家抖起来
    $('section > img').mouseover(function () {
        $(this).addClass('wof-shake')
    })
    $('section > img').mouseout(function () {
        $(this).removeClass('wof-shake')
    })
})
