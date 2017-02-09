import constants from '../constants';
// import Immutable from 'immutable';
const initialState = {
  isFetching: false,
  hasLoaded: false,
  error: null,
  updatedAt: new Date(),
  containers: {
    '/healthcheck': {
      layout: {
        component: 'Hero',
        props: { size: 'isFullheight', },
        children: [{
          component: 'HeroBody',
          props: {},
          children: [{
            component: 'Container',
            props: {},
            children: [
              {
                component: 'RawOutput',
                asyncProps: ['healthcheckStatus']
              },
              {
                component: 'Title',
                children: 'Documentation Page',
              }]
          }]
        }]
      },
      resources: {
        healthcheckStatus: '/healthcheck'
      },
      onFinish: 'render'
    },
    '/documentation': {
      layout: {
        component: 'Hero',
        props: { size: 'isFullheight', },
        children: [ {
          component: 'HeroBody',
          props:{},
          children: [ {
            component: 'Container',
            props:{},
            children:[
              {
                component: 'div',
                children: 'div text'
              },
              {
                component: 'Title',
                // props: {
                // },
                  children: 'Documentation Pages',
              }]
          }]
        }]
      },
      resources: {},
      onFinish:'render',
    }
  }
};

const manifestReducer = (state, action) => {
  switch (action.type) {
  case constants.manifest.MANIFEST_DATA_REQUEST:
    return Object.assign({},state,{
      isFetching: true,
      hasLoaded: false,
      error: null,
      updatedAt: new Date(),
    });
  case constants.manifest.MANIFEST_DATA_FAILURE:
    var failurePayload = action.payload;
    return Object.assign({},state,{
      isFetching: false,
      hasLoaded: false,
      error: failurePayload.error,
      updatedAt: new Date(),
    });
  case constants.manifest.MANIFEST_DATA_SUCCESS:
    var manifestSuccessPayload = action.payload;
    return Object.assign({},state,{
      isFetching: true,
      hasLoaded: true,
      error: null,
      containers: manifestSuccessPayload.containers,
      updatedAt: new Date(),
    });
  default:
    return Object.assign(initialState, state);
  }
};

export default manifestReducer;