$(function () {
    //...

    // ### 主页右上角显示用户名
    //获取H5存储的数据
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
    let unamet = sessionAvatar || localAvatar;
    let unametoux = unamet
        ? "http://tmp00001.zhaodashen.cn/" + unamet
        : "./assets/imgs/avatar.jpeg";
    let expires = (new Date).getTime() > localStorage.getItem("expires");
    let sessiontoken = sessionStorage.getItem('token')
    let localtoken = expires ? null : localStorage.getItem("token")
    let token = sessiontoken || localtoken
    // ### 判断是否是vip
    $.get(
        'http://kg.zhaodashen.cn/mt/web/user/info.jsp',
        { token },
        res => {
            if (res.meta.state === 200) {
                let vip = res.data.is_vip
                if (!vip) {
                    $('.nick-name-txt img').attr('src', './assets/imgs/vip.png')

                } else {
                    $('.nick-name-txt img').attr('src', '')

                }
            } else {
                cocoMessage.error(res.meta.msg)
            }
        },
        'json'
    )
    // ### 右上角用户，中心用户名和头像
    if (uname) {
        $(".login a:eq(0)").text(uname);
        $(".login a:eq(1)").html(`<a href="./logout.html">退出</a>`);
        $(".userinfo>div:eq(1)").css("display", "block");
        $(".userinfo>div:eq(0)").css("display", "none");
        $(".nickname-row a:eq(0) p").text(uname);
        $(".head-img-row a:eq(0) img").attr(
            "src",
            `${unametoux}`
        );
        $('.head-img a img').attr('src', `${unametoux}`)
        $('.nick-name-txt').html(`${uname}`)

        // ### 用户地址列表
        //清空
        $('.addressContent').text('')
        //发送异步请求
        $.get(
            'http://kg.zhaodashen.cn/mt/web/address/index.jsp',
            { token },
            res => {
                // console.log('拿到数据了', res);
                //遍历，追加
                let html = ``
                $.each(res.data, (i, item) => {
                    html += `
                <dl>
                    <dt>
                        ${i + 1}
                        ${item.consignee}
                        ${item.countryName}
                        ${item.provinceName}
                        ${item.cityName}
                        ${item.districtName}
                        ${item.mobile}
                    </dt>
                        <dd>
                            <a href="javascript:;" class="del" address_id=${item.address_id}>删除</a>
                            &nbsp;&nbsp;&nbsp;`
                    if (item.is_default != 1)
                        html += `<a href="javascript:;" class="default" address_id="${item.address_id}">设为默认地址</a>`;
                    html += `</dd >
                </dl >
                    `
                })
                //追加
                $('.addressContent').html(html)
            },
            'json'
        )

        // ### 删除地址
        $('.addressContent').on('click', '.del', function () {
            // console.log(111);
            let address_id = $(this).attr('address_id')
            console.log($(this).attr('address_id'));
            $.post(
                'http://kg.zhaodashen.cn/mt/web/address/delete.jsp',
                {
                    token,
                    address_id,
                },
                res => {
                    setTimeout(() => {
                        location.reload()
                    }, 2000);
                },
                'json'
            )
        })

        //...
    } else {
        cocoMessage.info(`您还没有登录哦(*^ _ ^*)`, 3000);
        $(".userinfo>div:eq(1)").css("display", "none");
        $(".userinfo>div:eq(0)").css("display", "block");
    }

    // ### 省
    $('.mt10 ul li:eq(1) select:eq(0)').html(`<option value="">请求中</option>`)
    // 发送异步请求
    $.get(
        'http://kg.zhaodashen.cn/mt/web/area/index.jsp',
        {
            type: '一级',
            pid: 1,
        },
        res => {
            console.log('地区数据', res);
            // 遍历 
            let html = '<option value="">请选择</option>'
            $.each(res.data, (i, item) => {
                html += `<option value="${item.area_id}">${item.area_name}</option>`
                // $('.mt10 ul li:eq(1) select:eq(0)').html(`<option value="">${item.area_name}</option>`)
                $('.mt10 ul li:eq(1) select:eq(0)').html(html)

            })
        },
        'json'
    )

    // ### 市
    $('.mt10 ul li:eq(1) select:eq(0)').change(function () {
        // 发送异步请求
        $('.mt10 ul li:eq(1) select:eq(1)').html(`<option value="">请求中</option>`)
        let val = $(this).val()
        $.get(
            'http://kg.zhaodashen.cn/mt/web/area/index.jsp',
            {
                type: '二级',
                pid: val,
            },
            res => {
                console.log('地区数据', res);
                // 遍历 
                let html = '<option value="">请选择</option>'
                $.each(res.data, (i, item) => {
                    html += `<option value="${item.area_id}">${item.area_name}</option>`
                    // $('.mt10 ul li:eq(1) select:eq(0)').html(`<option value="">${item.area_name}</option>`)
                    $('.mt10 ul li:eq(1) select:eq(1)').html(html)

                })
            },
            'json'
        )
    })

    // ### 区
    $('.mt10 ul li:eq(1) select:eq(1)').change(function () {
        // 发送异步请求
        $('.mt10 ul li:eq(1) select:eq(2)').html(`<option value="">请求中</option>`)
        let val = $(this).val()
        $.get(
            'http://kg.zhaodashen.cn/mt/web/area/index.jsp',
            {
                type: '三级',
                pid: val,
            },
            res => {
                console.log('地区数据', res);
                // 遍历 
                let html = '<option value="">请选择</option>'
                $.each(res.data, (i, item) => {
                    html += `<option value="${item.area_id}">${item.area_name}</option>`
                    // $('.mt10 ul li:eq(1) select:eq(0)').html(`<option value="">${item.area_name}</option>`)
                    $('.mt10 ul li:eq(1) select:eq(2)').html(html)

                })
            },
            'json'
        )
    })


    // ### 新建收货地址
    // 全局变量
    let username = $('.mt10 ul li .username').val()
    let province
    let city
    let district
    let address = $('.mt10 ul li .address').val()
    let mobile = $('.addremt10ss_bd ul li .mobile').val()
    let is_default = null
    $('.addBtn').click(function () {
        let formData = $("form").serialize(); // username=&province=&city=&district=&address=&mobile=
        formData += "&token=" + token;
        console.log(formData);
        if ($('.mt10 ul li .check').prop('checked')) {
            is_default = 1
        } else {
            is_default = 0
        }
        // 发送异步请求
        $.post(
            'http://kg.zhaodashen.cn/mt/web/address/create.jsp',
            // {
            //     token,
            //     username,
            //     province,
            //     city,
            //     district,
            //     address,
            //     mobile,
            //     is_default,
            // },
            formData,
            res => {
                if (res.meta.state === 201) {
                    console.log(res);
                    location.reload()
                }
            },
            'json',
        )
    })

    // ### 默认地址
    // 事件委托
    $('.addressContent').on('click', '.default', function () {
        let address_id = $(this).attr('address_id')
        //请求接口
        $.post(
            'http://kg.zhaodashen.cn/mt/web/address/default.jsp',
            {
                token,
                address_id
            },
            res => {
                if (res.meta.state === 200) {
                    console.log('默认地址数据', res);
                    cocoMessage.success('设置默认地址成功')
                    setTimeout(() => {
                        location.reload()
                    }, 1000);
                } else {
                    cocoMessage.error(res.meta.msg)
                }
            },
            'json'
        )
    })


    //...
})