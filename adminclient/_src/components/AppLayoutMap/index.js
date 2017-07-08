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

var _reactTextMask = require('react-text-mask');

var _reactTextMask2 = _interopRequireDefault(_reactTextMask);

var _reactRouter = require('react-router');

var _rcSlider = require('rc-slider');

var _rcSlider2 = _interopRequireDefault(_rcSlider);

var _reactResponsiveCarousel = require('react-responsive-carousel');

var _googleMapReact = require('google-map-react');

var _googleMapReact2 = _interopRequireDefault(_googleMapReact);

var _advancedBinding = require('./advancedBinding');

var _ResponsiveForm = require('../ResponsiveForm');

var _ResponsiveForm2 = _interopRequireDefault(_ResponsiveForm);

var _DynamicForm = require('../DynamicForm');

var _DynamicForm2 = _interopRequireDefault(_DynamicForm);

var _DynamicLayout = require('../DynamicLayout');

var _DynamicLayout2 = _interopRequireDefault(_DynamicLayout);

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

var _PreviewEditor = require('../PreviewEditor');

var _PreviewEditor2 = _interopRequireDefault(_PreviewEditor);

var _ResponsiveDatalist = require('../ResponsiveDatalist');

var _ResponsiveDatalist2 = _interopRequireDefault(_ResponsiveDatalist);

var _ResponsiveTable = require('../ResponsiveTable');

var _ResponsiveTable2 = _interopRequireDefault(_ResponsiveTable);

var _ResponsiveCard = require('../ResponsiveCard');

var _ResponsiveCard2 = _interopRequireDefault(_ResponsiveCard);

var _DynamicChart = require('../DynamicChart');

var _DynamicChart2 = _interopRequireDefault(_DynamicChart);

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

var advancedBinding = (0, _advancedBinding.getAdvancedBinding)();
// import Editor from '../RAEditor';

var renderIndex = 0;

var AppLayoutMap = exports.AppLayoutMap = (0, _assign2.default)({}, {
  recharts: recharts, ResponsiveForm: _ResponsiveForm2.default, DynamicLayout: _DynamicLayout2.default, DynamicForm: _DynamicForm2.default, RawOutput: _RawOutput2.default, RawStateOutput: _RawStateOutput2.default, FormItem: _FormItem2.default, MenuAppLink: _MenuAppLink2.default, SubMenuLinks: _SubMenuLinks2.default, ResponsiveTable: _ResponsiveTable2.default, ResponsiveCard: _ResponsiveCard2.default, DynamicChart: _DynamicChart2.default, ResponsiveBar: _ResponsiveBar2.default, ResponsiveTabs: _ResponsiveTabs2.default, ResponsiveDatalist: _ResponsiveDatalist2.default, CodeMirror: _RACodeMirror2.default, Range: _rcSlider.Range, Slider: _rcSlider2.default, GoogleMap: _googleMapReact2.default, Carousel: _reactResponsiveCarousel.Carousel, PreviewEditor: _PreviewEditor2.default, /* Editor,*/
  ResponsiveLink: _ResponsiveLink2.default,
  ResponsiveButton: _ResponsiveButton2.default,
  MaskedInput: _reactTextMask2.default
}, _react2.default.DOM, rebulma, window.__ra_custom_elements, { Link: _reactRouter.Link });

