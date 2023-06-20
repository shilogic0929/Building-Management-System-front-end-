export const option = {
    tooltip: {},
    legend: {},
    color: [
        '#c23531',
        '#2f4554',
        '#61a0a8',
        '#d48265',
        '#91c7ae',
        '#749f83',
        '#ca8622',
        '#bda29a',
        '#6e7074',
    ],
    title: {
      text: "报修工单数量"
    },
    xAxis: {
      data: ['2023-5-30', '2023-5-31', '2023-6-01', '2023-5-29', '2023-6-04', '2023-6-12']
    },
    yAxis: {},
    series: [
      {
        name: "未处理报修数",
        data: [30, 22, 28, 43, 49, 30],
        type: 'line',
        color: [
            '#dd6b66',
        ],
        stack: 'x',
        areaStyle: {},
      },
      {
        name: "已处理报修数",
        data: [30, 22, 28, 43, 49, 30],
        type: 'line',
        color: [
            '#18D070'
        ],
        stack: 'x',
        areaStyle: {},
      },
    ]
  };