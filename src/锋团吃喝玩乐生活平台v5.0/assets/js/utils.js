/**
 * 随机指定范围数字🔢
 * @param {number} min 最小值
 * @param {number} max 最大值
 * @returns number
 */
function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

/**
 * 获取地址栏参数
 * @param {string} key
 * @returns
 */
 function getParams(key) {
  // 是截取当前 url 地址？后面所有的内容。
  let query = window.location.search.substring(1);
  let params = decodeURI(query).split("&");
  for (let i = 0; i < params.length; i++) {
    let temp = params[i].split("=");
    if (temp[0] == key) return temp[1];
  }
  return null;
}

/**
 * 获取地址栏参数
 * @param {*} variable
 * @returns
 */
function getQueryVariable(variable) {
  let query = window.location.search.substring(1);
  let vars = query.split("&");
  for (let i = 0; i < vars.length; i++) {
    let pair = vars[i].split("=");
    if (pair[0] == variable) return pair[1];
  }
  return false;
}

/**
 * 转换弧度
 * @param d
 * @returns {number}
 */
function getRad(d) {
  var PI = Math.PI;
  return (d * PI) / 180.0;
}

/**
 * 根据经纬度计算两点间距离
 * @param lat1
 * @param lng1
 * @param lat2
 * @param lng2
 * @returns {number|*}
 * @constructor
 */
function distance(lat1, lng1, lat2, lng2) {
  var f = getRad((lat1 + lat2) / 2);
  var g = getRad((lat1 - lat2) / 2);
  var l = getRad((lng1 - lng2) / 2);
  var sg = Math.sin(g);
  var sl = Math.sin(l);
  var sf = Math.sin(f);
  var s, c, w, r, d, h1, h2;
  var a = 6378137.0; //The Radius of eath in meter.
  var fl = 1 / 298.257;
  sg = sg * sg;
  sl = sl * sl;
  sf = sf * sf;
  s = sg * (1 - sl) + (1 - sf) * sl;
  c = (1 - sg) * (1 - sl) + sf * sl;
  w = Math.atan(Math.sqrt(s / c));
  r = Math.sqrt(s * c) / w;
  d = 2 * w * a;
  h1 = (3 * r - 1) / 2 / c;
  h2 = (3 * r + 1) / 2 / s;
  s = d * (1 + fl * (h1 * sf * (1 - sg) - h2 * (1 - sf) * sg));
  if (s >= 1000 && s <= 99000) {
    var kilometer = s / 1000;
    s = kilometer.toFixed(1) + "km";
  } else if (s > 99000) {
    s = ">99km";
  } else {
    s = Math.round(s) + "m";
  }
  // s = s/1000;
  // s = s.toFixed(2);//指定小数点后的位数。
  return s;
}

/**
 * 获取两点之间的举例
 * @param {Number} lng  经度
 * @param {Number} lat  纬度
 * @returns
 */
function getDistance(lng, lat) {
  let lng2 = localStorage.getItem("lng");
  let lat2 = localStorage.getItem("lat");
  if (!lng2 || !lat2) return "未准确定位";

  return distance(
    parseFloat(lng),
    parseFloat(lat),
    parseFloat(lng2),
    parseFloat(lat2)
  );
}
