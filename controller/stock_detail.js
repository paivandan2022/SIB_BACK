const dbConnection = require("../database");

//*********************************//
const Stock_Detail_status = (req, res) => {
  const { status_id, date_type, date_start, date_end, unit_no, antibody } =
    req.query;

  dbConnection
    .execute(
      `call ST_Get_Detail_status('${status_id || ""}','${unit_no || ""}','${
        antibody || ""
      }','${date_type || ""}','${date_start || ""}','${date_end || ""}'
        );`
    )
    .then((results) => {
      res.send(results[0]);
    })

    .catch((error) => {
      return res.status(500).json({ message: "error", error: error.message });
    });
};
//*********************************//

const Stock_count_status = (req, res) => {
  const { status_id, date_type, date_start, date_end, unit_no, antibody } =
    req.query;
  dbConnection
    .execute(
      `call ST_Get_count_status('${status_id || ""}','${unit_no || ""}','${
        antibody || ""
      }','${date_type || ""}','${date_start || ""}','${date_end || ""}'
        );`
    )
    .then((results) => {
      res.send(results[0]);
    })

    .catch((error) => {
      return res.status(500).json({ message: "error", error: error.message });
    });
};

const Stock_Detail_Component = (req, res) => {
  const { status_id, date_type, date_start, date_end, unit_no, antibody } =
    req.query;

  dbConnection
    .execute(
      `call ST_Get_Detail_Component(
        '${status_id || ""}',
        '${unit_no || ""}',
        '${antibody || ""}',
        '${date_type || ""}',
        '${date_start || ""}',
        '${date_end || ""}')`
    )
    .then((results) => {
      res.send(results[0]);
    })

    .catch((error) => {
      return res.status(500).json({ message: "error", error: error.message });
    });
};

const Stock_Detail_Component2 = (req, res) => {
  const { status_id, date_type, date_start, date_end, unit_no, antibody } =
    req.query;

  dbConnection
    .execute(
      `call ST_Get_Detail_Component_dorblood(
        '${status_id || ""}',
        '${unit_no || ""}',
        '${antibody || ""}',
        '${date_type || ""}',
        '${date_start || ""}',
        '${date_end || ""}')`
    )
    .then((results) => {
      res.send(results[0]);
    })

    .catch((error) => {
      return res.status(500).json({ message: "error", error: error.message });
    });
};

//*********************************//
const Stock_Detail_unit = (req, res) => {
  const {
    status_id,
    type_id,
    page,
    date_type,
    date_start,
    date_end,
    unit_no,
    antibody,
  } = req.query;

  const strQuery2 = `call ST_Get_Detail_unit(
    '${type_id || ""}',
    '${status_id || ""}',
    '${page || "0"}',
    '${unit_no || ""}',
    '${antibody || ""}',
    '${date_type || ""}',
    '${date_start || ""}',
    '${date_end || ""}'
    )`;

  // console.log(strQuery2);
  dbConnection
    .execute(strQuery2)
    .then((results) => {
      res.send(results[0]);
    })

    .catch((error) => {
      // console.log("error====", error);
      return res.status(200).json({ message: "error" });
    });
};

const Stock_Detail_unit_dorn = (req, res) => {
  const {
    status_id,
    type_id,
    page,
    date_type,
    date_start,
    date_end,
    unit_no,
    antibody,
  } = req.query;

  const strQuery2 = `call ST_Get_Detail_unit_dorn(
    '${type_id || ""}',
    '${status_id || ""}',
    '${page || "0"}',
    '${unit_no || ""}',
    '${antibody || ""}',
    '${date_type || ""}',
    '${date_start || ""}',
    '${date_end || ""}'
    )`;
  console.log(strQuery2);
  dbConnection
    .execute(strQuery2)
    .then((results) => {
      res.send(results[0]);
    })

    .catch((error) => {
      // console.log("error====", error);
      return res.status(200).json({ message: "error" });
    });
};

//*********************************//
const Countpages = (req, res) => {
  const page = Number(req.query.page || 0 || 1);
  const limit = Number(req.query.limit || 10);
  const start = (page - 1) * 10;

  dbConnection
    .execute(
      `call ST_Get_Detail_unit(
        '${req.query.type_id}',
        '${req.query.value_search || ""}',
        ${start}
        )`
    )
    .then((results) => {
      res.send(results[0]);
    })

    .catch((error) => {
      return res.status(200).json({ message: "error" });
    });
};
//*********************************//
const Stock_Detail_all = (req, res) => {
  const { status_id, page } = req.query;
  console.log("ddfdf", req.query);
  dbConnection
    .execute(
      `call ST_Get_Detail_unit_untype(
      '${status_id || ""}',
      '${page || "0"}'    
        );`
    )
    .then((results) => {
      res.send(results[0]);
    })

    .catch((error) => {
      return res.status(500).json({ message: "error", error: error.message });
    });
};

const Stock_Detail_all_dorn = (req, res) => {
  const { status_id, page } = req.query;
  console.log("ddfdf", req.query);
  dbConnection
    .execute(
      `call ST_Get_Detail_unit_untyp_dorn(
      '${status_id || ""}',
      '${page || "0"}'    
        );`
    )
    .then((results) => {
      res.send(results[0]);
    })

    .catch((error) => {
      return res.status(500).json({ message: "error", error: error.message });
    });
};

module.exports = {
  Stock_Detail_all,
  Stock_Detail_status,
  Stock_count_status,
  Stock_Detail_Component,
  Stock_Detail_Component2,
  Stock_Detail_unit,
  Stock_Detail_unit_dorn,
  Countpages,
  Stock_Detail_all_dorn,
};
