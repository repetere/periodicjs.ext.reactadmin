'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

require('font-awesome/css/font-awesome.css');

var _AppLayoutMap = require('../components/AppLayoutMap');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import { Container, Content, } from 're-bulma';
function getTestChart() {
  var data = [{ name: 'Page A', uv: 4000, pv: 2400, amt: 2400 }, { name: 'Page B', uv: 3000, pv: 1398, amt: 2210 }, { name: 'Page C', uv: 2000, pv: 9800, amt: 2290 }, { name: 'Page D', uv: 2780, pv: 3908, amt: 2000 }, { name: 'Page E', uv: 1890, pv: 4800, amt: 2181 }, { name: 'Page F', uv: 2390, pv: 3800, amt: 2500 }, { name: 'Page G', uv: 3490, pv: 4300, amt: 2100 }];

  return {
    component: 'recharts.LineChart',
    props: {
      width: 600,
      height: 300,
      data: data
    },
    children: [{
      component: 'recharts.XAxis',
      props: {
        dataKey: 'name'
      }
    }, {
      component: 'recharts.YAxis'
    }, {
      component: 'recharts.CartesianGrid',
      props: {
        strokeDasharray: '3 3'
      }
    }, {
      component: 'recharts.Tooltip'
    }, {
      component: 'recharts.Legend'
    }, {
      component: 'recharts.Line',
      props: {
        type: 'monotone',
        dataKey: 'pv',
        stroke: '#8884d8',
        activeDot: { r: 8 }
      }
    }, {
      component: 'recharts.Line',
      props: {
        type: 'monotone',
        dataKey: 'uv',
        stroke: '#82ca9d'
      }
    }]
  };
}

var DocumentationLayout = {
  component: 'Hero',
  props: { size: 'isFullheight' },
  children: [{
    component: 'HeroBody',
    props: {},
    children: [{
      component: 'Container',
      props: {},
      children: [{
        component: 'div',
        children: 'div text'
      }, {
        component: 'Title',
        // props: {
        // },
        children: 'Documentation Page'
      }]
    }]
  }]
};

var Documentation = function (_Component) {
  (0, _inherits3.default)(Documentation, _Component);

  function Documentation() {
    (0, _classCallCheck3.default)(this, Documentation);
    return (0, _possibleConstructorReturn3.default)(this, (Documentation.__proto__ || (0, _getPrototypeOf2.default)(Documentation)).apply(this, arguments));
  }

  (0, _createClass3.default)(Documentation, [{
    key: 'render',

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
    value: function render() {
      // console.log(this.props)
      return (0, _AppLayoutMap.getRenderedComponent)(DocumentationLayout);
    }
  }]);
  return Documentation;
}(_react.Component);

exports.default = Documentation;