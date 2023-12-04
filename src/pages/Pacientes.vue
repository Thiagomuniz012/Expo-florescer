<template>
  <div>
    <h1>Paciente</h1>
    <button @click="abrirModal" class="botao-adicao">+</button>
  
    <div class="modal" v-if="modalAberto">
      <div class="modal-conteudo">
        <button @click="fecharModal" class="closeButton"><i class="fa fa-2x fa-times"></i></button>
        <form @submit.prevent="salvarpaciente">
          <input v-model="paciente.nome" class="input-field" placeholder="Nome Completo" required />
          <input v-model="paciente.dataNascimento" class="input-field" placeholder="Data de Nascimento" @input="formatarDataNascimento" required />
          <input v-model="paciente.cpf" class="input-field" placeholder="CPF" @input="formatarCPF" required />
          <input v-model="paciente.nomeResponsvel" class="input-field" placeholder="Nome do Responsavel" required />
          <input v-model="paciente.cep" class="input-field" placeholder="CEP" @input="formatarCEP" required />
          <input v-model="paciente.rua" class="input-field" placeholder="Rua" required />
          <input v-model="paciente.numeroCasa" class="input-field" placeholder="Número da casa" required />
          <input v-model="paciente.bairro" class="input-field" placeholder="Bairro" required />
          <input v-model="paciente.cidade" class="input-field" placeholder="Cidade" required />
          <button type="submit" class="submit-button">{{ modoEdicao ? 'Atualizar' : 'Cadastrar' }}</button>
        </form>
      </div>
    </div>
    
    <div id="card" v-for="paciente in profissionais" :key="paciente.id">
  <div class="paciente-info">
    <div>
      <strong>Nome:</strong>
      <p>{{ paciente.nome }}</p>
    </div>
    <div>
      <strong>Data de Nascimento:</strong>
      <p>{{ paciente.dataNascimento }}</p>
    </div>
    <div>
      <strong>CPF:</strong>
      <p>{{ paciente.cpf }}</p>
    </div>
  </div>
  <div class="botoes">
    <button @click="editarpaciente(paciente)" class="editar-button">
      <i class="fa fa-edit"></i>
    </button>
    <button @click="excluirpaciente(paciente.id)" class="excluir-button">
      <i class="fa fa-trash"></i>
    </button>
  </div>
</div>
  </div>
</template>

<script>
import dbp from '../config/dbp';

export default {
  data() {
    return {
      paciente: {
        id: null,
        nome: '',
        dataNascimento: '',
        cpf: '',
        nomeResponsvel: '',
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
    this.carregarPaciente();
  },
  methods: {
    async salvarpaciente() {
  try {
    if (this.modoEdicao) {
      await dbp.profissionais.update(this.paciente.id, {
        nome: this.paciente.nome,
        cpf: this.paciente.cpf,
        dataNascimento: this.paciente.dataNascimento,
        nomeResponsvel: this.paciente.nomeResponsvel,
        rua: this.paciente.rua,
        numeroCasa: this.paciente.numeroCasa,
        bairro: this.paciente.bairro,
        cidade: this.paciente.cidade,
        cep: this.paciente.cep,
      });
    } else {
      await dbp.profissionais.add({
        nome: this.paciente.nome,
        cpf: this.paciente.cpf,
        dataNascimento: this.paciente.dataNascimento,
        nomeResponsvel: this.paciente.nomeResponsvel,
        rua: this.paciente.rua,
        numeroCasa: this.paciente.numeroCasa,
        bairro: this.paciente.bairro,
        cidade: this.paciente.cidade,
        cep: this.paciente.cep,
      });
    }
    this.carregarPaciente();
    this.paciente = {
      id: null,
      nome: '',
      dataNascimento: '',
      cpf: '',
      nomeResponsvel: '',
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
    async editarpaciente(paciente) {
      this.paciente = { ...paciente };
      this.modoEdicao = true;
      this.abrirModal();
    },
    async excluirpaciente(id) {
      try {
        await dbp.profissionais.delete(id);
        this.carregarPaciente();
      } catch (error) {
        console.error(error);
      }
    },
    async carregarPaciente() {
      try {
        const profissionais = await dbp.profissionais.toArray();
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
      this.paciente.cpf = formattedCPF.slice(0, 14);
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
      this.paciente.dataNascimento = formattedData.slice(0, 10);
    },
    formatarCEP(event) {
      let text = event.target.value;
      let formattedCEP = text.replace(/\D/g, '');

      if (formattedCEP.length > 5) {
        formattedCEP = formattedCEP.substring(0, 5) + '-' + formattedCEP.substring(5);
      }
      this.paciente.cep = formattedCEP.slice(0, 9);
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


.paciente-info {
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