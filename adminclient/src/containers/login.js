import { Component, } from 'react';
// import { Hero, HeroBody, Title, Subtitle, Container, } from 're-bulma';
// import 'font-awesome/css/font-awesome.css';
import { getRenderedComponent, } from '../components/AppLayoutMap';

let loginLayout = {
  component: 'Hero',
  props: {
    size: 'isFullheight',
    // children: 'hero body text',
  },
  children: [ {
    component: 'HeroBody',
    props: {
      // children: 'hero body text'
    },
    children: [ {
      component: 'Container',
      props: {
        // children: 'container text'
      },
      children: [
        {
          component: 'Columns',
          children: [ {
            component: 'Column',
            props:{},
          },{
            component: 'Column',
            props: {},
            children:[
        {
        component: 'Title',
        // props: {
        // },
        children: 'Login',
      }, {
        component: 'Subtitle',
        children: 'Subtitle Login',
        //   props: {
        // },  
        }, 
        {
          component: 'ResponsiveForm',
          // children:'hello',
          props: {
            cardForm: true,
            cardFormProps: {
              isFullwidth:true,
            },
            // notificationForm: true,
            // notificationProps: {},
            onSubmit: (data) => {
              console.log('formsubmit', data);
            },
            footergroups: [{
              gridProps: {},
              formElements: [ {
                type: 'submit',
                value: 'login',
                name:'login',
                passProps: {
                  // name:'telephone'
                },
                layoutProps: {
                  // style:{textAlign:'center'}
                },
              }]
            }],
            formgroups: [ {
              gridProps: {},
              formElements: [ {
                type: 'text',
                label: 'Username',
                name:'username',
                layoutProps: {},
              },{
                type: 'text',
                label: 'Password',
                name: 'password',
                passProps: {
                  type:'password'
                },
                layoutProps: {
                  horizontalform:true,
                },
              }]
            }, {
              gridProps: {},
              formElements: [ {
                type: 'text',
                label: 'Telephone',
                name:'telephone',
                passProps: {
                  name:'telephone'
                },
                layoutProps: {},
              },{
                type: 'text',
                placeholder: 'Telephone',
                name:'telephone',
                passProps: {
                  name:'telephone'
                },
                layoutProps: {},
              }]
            }, {
              gridProps: {},
              formElements: [ {
                type: 'submit',
                value: 'login',
                name:'login',
                passProps: {
                  // name:'telephone'
                },
                layoutProps: {
                  style:{textAlign:'center'}
                },
              }]
            }]
          },
        }]
          },{
            component: 'Column',
            props:{},
          }]
        },
      ]
    }]
  }]
};
 
// class ResponsiveGrid extends Component {
//   render() {
//     return();
//   }
// };
// class ResponsiveLayout extends Component {
//   render() {
//     return();
//   }
// };

class Login extends Component {
  componentWillReceiveProps(nextProps) {
    console.log('Login componentWillReceiveProps nextProps', nextProps);
    // this.setState(nextProps);
  }
  render() {
    return getRenderedComponent(loginLayout);
  }
}

export default Login;
