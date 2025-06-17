$(function () {
    // 菜单导航特效
    $('.cate-content').on('mouseenter', '.nav-li', function () {
        $('.cat2').show()
 
        let index = $(this).index()
        $('.cat2>div').hide()
        $('.cat2>div').eq(index).show()
    })
    $('.cate-content').on('mouseleave', function () {
        $('.cat2').hide()
        $('.cat2>div').hide()
    })

    // 菜单导航接口数据
    let icons = [
        'icon-canju',
        'icon-meituan',
        'icon-jiudian',
        'icon-jiudian',
        'icon-dianying-',
        'icon-feiji',
        'icon-maikefeng',
        'icon-icon',
        'icon-chuitoufa',
        'icon-qinzi2',
        'icon-gangling',
        'icon-pinleitubiao_jiazhuangjiancai',
        'icon-xuexi',
        'icon-zhuanshi',
        'icon-tubiao_-',
        'icon-jiubajiulang',
    ]
})
