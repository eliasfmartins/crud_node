import fastify from 'fastify';
import { env } from './env';
import { transactionsRoutes } from './routes/transactions';
import cookie from '@fastify/cookie';

const app = fastify();
app.register(cookie);
app.register(transactionsRoutes, {prefix:'transactions'}); 

app.listen({
	port: env.PORT,
}).then(()=>{
	console.log('HTTP Server Running!');
});
// npm install -D @types/node pra usar o ts com node e necessario esse comando pra gerar o arquivo na versao js
// npm install tsx -D  faz todo processo de converter ts for js e  executar sem gerar arquivo js na pasta  src 
// npx tsx src/server.ts basicamente usa o  arquivo ts diretamente
// importante nao esquecer de colocar o watch dps do tsx pra assistir modificacaoes executar
//tsx watch src/server.ts nao e necessario colocar  npx no script

// npm i eslint -D  instalando eslint como dependencia de desenvolvimento