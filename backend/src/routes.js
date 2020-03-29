const express = require("express");
const { celebrate, Segments, Joi } = require("celebrate");

const ongController = require("./controllers/OngController");
const incendentController = require("./controllers/IncidentController");
const profileController = require("./controllers/ProfileController");
const sessionControler = require("./controllers/SessionController");

const routes = express.Router();

routes.post("/sessions", sessionControler.create);

routes.get("/ongs", ongController.index);
routes.post(
  "/ongs",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string()
        .required()
        .email(),
      whatsapp: Joi.string()
        .required()
        .min(10)
        .min(11),
      city: Joi.string().required(),
      uf: Joi.string()
        .required()
        .length(2)
    })
  }),
  ongController.create
);

routes.get(
  "/profile",
  celebrate({
    [Segments.HEADERS]: Joi
      .object({
        authorization: Joi.string().required()
      }).unknown()
  }),
  profileController.index
);

routes.post("/incidents", incendentController.create);
routes.get("/incidents", celebrate({
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number()
    }),
}), incendentController.index);


routes.delete("/incidents/:id", celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required()
    }),
    [Segments.HEADERS]: Joi
      .object({
        authorization: Joi.string().required()
      }).unknown()
}) ,incendentController.delete);

module.exports = routes;

/**
 * Rota/ Recurso
 */

/*
    * Metodos HTTP:
    
    * GET: Buscar as informações do back-end
    * POST: Criar uma informação no back-end
    * PUT: Alterar uma informação  no back-end
    * DELETE: Deleta uma informação no back-end
 */

/**
 * Tipos de Parametros:
 *
 * Query Params: Parametros enviados na rota apos o simbolo de "?", eles servem para filtros e paginação;
 * Route Params: Parametros utilizados para identificar recursos;
 * Request Body: Corpo da requisão, utilizado para criar / alterar os dados
 */

/*
 routes.post("/ongs", async (request, response) => {
    
    //Capturar os Request Body
    const {name, email, whatsapp, city, uf } = request.body;
    const id = crypto.randomBytes(4).toString('HEX').toUpperCase();

    await connection('ongs').insert({
        id, name, email, whatsapp, city, uf,
    });

    // Capturar os Routes Params:
    // const params = request.params;
    // console.log(params);

    //Captura os Query Params
    //const query = request.query;
    //console.log(query);

    // Responsavel pelo retorno das informações
    // Nesse caso o retorno será em JSON.
    return response.json({id});
});
*/
