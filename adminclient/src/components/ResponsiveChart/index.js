import React, { Component, PropTypes, } from 'react';
import * as rebulma from 're-bulma';
import 'font-awesome/css/font-awesome.css';
import styles from '../../styles';
import * as recharts from 'recharts';

const propTypes = {
  chartType: PropTypes.oneOf(['LineChart', 'BarChart', 'AreaChart', 'ComposedChart', 'ScatterChart', 'PieChart', 'RadarChart', 'RadialBarChart', 'Treemap',]),
  chartProps: PropTypes.shape({
    layout: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number,
    data: PropTypes.object,
    margin: PropTypes.shape({
      top: PropTypes.number,
      right: PropTypes.number,
      left: PropTypes.number,
      bottom: PropTypes.number,
    })
  }),
};

const defaultProps = {
  chartType: 'PieChart',
  chartProps: {
    layout: 'horizontal',
    width: 800,
    height: 300,
  },
  xAxis: {
    dataKey: 'name'
  },
  yAxis: {},

};

class ResponsiveChart extends Component {
  constructor(props) {
    super(props);

    const data = [
      { name: 'Page A', uv: 4000, pv: 2400, amt: 2400 },
      { name: 'Page B', uv: 3000, pv: 1398, amt: 2210 },
      { name: 'Page C', uv: 2000, pv: 9800, amt: 2290 },
      { name: 'Page D', uv: 2780, pv: 3908, amt: 2000 },
      { name: 'Page E', uv: 1890, pv: 4800, amt: 2181 },
      { name: 'Page F', uv: 2390, pv: 3800, amt: 2500 },
      { name: 'Page G', uv: 3490, pv: 4300, amt: 2100 },
    ];

    // const points = [
    //   { dataKey: 'uv', fill: '#8884d8' },
    //   { dataKey: 'pv', fill: '#82ca9d' },
    // ];

    //Pie Chart
    const points = [
      { name: 'Group A', value: 400 },
      { name: 'Group B', value: 300 },
      { name: 'Group C', value: 300 },
      { name: 'Group D', value: 200 }
    ];

    // ComposedChart
    // const points = {
    //   area: {
    //     type: 'monotone',
    //     dataKey: 'amt',
    //     fill: '#8884d8',
    //     stroke: '#8884d8'
    //   },
    //   bar: {
    //     dataKey: 'pv',
    //     barSize: 20,
    //     fill: '#413ea0'
    //   },
    //   line: {
    //     type: 'monotone',
    //     dataKey: 'uv',
    //     stroke: '#ff7300'
    //   }
    // };

    this.state = {
      chartType: props.chartType,
      chartProps: Object.assign({}, props.chartProps, { margin: { top: 5, right: 30, left: 20, bottom: 5 } }),
      data,
      points
    };
  }

  render() {
    
    if (this.state.chartType === 'BarChart') {
      return (
        <recharts.BarChart {...this.state.chartProps} data={this.state.data}>
          <recharts.XAxis dataKey="name" />
          <recharts.YAxis />
          <recharts.CartesianGrid strokeDasharray="0 0" />
          <recharts.Tooltip />
          <recharts.Legend />
          {this.state.points.map((bar, idx) => {
            return (
              <recharts.Bar {...bar} key={idx} />
            );
          })}
        </recharts.BarChart>);
    }

    if (this.state.chartType === 'LineChart') {
      return (
        <recharts.LineChart {...this.state.chartProps} data={this.state.data}>
          <recharts.XAxis dataKey="name" />
          <recharts.YAxis />
          <recharts.CartesianGrid strokeDasharray="3 3" />
          <recharts.Tooltip />
          <recharts.Legend />
          {this.state.points.map((line, idx) => {
            return (
              <recharts.Line {...line} key={idx} />
            );
          })}          
        </recharts.LineChart>        
      );
    }

    if (this.state.chartType === 'ComposedChart') {
      return (
        <recharts.ComposedChart {...this.state.chartProps} data={this.state.data}>
          <recharts.XAxis dataKey="name" />
          <recharts.YAxis />
          <recharts.Tooltip />
          <recharts.Legend />
          <recharts.CartesianGrid stroke="#f5f5f5" />
          <recharts.Area {...this.state.points.area} />
          <recharts.Bar {...this.state.points.bar} />
          <recharts.Line {...this.state.points.line} />
        </recharts.ComposedChart>
      );
    }

    if (this.state.chartType === 'PieChart') {
      const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

      const RADIAN = Math.PI / 180;                    
      const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x  = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);
        return (
          <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} 	dominantBaseline="central">{`${(percent * 100).toFixed(0)}%`}</text>);
      };
      const points = this.state.points;
      return (
        <recharts.PieChart width={800} height={400}>
          <recharts.Pie {...this.state.chartProps} label={renderCustomizedLabel}>
            {
              points.map((entry, index) => <recharts.Cell fill={COLORS[index % COLORS.length]}/>)
            }
          </recharts.Pie>
        </recharts.PieChart>
      );      
    }
  }
}

ResponsiveChart.propTypes = propTypes;
ResponsiveChart.defaultProps = defaultProps;

export default ResponsiveChart;
