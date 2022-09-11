const dbConnection = require("../database");
// -------------few++20/8/2565
const data_report_donor_getneedle = (req, res) => {
  console.log("data.body", req.body);
  console.log("data.quyery", req.query);
  const {
    Request_date_blood_search,
    Request_date_blood_to_search,
    count_number,
  } = req.query;

  const query = `call RP_GET_donor_needle('${Request_date_blood_search}','${Request_date_blood_to_search}','${count_number}')`;
  console.log("needle", query);
  
  dbConnection
    .execute(query)
    .then((results) => {
      res.send(results[0]);
    })
    .catch((error) => {
      return res.status(500).json({ message: "error", message: error.message });
    });
};
const Get_report_blood_result = (req, res) => {
  const { time_from, time_to, date_from, date_to } = req.query;
  console.log("RP_Get_donor_infectious", req.query);
  const query = `call RP_Get_donor_infectious('${date_from}','${date_to}','${time_from}','${time_to}')`;
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
const Get_report_donor_donationnotification = (req, res) => {
  const { date_from, date_to } = req.query;

  const query = `call RP_GET_donor_next_donate('${date_from}','${date_to}')`;
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
const Get_report_donor_infect = (req, res) => {
  console.log(req.query);
  const {
    date_from,
    date_to,
    TPHA_f,
    hbsag_f,
    hiv_f,
    hcv_f,
    hivag_f,
    HBVNAT_f,
    HCVNAT_f,
    HIVNAT_f,
    alt_f,
  } = req.query;

  const query = `call RP_GET_donor_infect('${date_from}','${date_to}','${TPHA_f}'
  ,'${hbsag_f}'
  ,'${hiv_f}'
  ,'${hcv_f}'
  ,'${hivag_f}'
  ,'${HBVNAT_f}'
  ,'${HCVNAT_f}'
  ,'${HIVNAT_f}'
  ,'${alt_f}'
  )`;
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

const Get_report_out_area = (req, res) => {
  const { mob_code, date_from, date_to } = req.query;
  console.log("RP_Get_donor_outArea", req.query);
  const query = `call RP_Get_donor_outArea('${mob_code}','${date_from}','${date_to}')`;
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

const Get_report_donor_rare_blood_type = (req, res) => {
  const { date_from, date_to, gr } = req.query;

  const query = `call RP_GET_donor_rare_blood_type('${date_from}','${date_to}','${gr}')`;
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
  data_report_donor_getneedle,
  Get_report_blood_result,
  Get_report_donor_donationnotification,
  Get_report_donor_infect,
  Get_report_out_area,
  Get_report_donor_rare_blood_type,
};
