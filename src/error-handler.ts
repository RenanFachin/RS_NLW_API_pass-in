// tipando uma função -> dica: mais facíl declarando ela como const e arrow function

import { FastifyInstance } from "fastify";
import { BadRequest } from "./routes/_errors/bad-request";
import { ZodError } from "zod";

type FastifyServerFactoryHandler = FastifyInstance['errorHandler']

export const errorHandler: FastifyServerFactoryHandler = (error, request, reply) => {
  // tratando erros de validação de dados de entrada
  if(error instanceof ZodError){
    return reply.status(400).send({
      message: `Error during validation`,
      errors: error.flatten().fieldErrors
    })
  }



  if (error instanceof BadRequest) {
    return reply.status(400).send({ message: error.message })
  }


  return reply.status(500).send({
    message: 'Internal server error!'
  })
}