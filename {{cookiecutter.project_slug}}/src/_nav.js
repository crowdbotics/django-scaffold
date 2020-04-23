export const loggedRoutes = {
  items: [
    {
      title: true,
      name: "Modules"
    },
    {
      name: "Hello World",
      url: "/welcome",
      icon: "icon-star"
    }
  ]
};

export const publicRoutes = {
  items: [
    {
      title: true,
      name: "Modules"
    },
    {
      name: 'Email Auth',
      url: '/email-auth',
      icon: 'icon-envelope',
      children: [
        {
          name: 'Login',
          url: '/login',
          icon: 'icon-star',
        },
        {
          name: 'Register',
          url: '/register',
          icon: 'icon-star',
        }
      ],
    },
  ]
};