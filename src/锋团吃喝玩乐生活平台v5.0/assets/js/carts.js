$(function () {
  //...

  // ### 判断是不是会员

  // let token = localStorage.getItem('token') || 'd27b2f0175d3305918b8d5db159fc50a2713'

  let expires = (new Date).getTime() > localStorage.getItem("expires");
  let sessiontoken = sessionStorage.getItem('token')
  let localtoken = expires ? null : localStorage.getItem("token")
  let token = sessiontoken || localtoken

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
  } else {
    cocoMessage.info(`您还没有登录哦(*^_^*)`, 3000);
    $(".userinfo>div:eq(1)").css("display", "none");
    $(".userinfo>div:eq(0)").css("display", "block");
    $('#app').text('')
    $('.address').text('')
    return
  }
  // ### 价格、数量算法
  function total() {
    // 1 定义变量存放总数量、总价格
    let totalNum = 0
    let totalPrice = 0
    // 2 遍历累计
    $("table tr").each((i, item) => {
      if (i === 0) return  // 表头这个行不统计
      let num = $(item).find('.input').val()
      let price = $(item).find('td:eq(1)').text().substr(1)

      totalNum += parseInt(num)
      let temp = parseInt(num) * (parseFloat(price) * 100) // 小计
      totalPrice += temp
      // 更新小计 
      $(item).find('td:eq(3)').text(temp / 100)
    })
    // 3 重置页面 
    $('.price .total-price span').html(`<i>¥</i>${totalPrice / 100}`)
    $.get(
      'http://kg.zhaodashen.cn/mt/web/user/info.jsp',
      { token },
      res => {
        if (res.meta.state === 200) {
          console.log('拿到数据了', res);

          console.log('是否是会员', res.data.is_vip);
          if (!res.data.is_vip) {
            $('.vip .total-price span').html(`<i>¥</i>${totalPrice / 100 * 0.8}`)
          } else {
            // $('.vip .total-price span').html(`<i>¥</i>${totalPrice / 100}`)
            $('.vip .total-price span').html(`非会员`)
          }

        } else {
          cocoMessage.error(res.meta.msg)
        }
      },
      'json'
    )
  }



  // 一、全局变量
  // let token = localStorage.getItem('token') || 'd27b2f0175d3305918b8d5db159fc50a2713'

  // 六、购物车数量update
  // 6.1 input框禁止输入非数字
  $('table tbody').on('input', '.input', function () {
    // this input标签对象
    let num = $(this).val()
    // 正则过滤非数字
    num = String(num).replace(/\D/g, '')
    // num = String(num).replace(/[^0-9]/g, '')
    // 页面显示最新数据
    $(this).val(num)
  })
  // 6.2 失去焦点数字请求接口 
  $('table tbody').on('blur', '.input', function () {
    // this input标签对象
    let num = parseInt($(this).val())
    if (isNaN(num) || num < 1) num = 1
    // 请求接口
    let goods_id = $(this).parents('tr').attr('goods_id')
    $.post(
      'http://kg.zhaodashen.cn/mt/web/carts/update.jsp',
      { token, goods_id, buyNum: num },
      res => {
        if (res.meta.state == 200) {
          $(this).val(num)
          total()
        } else {
          if (res.meta.msg === '库存不足') {
            alert(`【${res.data.goods_name}】库存不足，最大购买数量【${res.data.total_number}】`)
            $.post('http://kg.zhaodashen.cn/mt/web/carts/update.jsp', { token, goods_id, buyNum: res.data.total_number }, res => {
              location.reload()
            }, 'json')
          } else {
            alert('网络繁忙，请刷新后重置')
            console.log("+1错误信息", Fres);
          }
        }
      }, 'json')
  })

  // 五、购物车数量-1
  // 1 事件委托 给-按钮 绑定点击事件
  $('table tbody').on('click', '.minus-btn', function () {
    // 2 事件处理函数中
    // 2.1 先获取后一个input框数量
    let num = $(this).next().val()
    let goods_id = $(this).parents('tr').attr('goods_id')
    // 2.2 -- （小于1终止）
    num--
    if (num < 1) num = 1
    // 2.3 请求接口：失败-弹框提示，成功-重置页面input框数量，重置价格
    $.post('http://kg.zhaodashen.cn/mt/web/carts/update.jsp', { token, goods_id, buyNum: num }, res => {
      if (res.meta.state == 200) {
        $(this).next().val(num)
        total()
      } else {
        // alert('网络繁忙，请刷新后重试')
        console.log('错误信息', res);
      }
    }, 'json')
  })


  // 四、购物车数量+1
  // 1 事件委托 给+按钮 绑定点击事件
  // 2 事件处理函数中
  $('table tbody').on('click', '.plus-btn', function () {
    //  2.1 获取前一个input框数据
    let num = $(this).prev().val()
    let goods_id = $(this).parents('tr').attr('goods_id')
    //  2.2 ++
    num++
    //  2.3 请求接口：失败-弹框提示，成功-刷新，DOM操作先重置input框数量，再重新统计总价（推荐
    $.post(
      'http://kg.zhaodashen.cn/mt/web/carts/update.jsp',
      {
        token,
        goods_id,
        buyNum: num
        // buyNum: 99999999999999999
      },
      res => {
        if (res.meta.state == 200) {
          // DOM操作先重置input框数量
          $(this).prev().val(num)
          // 再重新统计总价
          total()
        } else {
          // console.log('失败：', res);
          if (res.meta.msg === '库存不足') {
            // TODO: 淘宝京东最新的思路 又变了 
            alert(`【${res.data.goods_name}】库存不足，最大购买数量【${res.data.total_number}】`)
            $.post('http://kg.zhaodashen.cn/mt/web/carts/update.jsp', { token, goods_id, buyNum: res.data.total_number }, res => {
              location.reload()
            }, 'json')
          } else {
            // alert('网络繁忙，请刷新后重置')
            console.log("+1错误信息", res);
          }
        }
      },
      'json'
    )
  })

  // 三、购物车删除
  // 1 事件委托绑定点击事件
  // 2 事件处理函数中 
  $('table tbody').on('click', '.del', function () {
    // 2.1 获取删除参数 token、goods_id（注：是新的编程思想 从当前行获取）
    let goods_id = $(this).parents('tr').attr('goods_id')
    // 2.2 请求接口：失败-弹框提示，成功-刷新，DOM操作先移除，再重新统计总价（推荐）
    // $.ajax
    $.get(
      'http://kg.zhaodashen.cn/mt/web/carts/delete.jsp',
      {
        token,
        goods_id
      },
      res => {
        // console.log(res);  {meta: {state: 200, msg: ""}, data: null}
        if (res.meta.state === 200) {
          $(this).parents('tr').remove()
          total()
        } else {
          alert(res.meta.msg)
        }
      },
      'json'
    )
  })


  // 二、购物车列表
  // 1 打开页面请求接口
  // 2 拿到数据页面显示（留心：不是之前的li而是根据当前布局从页面中复制

  $.ajax({
    url: 'http://kg.zhaodashen.cn/mt/web/carts/index.jsp',
    type: 'get',

    // headers: {},

    // data: {token:token}
    data: { token },

    success: res => {
      // console.log('拿到接口数据：', res);
      let html = `<tr>
      <th class="desc">项目</th>
      <th class="unit-price">单价</th>
      <th class="num">数量</th>
      <th class="total-price">总价</th>
      <th style="width:46px">操作</th> 
    </tr>`
      $.each(res.data, (i, item) => { // item就是数组中每个对象，对象就是购物车一个个商品
        html += `<tr goods_id=${item.goods_id} max_buy_num="写后端返回的数据后期购买时判断"}>
      <td class="title">
        <a href="" data-reactid="12">${item.store_name}: ${item.goods_name}</a>
        <p></p>
      </td>
      <td>¥${item.shop_price}</td>
      <td data-reactid="16">
        <div class="input-number">
          <button class="minus-btn" type="button">-</button>
          <input max="" min="" type="text" class="input" value="${item.goods_number}">
          <button class="plus-btn" type="button">+</button>
        </div>
      </td>
      <td data-reactid="21">${item.shop_price * item.goods_number}</td>
      <td><a href="javascript:;" class="del">删除</a></td>
    </tr>`
      })
      $('table tbody').html(html)

      // 更新页面统计
      total()
    },
    error: err => { },
    dataType: 'json',
  })

  $('.form-submit .btn').click(function () {
    console.log('点击提交订单了');
    $.post(
      'http://kg.zhaodashen.cn/mt/web/order/create.jsp',
      { token },
      res => {
        if (res.meta.state === 201) {
          console.log('提交订单', res);
          location.href = `./pay.html?sn=${res.data.sn}&amount=${res.data.amount}`
        } else {
          console.log(res.meta.msg);
        }
      },
      'json'
    )
  })


  // ### 显示收货地址
  //清空
  $('.TwoRow').text('')
  $.get(
    'http://kg.zhaodashen.cn/mt/web/address/index.jsp',
    { token },
    res => {
      console.log('拿到数据了', res);
      //遍历，追加
      let html = `<div class="header-wrapper">
      <!-- <h2 class="header-title">选择收货地址</h2> -->
      </div>`
      $.each(res.data, (i, item) => {
        html += `
        <div class="address-list">
        <div class="addr-item-wrapper TwoRow addr-selected addr-default">
          <div class="inner-infos">
            <div class="addr-hd">
              <span>${item.provinceName}</span>
              <span>${item.cityName}</span>
              <span>${item.consignee}收</span>
            </div>
            <div class="addr-bd">
              <span>${item.districtName}</span>
              <span>${item.address}</span>
              <span>${item.mobile}</span>
            </div>
            <a title="修改地址" class="modify-operation">修改</a>
          </div>
          <div class="set-default" title="设置当前地址为默认">设为默认</div>
          <!-- <div class="default-tip">默认地址</div> -->
          <div class="curMarker"></div>
        </div>
      </div>`
      })
      //追加
      $('.TwoRow').html(html)
    },
    'json'
  )

  //...
})