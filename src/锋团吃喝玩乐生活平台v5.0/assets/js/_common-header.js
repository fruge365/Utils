$(function () {
  // ...

  // 📌显示当前定位城市
  let city_name = localStorage.getItem("qf_city_name") || "请手动选择";
  $("header .city .choose-city").html(city_name);

  // 🐭切换城市：移入显示
  $("header .area .change-city").mouseover(function () {
    $("header .area .box").show();
  });
  // 🐭切换城市：移出隐藏
  $("header .area").mouseleave(function () {
    $("header .area .box").hide();
  });

  // 切换城市：tab标题切换
  $("header .tab li").click(function () {
    let index = $(this).index();
    // 标题
    $(this).siblings().removeClass("cur");
    $(this).addClass("cur");
    // 内容
    $("header .tab-content").hide();
    $("header .tab-content").eq(index).show();
  });

  // 切换城市：tab内容切换：显示下一个
  $("header .tab-content").on("click", "a", function () {
    // 数据
    let title = $(this).text();
    let index = $(this).parents(".tab-content").index();
    // 当前选中
    $("header .tab-content")
      .eq(index - 1)
      .find(".city")
      .removeClass("cur");
    $(this).parents(".city").addClass("cur");
    // 标题
    $("header .tab li")
      .eq(index - 1)
      .text(title);
    if (index == 3) return;
    $("header .tab li").removeClass("cur");
    $("header .tab li").eq(index).addClass("cur");
    // 下一个显示
    $("header .tab li").eq(index).show();
    $("header .tab-content")
      .eq(index - 1)
      .hide();
    $("header .tab-content").eq(index).show();
  });

  // 切换城市：tab内容选择，并保存起来
  $("header .tab-content").on("click", "span", function () {
    let title = $(this).prev().text();
    let areaId = $(this).parents(".city").attr("area-id");
    // $(".area .box").hide();
    // $('.city .choose-city').html(title)
    localStorage.setItem("qf_city_name", title);
    localStorage.setItem("qf_city_id", areaId);
    location.reload();
  });

  // ...
});
