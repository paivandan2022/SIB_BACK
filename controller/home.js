const dbConnection = require("../database");

const Get_stockBlood = (req, res) => {
  dbConnection
    .execute("call ST_Get_ABOCountAll();")
    .then((results) => {
      res.send(results[0]);
    })

    .catch((error) => {
      return res.status(200).json({ message: "error" });
    });
};

const Get_news = (req, res) => {
  dbConnection
    .execute(
      `select 
    CONCAT(n.nw_user,' : ', nt.nw_type_name,' - ',n.nw_data) as data, 
    DATE_FORMAT(n.nw_datetime,'%d/%m/%Y') as data_date
    from news as n
    inner join news_type as nt ON n.nw_type_id = nt.nw_type_id
    order by n.nw_id desc`
    )
    .then((results) => {
      res.send(results[0]);
    })

    .catch((error) => {
      return res.status(200).json({ message: "error" });
    });
};

const Get_newType = (req, res) => {
  dbConnection
    .execute(`select * from news_type`)
    .then((results) => {
      res.send(results[0]);
    })

    .catch((error) => {
      return res.status(200).json({ message: "error" });
    });
};

const Add_News = async (req, res) => {
  const { nw_user, nw_type_id, nw_data } = req.body;
  console.log(req.body);

  try {
    const queryString = `INSERT INTO news (
        nw_user
        ,nw_type_id
        ,nw_data
        ,nw_datetime
        ) VALUES ('${nw_user}','${nw_type_id}','${nw_data}',now()) `;
    const result = await dbConnection.execute(queryString);
    return res.status(200).json({ message: "success" });
  } catch (error) {
    return res.status(500).json({ message: "error", message: error.message });
  }
};
module.exports = {
  Get_stockBlood,
  Get_news,
  Get_newType,
  Add_News,
};
