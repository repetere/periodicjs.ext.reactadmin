'use strict';
const IndexManifest = {
  component: 'Hero',
  props: {
    size: 'isFullheight',
  },
  children: [
    {
      component: 'HeroBody',
      props: {},
      children: [
        {
          component: 'Container',
          props: {},
          children: [
            {
              component: 'Columns',
              children: [
                {
                  component: 'Column',
                  props: {
                    size: 'is3',
                  },
                },
                {
                  component: 'Column',
                  props: {
                    'style': {
                      'textAlign': 'center',
                    },
                  },
                  children: [
                    {
                      component: 'Title',
                      props: {
                        'style': {
                          'textAlign': 'center',
                        },
                      },
                      children: 'Welcome',
                    },
                    { 
                      component: 'Image',
                      props: {
                        style: {
                          margin:'auto',
                        },
                        src: '/favicon.png',
                        size: 'is128X128',
                      },
                      windowprops: {
                        alt: ['document','title'],
                      },
                    },
                  ],
                },
                {
                  component: 'Column',
                  props: {
                    size: 'is3',
                  },
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

module.exports = () => { 
  return {
    'containers': {
      '': {
        'layout': IndexManifest,
        'resources': {},
        'onFinish': 'render',
        'pageData': {
          'title': 'Home',
          'navLabel': 'Home',
        },
      },
      '/': {
        'layout': IndexManifest,
        'resources': {},
        'onFinish': 'render',
        'pageData': {
          'title': 'Home',
          'navLabel': 'Home',
        },
      },
      '/home': {
        'layout': IndexManifest,
        'resources': {},
        'onFinish': 'render',
        'pageData': {
          'title': 'Home',
          'navLabel': 'Home',
        },
      },
    },
  };
}; 