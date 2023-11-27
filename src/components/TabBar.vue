<template>
  <!-- Tab menu -->
  <div class="tab-bar">
    <router-link to="/Menu" class="tab-item" active-class="active">
      <i class="fa fa-2x fa-home" :style="{ color: isActive('/Menu') }"></i>
    </router-link>
    <router-link to="/Calendario" class="tab-item" active-class="active">
      <i class="fa fa-2x fa-calendar" :style="{ color: isActive('/Calendario') }"></i>
    </router-link>
    <router-link to="/Arquivo" class="tab-item" active-class="active">
      <i class="fa fa-2x fa-file-o" :style="{ color: isActive('/Arquivo') }"></i>
    </router-link>
    <router-link  v-if="isAdmin" to="/Profissionais" class="tab-item" active-class="active">
      <i class="fa fa-2x fa-users" :style="{ color: isActive('/Profissionais') }"></i>
    </router-link>
    <router-link  v-if="isAdmin" to="/Pacientes" class="tab-item" active-class="active">
      <i class="fa fa-2x fa-user" :style="{ color: isActive('/Pacientes') }"></i>
    </router-link>
  </div>
</template>

<script>
export default {
  computed: {
    // Verificação se é Admin, apenas Admin pode ver a página de Folheto onde é cadastrado novos produtos
    isAdmin() {
      const userRole = localStorage.getItem('userRole');
      return userRole === 'admin';
    }
  },
  methods: {
    // Verifica se a rota está ativa
    isActive(route) {
      return this.$route.path === route ? 'rgb(0, 23, 55)' : '#FF914D';
    }
  }
};
</script>

<style>
.tab-bar {
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #fff;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 999;
}

.tab-item {
  padding: 15px 20px;
  text-decoration: none;
  color: #333;
  transition: background-color 0.3s ease;
}
</style>
