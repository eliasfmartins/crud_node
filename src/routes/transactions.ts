import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { knex } from '../database';
import { randomUUID } from 'crypto';
import { checkSessionIdExists } from '../middlewares/check-session-id-exists';

export async function transactionsRoutes(app: FastifyInstance) {
	app.addHook('preHandler', async (request) => {
		console.log(`[${request.method}] ${request.url}`);
	});
	app.get('/', { preHandler: [checkSessionIdExists] }, async (request) => {
		const { sessionId } = request.cookies;
		const transactions = await knex('transactions').where(
			'session_id',
			sessionId,
		);
		return { transactions };
	});

	app.get('/:id', { preHandler: [checkSessionIdExists] }, async (request) => {
		const getTransactionsParamsSchema = z.object({
			id: z.string().uuid(),
		});
		const { sessionId } = request.cookies;

		const { id } = getTransactionsParamsSchema.parse(request.params);
		const transaction = await knex('transactions')
			.where({ session_id: sessionId, id })
			//   .andWhere("session_id", sessionId)
			.first();
		return { transaction };
	});

	app.get(
		'/summary',
		{ preHandler: [checkSessionIdExists] },
		async (request) => {
			const { sessionId } = request.cookies;

			const summary = await knex('transactions')
				.where('session_id', sessionId)
				.sum('amount', { as: 'soma dos valores' })
				.first();
			// methodo sum soma todos os valores de uma determinada coluna
			return { summary };
		},
	);

	app.post('/', async (request, reply) => {
		const createTransactionsBodySchema = z.object({
			title: z.string(),
			amount: z.number(),
			type: z.enum(['credit', 'debit']),
		});
		const { title, amount, type } = createTransactionsBodySchema.parse(
			request.body,
		);

		let sessionId = request.cookies.sessionId;
		if (!sessionId) {
			sessionId = randomUUID();

			reply.cookie('sessionId', sessionId, {
				path: '/',
				maxAge: 1000 * 60 * 60 * 24 * 30, //30 days
			});
		}
		await knex('transactions').insert({
			id: crypto.randomUUID(),
			title,
			amount: type === 'credit' ? amount : amount * -1,
			session_id: sessionId,
		});
		return reply.status(201).send('paozinho de alho');
		//  201 recurso criado com sucesso
	});
}
