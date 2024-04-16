import { knex as setupKnex, Knex} from 'knex';
import { env } from './env';

// npm i dotenv pacote pra ler o env dentro do node


export const config:Knex.Config ={
	client:'sqlite', //tipo de banco de dados que sera utilizado
	connection:{
		filename: env.DATABASE_URL, //locale nome do arquivo de bd Nesse caso pegando isso da env
	},
	useNullAsDefault:true, //o sql n suporta valores default por isso ese campo coloca por default null
	migrations:{
		extension:'ts',
		directory:'./db/migrations',
	}
};
export const knex = setupKnex(config);



// npx knex migrate:make create-documents faz uma migrate e vc colocar oque essa migrate vai fazer nesse caso criar documents
// quando e executado vai dar um erro pois o knex nao sabe onde fica o arquivo de config do banco de dados por isso e necessario
//  criar um arquivo na raiz do projeto
// knexfile.ts
//  aqui e preciso importar as configuracoes do database