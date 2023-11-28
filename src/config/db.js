import Dexie from 'dexie';

const db = new Dexie('Profissionais');
db.version(1).stores({
  profissionais: '++id, nome, dataNascimento, cpf, formacaoAcademica, especializacao, crp, rua, numeroCasa, bairro, cidade, cep'
});

export default db;
