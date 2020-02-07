import Layout from '@/layout'

export default {
  path: '/roles',
  component: Layout,
  redirect: '/roles/marketing/list',
  name: 'Roles',
  meta: {
    title: '成员管理',
    icon: 'example',
    roles: ['admin', 'marketing']
  },
  children: [
    {
      path: '/roles/marketing/list',
      name: 'Marketing',
      component: () => import('@/views/roles/marketing/list'),
      meta: {
        title: '营销主列表', icon: 'list',
        roles: ['admin', 'marketing']
      }
    },
    {
      path: '/roles/sale/list',
      name: 'Sale',
      component: () => import('@/views/roles/sale/list'),
      meta: {
        title: '渠道商列表', icon: 'list',
        roles: ['admin', 'marketing']
      }
    }
  ]
}