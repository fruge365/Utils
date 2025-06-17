$(function () {
  // ### 调用函数getParams
  let cat_id = getParams("cat_id");
  let attr = getParams("attr") || "";
  let pageno = getParams("pageno") || 1;
  let order = getParams("order") || "";
  if (!cat_id) location.href = "./404.html";
  // ### 封装筛选跳转url地址（必须放到全局变量下面）
  function filterJump({
    cat_id: new_cat_id,
    pageno: new_pageno,
    order: new_order,
    attr: new_attr,
  }) {
    let url = './waimai.html'
    url += `?cat_id=${new_cat_id || cat_id}`;
    url += `&pageno=${new_pageno || pageno}`;
    if (order || new_order) url += `&order=${new_order || order}`;
    if (new_attr) {
      let temp = new_attr.split(':');
      let tempAttr = attr.split(',').filter((item) => {
        if (!item) return
        return !item.includes(temp[0])
      })
      //重置新数据
      if (temp[1] != 'remove') tempAttr.push(new_attr)
      url += `&attr=${tempAttr.join(',')}`
    }
    return url
  }
  $('.tags a').each((i, item) => {
    let orderArr = ['comment', 'sell', 'location']
    $(item).attr('href', filterJump({ order: orderArr[i] }))
  })

  // ### 外卖门店列表
  //发送异步请求
  $.get(
    "http://kg.zhaodashen.cn/mt/web/waimai/cate.jsp",
    { cat_id },
    (res) => {
      if (res.meta.state === 200) {
        //清空导航栏分类
        $(".filter .condition").text("");
        $.each(res.data, (index, item) => {
          //子
          let twoHtml = "";
          $.each(item.attr_value.split(","), (twoIndex, twoItem) => {
            if (item.attr_name === "分类") {
              twoHtml += `<li><a id='${item.attr_id.split(",")[twoIndex]
                } href="javascript:;">${twoItem}</a></li>`;
            } else {
              twoHtml += `<li><a href="javascript:;">${twoItem}</a></li>`;
            }
          });
          let allHtml = ''
          if (item.attr_name == '分类') {
            allHtml = `<div class = 'all on' onclick = 'location.href='${filterJump({
              cat_id: 2,
            })}''>全部</div>`;
          } else {
            allHtml = `<div class = 'all on ' onclick = 'location.href='${filterJump({ attr: item.attr_name + ':remove', })}''>全部</div>`;
          }
          //父
          let html = `
                <div class="cont clear">
                  <div class="classification">${item.attr_name}</div>
                  ${allHtml}
                  <ul class="more clear">
                  ${twoHtml}
                  </ul>
                  </div>
                `;
          $(".filter .condition").append(html);
        });

        // ### 默认选中效果
        //移除默认效果
        $('.condition .cont:eq(0) .all').removeClass(`on`);
        let cateTemp = $('.condition .cont:eq(0) ul li').find(`a[id="${cat_id}"]`)
        // 判断是指定还是全部
        if (cateTemp.length) {
          cateTemp.addClass('on')
        } else {
          $('.condition .cont:eq(0) .all').addClass(`on`);
        }
        let attrTemp = attr.split(',');
        $.each(attrTemp, (i, item) => {
          let temp = item.split(':');
          let row = $(`.condition .cont .classification:contains(${temp[0]})`).parents('.cont')
          row.find('.on').removeClass(`on`);

          let cola = row.find(`a:contains(${temp[1]})`)
          if (cola && cola.length >= 1) {
            cola.addClass('on')
          } else {
            row.parents('.all').addClass(`on`)
          }
        })
        // 排序
        let orderArr = ['comment', 'sell', 'location'];
        $('.tags span a').addClass('color', '#222')
        let orderIndex = orderArr.indexOf(order);
        if (orderIndex !== -1) {
          $(`.tags span a:eq(${orderIndex})`).css('color', 'rgb(19,209,190)');
        }

        //...
      } else {
        console.log("失败了", res.meta.msg);
      }
    },
    "json"
  );

  // ### 外卖门店列表
  $.get(
    "http://kg.zhaodashen.cn/mt/web/waimai/store.jsp",
    {
      pageno: 1, //默认第一页
      pagesize: 10, //每页条数
      cat_id, //分类编号
      area_id: localStorage.getItem("qf_city_id"),
      lat: localStorage.getItem("qf_lat"), //纬度
      lng: localStorage.getItem("qf_lng"), //经度
      attr: "", //筛选属性
      order: "", //排序规则
    },
    (res) => {
      //发送异步请求，清空、遍历、追加
      $(".store").text("");
      console.log("拿到数据了", res);
      $.each(res.data.list, (index, item) => {
        //评分 = 好评 / 总评
        let comment = parseInt(
          (item.comment_good_count / item.comment_count) * 100
        );
        //距离
        if (isNaN(comment)) comment = 0;
        let distance = getDistance(item.lat, item.lng);
        let tags = item.tags.split(",").map((item) => {
          return `#${item}# &nbsp;`;
        });
        $(".store").append(`<li class="clear btm" lng = '${item.lng}' lat = '${item.lat}' data-ad="">
              <div class="img">
                <a href="./waimai-detail.html?store_id=${item.id}">
                  <div class="fl-count">${index + 1}</div>
                  <div class="imgbox">
                    <img src="http://tmp00001.zhaodashen.cn/${item.img}" />
                  </div>
                </a>
              </div>
              <div class="info">
                <a href="./waimai-detail.html?store_id=${item.id}">
                  <h4>${item.title}</h4>
                  <div class="source clear">
                    <div class="star-cont">
                      <ul class="stars-ul">
                        <li><i class="iconfont icon-pingfen"></i></li>
                        <li><i class="iconfont icon-pingfen"></i></li>
                        <li><i class="iconfont icon-pingfen"></i></li>
                        <li><i class="iconfont icon-pingfen"></i></li>
                        <li><i class="iconfont icon-pingfen"></i></li>
                      </ul>
                      <ul class="stars-ul stars-light" style="width: ${comment}px">
                        <li><i class="iconfont icon-pingfen"></i></li>
                        <li><i class="iconfont icon-pingfen"></i></li>
                        <li><i class="iconfont icon-pingfen"></i></li>
                        <li><i class="iconfont icon-pingfen"></i></li>
                        <li><i class="iconfont icon-pingfen"></i></li>
                      </ul>
                    </div>
                    <p>
                      ${comment}分
                      <span>${item.comment_count}条评论</span>
                    </p>
                  </div>
                  <p class="desc">
                    ${item.address}
                    <span>起送￥${item.start_price}、夜间配送￥${item.send_price}、人均￥${item.avg_price}、${distance}km</span>
                  </p>
                  <div class="other"></div>
                  <span>
                    ${tags.join("")}
                  </span>
                </a>
              </div>
            </li>`);
      });
      //### 分页
      let page1 = new Page(".mt-pagination", {
        pageTag: {
          first: "首页",
          prev: "上一页",
          list: null,
          next: "下一页",
          last: "末页",
        },
        pageInfo: {
          pageNum: 1,
          // pageNum: pageno,
          pageSize: 5,
          totalData: res.data.total,
        },
        callback: (pagenum) => {
          location.href = filterJump({
            pageno: pagenum,
          })
          // console.log("点击开始分页啦:", pagenum);

        },
      },
        createMapFn(res.data.list)
      );
      //...
    },
    "json"
  );
  //...
});
