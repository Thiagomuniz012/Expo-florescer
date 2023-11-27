<template>

    <!-- Página inicial com Login-->
    <div class="login-container">
      <form @submit.prevent="fazerLogin" class="login-form">
        <div class="form-group" >
            <img src="/icon.png" alt="imagem logo"><br>
          <label for="email">E-mail:</label>
          <input type="email" id="email" v-model="loginData.email" required>
        </div>
        <div class="form-group">
          <label for="senha">Senha:</label>
          <input type="password" id="senha" v-model="loginData.senha" required>
        </div>
        <button type="submit">Entrar</button>
      </form>
    </div>
  </template>
  
  <script>
export default {
  data() {
    return {
      loginData: {
        email: '',
        senha: ''
      }
    };
  },
  methods: {

    //Lógica de Login para Admin e Usuário
    fazerLogin() {
      if (this.loginData.email === 'admin@gmail.com' && this.loginData.senha === '1234') {
        this.setUserRole('admin');
        this.$router.push('/Inicial');
      } else if (this.loginData.email === 'user@gmail.com' && this.loginData.senha === '1234') {
        this.setUserRole('user');
        this.$router.push('/Inicial');
      } else {
        alert('Credenciais inválidas. Tente novamente.');
      }
    },

    //Guarda no localStorage se é Admin ou User
    setUserRole(role) {
      localStorage.setItem('userRole', role);
    }
  }
};

</script>
  
  <style scoped>
  img {
  display: block;
  margin: 0 auto;
  width: 300px;
  margin-bottom: 110px;
  margin-top: -100px;
}
  *{
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  .login-container {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
  }
  .form-group {
    margin-bottom: 15px;
    text-align: left;
  }
  
  input[type="email"],
  input[type="password"],
  button {
    width: 100%;
    padding: 10px;
    box-sizing: border-box;
    margin-top: 5px;
    border-radius: 3px;
    transition: border-color 0.3s ease;
  }
  
  input[type="email"]:focus,
  input[type="password"]:focus {
    border-color: orange;
  }
  
  button {
    background-color: #FF914D;
    color: white;
    border: none;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  button:hover {
    background-color: #FF914D;
  }
  
  </style>
  