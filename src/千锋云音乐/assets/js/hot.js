// 热门歌单滚动效果
setInterval(function(){     //间隔计时器
    let UlObj = document.querySelector('.hot ul')       //获取ul
    let marginLeft = parseInt(UlObj.style.marginLeft)   //从网页获取的是字符串，需要强制转换成数值型
    marginLeft--
    if(marginLeft <= -2032){        //无缝滚动
        UlObj.style.marginLeft = '0px'  //重置
    }else{
        UlObj.style.marginLeft = marginLeft + 'px'
    }
},10)