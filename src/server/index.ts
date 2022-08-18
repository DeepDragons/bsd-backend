import Fastify from 'fastify';

import { orm } from '../data-source';
import { Token } from '../entity/token';


const fastify = Fastify({
  logger: false
});

fastify.get<{
  Querystring: {
    limit: number;
    offset: number;
    action: number;
    rarity: "DESC" | 'ASC';
    strong: "DESC" | 'ASC';
  };
  Params: {
    address: string;
  };
}>('/api/v1/tokens/:address', async (request, reply) => {
  const {
    action,
    limit = 100,
    offset = 0,
    rarity = 'DESC',
    strong = 'DESC'
  } = request.query;
  const address = request.params.address;
  const tokenRepo = orm.getRepository(Token);

  try {
    const [tokens, count] = await tokenRepo.findAndCount({
      where: {
        action,
        owner: address,
        burnt: false
      },
      order: {
        rarity,
        strong
      },
      take: limit,
      skip: offset
    });
  
    reply.code(200).send({
      tokens,
      count
    });
  } catch (err) {
    console.log(err);
    reply.code(500).send((err as Error).message);
  }
});

fastify.get('/ping', () => {
  return 'pong';
});


(async function() {
  try {
    await orm.initialize();
    await fastify.listen({ port: 3000 })
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}());
