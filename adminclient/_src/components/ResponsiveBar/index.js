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

var _reBulma = require('re-bulma');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import 'font-awesome/css/font-awesome.css';
// import styles from '../../styles';

var propTypes = {
  boxProps: _react.PropTypes.any
};

var defaultProps = {};

var ResponsiveBars = function (_Component) {
  (0, _inherits3.default)(ResponsiveBars, _Component);

  function ResponsiveBars(props) {
    (0, _classCallCheck3.default)(this, ResponsiveBars);

    var _this = (0, _possibleConstructorReturn3.default)(this, (ResponsiveBars.__proto__ || (0, _getPrototypeOf2.default)(ResponsiveBars)).call(this, props));

    _this.state = {
      boxProps: props.boxProps,
      columnsProps: props.columnsProps,
      features: props.features
    };
    return _this;
  }

  (0, _createClass3.default)(ResponsiveBars, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement(
        _reBulma.Columns,
        (0, _extends3.default)({}, this.state.columnsProps, { isMultiline: true }),
        this.state.features.map(function (feature, idx) {
          return _react2.default.createElement(
            _reBulma.Column,
            { key: idx, size: 'is3' },
            _react2.default.createElement(
              _reBulma.Box,
              _this2.state.boxProps,
              _react2.default.createElement(
                'span',
                { onClick: function onClick() {
                    _this2.props.reduxRouter.push(feature.location);
                  } },
                _react2.default.createElement('img', { src: feature.image, alt: feature.title }),
                feature.title
              )
            )
          );
        })
      );
    }
  }]);
  return ResponsiveBars;
}(_react.Component);

ResponsiveBars.propTypes = propTypes;
ResponsiveBars.defaultProps = defaultProps;

exports.default = ResponsiveBars;