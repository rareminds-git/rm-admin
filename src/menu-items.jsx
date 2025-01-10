const menuItems = {
  items: [
    {
      id: 'navigation',
      title: 'Navigation',
      type: 'group',
      icon: 'icon-navigation',
      children: [
        {
          id: 'dashboard',
          title: 'Dashboard',
          type: 'item',
          icon: '',
          url: '/dashboard'
        },
        {
          id: 'pages',
          title: 'Pages',
          type: 'item',
          icon: '',
          url: '/pages'
        },
        {
          id: 'blogs',
          title: 'Blogs',
          type: 'item',
          icon: '',
          url: '/blogs'
        },
        {
          id: 'testimonials',
          title: 'Testimonials',
          type: 'item',
          icon: '',
          url: '/testimonials'
        },
        {
          id: 'events',
          title: 'Events',
          type: 'item',
          icon: '',
          url: '/events'
        },
        {
          id: 'contacts',
          title: 'Contacts',
          type: 'item',
          icon: '',
          url: '/contacts'
        },
        {
          id: 'gallery',
          title: 'Gallery',
          type: 'item',
          icon: '',
          url: '/gallery'
        }
      ]
    },

    {
      id: 'services',
      title: '',
      type: 'group',
      icon: 'icon-pages',
      children: [
        {
          id: 'services',
          title: 'Services',
          type: 'collapse',

          children: [
            {
              id: 'corporate',
              title: 'Corporate',
              type: 'item',
              url: '/services/corporate',
              target: true,
              breadcrumbs: false
            },
            {
              id: 'government',
              title: 'Government',
              type: 'item',
              url: '/services/government',
              target: true,
              breadcrumbs: false
            },
            {
              id: 'institutions',
              title: 'Institutions',
              type: 'item',
              url: '/services/institutions',
              target: true,
              breadcrumbs: false
            },
            {
              id: 'schools',
              title: 'Schools',
              type: 'item',
              url: '/services/schools',
              target: true,
              breadcrumbs: false
            }
          ]
        }
      ]
    },

    {
      id: 'case-studies',
      title: '',
      type: 'group',
      icon: 'icon-pages',
      children: [
        {
          id: 'case-studies',
          title: 'Case Studies',
          type: 'collapse',

          children: [
            {
              id: 'corporate',
              title: 'Corporate',
              type: 'item',
              url: '/case-studies/corporate',
              target: true,
              breadcrumbs: false
            },
            {
              id: 'government',
              title: 'Government',
              type: 'item',
              url: '/case-studies/government',
              target: true,
              breadcrumbs: false
            },
            {
              id: 'institutions',
              title: 'Institutions',
              type: 'item',
              url: '/case-studies/institutions',
              target: true,
              breadcrumbs: false
            },
            {
              id: 'schools',
              title: 'Schools',
              type: 'item',
              url: '/case-studies/schools',
              target: true,
              breadcrumbs: false
            }
          ]
        }
      ]
    }
  ]
};

export default menuItems;