function getRenderedComponent(componentObject, resources, debug) {
  var _this = this;

  try {
    if (advancedBinding) {
      AppLayoutMap.ResponsiveLink = _ResponsiveLink2.default.bind(this);
      AppLayoutMap.ResponsiveButton = _ResponsiveButton2.default.bind(this);
    }
  } catch (e) {
    console.warn('deeply nested props are unsupported on this device', e);
  }
  // console.log('this.props', this);
  renderIndex++;
  // if(resources) console.info({ resources });
  if (!componentObject) {
    return (0, _react.createElement)('span', {}, debug ? 'Error: Missing Component Object' : '');
  }
  try {
    var asyncprops = componentObject.asyncprops && (0, _typeof3.default)(componentObject.asyncprops) === 'object' ? _util2.default.traverse(componentObject.asyncprops, resources) : {};
    var windowprops = componentObject.windowprops && (0, _typeof3.default)(componentObject.windowprops) === 'object' ? _util2.default.traverse(componentObject.windowprops, window) : {};
    var thisprops = componentObject.thisprops && (0, _typeof3.default)(componentObject.thisprops) === 'object' ? _util2.default.traverse(componentObject.thisprops, (0, _assign2.default)({
      __reactadmin_manifest: {
        _component: componentObject,
        _resources: resources
      }
    }, this.props, componentObject.props, this.props.getState())) : {};
    var thisDotProps = !_react2.default.DOM[componentObject.component] && !rebulma[componentObject.component] && !componentObject.ignoreReduxProps ? this.props : null;
    var renderedCompProps = (0, _assign2.default)({
      key: renderIndex
    }, thisDotProps, thisprops, componentObject.props, asyncprops, windowprops);
    //Allowing for window functions
    if (componentObject.hasWindowFunc) {
      (0, _keys2.default)(renderedCompProps).forEach(function (key) {
        if (typeof renderedCompProps[key] === 'string' && renderedCompProps[key].indexOf('func:window') !== -1 && typeof window[renderedCompProps[key].replace('func:window.', '')] === 'function') {
          renderedCompProps[key] = window[renderedCompProps[key].replace('func:window.', '')].bind(_this);
        }
      });
    }
    if (componentObject.hasWindowComponent && window.__ra_custom_elements) {
      (0, _keys2.default)(renderedCompProps).forEach(function (key) {
        if (typeof renderedCompProps[key] === 'string' && renderedCompProps[key].indexOf('func:window.__ra_custom_elements') !== -1 && typeof window.__ra_custom_elements[renderedCompProps[key].replace('func:window.__ra_custom_elements.', '')] === 'function') {
          renderedCompProps[key] = _react2.default.createElement(window.__ra_custom_elements[renderedCompProps[key].replace('func:window.__ra_custom_elements.', '')], renderedCompProps['windowCompProps'] ? renderedCompProps['windowCompProps'] : _this.props, null);
        }
      });
    }
    var comparisons = {};
    // if (thisprops) {
    //   console.debug({ thisprops, renderedCompProps });
    // }
    // console.debug('componentObject.component', componentObject.component, { thisDotProps, });

    if (componentObject.comparisonprops) {
      comparisons = componentObject.comparisonprops.map(function (comp) {
        var compares = {};
        if (Array.isArray(comp.left)) {
          compares.left = comp.left;
        }
        if (Array.isArray(comp.right)) {
          compares.right = comp.right;
        }
        var propcompares = _util2.default.traverse(compares, renderedCompProps);
        var opscompares = (0, _assign2.default)({}, comp, propcompares);
        // console.debug({ opscompares, compares, renderedCompProps });
        if (opscompares.operation === 'eq') {
          // return opscompares.left == opscompares.right;
          return opscompares.left === opscompares.right;
        } else if (opscompares.operation === 'dneq') {
          // return opscompares.left != opscompares.right;
          return opscompares.left !== opscompares.right;
        } else if (opscompares.operation === 'dnseq') {
          return opscompares.left !== opscompares.right;
        } else if (opscompares.operation === 'seq') {
          return opscompares.left === opscompares.right;
        } else if (opscompares.operation === 'lt') {
          return opscompares.left < opscompares.right;
        } else if (opscompares.operation === 'lte') {
          return opscompares.left <= opscompares.right;
        } else if (opscompares.operation === 'gt') {
          return opscompares.left > opscompares.right;
        } else if (opscompares.operation === 'gte') {
          return opscompares.left >= opscompares.right;
        } else if (opscompares.operation === 'dne') {
          return opscompares.left === undefined || opscompares.left === null;
        } else {
          //'exists'
          return opscompares.left !== undefined || opscompares.left !== null;
        }
      });
      // console.debug({ comparisons });
      // console.debug(comparisons.filter(comp => comp === true).length);
    }
    if (componentObject.comparisonprops && comparisons.filter(function (comp) {
      return comp === true;
    }).length !== comparisons.length) {
      return null;
    } else if (typeof componentObject.conditionalprops !== 'undefined' && !(0, _keys2.default)(_util2.default.traverse(componentObject.conditionalprops, renderedCompProps)).filter(function (key) {
      return _util2.default.traverse(componentObject.conditionalprops, renderedCompProps)[key];
    }).length) {
      return null;
    } else {
      return (0, _react.createElement)(
      //element component
      typeof componentObject.component === 'string' ? _react2.default.DOM[componentObject.component] ? componentObject.component : recharts[componentObject.component.replace('recharts.', '')] ? recharts[componentObject.component.replace('recharts.', '')] : AppLayoutMap[componentObject.component] : componentObject.component,
      //element props
      renderedCompProps,
      //props children
      componentObject.children && Array.isArray(componentObject.children) && typeof componentObject.children !== 'string' ? componentObject.children.map(function (childComponentObject) {
        return getRenderedComponent.call(_this, componentObject.bindprops ? (0, _assign2.default)({}, childComponentObject, {
          props: (0, _assign2.default)({}, renderedCompProps, childComponentObject.thisprops && childComponentObject.thisprops.style || // this is to make sure when you bind props, if you've defined props in a dynamic property, to not use bind props to  remove passing down styles
          childComponentObject.asyncprops && childComponentObject.asyncprops.style || childComponentObject.windowprops && childComponentObject.windowprops.style ? {} : {
            style: {}
          }, childComponentObject.props, { key: renderIndex + Math.random() })
        }) : childComponentObject, resources);
      }) : typeof componentObject.children === 'undefined' ? renderedCompProps && renderedCompProps.children && typeof renderedCompProps.children === 'string' ? renderedCompProps.children : null : componentObject.children);
    }
  } catch (e) {
    console.error(e, e.stack ? e.stack : 'no stack');
    console.error({ componentObject: componentObject, resources: resources }, 'this', this);
    return (0, _react.createElement)('div', {}, e.toString());
  }
}