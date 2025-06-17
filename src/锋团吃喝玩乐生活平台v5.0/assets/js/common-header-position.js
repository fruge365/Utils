$(function () {
  // ...

  // ### 📌定位技术（理解不用敲）
  // 3、避免重复定位
  let qf_city_id = localStorage.getItem("qf_city_id");
  if (!qf_city_id) {
    // 1、开启loading
    $("body").append(
      `<div class="locationLoading" style="width: 100%;height: 100%;position: fixed;z-index: 2;background-color: rgba(0,0,0,0.8);top: 0;display: flex;justify-content: center;align-items: center; flex-direction: column;font-size: 30px;color: #fff;">
        <style>
        @-webkit-keyframes mint-spinner-rotate {0% {-webkit-transform: rotate(0deg);transform: rotate(0deg)}to { -webkit-transform: rotate(1turn); transform: rotate(1turn)}}
        @keyframes mint-spinner-rotate {0% {-webkit-transform: rotate(0deg);transform: rotate(0deg)}to {-webkit-transform: rotate(1turn);transform: rotate(1turn)}}
        </style>
        <span style="display:inline-block;border: 4px solid transparent;border-top-color: rgb(204, 204, 204); border-left-color: rgb(204, 204, 204); border-bottom-color: rgb(204, 204, 204);  height: 32px; width: 32px;animation: mint-spinner-rotate .8s linear infinite;border-radius: 50%;margin-bottom:20px;"></span>
        <span>📌 城市定位中...</span>
    </div>`
    );
    // 2、通过腾讯地图API获取用户维度、经度
    const geolocation = new qq.maps.Geolocation(
      "J2VBZ-JD6CR-GWSWW-W52NP-WHEG5-VIFK3",
      "fengtuan"
    );
    geolocation.getLocation(
      (res) => {
        let { lat, lng, city } = res;
        // console.log(res); // 纬度、经度、城市名等等等
        // console.log(`获取成功：${lat},${lng}`);
        // alert(`获取成功：${lat},${lng}`);
        // 你的逻辑
        // - 2.1 ✅定位成功，获取后端仓库该城市对应唯一标识（目的：后期根据该标识查询这个城市的门店）
        $.get(
          "http://kg.zhaodashen.cn/mt/web/area/find.jsp",
          { city_name: city },
          (res) => {
            // console.log(res);
            // 有-存 city_name、city_id
            // 没有-就不存   不存其他地方会处理 你别管
            // 根据city请求接口获取城市编号
            if (res.meta.state == 200) {
              $(".locationLoading").remove();
              localStorage.setItem("qf_lat", lat);
              localStorage.setItem("qf_lng", lng);
              localStorage.setItem("qf_city_id", res.data.area_id);
              localStorage.setItem("qf_city_name", res.data.area_name);
            } else {
              // 万一腾讯地图的城市名、和后端仓库城市名不一致则也默认江苏
              // - ❌定位失败：则默认江苏：1、关闭定位loading、2-默认江苏、3-开启新手引导手动切换城市（下个需求安排）
              $(".locationLoading").remove();
              localStorage.setItem("qf_city_id", 16);
              localStorage.setItem("qf_city_name", "江苏");
              // alert("定位失败");
              driver();
            }
          },
          "json"
        );
      },
      (err) => {
        // console.log(err);
        // - 2.2 ❌定位失败：则默认江苏：1、关闭定位loading、2-默认江苏、3-开启新手引导手动切换城市（下个需求安排）
        $(".locationLoading").remove();
        localStorage.setItem("qf_city_id", 16);
        localStorage.setItem("qf_city_name", "江苏");
        // alert("定位失败");
        cocoMessage.error('定位失败', 3000);
        driver();
      }
    );
  }

  // ...
});
