;(function () {
    // 标题特效
    $('.tab li').click(function () {
        let index = $(this).index()
        // 标题 
        $(this).siblings().removeClass('cur')
        $(this).addClass('cur')
        // 内容
        $('.tab-content').hide()
        $('.tab-content').eq(index).show()
    })
    // 内容特效
    $('.tab-content').on('click', 'a', function () {
        // 数据
        let title = $(this).text()
        let index = $(this).parents('.tab-content').index()
        // 当前选中
        $('.tab-content')
            .eq(index - 1)
            .find('.city')
            .removeClass('cur')
        $(this).parents('.city').addClass('cur')
        // 标题
        $('.tab li')
            .eq(index - 1)
            .text(title)
        if (index == 3) return
        $('.tab li').removeClass('cur')
        $('.tab li').eq(index).addClass('cur')
        // 下一个显示
        $('.tab li').eq(index).show()
        $('.tab-content')
            .eq(index - 1)
            .hide()
        $('.tab-content').eq(index).show()
    })
    // 内容选中
    $('.tab-content').on('click', 'span', function () {
        let title = $(this).prev().text()
        let areaId = $(this).parents('.city').attr('area-id')
        $('.area .box').hide()
    })
    // 显示
    $('.area .change-city').mouseover(function () {
        $('.area .box').show()
    })
    // 隐藏
    $('.area').mouseleave(function () {
        $('.area .box').hide()
    })
})()
