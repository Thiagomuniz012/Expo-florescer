import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';
import Menu from './Pages/Menu.vue';
import Calendario from './Pages/Calendario.vue';
import Arquivo from './pages/Arquivo.vue';
import Login from './Pages/Login.vue';
import Profissionais from './Pages/Profissionais.vue';
import Pacientes from './Pages/Pacientes.vue';
import '/node_modules/font-awesome/css/font-awesome.min.css'

//Página onde são definidas as rotas

const routes = [
  { path: '/', component: Login },
  { path: '/Menu', component: Menu },
  { path: '/Calendario', component: Calendario },
  { path: '/Arquivo', component: Arquivo },
  { path: '/Profissionais', component: Profissionais },
  { path: '/Pacientes', component: Pacientes },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

createApp(App).use(router).mount('#app');
