'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var propTypes = {
  onClick: _react.PropTypes.string,
  buttonProps: _react.PropTypes.object,
  spanProps: _react.PropTypes.object,
  style: _react.PropTypes.object,
  onclickProps: _react.PropTypes.any
};

var defaultProps = {
  // onClick: '/',
  style: {}
};

var ResponsiveButton = function (_Component) {
  (0, _inherits3.default)(ResponsiveButton, _Component);

  function ResponsiveButton() {
    (0, _classCallCheck3.default)(this, ResponsiveButton);
    return (0, _possibleConstructorReturn3.default)(this, (ResponsiveButton.__proto__ || (0, _getPrototypeOf2.default)(ResponsiveButton)).apply(this, arguments));
  }

  (0, _createClass3.default)(ResponsiveButton, [{
    key: 'getButtonLink',

    // constructor(props) {
    //   super(props);
    // }
    value: function getButtonLink(baseurl, params, prop) {
      // console.debug({ baseurl, params, prop });
      var returnLink = baseurl;
      try {
        if (params && params.length > 0) {
          params.forEach(function (param) {
            returnLink = returnLink.replace(param.key, prop[param.val]);
          });
        }
      } catch (e) {
        console.debug(e, { baseurl: baseurl, params: params, prop: prop });
      }
      return returnLink;
    }
  }, {
    key: 'getHref',
    value: function getHref(options) {
      var thisDotProp = options.thisDotProp,
          clickThisProp = options.clickThisProp,
          clickPropObject = options.clickPropObject,
          clickBaseUrl = options.clickBaseUrl,
          clickLinkParams = options.clickLinkParams,
          clickPassProps = options.clickPassProps;
      // console.debug('getHref',{options})  

      var linkSelectionProp = clickThisProp ? thisDotProp[clickThisProp] : clickPropObject;
      var onclickProp = clickBaseUrl ? this.getButtonLink(clickBaseUrl, clickLinkParams, linkSelectionProp) : clickPassProps;
      return onclickProp;
    }
  }, {
    key: 'handleOnClick',
    value: function handleOnClick(options) {
      var _this2 = this;

      // console.debug({ options });
      var clickprop = options.clickprop,
          thisDotProp = options.thisDotProp,
          clickThisProp = options.clickThisProp,
          clickPropObject = options.clickPropObject,
          clickBaseUrl = options.clickBaseUrl,
          clickLinkParams = options.clickLinkParams,
          clickPassProps = options.clickPassProps,
          clickFetchProps = options.clickFetchProps,
          clickSuccessProps = options.clickSuccessProps;

      var onclickFunction = function onclickFunction(data) {
        console.debug('ResponsiveButton', { data: data });
      };
      var linkSelectionProp = clickThisProp ? thisDotProp[clickThisProp] : clickPropObject;
      var onclickProp = clickBaseUrl ? this.getButtonLink(clickBaseUrl, clickLinkParams, linkSelectionProp) : clickPassProps;

      if (typeof clickprop === 'string' && clickprop.indexOf('func:this.props.reduxRouter') !== -1) {
        onclickFunction = this.props.reduxRouter[clickprop.replace('func:this.props.reduxRouter.', '')];
      } else if (typeof clickprop === 'string' && clickprop.indexOf('func:this.funcs') !== -1) {
        onclickFunction = this.funcs[clickprop.replace('func:this.funcs.', '')];
      } else if (typeof clickprop === 'string' && clickprop.indexOf('func:window') !== -1) {
        onclickFunction = window[clickprop.replace('func:window.', '')].bind(this);
      } else if (typeof clickprop === 'string' && clickprop.indexOf('func:this.props') !== -1) {
        // console.debug('this.props', this.props);
        onclickFunction = this.props[clickprop.replace('func:this.props.', '')];
      } else if (typeof clickprop === 'function') {
        onclickFunction = clickprop;
      }
      // onclickFunction = onclickFunction.bind(this);
      if (this.props.confirmModal) {
        return this.props.createModal((0, _assign2.default)({
          title: 'Please Confirm',
          text: {
            component: 'div',
            props: {
              style: {
                textAlign: 'center'
              }
            },
            children: [{
              component: 'div',
              children: this.props.confirmModal.textContent || ''
            }, {
              component: 'div',
              children: [{
                component: 'ResponsiveButton',
                props: (0, _assign2.default)({
                  style: {
                    margin: 10
                  },
                  buttonProps: {
                    size: 'isMedium',

                    color: 'isPrimary'
                  },
                  onClick: function onClick() {
                    // console.debug('debugging this modal', this);
                    _this2.props.hideModal('last');
                    onclickFunction.call(_this2, onclickProp, clickFetchProps, clickSuccessProps);
                  },
                  onclickProps: 'last'
                }, this.props.confirmModal.yesButtonProps),
                children: this.props.confirmModal.yesButtonText || 'Yes'
              }, {
                component: 'ResponsiveButton',
                props: (0, _assign2.default)({
                  style: {
                    margin: 10
                  },
                  buttonProps: {
                    size: 'isMedium'
                  },
                  onClick: 'func:this.props.hideModal',
                  onclickProps: 'last'
                }, this.props.confirmModal.noButtonProps),
                children: this.props.confirmModal.noButtonText || 'No'
              }]
            }]
          }
        }, this.props.confirmModal));
      } else {
        // console.debug('debugging this regular onclick', this);
        return onclickFunction.call(this, onclickProp, clickFetchProps, clickSuccessProps);
      }
    }
  }, {
    key: 'handleSelect',
    value: function handleSelect(event, selectProps) {
      var value = event.target.value;
      var selectedProp = selectProps[value];
      var buttonProps = selectedProp.buttonProps;
      this.handleOnClick.call(this, {
        clickprop: buttonProps.onClick,
        clickThisProp: buttonProps.onclickThisProp,
        clickPropObject: buttonProps.onclickPropObject,
        clickBaseUrl: buttonProps.onclickBaseUrl,
        clickLinkParams: buttonProps.onclickLinkParams,
        clickPassProps: buttonProps.onclickProps,
        clickFetchProps: buttonProps.fetchProps,
        clickSuccessProps: buttonProps.successProps,
        thisDotProp: this.props
      });
      // console.debug({ value, selectProps });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var getPropsForOnClick = function getPropsForOnClick() {
        return {
          clickprop: _this3.props.onClick,
          clickThisProp: _this3.props.onclickThisProp,
          clickPropObject: _this3.props.onclickPropObject,
          clickBaseUrl: _this3.props.onclickBaseUrl,
          clickLinkParams: _this3.props.onclickLinkParams,
          clickPassProps: _this3.props.onclickProps,
          clickFetchProps: _this3.props.fetchProps,
          clickSuccessProps: _this3.props.successProps,
          thisDotProp: _this3.props
        };
      };
      if (this.props.selectProps) {
        var options = [];
        var selectPropsVals = this.props.selectProps.values;

        (0, _keys2.default)(selectPropsVals).forEach(function (key) {
          var additionalOptionProps = typeof selectPropsVals[key].disabled !== 'undefined' ? { disabled: true } : {};
          options.push(_react2.default.createElement(
            'option',
            (0, _extends3.default)({}, additionalOptionProps, { key: 'sddb-' + key, value: key }),
            selectPropsVals[key].label
          ));
        });

        return _react2.default.createElement(
          _reBulma.Select,
          (0, _extends3.default)({ className: '__ra_rb' }, this.props.selectElmProps, { value: this.props.selectProps.selected, onChange: function onChange(event) {
              // console.log({ event });
              _this3.handleSelect.call(_this3, event, _this3.props.selectProps.values);
            } }),
          options
        );
      } else if (this.props.buttonProps) {
        return _react2.default.createElement(
          _reBulma.Button,
          (0, _extends3.default)({ className: '__ra_rb'
          }, this.props.buttonProps, {
            style: (0, _assign2.default)({
              cursor: 'pointer', display: 'inline-block'
            }, this.props.style),
            onClick: this.handleOnClick.bind(this, getPropsForOnClick())
          }),
          this.props.onclickThisProp && this.props.displayThisProps ? this.props[this.props.onclickThisProp][this.props.displayThisProps] : this.props.children
        );
      } else if (this.props.aProps) {
        return _react2.default.createElement(
          'a',
          (0, _extends3.default)({ className: '__ra_rb' }, this.props.aProps, { href: this.getHref.call(this, getPropsForOnClick()) }),
          this.props.children
        );
      } else {
        return _react2.default.createElement(
          'span',
          (0, _extends3.default)({ className: '__ra_rb'
          }, this.props.spanProps, {
            style: (0, _assign2.default)({
              cursor: 'pointer', display: 'inline-block'
            }, this.props.style),
            onClick: this.handleOnClick.bind(this, getPropsForOnClick())
          }),
          this.props.onclickThisProp && this.props.displayThisProps ? this.props[this.props.onclickThisProp][this.props.displayThisProps] : this.props.children
        );
      }
    }
  }]);
  return ResponsiveButton;
}(_react.Component);

ResponsiveButton.propTypes = propTypes;
ResponsiveButton.defaultProps = defaultProps;

exports.default = ResponsiveButton;