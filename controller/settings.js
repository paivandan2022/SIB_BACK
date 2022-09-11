const dbConnection = require("../database");

const setting_inf = async (req, res) => {
  const {
    Saline,
    Papian,
    Coombs,
    AntiA,
    AntiB,
    TPHA,
    HBsAg,
    HIV,
    HBV_NAT,
    HCV_NAT,
    HIV_NAT,
    ALT,
    HCV,
    HIVAg,
  } = req.body;
  // console.log("req.body....", req.body);
  try {
    const SalineQuery = `UPDATE donor_infectious_list set inf_active ='${Saline}' where inf_id = 1;`;
    const PapianQuery = `UPDATE donor_infectious_list set inf_active ='${Papian}' where inf_id = 2;`;
    const CoombsQuery = `UPDATE donor_infectious_list set inf_active ='${Coombs}' where inf_id = 3;`;
    const AntiAQuery = `UPDATE donor_infectious_list set inf_active ='${AntiA}' where inf_id = 4;`;
    const AntiBQuery = `UPDATE donor_infectious_list set inf_active ='${AntiB}' where inf_id = 5;`;
    const TPHAQuery = `UPDATE donor_infectious_list set inf_active ='${TPHA}' where inf_id = 6;`;
    const HBsAgQuery = `UPDATE donor_infectious_list set inf_active ='${HBsAg}' where inf_id = 7;`;
    const HIVQuery = `UPDATE donor_infectious_list set inf_active ='${HIV}' where inf_id = 8;`;
    const HBV_NATQuery = `UPDATE donor_infectious_list set inf_active ='${HBV_NAT}' where inf_id = 9;`;
    const HCV_NATQuery = `UPDATE donor_infectious_list set inf_active ='${HCV_NAT}' where inf_id = 10;`;
    const HIV_NATQuery = `UPDATE donor_infectious_list set inf_active ='${HIV_NAT}' where inf_id = 11;`;
    const ALTQuery = `UPDATE donor_infectious_list set inf_active ='${ALT}' where inf_id = 12;`;
    const HCVQuery = `UPDATE donor_infectious_list set inf_active ='${HCV}' where inf_id = 13;`;
    const HIVAgQuery = `UPDATE donor_infectious_list set inf_active ='${HIVAg}' where inf_id = 14;`;
    const results = await Promise.all([
      dbConnection.execute(SalineQuery),
      dbConnection.execute(PapianQuery),
      dbConnection.execute(CoombsQuery),
      dbConnection.execute(AntiAQuery),
      dbConnection.execute(AntiBQuery),
      dbConnection.execute(TPHAQuery),
      dbConnection.execute(HBsAgQuery),
      dbConnection.execute(HIVQuery),
      dbConnection.execute(HBV_NATQuery),
      dbConnection.execute(HCV_NATQuery),
      dbConnection.execute(HIV_NATQuery),
      dbConnection.execute(ALTQuery),
      dbConnection.execute(HCVQuery),
      dbConnection.execute(HIVAgQuery),
    ]);
    return res.status(200).json({ message: "success" });
  } catch (error) {
    return res.status(500).json({ message: "error", message: error.message });
  }
};

const Check_inf = (req, res) => {
  const query =
    "select " +
    "max(case when (t1.inf_id =1) then t1.inf_active else '0' end) as 'Saline'," +
    "max(case when (t1.inf_id =2) then t1.inf_active else '0' end) as 'Papian'," +
    "max(case when (t1.inf_id =3) then t1.inf_active else '0' end) as 'Coombs'," +
    " max(case when (t1.inf_id =4) then t1.inf_active else '0' end) as 'AntiA'," +
    "max(case when (t1.inf_id =5) then t1.inf_active else '0' end) as 'AntiB'," +
    "max(case when (t1.inf_id =6) then t1.inf_active else '0' end) as 'TPHA'," +
    "max(case when (t1.inf_id =7) then t1.inf_active else '0' end) as 'HBsAg'," +
    " max(case when (t1.inf_id =8) then t1.inf_active else '0' end) as 'HIV'," +
    " max(case when (t1.inf_id =9) then t1.inf_active else '0' end) as 'HBVNAT'," +
    " max(case when (t1.inf_id =10) then t1.inf_active else '0' end) as 'HCVNAT'," +
    " max(case when (t1.inf_id =11) then t1.inf_active else '0' end) as 'HIVNAT'," +
    " max(case when (t1.inf_id =12) then t1.inf_active else '0' end) as 'ALT'," +
    " max(case when (t1.inf_id =13) then t1.inf_active else '0' end) as 'HCV'," +
    " max(case when (t1.inf_id =14) then t1.inf_active else '0' end) as 'HIVAg'" +
    "from (select * from donor_infectious_list order by inf_id asc) as t1;";
  dbConnection
    .execute(query)
    .then((results) => {
      res.send(results[0]);
    })
    .catch((error) => {
      return res.status(200).json({ message: "error", message: error.message });
    });
};

//********************************//

module.exports = {
  setting_inf,
  Check_inf,
};
