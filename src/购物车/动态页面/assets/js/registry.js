$(function () {
    // 和后端交互 

    // 切换注册方式
    $('.mobileBtn').click(function () {
        $('form').show()
        $(this).parents('form').hide()
    })
})
