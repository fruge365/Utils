$(function () {
    //...

    //全局变量
    let store_id = getParams('store_id')
    let sessionUname = sessionStorage.getItem("uname");
    let localUname =
        new Date().getTime() > localStorage.getItem("expires")
            ? null
            : localStorage.getItem("uname");
    let sessionAvatar = sessionStorage.getItem("avatar");
    let localAvatar =
        new Date().getTime() > localStorage.getItem("expires")
            ? null
            : localStorage.getItem("avatar");
    let uname = sessionUname || localUname;
    let expires = (new Date).getTime() > localStorage.getItem("expires");
    let sessiontoken = sessionStorage.getItem('token')
    let localtoken = expires ? null : localStorage.getItem("token")
    let token = sessiontoken || localtoken
    // ### 门店详情
    // 打开网页就开始请求接口
    $.get(
        'http://kg.zhaodashen.cn/mt/web/waimai/goods.jsp',
        {
            store_id,
        },
        res => {
            if (res.meta.state === 200) {
                // console.log('拿到数据了', res);
                //修改门店标题
                $('.store .name').text(res.data.store.title)
                //修改门店地址、电话、营业时间
                $('.store .address').html(`
                <p>地址：${res.data.store.address}</p>
                <p>电话：${res.data.store.tel}</p>
                <p>营业时间：${res.data.store.work_time}</</p>
                `)
                //修改大图
                $('.big .imgbox img').attr('src', `http://tmp00001.zhaodashen.cn/${res.data.store.img}`)
                //小图
                let html = ''
                res.data.store.imgs.split(',').forEach(item => {
                    html += `
                    <li>
                        <div class="imgbox" style="height: 100%; width: 100%">
                            <img src="http://tmp00001.zhaodashen.cn/${item}"/>
                        </div>
                    </li>
                    `
                    $('.store .d-right ul').html(html)
                });
                //显示所有商品
                //清空遍历追加
                //1.清空
                $('.allgoods').html('<h4>欢迎光临O(∩_∩)O哈哈~ 客官</h4>')
                //2.遍历
                $.each(res.data.goods, (index, item) => {
                    let html = `
                    <div class="goods" id="${item.goods_id}">
                        <div class="one clear">
                            <div class="pic">
                                <div class="imgbox">
                                    <img src="http://tmp00001.zhaodashen.cn/${item.goods_img}"/>
                                </div>
                            </div>
                            <div class="info">
                                <a class="fr buy" href="javascript:;">加入购物车</a>
                                <p class="name">
                                <span>${item.goods_name}</span>
                                </p>
                                <p class="price">
                                <b>￥</b>
                                <font>${item.shop_price}</font>
                                <span>门市价￥${item.market_price}</span>
                                </p>
                            </div>
                        </div>
                        <div class="line"></div>
                    </div>
                  `
                    //3.追加
                    $('.allgoods').append(html)
                })
                //...
            } else {
                cocoMessage.error(res.meta.msg, 2000);
                setTimeout(() => {
                    location.href = './index.html'
                }, 2000);
            }
        },
        'json'
    )

    // ### 门店详情图片切换
    // 事件委托
    $('.store .d-right ul').on('click', 'li', function () {
        $('.big .imgbox img').attr('src', $(this).find('img').attr('src'))
    })

    // ### 飞入购物车
    // ### 飞入购物车 start
    $(".allgoods").on("click", ".buy", function (e) {
        // 只要引入common-header-login.js文件，就可以使用
        if (!uname) return;
        // 收集数据
        let endObj = document.querySelector(".guess-you-like h4");
        let goods_img = $(this).parents(".goods").find(".imgbox img").attr("src");
        let goods_name = $(this).parents(".goods").find(".name span").text();
        let goods_price = $(this).parents(".goods").find(".price font").text();
        let goods_price2 = $(this).parents(".goods").find(".price span").text();
        let goods_id = $(this).parents(".goods").attr("id");
        // 飞图片
        let flyer = $(`<img class="flyer" src="${goods_img}"/>`);
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
                $(".flyer").remove();

                if ($(".mofakoudai").find(`.goods${goods_id}`).length) {
                    // 累计+1
                    // console.log(1);
                    let data = $(".mofakoudai")
                        .find(`.goods${goods_id} button font`)
                        .text();
                    $(".mofakoudai")
                        .find(`.goods${goods_id} button font`)
                        .text(parseInt(data) + 1);
                } else {
                    // 新增
                    $(".mofakoudai").prepend(`
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
            `);
                }
            },
        });
    });
    // ### 飞入购物车 end

    // ### 和后端交互
    $('.allgoods').on('click', '.buy', function () {
        if (!token) {
            cocoMessage.error("请先登录，再加入购物车！！！", 3000);
            return
        }
        //商品数量+1
        let goodsId = $(this).parents('.goods').attr('id')
        // console.log(goodsId);
        //发送异步请求
        $.post(
            'http://kg.zhaodashen.cn/mt/web/carts/create.jsp',
            {
                token,
                buyNum: 1,
                goodsId
            },
            res => {
                // console.log('拿到数据了',res);
                if (res.meta.state !== 201) {
                    cocoMessage.error(res.meta.msg);
                }
            },
            'json'
        )
    })

    // ### 门店购物车
    // 1.清空
    $('.mofakoudai').text('')
    // 发送异步请求
    $.get(
        'http://kg.zhaodashen.cn/mt/web/carts/store.jsp',
        {
            store_id,
            token
        },
        res => {
            if (res.meta.state === 200) {
                console.log('拿到数据了', res);
                // 2.遍历
                $.each(res.data, (index, item) => {
                    let html = `
                    <li class='goods${item.goods_id}'>
                    <div class="pic">
                        <div class="imgbox">
                            <img src="http://tmp00001.zhaodashen.cn/${item.imgs.goods_img}"/>
                        </div>
                    </div>
                    <p class="name">${item.goods_name}</p>
                    <p class="desc">
                      门市价
                      <del>￥${item.market_price}</del>
                    </p>
                    <p class="price">
                      <b>￥</b>
                      ${item.shop_price}
                      <button>
                        已购
                        <font>${item.goods_number}</font>
                      </button>
                    </p>
                  </li>
                    `;
                // 3.追加
                $('.mofakoudai').append(html)
                })
            } else {
                // cocoMessage.error(res.meta.msg);
                // console.log('失败了',res.meta.msg);
            }
        },
        'json'
    )


    //...
})