import Dexie from "dexie";

const dbp = new Dexie('Pacientes');
dbp.version(1).stores({
  profissionais: '++id, nome, dataNascimento, nomeResponsavel, rua, numeroCasa, bairro, cidade, cep'
});

export default dbp;