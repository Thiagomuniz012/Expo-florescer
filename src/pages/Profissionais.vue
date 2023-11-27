<template>
  <div>
    <h1>Profissionais</h1>
    <button @click="abrirModal" class="botao-adicao">+</button>
  
    <div class="modal" v-if="modalAberto">
      <div class="modal-conteudo">
        <button @click="fecharModal" class="closeButton"><i class="fa fa-2x fa-times"></i></button>
        <form @submit.prevent="salvarProfissional">
          <input v-model="profissional.nome" class="input-field" placeholder="Nome do profissional" required />
          <input v-model="profissional.descricao" class="input-field" placeholder="Descrição" required />
          <input v-model.number="profissional.preco" class="input-field" type="number" placeholder="Preço" required />
          <button type="submit" class="submit-button">{{ modoEdicao ? 'Atualizar' : 'Cadastrar' }}</button>
        </form>
      </div>
    </div>
    
    <div id="card" v-for="profissional in profissionais" :key="profissional.id">
      <div class="profissional-info">
        <div>{{ profissional.nome }}</div>
        <div>{{ profissional.descricao }}</div>
        <div>R$: {{ profissional.preco }}</div>
      </div>
      <div class="botoes">
        <button @click="editarProfissional(profissional)" class="editar-button">
          <i class="fa fa-edit"></i>
        </button>
        <button @click="excluirProfissional(profissional.id)" class="excluir-button">
          <i class="fa fa-trash"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import db from '../config/db';

export default {
  data() {
    return {
      profissional: {
        id: null,
        nome: '',
        descricao: '',
        preco: '',
      },
      profissionais: [],
      modoEdicao: false,
      modalAberto: false,
    };
  },
  created() {
    this.carregarProfissionais();
  },
  methods: {
    async salvarProfissional() {
      try {
        if (this.modoEdicao) {
          await db.profissionais.update(this.profissional.id, {
            nome: this.profissional.nome,
            descricao: this.profissional.descricao,
            preco: this.profissional.preco,
          });
        } else {
          await db.profissionais.add({
            nome: this.profissional.nome,
            descricao: this.profissional.descricao,
            preco: this.profissional.preco,
          });
        }
        this.carregarProfissionais();
        this.profissional = {
          id: null,
          nome: '',
          descricao: '',
          preco: 0,
        };
        this.fecharModal();
      } catch (error) {
        console.error(error);
      }
    },
    async editarProfissional(profissional) {
      this.profissional = { ...profissional };
      this.modoEdicao = true;
      this.abrirModal();
    },
    async excluirProfissional(id) {
      try {
        await db.profissionais.delete(id);
        this.carregarProfissionais();
      } catch (error) {
        console.error(error);
      }
    },
    async carregarProfissionais() {
      try {
        const profissionais = await db.profissionais.toArray();
        this.profissionais = profissionais;
      } catch (error) {
        console.error(error);
      }
    },
    abrirModal() {
      this.modalAberto = true;
    },
    fecharModal() {
      this.modalAberto = false;
      this.modoEdicao = false;
    },
  },
};
</script>

<style>
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
input {
  width: 100%;
  margin: 10px;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
input:focus {
  border-color: #007BFF;
  outline: none;
}
button {
  background-color: #fff;
  padding: 10px 20px;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
button:hover {
  background-color: #0056b3;
}
.botao-adicao {
  position: fixed;
  bottom: 77px;
  right: 27px;
  width: 65px;
  height: 65px;
  background-color: #FF914D;
  color: #fff;
  border-radius: 50%;
  text-align: center;
  font-size: 50px;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
}
.modal {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal-conteudo {
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}
form {
  display: flex;
  flex-direction: column;
}
.input-field {
  margin: 10px 0;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
}
.submit-button {
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 18px;
  cursor: pointer;
}
.submit-button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
#card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  margin: 10px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 5px;
}

#card:last-child {
  margin-bottom: 150px;
}


.profissional-info {
  flex: 1;
  display: flex;
  justify-content: space-between;
  width: 70%;
  margin-right: 30px;
  margin-left: 18px;
}
.botoes {
  display: flex;
  flex-direction: row;
}

.editar-button{
  background-color: #45ff5a;
  margin-right: 5px;
}

.excluir-button{
  background-color: #ff4545;
}

h1{
  font-family: 'Ubuntu', sans-serif;
  margin: 20px;
}

.closeButton{
  color:red;
  padding: 0;
  margin: 0;
  margin-bottom: 5px;
}
</style>