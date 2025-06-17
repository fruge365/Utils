;(function() {
    // 步骤3：创建echarts实例
    let myChart = echarts.init(document.querySelector('.box-m2'))

    // 步骤4：定义配置（指定图表的配置项和数据）
    let option = {
    legend: {
        top: 20,
        data: ['图例1', '图例2', '完成率']
    },
    xAxis: [
        {
        axisTick:{ show:false },
        type: 'category',
        data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
        }
    ],
    grid: {
        bottom: 20,
    },
    yAxis: [
        {
        type: 'value',
        name: '金额',
        max: 50,
        min: 0,
        axisLine:{ show:true },
        axisTick:{ show:true },
        splitLine:{ show:false },
        },
        {
        type: 'value',
        name: '完成率',
        max: 100,
        min: 0,
        axisLine:{ show:true },
        splitLine:{ show:false },
        }
    ],
    series: [
        {
        name: '图例1',
        type: 'bar',
        data: [11,2,33,11,3,2,33,22,12,51,31,22],
        
        },
        {
        name: '图例2',
        type: 'bar',
        data: [11,22,12,31,3,21,33,22,12,51,31,22],
        barGap:0,
        },
        {
        name: '完成率',
        type: 'line',
        smooth:true,
        data: [21,2,33,11,3,2,11,12,22,31,11,13]
        }
    ]
    };

    // 步骤5：使用刚指定的配置项和数据显示图表
    myChart.setOption(option)

    // window.onresize = () => {
    //     myChart.resize()
    // }

    window.addEventListener('resize', () => {
        myChart.resize()
    })
})()