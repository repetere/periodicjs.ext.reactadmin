export default {
  component: 'Menu',
  props: {},
  children: [ {
    component: 'MenuLabel',
    children:'General',
  }, {
    component: 'MenuList',
    children: [{
      component: 'MenuAppLink',
      props: {
        href: '#',
        label: 'Dashboard'
      }
    }, {
      component: 'MenuAppLink',
      props: {
        href: '#',
        label: 'Customers'
      }
    }]
  }, {
    component: 'MenuLabel',
    children:'Administration',
  }, {
    component: 'MenuList',
    children: [{
      component: 'MenuAppLink',
      props: {
        href: '#',
        label: 'Team Settings'
      }
    }, {
      component: 'SubMenuLinks',
      children: [ {
        component: 'MenuAppLink',
        props: {
          href: '#',
          label: 'Members'
        }
      }, {
        component: 'MenuAppLink',
        props: {
          href: '#',
          label: 'Plugins'
        }
      }, {
        component: 'MenuAppLink',
        props: {
          href: '#',
          label: 'Add a member'
        }
      }]  
    }, {
      component: 'MenuAppLink',
      props: {
        href: '#',
        label: 'Invitations'
      }
    }, {
      component: 'MenuAppLink',
      props: {
        href: '#',
        label: 'Authentication'
      }
    }]
  }, {
    component: 'MenuLabel',
    children:'Transactions',
  }, {
    component: 'MenuList',
    children: [{
      component: 'MenuAppLink',
      props: {
        href: '#',
        label: 'Payments'
      }
    }, {
      component: 'MenuAppLink',
      props: {
        href: '#',
        label: 'Transfers'
      }
    }, {
      component: 'MenuAppLink',
      props: {
        href: '#',
        label: 'Balance'
      }
    }]
  }],
};