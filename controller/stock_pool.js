const dbConnection = require("../database");

const search_unit = (req, res) => {
  console.log("req.query", req.query);
  const { unit_no } = req.query;
  const query = `call ST_Get_pool_blood('${unit_no}')`;
  console.log(query);
  dbConnection
    .execute(query)
    .then((results) => {
      res.send(results[0]);
    })
    .catch((error) => {
      return res.status(500).json({ message: "error", message: error.message });
    });
};
const search_plete = (req, res) => {
  // console.log("req.query", req.query);
  const { date_from, date_to, unit_no } = req.query;
  const query = `call ST_Search_pool_blood('${date_from}','${date_to}','${unit_no}')`;
  console.log(query);
  dbConnection
    .execute(query)
    .then((results) => {
      res.send(results[0]);
    })
    .catch((error) => {
      return res.status(500).json({ message: "error", message: error.message });
    });
};
module.exports = {
  search_unit,
  search_plete,
};
