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

var _reactMomentProptypes = require('react-moment-proptypes');

var _reactMomentProptypes2 = _interopRequireDefault(_reactMomentProptypes);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _omit = require('lodash/omit');

var _omit2 = _interopRequireDefault(_omit);

require('react-dates/initialize');

var _AppLayoutMap = require('../AppLayoutMap');

var _reactDates = require('react-dates');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var propTypes = {
  // example props for the demo
  autoFocus: _react.PropTypes.bool,
  initialDate: _reactMomentProptypes2.default.momentObj
};

var defaultProps = {
  // example props for the demo
  autoFocus: false,
  initialDate: null,

  // input related props
  id: 'date',
  placeholder: 'Date',
  disabled: false,
  required: false,
  screenReaderInputMessage: '',
  showClearDate: false,
  showDefaultInputIcon: false,
  customInputIcon: null,
  block: false,
  small: false,
  regular: false,
  verticalSpacing: undefined,
  keepFocusOnInput: false,

  // calendar presentation and interaction related props
  renderMonth: null,
  orientation: 'horizontal',
  anchorDirection: 'left',
  horizontalMargin: 0,
  withPortal: false,
  withFullScreenPortal: false,
  initialVisibleMonth: null,
  numberOfMonths: 2,
  keepOpenOnDateSelect: false,
  reopenPickerOnClearDate: false,
  isRTL: false,

  // navigation related props
  navPrev: null,
  navNext: null,
  onPrevMonthClick: function onPrevMonthClick() {},
  onNextMonthClick: function onNextMonthClick() {},
  onClose: function onClose() {},


  // day presentation and interaction related props
  renderCalendarDay: undefined,
  renderDayContents: null,
  enableOutsideDays: false,
  isDayBlocked: function isDayBlocked() {
    return false;
  },
  isOutsideRange: function isOutsideRange() {},

  isDayHighlighted: function isDayHighlighted() {},

  // internationalization props
  displayFormat: function displayFormat() {
    return _moment2.default.localeData().longDateFormat('L');
  },
  monthFormat: 'MMMM YYYY'
  // phrases: SingleDatePickerPhrases,
};

var SingleDatePickerWrapper = function (_Component) {
  (0, _inherits3.default)(SingleDatePickerWrapper, _Component);

  function SingleDatePickerWrapper(props) {
    (0, _classCallCheck3.default)(this, SingleDatePickerWrapper);

    var _this = (0, _possibleConstructorReturn3.default)(this, (SingleDatePickerWrapper.__proto__ || (0, _getPrototypeOf2.default)(SingleDatePickerWrapper)).call(this, props));

    _this.state = {
      focused: props.autoFocus,
      date: props.initialDate
    };

    _this.onDateChange = _this.onDateChange.bind(_this);
    _this.onFocusChange = _this.onFocusChange.bind(_this);
    return _this;
  }

  (0, _createClass3.default)(SingleDatePickerWrapper, [{
    key: 'onDateChange',
    value: function onDateChange(date) {
      var _this2 = this;

      this.setState({ date: date }, function () {
        if (_this2.props.customOnChange) {
          _this2.props.customOnChange({ date: date });
        }
      });
    }
  }, {
    key: 'onFocusChange',
    value: function onFocusChange(_ref) {
      var focused = _ref.focused;

      this.setState({ focused: focused });
    }
  }, {
    key: 'render',
    value: function render() {
      var _state = this.state,
          focused = _state.focused,
          date = _state.date;

      // autoFocus and initialDate are helper props for the example wrapper but are not
      // props on the SingleDatePicker itself and thus, have to be omitted.

      var props = (0, _omit2.default)(this.props, ['autoFocus', 'initialDate']);

      return _react2.default.createElement(_reactDates.SingleDatePicker, (0, _extends3.default)({}, props, {
        id: 'date_input',
        date: date,
        focused: focused,
        onDateChange: this.onDateChange,
        onFocusChange: this.onFocusChange
      }));
    }
  }]);
  return SingleDatePickerWrapper;
}(_react.Component);

SingleDatePickerWrapper.propTypes = propTypes;
SingleDatePickerWrapper.defaultProps = defaultProps;

exports.default = SingleDatePickerWrapper;