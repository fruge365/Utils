// 定义结构
function Page(el, options = {}) {
  // 公共属性
  this.el = document.querySelector(el);
  this.options = options;

  // 过滤
  this.options.pageInfo.totalPage = Math.ceil(
    this.options.pageInfo.totalData / this.options.pageInfo.pageSize
  );

  // 启动
  this.init();
}

// 启动
Page.prototype.init = function () {
  // 动作
  // 绑定事件
  this.bindEvent();
  // 设置默认值
  // 创建分页标签
  this.createTag();
  // 创建分页页码（推荐 写在 创建分页标签 中 语义化  现有 创建分页标签 才能有 分页页码
  // ...
};

// 绑定事件
Page.prototype.bindEvent = function () {
  // 1. 获取【当前】盒子
  // 2. 绑定点击事件
  // this.el.onclick = function (e) {
  this.el.onclick = (e) => {
    // 3. 事件处理函数中（1更新页码，2清空当前盒子创建标签）

    // 3.1 获取evt、获取target
    let evt = e || window.event;
    // 3.2 判断是不是P标签 nodeName
    let target = evt.target || evt.srcElement;
    // console.log(target)
    // 3.3 还得判断是首页、还是下一页等等
    if (target.nodeName === "P") {
      // console.log(target.innerText)

      // 首页
      // 上一页
      // 下一页
      // 末页

      // 数字
      // ...
      // 隐藏的P 里面有 【HTML、数字、...】  数字、...

      switch (target.innerText) {
        case this.options.pageTag.first:
          this.options.pageInfo.pageNum = 1;
          break;
        case this.options.pageTag.prev:
          if (this.options.pageInfo.pageNum === 1) return;
          this.options.pageInfo.pageNum--;
          break;
        case this.options.pageTag.next:
          if (this.options.pageInfo.pageNum === this.options.pageInfo.totalPage)
            return;
          this.options.pageInfo.pageNum++;
          break;
        case this.options.pageTag.last:
          this.options.pageInfo.pageNum = this.options.pageInfo.totalPage;
          break;
        default:
          // 数字
          // ...
          // 隐藏的P 里面有 【HTML、数字、...】

          // console.log(target.innerText)
          // console.log(target.innerHTML)

          if (parseInt(target.innerHTML) > 0) {
            // this.options.pageInfo.pageNum = target.innerHTML
            // 留心：上述不能直接赋值
            // 原因：只要从页面获取的数据就是字符串 ！！！
            this.options.pageInfo.pageNum = parseInt(target.innerHTML);
          }
          break;
      }
      // 盒子内容重新渲染
      this.createTag();

      if (this.options.callback) {
        this.options.callback(this.options.pageInfo.pageNum);
      }
    }
  };
};

// 分页标签
Page.prototype.createTag = function () {
  // 0 清空盒子内容
  this.el.innerHTML = "";
  // 1 获取pageTag对象
  let pageTag = this.options.pageTag;
  // 2 遍历pageTag对象
  for (let key in pageTag) {
    this.createP("p", pageTag[key], this.el, true);
  }

  // 禁用
  let titles = this.el.querySelectorAll("p");
  if (this.options.pageInfo.pageNum <= 1) {
    titles[0].style.cursor = "default";
    titles[1].style.cursor = "default";
  }
  if (this.options.pageInfo.pageNum >= this.options.pageInfo.totalPage) {
    titles[3].style.cursor = "default";
    titles[4].style.cursor = "default";
  }

  // 3. 创建页码
  this.createNum();
};

// 分页页码
// 瑕疵1：去掉边框
// 瑕疵2：代码冗余
// 瑕疵3：默认选中
// 瑕疵4：页码算法（1 总页数不准确、2 总页数小于7
// 瑕疵5：总页数不准确
// 瑕疵6：总页数小于7
Page.prototype.createNum = function () {
  // 1 获取第3个分页标签
  let tag3Obj = this.el.querySelector("p:nth-child(3)");
  tag3Obj.style.border = "none";
  tag3Obj.style.margin = "0px";
  tag3Obj.style.padding = "0px";
  // 2 循环创建6个页码 并 追加
  // 发现：当前页不同显示的效果也不同
  // 因此：判断当前是第几页 然后显示对应的效果
  // for (let i = 1; i <= 4; i++) {
  //     this.createP('p', i, tag3Obj)
  // }

  // 2. 循环创建p标签 追加到 1 中
  // for (let i = 1; i < 8; i++) {
  //     this.createP('p', i, tag3Obj)
  // }
  // 1 2 3 4 5 ... 99 100  	     pageNum < 5
  // 1 2 3 4 5 6 7 ... 99 100     pageNum == 5
  // 1 2 ... 4 5 6 7 8 .. 99 100  pageNum > 5 && pageNum < 总页数-4
  // 1 2 ... 96 97 98 99 100      pageNum >= 总页数-4
  let pageNum = this.options.pageInfo.pageNum;
  let totalPage = this.options.pageInfo.totalPage;

  if (totalPage < 7) {
    for (let i = 1; i <= totalPage; i++) this.createP("p", i, tag3Obj);
  } else if (pageNum < 5) {
    for (let i = 1; i <= 5; i++) this.createP("p", i, tag3Obj);
    this.createP("p", "...", tag3Obj);
    this.createP("p", totalPage - 1, tag3Obj);
    this.createP("p", totalPage, tag3Obj);
  } else if (pageNum == 5) {
    for (let i = 1; i <= 7; i++) this.createP("p", i, tag3Obj);
    this.createP("p", "...", tag3Obj);
    this.createP("p", totalPage - 1, tag3Obj);
    this.createP("p", totalPage, tag3Obj);
  } else if (pageNum > 5 && pageNum < totalPage - 4) {
    for (let i = 1; i <= 2; i++) this.createP("p", i, tag3Obj);
    this.createP("p", "...", tag3Obj);
    this.createP("p", pageNum - 2, tag3Obj);
    this.createP("p", pageNum - 1, tag3Obj);
    this.createP("p", pageNum, tag3Obj);
    this.createP("p", pageNum + 1, tag3Obj);
    this.createP("p", pageNum + 2, tag3Obj);
    this.createP("p", "...", tag3Obj);
    this.createP("p", totalPage - 1, tag3Obj);
    this.createP("p", totalPage, tag3Obj);
  } else if (pageNum >= totalPage - 4) {
    for (let i = 1; i <= 2; i++) this.createP("p", i, tag3Obj);
    this.createP("p", "...", tag3Obj);
    for (let i = totalPage - 4; i <= totalPage; i++)
      this.createP("p", i, tag3Obj);
  }
};

Page.prototype.createP = function (tagName, content, fatherObj, title) {
  // 创建标签
  let pObj = document.createElement(tagName);
  pObj.innerText = content;
  pObj.style.border = "solid 1px #e5e5e5";
  pObj.style.margin = "0 5px";
  pObj.style.padding = "10px 15px";
  pObj.style.textAlign = "center";
  pObj.style.display = "inline-block";
  pObj.style.color = "#fff";
  pObj.style.cursor = "pointer";
  if (!title) {
    pObj.style.background = "#13d1be";
  } else {
    pObj.style.color = "#999";
  }
  // 默认选中页码
  if (content == this.options.pageInfo.pageNum) {
    pObj.style.background = "orange";
    pObj.style.cursor = "default";
  }
  // 3 将 标签 追加到 【当前】盒子中
  fatherObj.appendChild(pObj);
};
