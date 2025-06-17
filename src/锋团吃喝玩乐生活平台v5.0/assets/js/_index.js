$(function () {
  // ...

  // ### 首页导航特效：显示子导航
  $(".banner .cate-content").on("mouseenter", ".nav-li", function () {
    $(".banner .cat2").show();
    let index = $(this).index();
    $(".banner .cat2>div").hide();
    $(".banner .cat2>div").eq(index).show();
  });
  $(".banner .cate-content").on("mouseleave", function () {
    $(".banner .cat2").hide();
    $(".banner .cat2>div").hide();
  });

  // ...
});
