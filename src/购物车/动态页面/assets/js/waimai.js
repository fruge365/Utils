$(function () {
    // ### 全部变量 
    let cat_id = getQueryVariable('cat_id')
    let cat_name = ''
    let attr = [] // 商家特色:免费配送-新商家-品牌商家-支持开票,人均价:40元以上,优惠活动:折扣商品
    let order =
        // ### 门店筛选特效
        $('.condition').click(function (evt) {
            let e = evt || window.event
            let target = e.target || window.event

            if ($(target).hasClass('classification')) return

            if (target.nodeName == 'A' || $(target).hasClass('all')) {
                // 选中特效
                $(target).parents('.cont').find('.on').removeClass('on')
                $(target).addClass('on')

                // 数据收集
                attr = []
                $('.condition .cont').each((index, item) => {
                    // 获取属性名
                    let choose_val = $(item).find('.on').text()
                    let choose_name = $(item).find('.classification').text()
                    // 判断
                    if (choose_name == '分类') {
                        cat_id = $(item).find('.on').attr('id')
                        cat_name = choose_val
                        $('.breadcrumbs span:eq(2)').text(choose_val)
                    } else {
                        if (choose_val != '全部')
                            attr.push(`${choose_name}:${choose_val}`)
                    }
                })
                // 筛选结果
                console.log('筛选结果-分类编号：', cat_id)
                console.log('筛选结果-属性：', attr)
            }
        })

    // ### 排序筛选(后续)
    $('.tags a').click(function (e) {
        e.preventDefault()

        $('.tags a').css('color', '#000')
        $(this).css('color', '#13D1BE')

        let params = {
            评分最高: 'comment',
            销量最高: 'sell',
            距离最近: 'location',
        }
        let title = $(this).text()
        order = params[title]
    })
})
