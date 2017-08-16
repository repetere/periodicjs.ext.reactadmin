'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

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

var _react2 = _interopRequireDefault(_react);

var _rcSteps = require('rc-steps');

var _rcSteps2 = _interopRequireDefault(_rcSteps);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var propTypes = {
  stepsProps: _react.PropTypes.object,
  steps: _react.PropTypes.array
};

var defaultProps = {
  stepsProps: {},
  steps: [{
    title: 'Test 1',
    description: 'this is a test'
  }]
};

var ResponsiveSteps = function (_Component) {
  (0, _inherits3.default)(ResponsiveSteps, _Component);

  function ResponsiveSteps(props) {
    (0, _classCallCheck3.default)(this, ResponsiveSteps);

    var _this = (0, _possibleConstructorReturn3.default)(this, (ResponsiveSteps.__proto__ || (0, _getPrototypeOf2.default)(ResponsiveSteps)).call(this, props));

    _this.state = {
      stepsProps: props.stepProps,
      steps: props.steps
    };
    return _this;
  }

  (0, _createClass3.default)(ResponsiveSteps, [{
    key: 'addStep',
    value: function addStep(title, description) {
      var steps = this.state.steps;
      steps.push({
        title: title,
        description: description
      });
      this.setState({ steps: steps });
    }
  }, {
    key: 'render',
    value: function render() {
      var fullSteps = _react2.default.createElement(
        _rcSteps2.default,
        (0, _extends3.default)({}, this.props.stepsProps, { current: this.props.current }),
        this.props.steps.map(function (s, i) {
          return _react2.default.createElement(_rcSteps.Step, {
            key: i,
            status: s.status,
            title: s.title,
            icon: s.icon,
            description: s.description0
          });
        })
      );
      return fullSteps;
    }
  }]);
  return ResponsiveSteps;
}(_react.Component);

ResponsiveSteps.propTypes = propTypes;
ResponsiveSteps.defaultProps = defaultProps;

exports.default = ResponsiveSteps;