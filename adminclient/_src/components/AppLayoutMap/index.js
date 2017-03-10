'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AppLayoutMap = undefined;

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

exports.getRenderedComponent = getRenderedComponent;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reBulma = require('re-bulma');

var rebulma = _interopRequireWildcard(_reBulma);

var _recharts = require('recharts');

var recharts = _interopRequireWildcard(_recharts);

var _reactRouter = require('react-router');

var _reactSlider = require('react-slider');

var _reactSlider2 = _interopRequireDefault(_reactSlider);

var _ResponsiveForm = require('../ResponsiveForm');

var _ResponsiveForm2 = _interopRequireDefault(_ResponsiveForm);

var _RawOutput = require('../RawOutput');

var _RawOutput2 = _interopRequireDefault(_RawOutput);

var _RawStateOutput = require('../RawOutput/RawStateOutput');

var _RawStateOutput2 = _interopRequireDefault(_RawStateOutput);

var _MenuAppLink = require('../AppSidebar/MenuAppLink');

var _MenuAppLink2 = _interopRequireDefault(_MenuAppLink);

var _SubMenuLinks = require('../AppSidebar/SubMenuLinks');

var _SubMenuLinks2 = _interopRequireDefault(_SubMenuLinks);

var _RACodeMirror = require('../RACodeMirror');

var _RACodeMirror2 = _interopRequireDefault(_RACodeMirror);

var _ResponsiveTable = require('../ResponsiveTable');

var _ResponsiveTable2 = _interopRequireDefault(_ResponsiveTable);

var _ResponsiveCard = require('../ResponsiveCard');

var _ResponsiveCard2 = _interopRequireDefault(_ResponsiveCard);

var _ResponsiveChart = require('../ResponsiveChart');

var _ResponsiveChart2 = _interopRequireDefault(_ResponsiveChart);

var _ResponsiveTabs = require('../ResponsiveTabs');

var _ResponsiveTabs2 = _interopRequireDefault(_ResponsiveTabs);

var _ResponsiveBar = require('../ResponsiveBar');

var _ResponsiveBar2 = _interopRequireDefault(_ResponsiveBar);

var _ResponsiveLink = require('../ResponsiveLink');

var _ResponsiveLink2 = _interopRequireDefault(_ResponsiveLink);

var _ResponsiveButton = require('../ResponsiveButton');

var _ResponsiveButton2 = _interopRequireDefault(_ResponsiveButton);

var _FormItem = require('../FormItem');

var _FormItem2 = _interopRequireDefault(_FormItem);

var _util = require('../../util');

var _util2 = _interopRequireDefault(_util);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var renderIndex = 0;
// import Editor from '../RAEditor';
var AppLayoutMap = exports.AppLayoutMap = (0, _assign2.default)({}, {
  recharts: recharts, ResponsiveForm: _ResponsiveForm2.default, RawOutput: _RawOutput2.default, RawStateOutput: _RawStateOutput2.default, FormItem: _FormItem2.default, MenuAppLink: _MenuAppLink2.default, SubMenuLinks: _SubMenuLinks2.default, ResponsiveTable: _ResponsiveTable2.default, ResponsiveCard: _ResponsiveCard2.default, ResponsiveChart: _ResponsiveChart2.default, ResponsiveBar: _ResponsiveBar2.default, ResponsiveTabs: _ResponsiveTabs2.default, CodeMirror: _RACodeMirror2.default, ReactSlider: _reactSlider2.default }, _react2.default.DOM, rebulma, { Link: _reactRouter.Link });

// console.log({ AppLayoutMap });
// console.log({ ReactDOM: React.DOM['div'] });


function getRenderedComponent(componentObject, resources, debug) {
  var _this = this;

  AppLayoutMap.ResponsiveLink = _ResponsiveLink2.default.bind(this);
  AppLayoutMap.ResponsiveButton = _ResponsiveButton2.default.bind(this);
  // console.log('this.props', this);
  renderIndex++;
  // console.info({ resources });

  try {
    var asyncprops = componentObject.asyncprops && (0, _typeof3.default)(componentObject.asyncprops) === 'object' ? _util2.default.traverse(componentObject.asyncprops, resources) : {};
    var windowprops = componentObject.windowprops && (0, _typeof3.default)(componentObject.windowprops) === 'object' ? _util2.default.traverse(componentObject.windowprops, window) : {};
    var thisprops = componentObject.thisprops && (0, _typeof3.default)(componentObject.thisprops) === 'object' ? _util2.default.traverse(componentObject.thisprops, (0, _assign2.default)({
      __reactadmin_manifest: {
        _component: componentObject,
        _resources: resources
      }
    }, this.props.getState())) : {};
    var thisDotProps = !_react2.default.DOM[componentObject.component] && !rebulma[componentObject.component] ? this.props : null;
    // if (debug) {
    //   console.debug({
    //     asyncprops, thisprops,
    //   });
    // }
    // if(!React.DOM[ componentObject.component ] && !rebulma[ componentObject.component ]){
    //   console.log(componentObject.component,'is not in bulma or reactdom')
    // }
    var renderedCompProps = (0, _assign2.default)({
      key: renderIndex
    }, thisDotProps, thisprops, componentObject.props, asyncprops, windowprops);
    // console.debug({ renderedCompProps });
    //this loops through props assigned on component (wither from props obj or asyncprops, etc ) if filtered list length is all false, then dont display
    if (typeof componentObject.conditionalprops !== 'undefined' && !(0, _keys2.default)(_util2.default.traverse(componentObject.conditionalprops, renderedCompProps)).filter(function (key) {
      return _util2.default.traverse(componentObject.conditionalprops, renderedCompProps)[key];
    }).length) {
      return null;
    } else {
      return (0, _react.createElement)(
      //element component
      _react2.default.DOM[componentObject.component] ? componentObject.component : recharts[componentObject.component.replace('recharts.', '')] ? recharts[componentObject.component.replace('recharts.', '')] : AppLayoutMap[componentObject.component],
      //element props
      renderedCompProps,
      //props children
      componentObject.children && Array.isArray(componentObject.children) && typeof componentObject.children !== 'string' ? componentObject.children.map(function (childComponentObject) {
        return getRenderedComponent.call(_this, childComponentObject, resources);
      }) : typeof componentObject.children === 'undefined' ? null : componentObject.children);
    }
  } catch (e) {
    console.error(e);
    console.error({ componentObject: componentObject, resources: resources }, this);
    return (0, _react.createElement)('div', {}, e.toString());
  }
}