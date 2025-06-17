// 修改弹框特效
$(".dialog-close").click(function () {
  $(".dialogs > .dialog-container").removeClass("fadeIn");
  $(".dialogs > .dialog-container").removeClass("fadeOut");
  $(".dialogs > .dialog-container").addClass("fadeOut");
});
$(".btn-cancel").click(function () {
  $(".dialogs > .dialog-container").removeClass("fadeIn");
  $(".dialogs > .dialog-container").removeClass("fadeOut");
  $(".dialogs > .dialog-container").addClass("fadeOut");
});
$(".setting-content > .item").click(function () {
  let index = $(this).index();
  $(".dialogs > .dialog-container").eq(index).removeClass("fadeOut");
  $(".dialogs > .dialog-container").eq(index).addClass("fadeIn");
});

// 密码强度
$(".newpassword").on("input", function () {
  // console.log($(this).val());
  let val = $(this).val();
  if (val.length) {
    $(".pwd-level .level").eq(0).addClass("level-0");
  } else {
    $(".pwd-level .level").eq(0).removeClass("level-0");
    return;
  }

  if (/[a-zA-Z]/.test(val)) {
    $(".pwd-level .level").eq(1).addClass("level-1");
  } else {
    $(".pwd-level .level").eq(1).removeClass("level-1");
    return;
  }

  if (/[a-z]/.test(val) && /[A-Z]/.test(val)) {
    $(".pwd-level .level").eq(2).addClass("level-2");
  } else {
    $(".pwd-level .level").eq(2).removeClass("level-2");
    return;
  }
});

// 上传预览特效
$(".preview").click(function () {
  $("#upload").trigger("click");
});
$("#upload").change(function () {
  let fObj = new FileReader();
  let img = document.getElementById("upload").files[0];
  fObj.readAsDataURL(img);
  fObj.onload = function (e) {
    $(".preview").css("background-image", `url(${this.result})`);
    $(".preview").css("background-repeat", `no-repeat`);
    $(".preview").css("background-size", `100%`);
  };
});

