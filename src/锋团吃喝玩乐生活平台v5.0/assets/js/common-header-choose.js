$(function () {
  // ...

  // 图标
  let iconfont = [
    "icon-banbenqiehuan",
    "icon-qiehuan",
    "icon-qiehuanchengshi",
    "icon-qiehuan1",
    "icon-qiehuan2",
    "icon-changyong_qiehuan",
    "icon-qiehuan3",
  ];

  // ### 手动选择城市
  // 默认省份数据
  // 打开网页就请求接口
  $.get(
    "http://kg.zhaodashen.cn/mt/web/area/index.jsp",
    {
      type: "一级",
      pid: 1,
    },
    (res) => {
      // 清空内容
      $("header .tab-content:eq(0)").text("");
      // 遍历数据
      $.each(res.data, (i, item) => {
        let temp = `<div class="city" area-id="${item.area_id}">
            <a href="javascript:;">${item.area_name}</a>
            <span title="选择">
            <i class="iconfont ${iconfont[random(0, iconfont.length - 1)]}"></i>
            </span>
        </div>`;
        // 把数据追加到页面
        $("header .tab-content:eq(0)").append(temp);
      });
    },
    "json"
  );

  // ### 二、三级城市
  // 绑定点击事件，事件委托
  $("header .area .tab-content").on("click", "a", function () {
    // 继续请求接口
    // 获取参数
    let index = $(this).parents(".tab-content").index(); //.index()这个元素的索引
    // console.log(index);
    if ([1, 2].indexOf(index) === -1) return;
    let type = ["二级", "三级"][index - 1];
    let pid = $(this).parents(".city").attr("area-id");
    // 发送异步请求
    $.get(
      "http://kg.zhaodashen.cn/mt/web/area/index.jsp",
      {
        type,
        pid,
      },
      (res) => {
        // 清空原有内容
        $(`header .tab-content`).eq(index).text("");
        // 遍历
        $.each(res.data, (i, item) => {
          let temp = `<div class="city" area-id="${item.area_id}">
            <a href="javascript:;">${item.area_name}</a>
            <span title="选择">
            <i class="iconfont ${iconfont[random(0, iconfont.length - 1)]}"></i>
            </span>
          </div>`;
          // 追加
          $(`header .tab-content`).eq(index).append(temp);
        });
      },
      "json"
    );

    // ...
  });

  // ...
});
