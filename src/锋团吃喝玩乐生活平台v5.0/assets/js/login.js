$(function () {
  //...

  // ### 点击切换form表单同时、极客行为验证码
  let captcha = captchaBigData("#captcha0"); //全局变量
  // 给所有按钮绑定事件
  // $(".wof-button").click(function () {
  $("form button").click(function () {
    // 判断是否有黄色类名
    let status = $(this).hasClass("wof-button--yellow");
    // console.log(status);     有true  没有false
    if (status) return;
    // 点击背景不是黄色按钮要判断文字是不是 账号登录、短信登录
    let font = $(this).text().replace(/\s/g, "");
    // console.log(font);
    let fontIndex = ["账号登录", "短信登录"].indexOf(font);
    // console.log(fontIndex);
    if (fontIndex !== -1) {
      $("#captcha0").text("");
      $("#captcha1").text("");
      captcha = captchaBigData("#captcha" + fontIndex);
      // console.log(captcha);
    }
  });

  // ### 点击显示密码
  $(".showPassword").click(function () {
    if ($(this).hasClass("icon-jurassic_loseeyes")) {
      $(this).removeClass("icon-jurassic_loseeyes");
      $(this).addClass("icon-yanjing-");
      $(this).prev().prop("type", "text");
      // $(this).prev()[0].type = "text";
    } else {
      $(this).removeClass("icon-yanjing-");
      $(this).addClass("icon-jurassic_loseeyes");
      $(this).prev().prop("type", "password");
      // $(this).prev()[0].type = "password";
    }
  });

  // ### 账号登录
  $(".denglu").click(async function () {
    let account = $(".account-login .uname").val();
    let pwd = $(".account-login .pwd").val();
    if (!account || !pwd) {
      cocoMessage.error(`请将表单数据填写完整`, 3000);
      return;
    }
    if (!(await captcha).getValidate()) {
      cocoMessage.info("请完成行为验证码~");
      return;
    }
    $.post(
      "http://kg.zhaodashen.cn/mt/web/user/login.jsp",
      {
        account,
        pwd,
      },
      (res) => {
        if (res.meta.state === 200) {
          console.log("拿到数据了", res);
          //判断用户是否勾选七天免登录
          if ($("#remember").prop("checked")) {
            console.log("勾选了七天免登录");
            localStorage.setItem("uname", res.data.uname);
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("avatar", res.data.avatar);
            // 20秒
            // localStorage.setItem("expires", new Date().getTime() + 20 * 1000);
            // 七天
            localStorage.setItem('expires', (new Date).getTime() + 7 * 24 * 60 * 60 * 1000)
          } else {
            console.log("没勾选了七天免登录");
            sessionStorage.setItem("uname", res.data.uname);
            sessionStorage.setItem("token", res.data.token);
            sessionStorage.setItem("avatar", res.data.avatar);
          }
          cocoMessage.success("登录成功(*^_^*),跳转中...", 3000);
          setTimeout(() => {
            location.href = "./index.html";
          }, 3000);
        } else {
          console.log("失败了", res);
          cocoMessage.error(`失败了/(ㄒoㄒ)/~~${res.meta.msg}`, 3000);
        }
      },
      "json"
    );
  });

  // ### 手机短信登录
  let t = null;
  let time = 11; //全局变量

  //手机号输入框绑定失焦事件
  $(".sms-login input:eq(0)").blur(function () {
    let mobile = $(".sms-login input:eq(0)").val();
    if (!mobile) {
      cocoMessage.error(`手机号不能为空`, 3000);
      return;
    }
    if (!/^1\d{10}$/.test(mobile)) {
      console.log("手机号输入不正确");
      cocoMessage.error(`手机号输入不正确`, 3000);
      return;
    }
  });

  // 获取‘手机动态码按钮’，给按钮绑定事件
  $(".sms-login a:eq(0)").click(async function () {
    let mobile = $(".sms-login input:eq(0)").val();
    if (!mobile) {
      cocoMessage.error(`手机号不能为空`, 3000);
      return;
    }
    if (!/^1\d{10}$/.test(mobile)) {
      console.log("手机号输入不正确");
      cocoMessage.error(`手机号输入不正确`, 3000);
      return;
    }
    if (!(await captcha).getValidate()) {
      cocoMessage.info("请完成行为验证码~");
      return;
    }

    //节流防抖,优化项目
    if (time !== 11) return;
    time--;
    // $(".sms-login a:eq(0)").text(`验证码已发送${time}`);
    $(this).text(`验证码已发送${time}`);
    $(this).css("cursor", "default"); // 鼠标呈现箭头形状
    t = setInterval(() => {
      time--;
      // $(".sms-login a:eq(0)").text(`验证码已发送${time}`);
      $(this).text(`验证码已发送${time}`);
      if (time <= 0) {
        clearInterval(t);
        // $(".sms-login a:eq(0)").text(`获取手机验证码`);
        $(this).text(`获取手机验证码`);
        $(this).css("cursor", "pointer"); // 鼠标呈现小手形状（表示链接指针）
        time = 11;
        return;
      }
    }, 1000);
    $.post(
      "http://kg.zhaodashen.cn/mt/web/sms/send.jsp",
      {
        mobile,
      },
      (res) => {
        if (res.meta.state === 201) {
          console.log("成功发送短信验证码", res);
          cocoMessage.success(`验证码已发送(*^_^*)`, 3000);
        } else {
          console.log("失败", res);
          cocoMessage.error(`验证码发送失败/(ㄒoㄒ)/~~`, 3000);
        }
      },
      "json"
    );
  });

  // 获取'短信登录'按钮绑定点击事件
  $(".sms-login button:eq(0)").click(function () {
    let mobile = $(".sms-login input:eq(0)").val();
    let code = $(".sms-login input:eq(1)").val();
    if (!mobile || !code) {
      cocoMessage.error(`请将表单数据填写完整`, 3000);
      return;
    }
    if (!/^1\d{10}$/.test(mobile)) {
      console.log("手机号输入不正确");
      cocoMessage.error(`手机号输入不正确`, 3000);
      return;
    }
    $.post(
      "http://kg.zhaodashen.cn/mt/web/sms/login.jsp",
      {
        mobile,
        code,
      },
      (res) => {
        if (res.meta.state === 200) {
          console.log("拿到数据了", res);
          cocoMessage.success("登录成功(*^_^*),三秒后跳转", 3000);
          //判读用户是否勾选7天免登录
          if ($("#remember").prop("checked")) {
            console.log("勾选了七天免登录");
            localStorage.setItem("uname1", res.data.uname);
            localStorage.setItem("uname", mobile);
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("avatar", res.data.avatar);
            // 20秒
            // localStorage.setItem("expires", new Date().getTime() + 20 * 1000);
            // 七天
            localStorage.setItem('expires', new Date().getTime() + 7 * 24 * 60 * 60 * 1000)
          } else {
            console.log("没勾选了七天免登录");
            sessionStorage.setItem("uname1", res.data.uname);
            sessionStorage.setItem("uname", mobile);
            sessionStorage.setItem("token", res.data.token);
            sessionStorage.setItem("avatar", res.data.avatar);
          }
          setTimeout(() => {
            location.href = "./index.html";
          }, 3000);
        } else {
          console.log("短信登录失败", res);
          cocoMessage.error(`短信登录失败/(ㄒoㄒ)/~~:${res.meta.msg}`, 3000);
        }
      },
      "json"
    );
  });
  function saoma() {
    $('#saomaImg').text('')
    function uuid() {
      var s = [];
      var hexDigits = "0123456789abcdef";
      for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
      }
      s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
      s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
      s[8] = s[13] = s[18] = s[23] = "-";

      var uuid = s.join("");
      return (new Date).getTime() + "-" + uuid;
    }
    // 留心：state位置不能变，qrcode实参的text键要用
    let state = uuid()
    jQuery('#saomaImg').qrcode({
      render: "canvas",
      foreground: "#000",
      background: "#FFF",
      text: `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx5a9db0b452e8ca0b&redirect_uri=http://kg.zhaodashen.cn/mt/web/qr/login.jsp&response_type=code&scope=snsapi_base&state=${state}&connect_redirect=1#wechat_redirect`
    });
    clearInterval(t)
    t = setInterval(() => {
      // 参数：state  【必须】全球唯一的登录标识
      // 留心：state  是上面uuid()函数生成的
      $.post('http://kg.zhaodashen.cn/mt/web/qr/check.jsp', { state: state }, res => {
        console.log(res.meta)
        console.log(res.data)
        if (res.meta.state == 200) {
          // h5存储
          localStorage.setItem("uname", res.data.uname);
          localStorage.setItem("token", res.data.token);
          localStorage.setItem('expires', new Date().getTime() + 7 * 24 * 60 * 60 * 1000)
          clearInterval(t)
          // 重定向跳转
          // 提示登陆成功
          setTimeout(() => {
            location.href = './index.html'
          }, 50);
        }
      }, 'json')
    }, 1000)
  }
  // ### 扫码登录
  $('.account-login button:eq(2)').click(function () {
    saoma()
  })

  // 刷新二维码
  $('#saomaImg').click(function () {
    saoma()
  })
  $('.saoma-login button:eq(0)').click(function () {
    saoma()
  })
  //...
});
