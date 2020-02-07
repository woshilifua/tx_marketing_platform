import Layout from '@/layout'

export default {
  path: '/activity',
  component: Layout,
  redirect: '/activity/list',
  name: 'Marketing',
  meta: {
    title: '营销活动',
    icon: 'example',
    roles: ['admin', 'marketing']
  },
  children: [
    {
      path: '/activity/list',
      component: () => import('@/views/marketing/list'),
      name: 'ActivityList',
      meta: {
        title: '活动列表', icon: 'list',
        roles: ['admin', 'marketing']
      }
    },
    {
      path: '/activity/create',
      component: () => import('@/views/marketing/create'),
      name: 'CreateActivity',
      meta: {
        title: '创建活动', icon: 'edit',
        roles: ['admin', 'marketing']
      }
    },
    {
      path: '/activity/review/:id',
      component: () => import('@/views/marketing/review'),
      name: 'ReviewActivity',
      hidden: true,
      meta: {
        title: '审核活动', noCache: true, activeMenu: '/example/list',
        roles: ['admin', 'marketing']
      },
    },
    {
      path: '/activity/view/:id',
      component: () => import('@/views/marketing/view'),
      name: 'ViewActivity',
      hidden: true,
      meta: {
        title: '活动明细', noCache: true, activeMenu: '/example/list',
        roles: ['admin', 'marketing']
      },
    },
    {
      path: '/activity/view/channel/:id',
      component: () => import('@/views/marketing/view-channel'),
      name: 'ViewActivityChannel',
      hidden: true,
      meta: {
        title: '渠道发展明细', noCache: true, activeMenu: '/example/list',
        roles: ['admin', 'marketing']
      },
    }
  ]
}