'use strict';
// const dbstatsLayout = require('../../../utility/detail_views/layouts/dbstats.manifest.layout.js');

module.exports = (periodic) => {
  let reactadmin = periodic.app.controller.extension.reactadmin;
  let customCardProps = {};// helpers.getCustomCardProps(options);  

  return {
    containers: {
      [`${reactadmin.manifest_prefix}account/profile`]: {
        layout: {
          'component': 'div',
          'props': {
          },
          'children':[{
            'component':'Container',
            'props':{
              'style':{
                'marginTop':'5rem',
                'marginBottom':80,
              },
            },
            'children':[
              {
                'component':'ResponsiveForm',
                'thisprops': {
                  'formdata': ['user', 'userdata', ],
                },  
                'props': {
                  blockPageUI:true,
                  'onSubmit':{
                    'url':`${reactadmin.settings.basename}${reactadmin.manifest_prefix}contentdata/standard/:entitytype/:id?format=json&unflatten=true&updateprofile=true&updatecallback=true&handleupload=true`,
                    'options':{
                      'method':'PUT',
                    },
                    'params': [
                      {
                        'key':':id',
                        'val':'_id',
                      },
                      {
                        'key':':entitytype',
                        'val':'entitytype',
                      },
                    ],
                    'success':true,
                    'responseCallback':'func:this.props.updateUserProfile',
                  },
                  'hiddenFields':[{
                    'form_name':'docid',
                    'form_val':'_id',
                  }, ],
                  'flattenFormData': true,
                  'footergroups': false,
                  'formgroups': [
                    {
                      'gridProps':{
                        'style':{
                          'marginTop':30,
                          'padding':10,
                        },
                      },
                      'formElements': [
                        {
                          'type': 'layout',
                          'layoutProps':{
                            'style':{
                              'padding':0, 
                            },
                          },
                          'value': {
                            'component': 'div',
                            'children': [
                              {
                                'component': 'Title',
                                'children': 'Account Settings',
                              },
                            ],
                            'props':{
                              'style':{
                                'padding':0, 
                              },
                            },
                          },
                        }, 
                        {

                          type: 'layout',
                          value: {
                            'component': 'ResponsiveButton',
                            'children': 'Log Out',
                            props: {
                              confirmModal: true,
                              onClick: 'func:this.props.logoutUser',
                              buttonProps: {
                                size:'isMedium',
                              },
                              'style': {},
                            },
                          },
                          'layoutProps': {
                            'style': {
                              'alignSelf': 'flex-end',
                              'textAlign': 'right',
                              'padding': 0,
                            },
                          },
                        },
                        {
                          'type': 'submit',
                          'value': 'Save Changes',
                          'passProps': {
                            color: 'isPrimary',
                            size:'isMedium',
                            'style': {},
                          },
                          'layoutProps': {
                            size:'isNarrow',
                            'style': {
                              'alignSelf': 'flex-end',
                              'textAlign': 'right',
                              'padding': 0,
                              marginLeft:'20px',
                            },
                          },
                        },
                      ],
                    },
                    {
                      gridProps: {
                        isMultiline: false,
                      },
                      card: {
                        doubleCard: true,
                        leftDoubleCardColumn: {
                          size: 'isTwoThirds',
                        },
                        rightDoubleCardColumn: {
                          size:'isOneThird',
                        },
                        leftCardProps: Object.assign({}, customCardProps, {
                          cardTitle:  'Personal Information',
                        }),
                        rightCardProps: Object.assign({}, customCardProps, {
                          cardTitle: 'Account Information',
                        }),
                      },
                      formElements: [
                        {
                          formGroupCardLeft: [
                            {
                              type: 'text',
                              label:'First Name',
                              placeholder:'firstname',
                              name:'firstname',
                            },
                            {
                              type: 'text',
                              label:'Last Name',
                              placeholder:'lastname',
                              name:'lastname',
                            },
                            {
                              type: 'text',
                              label:'Website',
                              placeholder:'website.com',
                              name:'url',
                            },
                            {
                              type: 'select',
                              label:'Gender',
                              name: 'gender',
                              value:'',
                              options: [
                                {
                                  disabled: true,
                                  value: '',
                                  label:'Please select',
                                },
                                {
                                  value: 'female',
                                  label:'Female',
                                },
                                {
                                  value: 'male',
                                  label:'Male',
                                },
                                {
                                  value: 'other',
                                  label:'Other',
                                },
                              ],
                            },
                            {
                              type: 'group',
                              label: 'Profile Image',
                              layoutProps: {
                                // style: {
                                //   padding:0,
                                // },
                              },
                              groupElements: [
                                {
                                  type: 'layout',
                                  layoutProps: {
                                    style: {
                                      padding:0,
                                    },
                                  },
                                  value: {
                                    component: 'a',
                                    props: {
                                      target: '_blank',
                                    },
                                    thisprops: {
                                      href: [ 'user', 'profile_image_preview', ],
                                    },
                                    children: [
                                      {
                                        component: 'Image',
                                        thisprops: {
                                          src: [ 'user', 'profile_image_preview', ],
                                        },
                                        props: {
                                          style: {
                                            maxHeight: '5rem',
                                            maxWidth: '5rem',
                                            overflow: 'hidden',
                                          },
                                        },
                                      },
                                    ],
                                  },
                                },
                                {
                                  type: 'file',
                                  // value:'',
                                  // label:'Profile Image',
                                  name: 'profileimage',
                                  layoutProps: {
                                    style: {
                                      paddingTop:0,
                                    },
                                  },
                                },
                              ],
                            },
                            // {
                            //   type: 'file',
                            //   label:'Profile Image',
                            //   name:'primaryasset',
                            // },
                            {
                              type: 'editor',
                              label: 'Bio',
                              placeholder:'No profile',
                              name:'description',
                            },
                          ],
                          formGroupCardRight: [
                            {
                              type: 'text',
                              label: 'Email',
                              placeholder:'email@domain.tld',
                              name:'email',
                            },
                            {
                              type: 'text',
                              label: 'Username',
                              placeholder: 'Username',
                              name:'username',
                            },
                            {
                              type: 'text',
                              passProps: {
                                type:'password',
                              },
                              label:'Password',
                              name:'password',
                            },
                            {
                              type: 'text',
                              passProps: {
                                type:'password',
                              },
                              name:'passwordconfirm',
                              // name:'confirmpassword',
                            },
                            {
                              type: 'text',
                              label: 'Activated',
                              passProps: {
                                'state': 'isDisabled',
                              },
                              name:'activated',
                            },
                            {
                              type: 'text',
                              label: 'Account Type',
                              passProps: {
                                'state': 'isDisabled',
                              },
                              name: 'accounttype',
                            },
                          ],	
                        },
                      ],
                    },
                    {
                      gridProps: {},
                      card: {
                        twoColumns: true,
                        props: {
                          cardTitle:'Location Information',
                        },
                      },
                      formElements: [
                        {
                          formGroupElementsLeft: [
                            {
                              type: 'text',
                              label: 'City / Municipality',
                              name:'location.city',
                            },
                            {
                              type: 'text',
                              label: 'Country',
                              name:'location.country',
                            },
                            {
                              type: 'text',
                              label: 'Latitude',
                              name:'location.loc.latitude',
                            },
                          ],
                          formGroupElementsRight: [
                            {
                              type: 'text',
                              label: 'State / Region',
                              name:'location.state',
                            },
                            {
                              type: 'text',
                              label: 'Postal Code / Zip',
                              name:'location.zip',
                            },
                            {
                              type: 'text',
                              label: 'Longitude',
                              name:'location.loc.longitude',
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              },
            ],
          }, ],
        },
        'resources': {
          // contentstats: `${reactadmin.manifest_prefix}contentdata/standard/dbstats?format=json`,
        },
        'onFinish': 'render',
        'pageData': {
          'title': 'My Account',
          'navLabel': 'My Account',
        },
      },
    },
  };
};