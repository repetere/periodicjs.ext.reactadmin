'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

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

var _AppLayoutMap = require('../AppLayoutMap');

var _FormElements = require('../ResponsiveForm/FormElements');

var _flat = require('flat');

var _flat2 = _interopRequireDefault(_flat);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import utilities from '../../util';
var DynamicForm = function (_Component) {
  (0, _inherits3.default)(DynamicForm, _Component);

  function DynamicForm(props) {
    (0, _classCallCheck3.default)(this, DynamicForm);

    //initialdata
    var _this = (0, _possibleConstructorReturn3.default)(this, (DynamicForm.__proto__ || (0, _getPrototypeOf2.default)(DynamicForm)).call(this, props));

    var initialData = props.initialData;
    var dynamicData = props.getState().dynamic;
    var formElementData = (0, _assign2.default)({}, initialData, dynamicData);
    var flattenedData = props.flattenData ? (0, _flat2.default)(formElementData, props.flattenDataOptions) : {};
    var initialState = (0, _assign2.default)({}, props.useDynamicData ? props.dynamic.formdata : {}, formElementData, flattenedData);
    initialState.__formOptions = props.useFormOptions ? (0, _assign2.default)({}, props.useDynamicData ? props.getState().dynamic.__formOptions : {}, props.__formOptions) : undefined;
    // console.debug({props,initialState});
    _this.state = initialState;

    _this.getRenderedComponent = _AppLayoutMap.getRenderedComponent.bind(_this);
    _this.getFormSubmit = _FormElements.getFormSubmit.bind(_this);
    _this.getFormDatalist = _FormElements.getFormDatalist.bind(_this);
    _this.getFormCode = _FormElements.getFormCode.bind(_this);
    _this.getFormTextInputArea = _FormElements.getFormTextInputArea.bind(_this);
    _this.getFormTextArea = _FormElements.getFormTextArea.bind(_this);
    _this.getFormCheckbox = _FormElements.getFormCheckbox.bind(_this);
    _this.getCardFooterItem = _FormElements.getCardFooterItem.bind(_this);
    _this.getFormSelect = _FormElements.getFormSelect.bind(_this);
    _this.getRawInput = _FormElements.getRawInput.bind(_this);
    _this.getSliderInput = _FormElements.getSliderInput.bind(_this);
    _this.getFormDatatable = _FormElements.getFormDatatable.bind(_this);
    _this.getHiddenInput = _FormElements.getHiddenInput.bind(_this);
    _this.getFormEditor = _FormElements.getFormEditor.bind(_this);
    _this.getFormLink = _FormElements.getFormLink.bind(_this);
    _this.getFormGroup = _FormElements.getFormGroup.bind(_this);
    _this.getImage = _FormElements.getImage.bind(_this);
    return _this;
  }

  (0, _createClass3.default)(DynamicForm, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      // console.debug('getting next props');
      var initialData = this.props.initialData;
      var dynamicData = nextProps.getState().dynamic;
      var formElementData = (0, _assign2.default)({}, nextProps.useDynamicData ? nextProps.dynamic.formdata : {}, initialData, dynamicData);
      var flattenedData = this.props.flattenData ? (0, _flat2.default)(formElementData, this.props.flattenDataOptions) : {};
      var __formOptions = nextProps.useFormOptions ? (0, _assign2.default)({}, nextProps.useDynamicData ? nextProps.getState().dynamic.__formOptions : {}, nextProps.__formOptions) : undefined;
      var newState = (0, _assign2.default)({ __formOptions: __formOptions }, formElementData, flattenedData);
      // console.debug({newState,nextProps});
      this.setState(newState);
    }
    // componentWillUpdate(prevProps, prevState) {
    //   if (this.props.onChange) {
    //     this.props.onChange(prevState);
    //   }
    // }
    // componentDidUpdate(prevProps, prevState) {

    // }
    // componentWillUpdate (nextProps, nextState) {

    // }

  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      // let keyValue = 0;
      var formGroupData = this.props.formgroups.map(function (formgroup, i) {
        var gridProps = (0, _assign2.default)({
          isMultiline: true,
          key: i
        }, formgroup.gridProps);
        var getFormElements = function getFormElements(formElement, j) {
          // console.debug({ formElement });
          if (!formElement) {
            return null;
          } else if (formElement.type === 'text') {
            return _this2.getFormTextInputArea({ formElement: formElement, i: j, formgroup: formgroup });
          } else if (formElement.type === 'input') {
            return _this2.getRawInput({ formElement: formElement, i: j, formgroup: formgroup });
          } else if (formElement.type === 'textarea') {
            return _this2.getFormTextArea({ formElement: formElement, i: j, formgroup: formgroup });
          } else if (formElement.type === 'hidden') {
            return _this2.getHiddenInput({ formElement: formElement, i: j, formgroup: formgroup });
          } else if (formElement.type === 'datalist') {
            return _this2.getFormDatalist({ formElement: formElement, i: j, formgroup: formgroup });
          } else if (formElement.type === 'datatable') {
            return _this2.getFormDatatable({ formElement: formElement, i: j, formgroup: formgroup });
          } else if (formElement.type === 'checkbox' || formElement.type === 'radio') {
            return _this2.getFormCheckbox({ formElement: formElement, i: j, formgroup: formgroup });
          } else if (formElement.type === 'label') {
            return _react2.default.createElement(
              _reBulma.Column,
              (0, _extends3.default)({ key: j }, formElement.layoutProps),
              _react2.default.createElement(
                _reBulma.Label,
                (0, _extends3.default)({ key: j }, formElement.labelProps),
                formElement.label
              )
            );
          } else if (formElement.type === 'line') {
            return _react2.default.createElement(
              _reBulma.Column,
              (0, _extends3.default)({ key: j }, formElement.layoutProps),
              _react2.default.createElement('hr', formElement.passProps)
            );
          } else if (formElement.type === 'code') {
            return _this2.getFormCode({ formElement: formElement, i: j, formgroup: formgroup });
          } else if (formElement.type === 'editor') {
            return _this2.getFormEditor({ formElement: formElement, i: j, formgroup: formgroup });
          } else if (formElement.type === 'link') {
            return _this2.getFormLink({
              formElement: formElement, i: j, button: _this2.getRenderedComponent(formElement.value, undefined, true)
            });
          } else if (formElement.type === 'select') {
            return _this2.getFormSelect({ formElement: formElement, i: j, formgroup: formgroup });
          } else if (formElement.type === 'image') {
            return _this2.getImage({ formElement: formElement, i: j, formgroup: formgroup });
          } else if (formElement.type === 'layout') {
            return _react2.default.createElement(
              _reBulma.Column,
              (0, _extends3.default)({ key: j }, formElement.layoutProps),
              _this2.getRenderedComponent(formElement.value)
            );
          } else if (formElement.type === 'submit') {
            return _this2.getFormSubmit({ formElement: formElement, i: j, formgroup: formgroup });
          } else if (formElement.type === 'group') {
            return _this2.getFormGroup({ formElement: formElement, i: j, groupElements: formElement.groupElements.map(getFormElements) });
          } else {
            return _this2.getFormTextInputArea({ formElement: formElement, i: j, formgroup: formgroup });
          }
        };
        return _react2.default.createElement(
          _reBulma.Columns,
          gridProps,
          formgroup.formElements.map(getFormElements)
        );
      });

      return _react2.default.createElement(
        'div',
        { style: this.props.style },
        formGroupData
      );
    }
  }]);
  return DynamicForm;
}(_react.Component);

exports.default = DynamicForm;