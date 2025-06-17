//定义地图中心点坐标
let lat = localStorage.getItem("lat") || "39.98412";
let lng = localStorage.getItem("lng") || "116.307484";
var center = new TMap.LatLng(lat, lng);
//定义map变量，调用 TMap.Map() 构造函数创建地图
var map = new TMap.Map(document.querySelector(".map"), {
  center: center, //设置地图中心点坐标
  zoom: 10, //设置地图缩放级别
  pitch: 43.5, //设置俯仰角
  rotation: 45, //设置地图旋转角度
});

function createMapFn(data) {
  console.log(data);

  //初始化marker
  var marker = new TMap.MultiMarker({
    // id: "marker-layer", //图层id
    map: map,
    styles: {
      //点标注的相关样式
      marker: new TMap.MarkerStyle({
        width: 25,
        height: 35,
        anchor: { x: 16, y: 32 },
        src: "https://mapapi.qq.com/web/lbs/javascriptGL/demo/img/markerDefault.png",
      }),
    },
    geometries: data.map((item, index) => {
      return {
        //点标注数据数组
        id: `demo${index}`,
        styleId: "marker",
        position: new TMap.LatLng(item.lat, item.lng),
        properties: {
          title: "marker",
        },
      };
    }),
  });

  // 监控滚动条滚动
  window.onscroll = function () {
    // 1 获取当前滚动条位置
    let scrollTop =
      document.documentElement.scrollTop || document.body.scrollTop;
    // 2 获取所有门店
    let storeObjs = document.querySelectorAll(".store > li");
    // 3 遍历
    storeObjs.forEach((item) => {
      // 4 判断
      // console.log(item.offsetTop, scrollTop);
      // 门店  滚动条 0 1  3  5 10
      // a 10   滚动条>门店10 && 滚动条<= 10+150=160
      // b 160  滚动条>门店160 && 滚动条<= 160+150=310
      // c 310  滚动条>门店310 && 滚动条<= 310+150=460
      let storeTop = item.offsetTop;
      if (scrollTop >= storeTop && storeTop <= storeTop + 150) {
        let lat = $(item).attr("lat");
        let lng = $(item).attr("lng");
        if (!lat || !lng) return;
        map.setCenter(new TMap.LatLng(lat, lng)); //中心
        map.setZoom(18); //比例
      }
    });
  };
}
