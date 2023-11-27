import Dexie from 'dexie';

const db = new Dexie('Profissionais');
db.version(1).stores({
  profissionais: '++id, nome, descricao, preco',
});

export default db;
