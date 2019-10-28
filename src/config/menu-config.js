/* 
左侧Menu导航的数据配置
*/
// 根据menuList生成<Item>和<SubMenu>组件的数组
const menuList = [
  {
    title: 'menus.home', // 菜单标题名称
    key: '/home', // 对应的path
    icon: 'home', // 图标名称
  },
  {
    title: 'menus.products',
    key: '/products',
    icon: 'appstore',
    children: [ // 子菜单列表
      {
        title: 'menus.category',
        key: '/category',
        icon: 'bars'
      },
      {
        title: 'menus.product',
        key: '/product',
        icon: 'tool'
      },
    ]
  },

  {
    title: 'menus.user',
    key: '/user',
    icon: 'user'
  },
  {
    title: 'menus.role',
    key: '/role',
    icon: 'safety',
  },

  {
    title: 'menus.charts',
    key: '/charts',
    icon: 'area-chart',
    children: [
      {
        title: 'menus.bar',
        key: '/charts/bar',
        icon: 'bar-chart'
      },
      {
        title: 'menus.line',
        key: '/charts/line',
        icon: 'line-chart'
      },
      {
        title: 'menus.pie',
        key: '/charts/pie',
        icon: 'pie-chart'
      },
    ]
  },
]

export default menuList