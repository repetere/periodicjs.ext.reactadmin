import { Component } from 'react';
// import { Container, Content, } from 're-bulma';
import 'font-awesome/css/font-awesome.css';
import { getRenderedComponent, } from '../components/AppLayoutMap';

function getTestChart() {
  const data = [
    { name: 'Page A', uv: 4000, pv: 2400, amt: 2400 ,},
    { name: 'Page B', uv: 3000, pv: 1398, amt: 2210, },
    { name: 'Page C', uv: 2000, pv: 9800, amt: 2290 ,},
    { name: 'Page D', uv: 2780, pv: 3908, amt: 2000 ,},
    { name: 'Page E', uv: 1890, pv: 4800, amt: 2181 ,},
    { name: 'Page F', uv: 2390, pv: 3800, amt: 2500 ,},
    { name: 'Page G', uv: 3490, pv: 4300, amt: 2100, },
  ];

  return {
    component: 'recharts.LineChart',
    props: {
      width: 600,
      height: 300,
      data,
    },
    children: [ {
      component: 'recharts.XAxis',
      props: {
        dataKey:'name',
      },
    }, {
      component: 'recharts.YAxis',
    }, {
      component: 'recharts.CartesianGrid',
      props: {
        strokeDasharray:'3 3',
      },  
    }, {
      component: 'recharts.Tooltip',  
    }, {
      component: 'recharts.Legend',  
    }, {
      component: 'recharts.Line',
      props: {
        type: 'monotone',
        dataKey: 'pv',  
        stroke: '#8884d8',
        activeDot:{ r: 8, },
      },  
    }, {
      component: 'recharts.Line',
      props: {
        type: 'monotone',
        dataKey: 'uv',  
        stroke: '#82ca9d',
      },  
    },],
  };  
}


let DocumentationLayout = {
  component: 'Hero',
  props: { size: 'isFullheight', },
  children: [ {
    component: 'HeroBody',
    props:{},
    children: [ {
      component: 'Container',
      props:{},
      children:[
        {
          component: 'div',
          children: 'div text'
        },
        {
          component: 'Title',
          // props: {
          // },
            children: 'Documentation Page',
        }]
    }]
  }]
};

class Documentation extends Component {
  // render() {
  //   return (
  //     <Container>
  //       <Content>  
  //         <div>Documentation</div>
  //       </Content>  
  //     </Container>
  //   );
  // }
    // constructor(props) {
  //   super(props);
  //   console.log({ props });
  // }
  // componentWillReceiveProps(nextProps) {
  //   console.log('Login componentWillReceiveProps nextProps', nextProps);
  //   // this.setState(nextProps);
  // }
  render() {
    // console.log(this.props)
    return getRenderedComponent(DocumentationLayout);
  }
}

export default Documentation;
