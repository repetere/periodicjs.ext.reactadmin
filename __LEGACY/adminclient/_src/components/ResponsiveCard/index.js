'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

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
  headerColor: _react.PropTypes.object,
  headerTextColor: _react.PropTypes.object,
  cardTitle: _react.PropTypes.string,
  display: _react.PropTypes.bool,
  leftIcon: _react.PropTypes.bool,
  icon: _react.PropTypes.string
};

var defaultProps = {
  // headerColor: styles.isSecondaryBackground,
  // headerTextColor: styles.isWhite,
  cardStyle: {
    marginBottom: '20px'
  },
  cardTitle: '',
  display: true,
  icon: 'fa fa-angle-down',
  iconDown: 'fa fa-angle-down',
  iconUp: 'fa fa-angle-right'
};

var ResponsiveCard = function (_Component) {
  (0, _inherits3.default)(ResponsiveCard, _Component);

  function ResponsiveCard(props) {
    (0, _classCallCheck3.default)(this, ResponsiveCard);

    var _this = (0, _possibleConstructorReturn3.default)(this, (ResponsiveCard.__proto__ || (0, _getPrototypeOf2.default)(ResponsiveCard)).call(this, props));

    _this.state = {
      headerColor: props.headerColor,
      headerTextColor: props.headerTextColor,
      display: props.display,
      icon: props.icon,
      iconDown: props.iconDown,
      iconUp: props.iconUp,
      cardTitle: props.cardTitle,
      cardProps: props.cardProps
    };
    return _this;
  }

  (0, _createClass3.default)(ResponsiveCard, [{
    key: 'expandCard',
    value: function expandCard() {
      this.setState({
        display: this.state.display === true ? false : true,
        icon: this.state.display ? this.props.iconUp : this.props.iconDown
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var cardIcon = this.props.iconImage ? _react2.default.createElement(_reBulma.Image, (0, _extends3.default)({ src: this.state.icon }, this.props.iconImage, { onClick: function onClick() {
          return _this2.expandCard();
        } })) : _react2.default.createElement(_reBulma.CardHeaderIcon, { icon: this.state.icon, onClick: function onClick() {
          return _this2.expandCard();
        } });
      var leftIcon = this.props.leftIcon ? cardIcon : null;
      var rightIcon = !this.props.leftIcon ? cardIcon : null;
      var fullCard = _react2.default.createElement(
        _reBulma.Card,
        (0, _extends3.default)({}, this.props.cardProps, { isFullwidth: true, style: this.props.cardStyle }),
        _react2.default.createElement(
          _reBulma.CardHeader,
          { style: (0, _assign2.default)({ cursor: 'pointer' }, this.props.headerStyle) },
          leftIcon,
          _react2.default.createElement(
            _reBulma.CardHeaderTitle,
            { style: this.props.headerTitleStyle, onClick: function onClick() {
                return _this2.expandCard();
              } },
            this.state.cardTitle
          ),
          rightIcon
        ),
        this.state.display ? _react2.default.createElement(
          _reBulma.CardContent,
          null,
          this.props.children
        ) : null
      );
      return fullCard;
    }
  }]);
  return ResponsiveCard;
}(_react.Component);

ResponsiveCard.propTypes = propTypes;
ResponsiveCard.defaultProps = defaultProps;

exports.default = ResponsiveCard;