const dbConnection = require("../database");

const Getdata = (req, res) => {
  const { donor_date, date_start, date_end, unit_no, mobile } = req.query;
  console.log("req.query", req.query);
  const whereCondition = [];
  if (date_start && date_end) {
    whereCondition.push(
      `b.donor_date between "${date_start} 00:00:00" and "${date_end} 23:59:59"  `
    );
  }
  if (unit_no) {
    whereCondition.push(`b.unit_no = '${unit_no}'`);
  }
  if (mobile) {
    whereCondition.push(` b.service_id = '${mobile}'`);
  }
  const query =
    " SELECT b.dn,b.pid,b.unit_no,DATE_FORMAT( DATE_ADD( b.donor_date, INTERVAL 543 YEAR ), '%d/%m/%Y' )" +
    "AS donor_date , m.mobname,b.dorngro,b.dornrh ,b.Saline,b.Papain,b.Coombs,b.antia,b.antib,b.TPHA,b.hbsag,b.hiv,b.HBVNAT,b.HCVNAT,b.HIVNAT,b.alt,b.hcv,b.hivag,b.remark,b.result,b.STATUS," +
    "DATE_FORMAT( DATE_ADD( b.blood_expi, INTERVAL 543 YEAR ), '%d/%m/%Y' ) AS exp " +
    `FROM donor_blood AS b 
    left join donor_mobile as m on b.service_id = m.mobcode WHERE b.STATUS = '0' and ${
      whereCondition.length > 0 ? `${whereCondition.join(" and ")}` : ""
    } ORDER BY b.dn ASC;`;
  console.log(query);
  dbConnection
    .execute(query)
    .then((results) => {
      res.send(results[0]);
    })
    .catch((error) => {
      return res.status(200).json({ message: "error", message: error.message });
    });
};

const Get_Group = (req, res) => {
  const query = "select * from blood_group";
  dbConnection
    .execute(query)
    .then((results) => {
      res.send(results[0]);
    })
    .catch((error) => {
      return res.status(200).json({ message: "error", message: error.message });
    });
};
const Get_RH = (req, res) => {
  const query = "select * from blood_rh";
  dbConnection
    .execute(query)
    .then((results) => {
      res.send(results[0]);
    })
    .catch((error) => {
      return res.status(200).json({ message: "error", message: error.message });
    });
};
const Get_Choice = (req, res) => {
  const query = "select * from bb_choice where type = '6'";
  dbConnection
    .execute(query)
    .then((results) => {
      res.send(results[0]);
    })
    .catch((error) => {
      return res.status(200).json({ message: "error", message: error.message });
    });
};
const Get_Inf = (req, res) => {
  const query =
    "select " +
    "max(case when (t1.inf_id =1) then t1.inf_active else NULL end) as 'Saline'," +
    "max(case when (t1.inf_id =2) then t1.inf_active else NULL end) as 'Papian'," +
    "max(case when (t1.inf_id =3) then t1.inf_active else NULL end) as 'Coombs'," +
    " max(case when (t1.inf_id =4) then t1.inf_active else NULL end) as 'AntiA'," +
    "max(case when (t1.inf_id =5) then t1.inf_active else NULL end) as 'AntiB'," +
    "max(case when (t1.inf_id =6) then t1.inf_active else NULL end) as 'TPHA'," +
    "max(case when (t1.inf_id =7) then t1.inf_active else NULL end) as 'HBsAg'," +
    " max(case when (t1.inf_id =8) then t1.inf_active else NULL end) as 'HIV'," +
    " max(case when (t1.inf_id =9) then t1.inf_active else NULL end) as 'HBVNAT'," +
    " max(case when (t1.inf_id =10) then t1.inf_active else NULL end) as 'HCVNAT'," +
    " max(case when (t1.inf_id =11) then t1.inf_active else NULL end) as 'HIVNAT'," +
    " max(case when (t1.inf_id =12) then t1.inf_active else NULL end) as 'ALT'," +
    " max(case when (t1.inf_id =13) then t1.inf_active else NULL end) as 'HCV'," +
    " max(case when (t1.inf_id =14) then t1.inf_active else NULL end) as 'HIVAg'" +
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

//----------------------//
const Update_result = async (req, res) => {
  try {
    const {
      dn,
      Gr,
      RH,
      Saline,
      Papian,
      Coombs,
      Anti_A,
      Anti_B,
      TPHA,
      HBsAg,
      HIV,
      HBV_NAT,
      HCV_NAT,
      HIV_NAT,
      ALT,
      HCV,
      HIVAg,
      Result,
      staff,
      unit_no,
    } = req.body;
    console.log("req.body....", req.body);

    const Query = `UPDATE donor_blood set dornrh = '${RH}'
    ,dorngro ='${Gr}'
    ,Saline = '${Saline}'
    ,Papain = '${Papian}'
    ,TPHA = '${TPHA}'
    ,Coombs = '${Coombs}'
    ,HBVNAT = '${HBV_NAT}'
    ,HCVNAT = '${HCV_NAT}'
    ,HIVNAT = '${HIV_NAT}'
    ,antia = '${Anti_A}'
    ,antib = '${Anti_B}'
    ,alt = '${ALT}'
    ,hivag = '${HIVAg}'
    ,hiv = '${HIV}'
    ,hcv = '${HCV}'
    ,hbsag = '${HBsAg}'
    ,staff_result = '${staff}'
    ,result = '${Result}'
    ,status = if('${Result}' = 'PASS' ,  '10' , '7')
    ,separate_status = 0 WHERE dn = '${dn}';`;
    //console.log("Update_resultsssssssssss", Query);
    const result = await dbConnection.execute(Query);

    const QueryBlood = `UPDATE blood set 
    status = if('${Result}' = 'PASS' ,  '1' , '7') 
    ,blood_rh = '${RH}'
    ,blood_group ='${Gr}'
    WHERE blood_no = '${unit_no}'`;
    const resultblood = await dbConnection.execute(QueryBlood);
    console.log("Update_resultsssssssssss", QueryBlood);

    return res.status(200).json({
      message: "success",
      numAll: "123",
      numPass: "120",
      numFall: "3",
      numRepeat: "20",
    });
  } catch (error) {
    return res.status(500).json({ message: "error", message: error.message });
  }
};
module.exports = {
  Getdata,
  Get_Group,
  Get_RH,
  Get_Choice,
  Get_Inf,
  Update_result,
};
