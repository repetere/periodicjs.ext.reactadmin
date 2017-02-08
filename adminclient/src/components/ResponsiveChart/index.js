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
    chartTitle: PropTypes.string,
    margin: PropTypes.shape({
      top: PropTypes.number,
      right: PropTypes.number,
      left: PropTypes.number,
      bottom: PropTypes.number,
    })
  }),
};

const defaultProps = {
  chartType: 'BarChart',
  chartProps: {
    layout: 'horizontal',
    width: 800,
    height: 300,
  },
  chartTitle: 'No Title Set',
  xAxis: {
    dataKey: 'name'
  },
  yAxis: {},
  data: [],
  points: []
};

class ResponsiveChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chartType: props.chartType,
      chartProps: Object.assign({}, props.chartProps),
      chartTitle: props.chartTitle,
      data: props.data,
      points: props.points
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
        </recharts.LineChart>);
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
