const routes = [
  {
    path: '/',
    name: 'home',
    component: ()=>import('@/views/HomePage.vue'),
  },
  {
    path: '/admin',
    name: 'admin',
    component: ()=>import('@/views/AdminOnly.vue'),
  },
  {
    path: '/player',
    name: 'player',
    component: ()=>import('@/views/MusicPlay.vue'),
  },
  {
    path: '/register',
    name: 'register',
    component: ()=>import('@/views/RegisterPage.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: ()=>import('@/views/AccountCheck.vue'),
  },
  {
    path: '/space',
    name: 'space',
    component: ()=>import('@/views/UserSpace.vue'),
  },
  {
    path: '/test',
    name: 'test',
    component: ()=>import('@/views/AccountCheck.vue'),
  },
];

export default routes;
