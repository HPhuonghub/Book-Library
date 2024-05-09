export const adminMenu = [
  {
    //hệ thống
    name: "menu.admin.manager",
    menus: [
      { name: "menu.admin.CRUD-user", link: "/system/user-manage" },
      {
        name: "menu.admin.manager-book",
        link: "/system/book-redux",
      },
      {
        name: "menu.admin.manager-order",
        link: "/system/order-manage",
      },

      // { name: 'menu.system.system-parameter.header', link: '/system/system-parameter' },
    ],
  },
];

export const userMenu = [
  {
    //hệ thống
    name: "menu.user.manager",
    menus: [
      {
        name: "menu.user.manager-book",
        link: "/user/user-book",
      },
      {
        name: "menu.user.manager-order",
        link: "/user/user-oder",
      },

      // { name: 'menu.system.system-parameter.header', link: '/system/system-parameter' },
    ],
  },
];
