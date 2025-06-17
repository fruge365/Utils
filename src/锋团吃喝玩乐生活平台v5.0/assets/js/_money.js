// # 特效
$(".goods-items").click(function () {
  $(".goods-items").removeClass("active");
  $(this).addClass("active");
});

$(".custom input").on("input", function () {
  let val = $(this).val();
  val = val.replace(/\D/g, "");
  $(this).val(val);

  $(".goods-items").removeClass("active");
});

// # 支付

