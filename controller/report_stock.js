const dbConnection = require("../database");

const Get_report_ready = (req, res) => {
  dbConnection
    .execute("call RP_Get_stock_ready();")
    .then((results) => {
      res.send(results[0]);
    })

    .catch((error) => {
      return res.status(200).json({ message: "error" });
    });
};

const data_resive = (req, res) => {
  const {
    Request_date_blood_search,
    Request_date_blood_to_search,
    hos_search,
    time_from,
    time_to,
  } = req.query;
  const query = `call RP_Get_stock_received_blood('${hos_search || ""}','${Request_date_blood_search}','${Request_date_blood_to_search}','${time_from}','${time_to}')`;
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

// -------------few++19/8/2565

const data_report_exp = (req, res) => {
  const { Request_date_blood_search, Request_date_blood_to_search } = req.query;
  const query = `call RP_Get_stock_Exp('${Request_date_blood_search}','${Request_date_blood_to_search}')`;
  dbConnection
    .execute(query)
    .then((results) => {
      res.send(results[0]);
    })
    .catch((error) => {
      return res.status(500).json({ message: "error", message: error.message });
    });
};
// -------------few++20/8/2565
const data_report_stock_Separates_Bloods = (req, res) => {
  console.log("data.body", req.body);
  console.log("data.quyery", req.query);
  const {
    Request_date_blood_search,
    Request_date_blood_to_search,
    time_from,
    time_to,
  } = req.query;

  const query = `call RP_Get_stock_Separate('${Request_date_blood_search}','${Request_date_blood_to_search}','${time_from}','${time_to}')`;
  dbConnection
    .execute(query)
    .then((results) => {
      res.send(results[0]);
    })
    .catch((error) => {
      return res.status(500).json({ message: "error", message: error.message });
    });
};
const Get_report_trans_revers = (req, res) => {
  const { date_start, date_last, doc_code, ward_code, time_from, time_to } =
    req.query;
  const query = `call RP_Get_stock_Trans('${doc_code}','${ward_code}','${date_start}','${date_last}','${time_from}','${time_to}')`;
  // console.log("transre",query);
  dbConnection
    .execute(query)
    .then((results) => {
      res.send(results[0]);
    })
    .catch((error) => {
      return res.status(500).json({ message: "error", message: error.message });
    });
};
const Get_report_trans = (req, res) => {
  const { date_start, date_last, doc_code, ward_code, time_from, time_to } =
    req.query;

  // console.log("q :::" ,req.query);
  const query = `call RP_Get_stock_Trans_Revers('${doc_code}','${ward_code}','${date_start}','${date_last}','${time_from}','${time_to}')`;
  console.log("trans", query);
  dbConnection
    .execute(query)
    .then((results) => {
      res.send(results[0]);
    })
    .catch((error) => {
      return res.status(500).json({ message: "error", message: error.message });
    });
};
const Get_report_xm = (req, res) => {
  const { date_from, date_to, doc_code, ward_code, time_from, time_to } =
    req.query;
  console.log("Get_report_xm", req.query);
  const query = `call RP_Get_stock_XM('${doc_code}','${ward_code}','${date_from}','${date_to}','${time_from}','${time_to}')`;
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
  Get_report_ready,
  data_resive,
  data_report_exp,
  data_report_stock_Separates_Bloods,
  Get_report_trans_revers,
  Get_report_trans,
  Get_report_xm,
};
