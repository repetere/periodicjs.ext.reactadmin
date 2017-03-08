'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var defaultStyles = {
  mainContainer: {
    marginTop: 68,
    marginBottom: 52
  },
  fixedTop: {
    position: 'fixed', // !important,
    top: 0,
    left: 0,
    right: 0
  },
  fixedBottom: {
    position: 'fixed', // !important,
    bottom: 0,
    left: 0,
    right: 0
  },
  noMarginLeftRight: {
    marginLeft: 0,
    marginRight: 0
  },
  bgBlack: {
    backgroundColor: 'black'
  },
  noUnderline: {
    textDecoration: 'none'
  },
  fullWidth: {
    width: '100%'
  },
  fullHeight: {
    height: '100%'
  },
  fullMinHeight: {
    minHeight: '100%'
  },
  displayNone: {
    display: 'none'
  },
  iconButton: {
    paddingRight: 3,
    border: 'none',
    fontSize: 22
  },
  inputStyle: {
    overflow: 'hidden',
    backgroundColor: 'white',
    border: '1px solid #d3d6db',
    borderRadius: 3,
    display: 'inline-flex',
    height: 30,
    lineHeight: '30px',
    // padding: '0px 5px',
    margin: 0,
    width: '100%',
    boxShadow: 'inset 0 1px 2px rgba(17,17,17,.1)'
  }
};

exports.default = defaultStyles;