<template>
  <!-- Tab menu -->
  <div class="tab-bar">
    <router-link to="/Menu" class="tab-item" active-class="active">
      <menu-icon :size="32" :style="{ color: isActive('/Menu') }"/>
    </router-link>
    <router-link to="/Calendario" class="tab-item" active-class="active">
      <calendar-icon :size="32" :style="{ color: isActive('/Calendario') }"/>
    </router-link>
    <router-link to="/Arquivo" class="tab-item" active-class="active">
      <file-icon :size="32" :style="{ color: isActive('/Arquivo') }"/>
    </router-link>
    <router-link  v-if="isAdmin" to="/Profissionais" class="tab-item" active-class="active">
      <group-icon :size="32" :style="{ color: isActive('/Profissionais') }"/>
    </router-link>
    <router-link  v-if="isAdmin" to="/Pacientes" class="tab-item" active-class="active">
      <account-icon :size="32" :style="{ color: isActive('/Pacientes') }"/>
    </router-link>
    <router-link to="/Configuracoes" class="tab-item" active-class="active">
      <cog-icon :size="32" :style="{ color: isActive('/Configuracoes') }"/>
    </router-link>
  </div>
</template>

<script>
import CalendarIcon from 'vue-material-design-icons/CalendarBlank.vue';
import MenuIcon from 'vue-material-design-icons/HomeVariantOutline.vue';
import FileIcon from 'vue-material-design-icons/FileOutline.vue';
import GroupIcon from 'vue-material-design-icons/AccountMultipleOutline.vue';
import AccountIcon from 'vue-material-design-icons/AccountOutline.vue';
import CogIcon from 'vue-material-design-icons/Cog.vue';

export default {
  components: {
    CalendarIcon,
    MenuIcon,
    FileIcon,
    GroupIcon,
    AccountIcon,
    CogIcon
  },
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
  padding: 15px 15px;
  text-decoration: none;
  color: #333;
  transition: background-color 0.3s ease;
}
</style>
