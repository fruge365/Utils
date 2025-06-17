$(function () {
    let expires = (new Date).getTime() > localStorage.getItem("expires");
    let sessiontoken = sessionStorage.getItem('token')
    let localtoken = expires ? null : localStorage.getItem("token")
    let token = sessiontoken || localtoken
    let trade_no = getParams('sn')
    let amount = getParams('amount')
    $('.amount-price').text(amount)
    $('.payment-submit').click(function () {
        if ($('#thirdpart_pay_alipay').prop('checked')) {
            location.href = `http://kg.zhaodashen.cn/mt/web/alipay/pagepay/pagepay.jsp?trade_no=${trade_no}&amount=${amount}`
        } else {
            // location.href = `http://kg.zhaodashen.cn/mt/web/wxpay/native.jsp?out_trade_no=${trade_no}`
            // location.href = `../../weixin.html?trade_no=${trade_no}&amount=${amount}`

            // let trade_no = getParams("trade_no");
            // let amount = getParams("amount");
            // console.log(trade_no, amount);
            $.get(
                `http://kg.zhaodashen.cn/mt/web/wxpay/native.jsp?out_trade_no=${trade_no}`,
                {},
                (res) => {
                    console.log(res);
                    $('.weixinqr-modal').css('display','block')
                    // jQuery("#aaa").qrcode({
                    jQuery($('.modal-qr .box ')).qrcode({
                        render: "canvas", //也可以替换为table
                        foreground: "#000",
                        background: "#FFF",
                        text: res,
                    });
                },
                "text"
            );
            setInterval(() => {
                $.post(
                    `http://kg.zhaodashen.cn/mt/web/wxpay/ispay.jsp?out_trade_no=${trade_no}`,
                    {},
                    (res) => {
                        console.log("支付状态：", res.meta);
                        console.log("支付状态：", res.data);
                    },
                    "json"
                );
            }, 1000);
        }
    })
})