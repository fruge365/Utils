// 左上角第一个
; (function () {
    // 步骤3：创建echarts实例
    let myChart = echarts.init(document.querySelector('.box:nth-of-type(1)'))
    console.log(myChart);

    // 步骤4：定义配置（指定图表的配置项和数据）
    let option = {
        grid: {
            left: '3%',
            right: '4%',
            bottom: '-10%',
            containLabel: true
        },
        xAxis: {
            // type: 'category',
            // data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            show: false,
        },
        yAxis: {
            // type: 'value'
            type: 'category',
            data: ['字段名称', '字段名称', '字段名称', '字段名称', '字段名称', '字段名称', '字段名称'],
            // 坐标轴刻度标签的：颜色#9a9fb4、字体14px
            axisLabel: {
                color: "#9a9fb4",
                fontSize: "14"
            },
            // 坐标轴轴线：隐藏
            "axisLine": {
                "show": false
            },
            // 坐标轴刻度：隐藏
            "axisTick": {
                "show": false
            },
        },
        series: [
            {
                data: [120, 99, 30, 80, 70, 110, 130],
                type: 'bar',
                showBackground: true,
                // backgroundStyle: {
                //  color: 'rgba(180, 180, 180, 0.2)'
                // },

                // 柱状图颜色
                color: '#6abaf2',
                backgroundStyle: { // 柱状图背景色
                    color: '#1e2a6a'
                },
                // 图形上的文本标签
                label: {
                    show: true,
                    position: "outside", // 定位外部
                    color: '#65b1e9',
                    fontWeight: 'bold',
                    formatter: "{c}%"
                },
                barWidth: 15,//柱图宽度
            }
        ]
    };

    // 步骤5：使用刚指定的配置项和数据显示图表
    myChart.setOption(option)


    // window.onresize = function () {
    //     myChart.resize()
    // }
    window.addEventListener('resize', () => {
        myChart.resize()
    })
})()