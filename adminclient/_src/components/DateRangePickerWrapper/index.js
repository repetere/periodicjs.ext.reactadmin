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
  autoFocusEndDate: _react.PropTypes.bool,
  initialStartDate: _reactMomentProptypes2.default.momentObj,
  initialEndDate: _reactMomentProptypes2.default.momentObj
};

var defaultProps = {
  // example props for the demo
  autoFocus: false,
  autoFocusEndDate: false,
  initialStartDate: null,
  initialEndDate: null,

  // input related props
  startDateId: 'start_date',
  startDatePlaceholderText: 'Start Date',
  endDateId: 'end_date',
  endDatePlaceholderText: 'End Date',
  disabled: false,
  required: false,
  screenReaderInputMessage: '',
  showClearDates: false,
  showDefaultInputIcon: false,
  customInputIcon: null,
  customArrowIcon: null,
  customCloseIcon: null,
  block: false,
  small: false,
  regular: false,

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
  reopenPickerOnClearDates: false,
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
  minimumNights: 1,
  enableOutsideDays: false,
  isDayBlocked: function isDayBlocked() {
    return false;
  },
  isOutsideRange: function isOutsideRange(day) {
    return !(0, _reactDates.isInclusivelyAfterDay)(day, (0, _moment2.default)());
  },
  isDayHighlighted: function isDayHighlighted() {
    return false;
  },

  // internationalization
  displayFormat: function displayFormat() {
    return _moment2.default.localeData().longDateFormat('L');
  },
  monthFormat: 'MMMM YYYY',
  phrases: _reactDates.DateRangePickerPhrases
};

var DateRangePickerWrapper = function (_Component) {
  (0, _inherits3.default)(DateRangePickerWrapper, _Component);

  function DateRangePickerWrapper(props) {
    (0, _classCallCheck3.default)(this, DateRangePickerWrapper);

    var _this = (0, _possibleConstructorReturn3.default)(this, (DateRangePickerWrapper.__proto__ || (0, _getPrototypeOf2.default)(DateRangePickerWrapper)).call(this, props));

    var focusedInput = null;
    if (props.autoFocus) {
      focusedInput = 'start_date';
    } else if (props.autoFocusEndDate) {
      focusedInput = 'end_date';
    }

    _this.state = {
      focusedInput: focusedInput,
      startDate: props.initialStartDate,
      endDate: props.initialEndDate
    };

    _this.onDatesChange = _this.onDatesChange.bind(_this);
    _this.onFocusChange = _this.onFocusChange.bind(_this);
    return _this;
  }

  (0, _createClass3.default)(DateRangePickerWrapper, [{
    key: 'onDatesChange',
    value: function onDatesChange(_ref) {
      var _this2 = this;

      var startDate = _ref.startDate,
          endDate = _ref.endDate;

      this.setState({ startDate: startDate, endDate: endDate }, function () {
        if (_this2.props.customOnChange) {
          _this2.props.customOnChange({ startDate: startDate, endDate: endDate });
        }
      });
    }
  }, {
    key: 'onFocusChange',
    value: function onFocusChange(focusedInput) {
      this.setState({ focusedInput: focusedInput });
    }
  }, {
    key: 'render',
    value: function render() {
      var _state = this.state,
          focusedInput = _state.focusedInput,
          startDate = _state.startDate,
          endDate = _state.endDate;

      // autoFocus, autoFocusEndDate, initialStartDate and initialEndDate are helper props for the
      // example wrapper but are not props on the SingleDatePicker itself and
      // thus, have to be omitted.

      var props = (0, _omit2.default)(this.props, ['autoFocus', 'autoFocusEndDate', 'initialStartDate', 'initialEndDate']);

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(_reactDates.DateRangePicker, (0, _extends3.default)({}, props, {
          onDatesChange: this.onDatesChange,
          onFocusChange: this.onFocusChange,
          focusedInput: focusedInput,
          startDate: startDate,
          endDate: endDate
        }))
      );
    }
  }]);
  return DateRangePickerWrapper;
}(_react.Component);

DateRangePickerWrapper.propTypes = propTypes;
DateRangePickerWrapper.defaultProps = defaultProps;

exports.default = DateRangePickerWrapper;