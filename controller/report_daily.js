const dbConnection = require("../database");

const Get_daily_request = (req, res) => {
  const { time_from, time_to, date_start, date_last, doc_code, ward_code } =
    req.query;
  const query = `call RP_Get_daily_request('${doc_code}','${ward_code}','${date_start}','${date_last}','${time_from}','${time_to}')`;
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

const Get_daily_CT_ratio = (req, res) => {
  const { time_from, time_to, date_start, date_last, doc_code, ward_code } =
    req.query;
  const query = `call RP_Get_daily_CT_ratio('${doc_code}','${ward_code}','${date_start}','${date_last}','${time_from}','${time_to}')`;
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

const Get_daily_CT_ratio_ward = (req, res) => {
  const { time_from, time_to, date_start, date_last } = req.query;
  const query = `call RP_Get_daily_CT_ratio_ward('${date_start}','${date_last}','${time_from}','${time_to}')`;
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

const Get_daily_trans_blood = (req, res) => {
  const { date_start, date_last, hn_search, ward_code, time_from, time_to } = req.query;
  const query = `call RP_Get_daily_tranblood('${hn_search}','${ward_code}','${date_start}','${date_last}','${time_from}','${time_to}')`;
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

const Get_Get_daily_blood_deposit = (req, res) => {
  const { date_from, date_to, time_from, time_to } = req.query;
  const query = `call RP_Get_daily_blood_deposit('${date_from}','${date_to}','${time_from}','${time_to}')`;
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

const Get_report_daily_Antibody = (req, res) => {
  const { date_from, date_to, hn_search, time_from, time_to } = req.query;

  const query = `call RP_GET_daily_antibody('${date_from}','${date_to}','${hn_search}','${time_from}','${time_to}')`;
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
const Get_report_daily_cut_blood = (req, res) => {
  const { date_from, date_to, choice_input, time_from, time_to } = req.query;

  const query = `call RP_Get_daily_cut_blood('${date_from}','${date_to}','${choice_input}','${time_from}','${time_to}')`;
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

const Get_daily_turnaround_time = (req, res) => {
  const { date_start, date_last, hn_search, time_from, time_to } = req.query;
  const query = `call RP_Get_daily_turnaround_time('${hn_search}','${date_start}','${date_last}','${time_from}','${time_to}')`;
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

const Get_daily_p4p = (req, res) => {
  const { date_start, date_last, time_from, time_to, staff_code } = req.query;
  const query = `call RP_GET_daily_P4P('${date_start}','${date_last}','${staff_code}','${time_from}','${time_to}')`;
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
  Get_daily_request,
  Get_daily_CT_ratio,
  Get_daily_CT_ratio_ward,
  Get_daily_trans_blood,
  Get_Get_daily_blood_deposit,
  Get_report_daily_Antibody,
  Get_report_daily_cut_blood,
  Get_daily_turnaround_time,
  Get_daily_p4p,
};
