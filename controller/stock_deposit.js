const dbConnection = require("../database");

const fetch_deposit_common = (req, res) => {
  dbConnection
    .execute("SELECT * FROM blood_deposit_common")
    .then((results) => {
      res.send(results);
    })
    .catch((error) => {
      return res.status(200).json({ message: "error" });
    });
};

const data_blood = (req, res) => {
  const { unit_no, blood_type } = req.query;
  const query = `SELECT 
  b.blood_no
  ,b.id as bl_id
  ,c.xm_id
  ,concat(d.pname,d.fname,' ',d.lname) as fullname_donor
  ,bt.s_name as component_name
  ,b.blood_value 
  ,concat(IFNULL(b.blood_group,''), IFNULL(b.blood_rh,'')) as GrBlood
  ,DATE_FORMAT(DATE_ADD(b.donor_date, INTERVAL 543 YEAR ),'%d/%m/%Y') as punct_date    
  ,DATE_FORMAT(DATE_ADD(b.expiry_date, INTERVAL 543 YEAR ),'%d/%m/%Y') as expiry_date
  ,DATE_FORMAT(DATE_ADD(b.receive_date, INTERVAL 543 YEAR ),'%d/%m/%Y') as receive_date
  ,pr.order_number, pr.hn 
  ,concat(p.pname,p.fname,' ',p.lname) as fullname
  ,p.sex , w.name as name_ward
  ,concat(CONVERT(DATE_FORMAT(FROM_DAYS(DATEDIFF(NOW(), p.birthday)), '%Y') + 0, char), ' ปี '
  ,CONVERT(DATE_FORMAT(FROM_DAYS(DATEDIFF(NOW(), p.birthday)), '%m') - 1, char), ' เดือน '
  ,CONVERT(DATE_FORMAT(FROM_DAYS(DATEDIFF(NOW(), p.birthday)), '%d') - 1, char), ' วัน ') as age
  ,DATE_FORMAT(DATE_ADD(pr.use_datetime, INTERVAL 543 YEAR ),'%d/%m/%Y') as use_date
  ,concat(IFNULL(p.bloodgrp,''), IFNULL(p.bloodrh,'')) as Gr
  , concat(SUBSTRING(b.blood_no FROM 1 FOR 3), '.'
  , SUBSTRING(b.blood_no FROM 4 FOR 2), '.'
  , SUBSTRING(b.blood_no FROM 6 FOR 1), '.'
  , SUBSTRING(b.blood_no FROM 7)) as unit_no_dot
  FROM patient_crossmatch as c
  LEFT JOIN patient_request as pr ON pr.order_number = c.order_number
  LEFT JOIN patient as p ON p.hn = pr.hn
  LEFT JOIN blood as b ON b.id = c.bl_id
  LEFT JOIN donor as d ON d.donor_no = b.donor_id
  LEFT JOIN blood_type as bt on b.blood_type = bt.id
  LEFT JOIN bb_ward as w on w.ward = pr.ward 
  WHERE c.xm_status = '4'   
  AND b.blood_no = '${unit_no}' 
  AND b.blood_type = '${blood_type}'`;

  dbConnection
    .execute(query)
    .then((results) => {
      res.send(results);
    })
    .catch((error) => {
      return res.status(200).json({ message: "error" });
    });
};

const add_deposit_blood = async (req, res) => {
  const { dep_comm_id, dep_note, bl_id, xm_id, hn, dep_datetime_end, staff } =
    req.body;
    console.log(dep_comm_id, dep_note, bl_id, xm_id, hn, dep_datetime_end, staff);

  try {
    const queryAdd = `INSERT INTO blood_deposit_unit (dep_comm_id,import_id,result_id,hn,dep_note,dep_staff,dep_datetime,dep_datetime_end,dep_status)
    VALUES ('${dep_comm_id}', '${bl_id}','${xm_id}', '${hn}','${dep_note || ""}', '${staff}',now(), '${dep_datetime_end}',11)`;
   const resultQueryAdd = await dbConnection.execute(queryAdd);
   console.log("queryAdd",queryAdd);


    const updateBlood = `UPDATE blood SET  
    used_date = now(),
    status = '11'
    WHERE id = '${bl_id}' `;
   const resultUpdateBlood = await dbConnection.execute(updateBlood);

    const updateCossMatch = `UPDATE patient_crossmatch SET  
    xm_status = 11
    WHERE xm_id = '${xm_id}' `;
   const resultUpdateCoss = await dbConnection.execute(updateCossMatch);

    return res.status(200).json({ message: "success" });
  } catch (error) {
    return res.status(500).json({ message: "error", message: error.message });
  }
};

const search_his_deposit = (req, res) => {
  const { date_start, date_last, unit_no_search } = req.query;

  const whereCondition = [];

  if (unit_no_search) {
    whereCondition.push(` b.blood_no = '${unit_no_search}'  `);
  }


  const queryHisDeposit = `
  SELECT   
concat(SUBSTRING(b.blood_no FROM 1 FOR 3), '.'
, SUBSTRING(b.blood_no FROM 4 FOR 2), '.'
, SUBSTRING(b.blood_no FROM 6 FOR 1), '.'
, SUBSTRING(b.blood_no FROM 7)) as unit_no_dot
,  concat(IFNULL(b.blood_group,''), IFNULL(b.blood_rh,'')) as Gr
, bt.s_name
,DATE_FORMAT(DATE_ADD(d.dep_datetime, INTERVAL 543 YEAR ),'%d/%m/%Y') as deposit_date
,DATE_FORMAT(DATE_ADD(d.dep_datetime_end, INTERVAL 543 YEAR ),'%d/%m/%Y') as dep_datetime_end
,d.dep_note
,d.dep_staff
,b.status
,dc.dep_comm_name
,c.order_number
,b.blood_no
,s.bl_status_name
FROM blood_deposit_unit as d
left join blood as b on d.import_id = b.id
left join patient_crossmatch as c on d.result_id = c.xm_id
left join blood_type as bt on b.blood_type = bt.id
left join blood_deposit_common as dc on d.dep_comm_id = dc.dep_comm_id
left join blood_status as s on d.dep_status = s.bl_status_id
WHERE d.dep_datetime  BETWEEN '${date_start} 00:00:00' and '${date_last} 23:59:59' 
${whereCondition.length > 0 ? `AND ${whereCondition}` : " "}`;

console.log(queryHisDeposit);

  dbConnection
    .execute(queryHisDeposit)
    .then((results) => {
      res.send(results[0]);
      //console.log(results[0]);
    })
    .catch((error) => {
      return res.status(500).json({ message: "error", error: error.message });
    });
};

module.exports = {
  fetch_deposit_common,
  data_blood,
  add_deposit_blood,
  search_his_deposit
};
