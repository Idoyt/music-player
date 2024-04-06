const routes = [
  {
    path: '/',
    name: 'home',
    component: ()=>import('@/views/HOME.vue'),
  },
  {
    path: '/admin',
    name: 'admin',
    component: ()=>import('@/views/ADMIN.vue'),
  },
  {
    path: '/player',
    name: 'player',
    component: ()=>import('@/views/DETAILS.vue'),
  },
  {
    path: '/register',
    name: 'register',
    component: ()=>import('@/views/RESGISTER.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: ()=>import('@/views/LOGIN.vue'),
  },
  {
    path: '/space',
    name: 'space',
    component: ()=>import('@/views/SPACE.vue'),
  },
];

export default routes;
