'use strict';
module.exports = {
  "containers": {
    "/r-admin/content/testbuttonmodal": {
      "layout": {
        "component": "Hero",
        "props": {
          "size": "isFullheight"
        },
        "children": [{
          "component": "HeroBody",
          "props": {
            "className": "testTest",
            "style": {
              "padding": "80px 0"
            }
          },
          "children": [{
            "component": "Container",
            "props": {},
            "children": [{
                "component": "Title",
                "children": "ResponsiveTable onClick event"
              },
              {
                "component": "ResponsiveForm",
                "props": {
                  "blockPageUI": true,
                  "blockPageUILayout": {
                    "component": "div",
                    "children": "Random Loading Text"
                  },
                  "useFormOptions": true,
                  "flattenFormData": true,
                  "formdata": {
                    "log": [{ "id": 1, "first_name": "Tana", "last_name": "Hawkswood", "email": "thawkswood0@discuz.net" },
                      { "id": 2, "first_name": "Layne", "last_name": "Roseby", "email": "lroseby1@wisc.edu" },
                      { "id": 3, "first_name": "Marijn", "last_name": "Bowton", "email": "mbowton2@sun.com" },
                      { "id": 4, "first_name": "Vera", "last_name": "Trousdale", "email": "vtrousdale3@ftc.gov" },
                      { "id": 5, "first_name": "Xerxes", "last_name": "Nettles", "email": "xnettles4@1und1.de" },
                      { "id": 6, "first_name": "Mickie", "last_name": "Fountaine", "email": "mfountaine5@feedburner.com" },
                      { "id": 7, "first_name": "Kenn", "last_name": "Rudledge", "email": "krudledge6@xinhuanet.com" },
                      { "id": 8, "first_name": "Daune", "last_name": "Yglesias", "email": "dyglesias7@weibo.com" },
                      { "id": 9, "first_name": "Errick", "last_name": "Croydon", "email": "ecroydon8@quantcast.com" },
                      { "id": 10, "first_name": "Rosette", "last_name": "Spering", "email": "rspering9@toplist.cz" },
                      { "id": 11, "first_name": "Danika", "last_name": "Gioan", "email": "dgioana@storify.com" },
                      { "id": 12, "first_name": "Grier", "last_name": "Heaney`", "email": "gheaneyb@jimdo.com" },
                      { "id": 13, "first_name": "Leeland", "last_name": "Gynne", "email": "lgynnec@sphinn.com" },
                      { "id": 14, "first_name": "Bryanty", "last_name": "McGillreich", "email": "bmcgillreichd@wordpress.org" },
                      { "id": 15, "first_name": "Irena", "last_name": "Soreau", "email": "isoreaue@cbc.ca" },
                      { "id": 16, "first_name": "Salome", "last_name": "Glencrosche", "email": "sglencroschef@sogou.com" },
                      { "id": 17, "first_name": "Burke", "last_name": "Matejovsky", "email": "bmatejovskyg@squidoo.com" },
                      { "id": 18, "first_name": "Corbett", "last_name": "Shoesmith", "email": "cshoesmithh@opera.com" },
                      { "id": 19, "first_name": "Bertram", "last_name": "Mackiewicz", "email": "bmackiewiczi@wisc.edu" },
                      { "id": 20, "first_name": "Linda", "last_name": "Gair", "email": "lgairj@netvibes.com" },
                      { "id": 21, "first_name": "Hanan", "last_name": "Ibbetson", "email": "hibbetsonk@cmu.edu" },
                      { "id": 22, "first_name": "Sigmund", "last_name": "Reidshaw", "email": "sreidshawl@europa.eu" },
                      { "id": 23, "first_name": "Tiff", "last_name": "Seekings", "email": "tseekingsm@nih.gov" },
                      { "id": 24, "first_name": "Tessy", "last_name": "Ferdinand", "email": "tferdinandn@ocn.ne.jp" },
                      { "id": 25, "first_name": "Sean", "last_name": "Marishenko", "email": "smarishenkoo@google.fr" },
                      { "id": 26, "first_name": "Lydon", "last_name": "Yushankin", "email": "lyushankinp@behance.net" },
                      { "id": 27, "first_name": "Clayborn", "last_name": "Burgher", "email": "cburgherq@yellowpages.com" },
                      { "id": 28, "first_name": "Antoine", "last_name": "Redfield", "email": "aredfieldr@jigsy.com" },
                      { "id": 29, "first_name": "Vivienne", "last_name": "Mutch", "email": "vmutchs@example.com" },
                      { "id": 30, "first_name": "Arturo", "last_name": "Cutress", "email": "acutresst@statcounter.com" },
                      { "id": 31, "first_name": "Pollyanna", "last_name": "Beane", "email": "pbeaneu@imageshack.us" },
                      { "id": 32, "first_name": "Faustine", "last_name": "Hucklesby", "email": "fhucklesbyv@addtoany.com" },
                      { "id": 33, "first_name": "Gaelan", "last_name": "Athowe", "email": "gathowew@who.int" },
                      { "id": 34, "first_name": "Moritz", "last_name": "Dytham", "email": "mdythamx@people.com.cn" },
                      { "id": 35, "first_name": "Etta", "last_name": "Oxborrow", "email": "eoxborrowy@berkeley.edu" },
                      { "id": 36, "first_name": "Susana", "last_name": "Rosendahl", "email": "srosendahlz@marriott.com" },
                      { "id": 37, "first_name": "Nesta", "last_name": "Gwyer", "email": "ngwyer10@gov.uk" },
                      { "id": 38, "first_name": "Cary", "last_name": "Schwandermann", "email": "cschwandermann11@cnbc.com" },
                      { "id": 39, "first_name": "Orelia", "last_name": "Olwen", "email": "oolwen12@fotki.com" },
                      { "id": 40, "first_name": "Field", "last_name": "Enevold", "email": "fenevold13@mit.edu" },
                      { "id": 41, "first_name": "Edithe", "last_name": "Daventry", "email": "edaventry14@ustream.tv" },
                      { "id": 42, "first_name": "Christi", "last_name": "Van den Oord", "email": "cvandenoord15@blogger.com" },
                      { "id": 43, "first_name": "Nancee", "last_name": "McLucky", "email": "nmclucky16@google.fr" },
                      { "id": 44, "first_name": "Zora", "last_name": "Passion", "email": "zpassion17@gov.uk" },
                      { "id": 45, "first_name": "Verna", "last_name": "Gerhartz", "email": "vgerhartz18@indiegogo.com" },
                      { "id": 46, "first_name": "Lia", "last_name": "Breslane", "email": "lbreslane19@army.mil" },
                      { "id": 47, "first_name": "Stacee", "last_name": "De la Zenne", "email": "sdelazenne1a@usda.gov" },
                      { "id": 48, "first_name": "Ysabel", "last_name": "Barnham", "email": "ybarnham1b@icio.us" },
                      { "id": 49, "first_name": "Renato", "last_name": "Griffen", "email": "rgriffen1c@amazon.de" },
                      { "id": 50, "first_name": "Major", "last_name": "Salsberg", "email": "msalsberg1d@twitpic.com" }
                    ]
                  },
                  "notificationForm": {
                    "color": "isWhite",
                    "style": {
                      "border": "1px solid lightgrey"
                    }
                  },
                  "style": {
                    "marginBottom": "10px",
                    "color": "white"
                  },
                  "formgroups": [{
                      "formElements": [{
                        "type": "datatable",
                        useInputRows: false,
                        addNewRows: false,
                        "flattenRowData": false,
                        "name": "log",
                        "headers": [{
                          label: 'ID',
                          sortid: 'id',
                          sortable: false,
                        }, {
                          label: 'First Name',
                          sortid: 'first_name',
                          sortable: false,
                        }, {
                          label: 'Last Name',
                          sortid: 'last_name',
                          sortable: false,
                        }, {
                          label: 'Email',
                          sortid: 'email',
                          sortable: false,
                        }, {
                          label: ' ',
                          columnProps: {
                            style: {
                              textAlign: 'right',
                            }
                          },
                          buttons: [{
                            children: 'Edit',
                            passProps: {
                              buttonProps: {},
                              // style: styles.buttons.primary,
                              style: {
                                backgroundColor: 'blue',
                                color: 'white',
                              },
                              onClick: 'func:this.props.createModal',
                              onclickProps: {
                                title: 'Edit Condition',
                                pathname: `/r-admin/modals/testparams/:id`,
                                // someprops: 'some test prop'
                                params: [{key: ':id', val: 'email'}]
                              },
                            },
                          }]
                        }, ],
                      }]
                    },
                    {
                      "formElements": [{
                        "type": "submit",
                        "passProps": {
                          "color": "isInfo",
                          "size": "isLarge"
                        },
                        "confirmModalDISABLE": {},
                        "value": "Debug Form"
                      }]
                    }
                  ]
                }
              },
            ]
          }]
        }]
      },
      "resources": {
      },
      "onFinish": "render",
      "pageData": {
        "title": "Home",
        "navLabel": "Home"
      }
    }
  }
}