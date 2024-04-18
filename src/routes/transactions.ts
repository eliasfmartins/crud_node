import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { knex } from '../database';

export async function transactionsRoutes(app:FastifyInstance){
	app.post('/', async (request, reply)=>{


		const createTransactionsBodySchema= z.object({
			title: z.string(),
			amount:z.number(),
			type:z.enum(['credit', 'debit']),
		});
		const {title,amount,type} = createTransactionsBodySchema.parse(request.body);

		await knex('transactions').insert({
			id: crypto.randomUUID(),
			title,
			amount: type === 'credit' ?  amount : amount * -1,
		});
		return reply.status(201).send();
		//  201 recurso criado com sucesso
	})
	
	;
}



