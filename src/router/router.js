const routes = [
  {
    path: '/',
    name: 'home',
    component: ()=>import('@/views/Home_page.vue'),
  },
  {
    path: '/admin',
    name: 'admin',
    component: ()=>import('@/views/Admin_page.vue'),
  },
  {
    path: '/player',
    name: 'player',
    component: ()=>import('@/views/Player_page.vue'),
  },
  {
    path: '/register',
    name: 'register',
    component: ()=>import('@/views/Register_page.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: ()=>import('@/views/Login_page.vue'),
  },
  {
    path: '/space',
    name: 'space',
    component: ()=>import('@/views/Space_page.vue'),
  },
];

export default routes;
