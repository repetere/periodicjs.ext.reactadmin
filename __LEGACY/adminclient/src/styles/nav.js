const navStyles = {
  navContainer: {
    // backgroundColor: '#212121',
    // boxShadow:'0 2px 3px rgba(17,17,17,.3)',
    // color: 'white',
    // borderBottom: '1px solid black',
    paddingTop:'0px',
    paddingBottom:'0px',
    zIndex: 10000,
    boxShadow: '0 2px 3px rgba(17,17,17,.1), 0 0 0 1px rgba(17,17,17,.1)',
  },
  footerContainer: {
    // boxShadow:'0 2px 3px rgba(17,17,17,.3)',
    borderTop: '1px solid black',
    zIndex: 10000,
  },
  sidebarContainer: {
    // boxShadow:'0 2px 3px rgba(17,17,17,.3)',
    zIndex: 1000,
    backgroundColor: '#fff',
  },
  floatingSidebarContainer: {
    // boxShadow:'0 2px 3px rgba(17,17,17,.3)',
    zIndex: 1000,
    marginTop: 78,
  },
  sidebarOverlay:{
    position: 'fixed',
    height: '100%',
    width: '100%',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(17,17,17,.6)',
    zIndex:100,
  },
};

export default navStyles;
