'use strict';
const helpers = require('../lib/helpers');

module.exports = (options) => {
  let customCardProps = helpers.getCustomCardProps(options);  
  let TitleComponent = {
    component: 'Title',
    props: {
      style: {
        marginTop: '30',
      },
    },
    asyncprops: {
      children: [ 'contentstats', 'contentcounts', 'appname', ],
    },
    // children:'Application Status',
  };
  let levelItems = [
    {
      heading: 'Collections',
      asyncprop: 'totalCollections',
    },
    {
      heading: 'Documents',
      asyncprop: 'totalItems',
    },
  ];
  if (!options.excludeExtension) {
    levelItems.splice(0, 0, {
      heading: 'Extensions',
      asyncprop: 'totalExtensions',
    });
  }
  let LevelComponent = {
    component: 'ResponsiveCard',
    props: Object.assign({}, customCardProps, options.cardprops, {
      cardTitle: 'Application Overview',
    }),
    children: [
      {
        component: 'Level',
        children: levelItems.map(level => {
          return {
            component: 'LevelItem',
            props: {
              hasTextCentered: true,
            },
            children: [
              {
                component: 'Heading',
                children: level.heading,
              },
              {
                component: 'Title',
                children: [
                  {
                    component: 'RawStateOutput',
                    props: {
                      select: 'stat',
                      display: true,
                      type: 'inline',
                    },
                    asyncprops: {
                      stat: [ 'contentstats', 'contentcounts', level.asyncprop, ],
                    },
                  },
                ],
              },
            ],
          };
        }),
      },
    ],
  };
  let ChartComonent = {
    component: 'ResponsiveCard',
    props: Object.assign({}, customCardProps, options.cardprops, {
      cardTitle: 'Database Overview',
    }),
    children: [
      {
        component: 'Columns',
        children: [
          {
            component: 'Column',
            children: [
              {
                component: 'recharts.RadialBarChart',
                props: {
                  width: 700,
                  height: 700,
                  innerRadius: '10%',
                  outerRadius: '90%',
                  margin: 'auto',
                },
                asyncprops: {
                  data: [ 'contentstats', 'contentcounts', 'data', ],
                },
                children: [
                  {
                    component: 'recharts.RadialBar',
                    props: {
                      minAngle: 100,
                      maxAngle: -270,
                      // label: true,
                      barSize: 10,
                      background: true,
                      clockWise: true,
                      dataKey: 'docs',
                      startAngle: 90,
                      endAngle: -270,
                    },
                  },
                  {
                    component: 'recharts.Tooltip',
                  },
                ],
              },
            ],
          },
          {
            component: 'Column',
            children: [
              {
                component: 'ResponsiveTable',
                props: {
                  hasPagination: false,
                  tableProps: {
                    isBordered: true,
                  },
                  headers: [
                    {
                      label: 'Collection',
                      sortid: 'name',
                      sortable: true,
                    },
                    {
                      label: 'Count',
                      sortid: 'count',
                      sortable: true,
                    },
                  ],
                },
                asyncprops: {
                  rows: [ 'contentstats', 'contentcounts', 'data', ],
                },
              },
            ],
          },
        ],
      },
    ],
  };
  let ExtensionComponent = {
    component: 'ResponsiveCard',
    props: Object.assign({}, customCardProps, options.cardprops, {
      cardTitle: 'Extensions Overview',
    }),
    children: [
      {
        component: 'ResponsiveTable',
        props: {
          hasPagination: false,
          tableProps: {
            // isBordered:true,
          },
          headers: [
            {
              label: 'Name',
              sortid: 'name',
              sortable: true,
            },
            {
              label: 'Version',
              sortid: 'version',
              sortable: true,
            },
            {
              label: 'Enabled',
              sortid: 'enabled',
              sortable: true,
              tostring: true,
            },
            {
              label: 'Installed',
              sortid: 'date',
              sortable: true,
              momentFormat: 'lll',
            },
          ],
        },
        asyncprops: {
          rows: [ 'contentstats', 'contentcounts', 'extensions', ],
        },
      },
    ],
  };
  let DocumentFeedComponent = {
    component: 'ResponsiveCard',
    props: Object.assign({}, customCardProps, options.cardprops, {
      cardTitle: 'Document Feed',
    }),
    children: [
      {
        component: 'DynamicLayout',
        props: {
          isColumns: true,
          columnsProps: {
            isMultiline: true,
          },
          layout: {
            component: 'Column',
            props: {
              size: 'isOneThird',
            },
            bindprops: true,
            children: [
              {
                component: 'Message',
                thisprops: {
                  header: [ 'title', ],
                  children: [ 'description', ],
                },
                bindprops: true,
                children: [
                  {
                    component: 'DynamicForm',
                    thisprops: {
                      initialData: [],
                    },
                    props: {
                      formgroups: [
                        {
                          name: 'entitytype',
                          label: 'Entity',
                        },
                        {
                          name: 'updatedat',
                          label: 'Updated',
                          momentFormat: 'lll',
                        },
                        {
                          name: 'description',
                          label: 'Description',
                        },
                      ].map(formelm => {
                        return {
                          formElements: [
                            {
                              type: 'text',
                              name: formelm.name,
                              label: formelm.label,
                              momentFormat: formelm.momentFormat,
                              passProps: {
                                state: 'isDisabled',
                                style: {
                                  background: 'white',
                                },
                              },
                            },
                          ],
                        };
                      }),
                    },
                  },
                ],
              },
            ],
          },
        },
        asyncprops: {
          items: [ 'contentstats', 'contentcounts', 'databaseFeedData', ],
        },
      },
    ],
  };

  let dbstatsLayout = [];
  if (!options.excludeTitle) {
    dbstatsLayout.push(TitleComponent);
  }
  if (!options.excludeLevel) {
    dbstatsLayout.push(LevelComponent);
  }
  if (!options.excludeChart) {
    dbstatsLayout.push(ChartComonent);
  }
  if (options.additionalComponents) {
    dbstatsLayout.push(...options.additionalComponents);
  }
  if (!options.excludeExtension) {
    dbstatsLayout.push(ExtensionComponent);
  }
  if (!options.excludeDocument) {
    dbstatsLayout.push(DocumentFeedComponent);
  }

  return dbstatsLayout;
};