function driver() {
  // 背景
  $("body").append(
    `<div class="driver-tipsBg" style="width: 100%; height: 821px; left: 0px; top: 0px; z-index: 1; background-color: rgb(0, 0, 0); opacity: 0.55; position: fixed;"></div>`
  );
  // // 提示框背景 & 定位失败
  $("body").append(
    `<div class="driver-tips1 driver-tipsbox" style="background-image: url(./assets/imgs/driver-searchTip.png); width: 300px;position: fixed;z-index: 2; height: 193px;top: 30%;left:30%;background-repeat: no-repeat;background-position: 0px -313px;"></div>`
  );
  $("body").append(
    `<div class="driver-tips1 driver-tipsFont1" style="background-image: url(./assets/imgs/driver-font1.png); width: 300px;position: fixed;z-index: 3;height: 193px;background-repeat: no-repeat;top: 30%;left:30%;margin-left: 30px;transform: rotate(-6deg);margin-top: 17px;"></div>`
  );

  $(".driver-tips1").click(function () {
    $(".driver-tips1").hide(600);
    // 箭头
    $("body").append(
      `<div class="driver-tips2 driver-tipsLook" style="background-image: url(./assets/imgs/driver-searchTip.png); width: 70px;position: fixed;z-index: 2;height: 46px;background-repeat: no-repeat;background-position: -193px -216px;left: 380px;top: 30px;"></div>`
    );
    // 提示框背景
    $("body").append(
      `<div class="driver-tips2 driver-tipsFont2Box" style="width: 316px;height: 129px;background:#fff;position: fixed;z-index: 3;border-radius: 50%;left: 450px;top: 9px;transform: rotate(8deg);"><div class="tipFont2" style="background-image: url(./assets/imgs/driver-font2.png); width: 300px;height: 193px;background-repeat: no-repeat;"></div></div>`
    );
    // 地区
    $("body").append(
      `<div class="driver-tips2 driver-tipsCity" style="background: url(./assets/imgs/driver-city.png) no-repeat; width: 361px;height: 76px; position: fixed;z-index: 3;border-radius: 10px;left: 10px;top: 15px;"></div>`
    );
  });

  $(".driver-tipsBg").click(function () {
    if ($(".driver-tipsFont1").css("display") == "block") return;
    $(".driver-tips2").hide(600);
    $(".driver-tipsBg").hide(600);
  });
}
