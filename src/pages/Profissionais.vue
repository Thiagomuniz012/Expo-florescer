<template>
  <div>
    <h1>Profissionais</h1>
    <button @click="abrirModal" class="botao-adicao">+</button>
  
    <div class="modal" v-if="modalAberto">
      <div class="modal-conteudo">
        <button @click="fecharModal" class="closeButton"><i class="fa fa-2x fa-times"></i></button>
        <form @submit.prevent="salvarProfissional">
          <input v-model="profissional.nome" class="input-field" placeholder="Nome Completo" required />
          <input v-model="profissional.dataNascimento" class="input-field" placeholder="Data de Nascimento" @input="formatarDataNascimento" required />
          <input v-model="profissional.cpf" class="input-field" placeholder="CPF" @input="formatarCPF" required />
          <select v-model="profissional.formacaoAcademica" class="select-field" required> 
            <option value="" disabled selected hidden>Formação Acadêmica</option>
            <option value="Opcao 1">Opcao 1</option>
            <option value="Opcao 2">Opcao 2</option>
          </select>
          <select v-model="profissional.especializacao" class="select-field" required> 
            <option value="" disabled selected hidden>Especialização</option>
            <option value="Opcao 1">Opcao 1</option>
            <option value="Opcao 2">Opcao 2</option>
          </select>
          <input v-model="profissional.crp" class="input-field" placeholder="CRP" required />
          <input v-model="profissional.cep" class="input-field" placeholder="CEP" @input="formatarCEP" required />
          <input v-model="profissional.rua" class="input-field" placeholder="Rua" required />
          <input v-model="profissional.numeroCasa" class="input-field" placeholder="Número da casa" required />
          <input v-model="profissional.bairro" class="input-field" placeholder="Bairro" required />
          <input v-model="profissional.cidade" class="input-field" placeholder="Cidade" required />
          <button type="submit" class="submit-button">{{ modoEdicao ? 'Atualizar' : 'Cadastrar' }}</button>
        </form>
      </div>
    </div>
    
    <div id="card" v-for="profissional in profissionais" :key="profissional.id">
  <div class="profissional-info">
    <div>
      <strong>Nome:</strong>
      <p>{{ profissional.nome }}</p>
    </div>
    <div>
      <strong>Data de Nascimento:</strong>
      <p>{{ profissional.dataNascimento }}</p>
    </div>
    <div>
      <strong>CPF:</strong>
      <p>{{ profissional.cpf }}</p>
    </div>
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
        dataNascimento: '',
        cpf: '',
        formacaoAcademica: '',
        especializacao: '',
        crp: '',
        rua: '',
        numeroCasa: '',
        bairro: '',
        cidade: '',
        cep: '',
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
        cpf: this.profissional.cpf,
        dataNascimento: this.profissional.dataNascimento,
        formacaoAcademica: this.profissional.formacaoAcademica,
        especializacao: this.profissional.especializacao,
        crp: this.profissional.crp,
        rua: this.profissional.rua,
        numeroCasa: this.profissional.numeroCasa,
        bairro: this.profissional.bairro,
        cidade: this.profissional.cidade,
        cep: this.profissional.cep,
      });
    } else {
      await db.profissionais.add({
        nome: this.profissional.nome,
        cpf: this.profissional.cpf,
        dataNascimento: this.profissional.dataNascimento,
        especializacao: this.profissional.especializacao,
        formacaoAcademica: this.profissional.formacaoAcademica,
        crp: this.profissional.crp,
        rua: this.profissional.rua,
        numeroCasa: this.profissional.numeroCasa,
        bairro: this.profissional.bairro,
        cidade: this.profissional.cidade,
        cep: this.profissional.cep,
      });
    }
    this.carregarProfissionais();
    this.profissional = {
      id: null,
      nome: '',
      dataNascimento: '',
      cpf: '',
      formacaoAcademica: '',
      especializacao: '',
      crp: '',
      rua: '',
      numeroCasa: '',
      bairro: '',
      cidade: '',
      cep: '',
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
    formatarCPF(event) {
      let text = event.target.value;
      let formattedCPF = text.replace(/\D/g, '');

      if (formattedCPF.length > 3) {
        formattedCPF = formattedCPF.substring(0, 3) + '.' + formattedCPF.substring(3);
      }
      if (formattedCPF.length > 7) {
        formattedCPF = formattedCPF.substring(0, 7) + '.' + formattedCPF.substring(7);
      }
      if (formattedCPF.length > 11) {
        formattedCPF = formattedCPF.substring(0, 11) + '-' + formattedCPF.substring(11);
      }
      this.profissional.cpf = formattedCPF.slice(0, 14);
    },
    formatarDataNascimento(event) {
      let text = event.target.value;
      let formattedData = text.replace(/\D/g, '');

      if (formattedData.length > 2) {
        formattedData = formattedData.substring(0, 2) + '/' + formattedData.substring(2);
      }
      if (formattedData.length > 5) {
        formattedData = formattedData.substring(0, 5) + '/' + formattedData.substring(5);
      }
      this.profissional.dataNascimento = formattedData.slice(0, 10);
    },
    formatarCEP(event) {
      let text = event.target.value;
      let formattedCEP = text.replace(/\D/g, '');

      if (formattedCEP.length > 5) {
        formattedCEP = formattedCEP.substring(0, 5) + '-' + formattedCEP.substring(5);
      }
      this.profissional.cep = formattedCEP.slice(0, 9);
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
  bottom: 80px;
  right: 18px;
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
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  width: 100%;
  height: 100%;
  overflow-y: scroll;
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
  margin-bottom: 60px;
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
  justify-content:space-between;
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

.select-field {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-top: 10px;
}

.select-field:focus {
  border-color: #007BFF;
  outline: none;
}

@supports (-webkit-appearance: none) {
  select {
    appearance: none;
    padding: 15px;
    border-radius: 5px;
    border: 1px solid #ccc;
    background-color: #fff;
    color: #7d7d7dc5;
    font-size: 16px;
  }
}
</style>