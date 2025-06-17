$(function () {
    //...
    // ### 主页右上角显示用户名
    //获取H5存储的数据
    let expires = (new Date).getTime() > localStorage.getItem("expires");
    let sessionUname = sessionStorage.getItem("uname");
    let localUname =
        new Date().getTime() > localStorage.getItem("expires")
            ? null
            : localStorage.getItem("uname");
    let uname = sessionUname || localUname;


    let sessionAvatar = sessionStorage.getItem("avatar");
    let localAvatar =
        new Date().getTime() > localStorage.getItem("expires")
            ? null
            : localStorage.getItem("avatar");
    let unamet = sessionAvatar || localAvatar;
    let unametoux = unamet
        ? "http://tmp00001.zhaodashen.cn/" + unamet
        : "./assets/imgs/avatar.jpeg";

    let sessiontoken = sessionStorage.getItem('token')
    let localtoken = expires ? null : localStorage.getItem("token")
    let token = sessiontoken || localtoken
    if (uname) {
        $(".login a:eq(0)").text(uname);
        $('.setting-content>div:eq(1)>div:eq(1) span').text(uname)
        //右上角 注册变退出
        $(".login a:eq(1)").html(`<a href="./logout.html">退出</a>`);
        // ### 判断是不是vip
        let vip = null
        $.get(
            'http://kg.zhaodashen.cn/mt/web/user/info.jsp',
            { token },
            res => {
                if (res.meta.state === 200) {
                    vip = res.data.is_vip
                    let html = `${uname}`
                    // console.log(vip);
                    if (!vip) {
                        html += `
                            <i class="levelIconNew iconfont_level icon-new-level_4"></i>
                            <img
                                src="./assets/imgs/vip.png"
                                alt=""
                                class="vip"
                            />
                            `
                    }
                    // 追加到页面
                    $('.nick-name-txt').html(html)
                } else {
                    cocoMessage.error(res.meta.msg)
                }
            },
            'json'
        )
        $(".nickname-row a:eq(0) p").text(uname);
        //中心用户头像
        $(".head-img img").attr(
            "src",
            `${unametoux}`
        );
        $('.field-value img').attr(
            `src`,
            `${unametoux}`
        )
        //右上角用户名跳转
        $('.login a:eq(0)').attr('href', './my.html')
        // location.href = './my.html'

        // ### 修改头像
        $('.btn-upload button').click(function () {
            $('.dialogs div:eq(0)').removeClass('fadeOut')
            $('.dialogs div:eq(0)').addClass('fadeIn')
        })
        //关闭
        $('.dialogs>div:eq(0)>div>div>p:eq(1)>img').click(function () {
            $('.dialogs div:eq(0)').removeClass('fadeIn')
            $('.dialogs div:eq(0)').addClass('fadeOut')
        })

        // ### 上传头像
        function uploadtoux() {
            let fileObj = document.querySelector("#upload");

            let formData = new FormData();
            formData.append("file", fileObj.files[0]);
            formData.append("token", token);
            $.ajax({
                url: "http://kg.zhaodashen.cn/mt/web/avatar.jsp",
                type: "post",
                data: formData,
                // ---------------
                contentType: false,
                processData: false,
                // ------------------
                success: (res) => {
                    if (res.meta.state == 201) {
                        localStorage.setItem("avatar", res.data.img);
                        location.reload();
                    } else {
                        alert(res.meta.msg);
                    }
                },
                error: (err) => {
                    console.log(err);
                },
                dataType: "json",
            });
        }

        $('.preview').click(function () {
            $('#upload').trigger('click')
        })
        //上传头像预览
        $('#upload').change(function(){
            let fObj = new FileReader()
            let img = document.getElementById('upload').files[0]
            fObj.readAsDataURL(img)
            fObj.onload = function(e){
                $('.preview').css('background-image',`url(${this.result})`)
                $('.preview').css('background-repeat',`no-repeat`)
                $('.preview').css('background-size',`100%`)
            }
        })
        //确认上传
        $('.dialogs div:eq(0)>div>div:eq(2)>button:eq(0)').click(function () {
            uploadtoux()
        })
        //取消上传
        $('.dialogs div:eq(0)>div>div:eq(2)>button:eq(1)').click(function () {
            $('.dialogs div:eq(0)').removeClass('fadeIn')
            $('.dialogs div:eq(0)').addClass('fadeOut')
        })
        //...
    } else {
        cocoMessage.info(`您还没有登录哦(*^_^*)`, 3000);
        $(".userinfo>div:eq(1)").css("display", "none");
        $(".userinfo>div:eq(0)").css("display", "block");
    }
    // ### 首页导航：字体图标
    let icons = [
        "icon-canju",
        "icon-meituan",
        "icon-jiudian",
        "icon-minsu_",
        "icon-dianying-",
        "icon-feiji",
        "icon-maikefeng",
        "icon-icon",
        "icon-chuitoufa",
        "icon-qinzi2",
        "icon-gangling",
        "icon-pinleitubiao_jiazhuangjiancai",
        "icon-xuexi",
        "icon-zhuanshi",
        "icon-tubiao_-",
        "icon-jiubajiulang",
    ];
    // ### 锋团全部分类
    $.get(
        "http://kg.zhaodashen.cn/mt/web/cate/tree.jsp",
        {},
        (res) => {
            // console.log("拿到数据了", res);
            $("div.cat1 ul").html("");
            $.each(res.data, (index, item) => {
                let url = item.url || `./waimai.html?cat_id=${item.cat_id}`;
                $("div.cat1 ul").append(`
              <li class="nav-li">
                <i class="iconfont ${icons[index]}"></i>
                <span class="nav-text-wrapper"></span>
                <a href="${url}" class="link nav-text">${item.cat_name}</a>
                ${item.cat_name === "外卖"
                        ? '<span class="nav-promotion">HOT</span>'
                        : ""
                    }
                <i class="nav-right-arrow"></i><span></span>
                </li>
                `);
            });
            //第二次遍历
            //二级、三级
            $(".banner .cat2").text("");
            $.each(res.data, (index, item) => {
                let twoHtml = "";
                $.each(item.children, (twoIndex, twoItem) => {
                    let threeHtml = "";
                    $.each(twoItem.children, (threeIndex, threeItem) => {
                        threeHtml += `<a href="./waimai.html?cat_id=${threeItem.cat_id}" class="link detail-text" >${threeItem.cat_name}</a>`;
                    });
                    let url = twoItem.url || `./waimai.html?cat_id=${twoItem.cat_id}`;
                    twoHtml += `
                        <div class="detail-area"><div class="detail-title-wrapper clearfix">
                          <h2><a href="${url}"class="link detail-title"target="_blank">${twoItem.cat_name}</a></h2>
                          <a href="${url}" class="link detail-more" target="_blank">更多<i class="detail-right-arrow"></i></a></div>
                          <div class="detail-content">
                          ${threeHtml}
                          </div>
                        </div>`;
                });
                let oneHtml = `<div class="category-nav-detail">
          ${twoHtml || '<img src="./assets/imgs/cate404.webp" /> '}
          </div>`;
                $(".banner .cat2").append(oneHtml);
            });
            //...
        },
        "json"
    );
    //...
});
