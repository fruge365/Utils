$(function(){
    // # tab选项卡切换特效
    $(".pay-type").click(function () {
        // 切换标题状态
        $(".pay-type").removeClass("payment-tab-0");
        $(".pay-type").addClass("payment-tab-1");
        $(this).addClass("payment-tab-0");
        // 获取索引
        let index = $(this).index();
        $(".pay-type-content").css("display", "none");
        $(".pay-type-content").eq(index).css("display", "block");
    });
    
})
