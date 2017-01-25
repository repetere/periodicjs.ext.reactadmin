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
        href: '/home',
        label: 'Dashboard',
        active: true,
      }
    }, {
      component: 'MenuAppLink',
      props: {
        href: '/applications',
        label: 'Applications'
      }
    }, {
      component: 'MenuAppLink',
      props: {
        href: '/documentation',
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
        href: '/dne/randomw',
        label: 'Team Settings'
      }
    }, {
      component: 'SubMenuLinks',
      children: [ {
        component: 'MenuAppLink',
        props: {
          href: '/blog',
          label: 'Members'
        }
      }, {
        component: 'MenuAppLink',
        props: {
          href: '/blog/21090',
          label: 'Plugins'
        }
      }, {
        component: 'MenuAppLink',
        props: {
          href: '/whatever',
          label: 'Add a member'
        }
      }]  
    }, {
      component: 'MenuAppLink',
      props: {
        href: '/login',
        label: 'Invitations'
      }
    }, {
      component: 'MenuAppLink',
      props: {
        href: '/login',
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
        href: '/p-admin',
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