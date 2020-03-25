const connection = require("../database/connection");

module.exports = {
  async index(request, response) {
    const { page = 1 } = request.query;

    const numberDefaultPage = 5;

    const [count] = await connection("incidents").count();

    const incidents = await connection("incidents")
      .join("ongs", "ongs.id", "=", "incidents.ong_id")
      .limit(5)
      .offset((page - 1) * numberDefaultPage)
      .select([
        "incidents.*",
        "ongs.name",
        "ongs.email",
        "ongs.whatsapp",
        "ongs.city",
        "ongs.uf"
      ]); //Para paginar

    const numberTotal = count["count(*)"];
    const totalPages = parseFloat(numberTotal / numberDefaultPage);
    numberTotalPage = Math.round(totalPages, 0);

    if (numberTotalPage == 0 || totalPages - parseFloat(numberTotalPage) > 0) {
      numberTotalPage++;
    }

    response.header("X-Total-Count", numberTotal);
    response.header("X-Total-Page", numberTotalPage);

    return response.json(incidents);
  },

  async create(request, response) {
    const { title, description, value } = request.body;
    const ong_id = request.headers.authorization;

    const [id] = await connection("incidents").insert({
      title,
      description,
      value,
      ong_id
    });

    return response.json({ id });
  },

  async delete(request, response) {
    const { id } = request.params;
    const ong_id = request.headers.authorization;

    const incident = await connection("incidents")
      .where("id", id)
      .select("ong_id")
      .first();

    if (incident == null || incident.ong_id !== ong_id) {
      return response.status(401).json({ error: "Operation not permitted" });
    }

    await connection("incidents")
      .where("id", id)
      .delete();

    return response.status(204).send();
  }
};
