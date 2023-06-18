export const option = {
    tooltip: {},
    legend: {},
    title: {
      text: "报修工单数量趋势"
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
        stack: 'x',
        areaStyle: {},
      },
    ]
  };