$(function () {
    // ### 全部变量
 
    // ### 和后端交互

    // ### 门店放大镜切换
    $('.store .d-right ul').on('click', 'li', function () {
        $('.big .imgbox img').attr('src', $(this).find('img').attr('src'))
    })

    // ### 飞入购物车 start
    $('.allgoods').on('click', '.buy', function (e) {
        // 收集数据
        let endObj = document.querySelector('.guess-you-like h4')
        let goods_img = $(this)
            .parents('.goods')
            .find('.imgbox img')
            .attr('src')
        let goods_name = $(this).parents('.goods').find('.name span').text()
        let goods_price = $(this).parents('.goods').find('.price font').text()
        let goods_price2 = $(this).parents('.goods').find('.price span').text()
        let goods_id = $(this).parents('.goods').attr('id')
        // 飞图片
        let flyer = $(`<img class="flyer" src="${goods_img}"/>`)
        // 起飞
        flyer.fly({
            start: {
                left: e.clientX - 788,
                top: e.clientY,
            },
            end: {
                left: endObj.offsetLeft,
                top: endObj.offsetTop - document.documentElement.scrollTop,
                width: 20,
                height: 20,
            },
            onEnd: () => {
                // alert('ok')
                $('.flyer').remove()

                if ($('.mofakoudai').find(`.goods${goods_id}`).length) {
                    // 累计+1
                    console.log(1)
                    let data = $('.mofakoudai')
                        .find(`.goods${goods_id} button font`)
                        .text()
                    $('.mofakoudai')
                        .find(`.goods${goods_id} button font`)
                        .text(parseInt(data) + 1)
                } else {
                    // 新增
                    console.log(1)
                    $('.mofakoudai').prepend(`
                  <li class="goods${goods_id}">
                      <div class="pic">
                          <div class="imgbox">
                              <img src="${goods_img}">
                          </div>
                      </div>
                      <p class="name">${goods_name}</p>
                      <p class="desc">门市价<del>￥${goods_price2}</del></p>
                      <p class="price"><b>￥</b>${goods_price} <button>已购<font>1</font></button></p>
                  </li>
              `)
                }
            },
        })
    })
    // 飞入购物车 end
})
