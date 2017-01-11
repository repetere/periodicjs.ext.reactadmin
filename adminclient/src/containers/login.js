import { Component, } from 'react';
import styles from '../styles';
import { getRenderedComponent, } from '../components/AppLayoutMap';



function getLoginLayout(options) {
  let {loginfunction} =  options ;
  // console.log({loginfunction})
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
            props: {
              size:'is3',
            },
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
                onSubmit: loginfunction,// (data) => { console.log('formsubmit', data); },
                footergroups: [{
                  gridProps: {},
                  formElements: [ {
                    type: 'submit',
                    value: 'Login',
                    name:'login',
                    passProps: {
                      style:styles.isPrimary,
                    },
                    layoutProps: {
                      // style:{textAlign:'center'}
                    },
                  },{
                    type: 'submit',
                    value: 'Forgot Password',
                    name:'forgot',
                    passProps: {
                      style:styles.isLink,
                    },
                    layoutProps: {
                      // style:{textAlign:'center'}
                    },
                  },{
                    type: 'submit',
                    value: 'New User',
                    name:'register',
                    passProps: {
                      style:styles.isLink,
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
                    layoutProps: {
                      horizontalform:true,
                    },
                  }]
                }, {
                  gridProps: {},
                  formElements: [{
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
                  },{
                  gridProps: {},
                  formElements: [{
                    type: 'checkbox',
                    label: '',
                    placeholder: 'Remember Me',
                    name: 'rememberme',
                    passProps: {
                      type:'rememberme'
                    },
                    layoutProps: {
                      horizontalform:true,
                    },
                  }]
                  },
                /*  {
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
              },*/
              /*  
                {
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
                }
                
                */
                ]
              },
            }]
          },{
            component: 'Column',
            props: {
              size:'is3',
            },
          }]
        },
      ]
    }]
  }]
  };
  return loginLayout;  
}

class Login extends Component {
  // constructor(props) {
  //   super(props);
  //   console.log({ props });
  // }
  componentWillReceiveProps(nextProps) {
    console.log('Login componentWillReceiveProps nextProps', nextProps);
    // this.setState(nextProps);
  }
  render() {
    // console.log(this.props)
    return getRenderedComponent(getLoginLayout({
      loginfunction:this.props.loginUser,
    }));
  }
}

export default Login;
