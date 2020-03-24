import * as echarts from 'echarts';
export const trendOption = {
    title: {
        text: '浏览人数',
        textStyle: {
            fontSize: '18px'
        }
    },
    tooltip: {
        trigger: 'axis'
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: [
        {
            type: 'category',
            boundaryGap: false,
            data: ['2020-02-01', '2020-02-06', '2020-02-11', '2020-02-16', '2020-02-21', '2020-02-26', '2020-03-01']
        }
    ],
    yAxis: [
        {
            type: 'value',
            splitLine: {show: false}
        }
    ],
    series: [
        {
            name: '粉丝数目',
            type: 'line',
            stack: '总量',
            smooth: true,
            areaStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(
                        0, 0, 0, 1,
                        [
                            { offset: 0, color: '#7C95E7' },
                            { offset: 0.5, color: '#7C95E7' },
                            { offset: 1, color: '#fff' }
                        ]
                    )
                }
            },
            itemStyle: {
                normal: {
                    color: '#919FCC',
                    lineStyle: {
                        color: '#919FCC'
                    }
                }
            },

            data: [0, 472, 101, 920, 569, 200, 748]
        }
    ]
};

export const data = {
    week: {
      x: ['2020-02-01', '2020-02-06', '2020-02-11', '2020-02-16', '2020-02-21', '2020-02-26', '2020-03-01'],
      y: [0, 472, 101, 920, 569, 200, 748]
    },
    year: {
        x: ['2014', '2015', '2016', '2017', '2018', '2019', '2020'],
        y: [5000, 12000, 8900, 23456, 34567, 32000, 21000]
    },
    day: {
        x: ['2020-02-01', '2020-02-02', '2020-02-03', '2020-02-04', '2020-02-05', '2020-02-06', '2020-02-07'],
        y: [100, 120, 230, 251, 234, 121, 530]
    }
};

export const fansOption  = {
    tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)'
    },
    legend: {
        orient: 'vertical',
        left: 'right',
        top: 'middle',
        data: ['60后', '70后', '80后', '90后']
    },
    color: [ '#F8B98E', '#ACB5EE', '#B9E986', '#F5AFB7'],
    series: [
        {
            name: '粉丝占比',
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
                position: '',
                formatter: '{c}人 占比{d}%,',
                color: '#4C4C4C',
                fontSize: '14'
            },
            labelLine: {
                normal: {
                    show: true
                }
            },
            data: [
                {value: 369, name: '60后'},
                {value: 609, name: '70后'},
                {value: 807, name: '80后'},
                {value: 1218, name: '90后'}
            ]
        }
    ]
};
