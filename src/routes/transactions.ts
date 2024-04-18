import { FastifyInstance } from 'fastify';
import { z } from 'zod';

export async function transactionsRoutes(app:FastifyInstance){
	app.post('/', async (request, reply)=>{


		const createTransactionsBodySchema= z.object({
			title: z.string(),
			amount:z.number(),
			type:z.enum(['credit', 'debit']),
		});
	})
	
	;
}



