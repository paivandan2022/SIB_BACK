const dbConnection = require("../database");

const search_blood_retrun = (req, res) => {
  const { keyword, keyword_type } = req.query;
  console.log("=========non>>>", keyword);
  const query = `SELECT 
    p_cross.order_number,
    p.bloodgrp as patient_gr,
    p.bloodrh as patient_rh,
    if(p.sex=1, 'ชาย','หญิง') as patient_sex ,
    p_req.hn AS hn,
    bb_w.NAME AS ward_name,
    concat( p.pname, p.fname, ' ', p.lname ) AS patientname,
    b.blood_no,
    b.blood_group,
    b.blood_rh,
    b.blood_type,
    b.blood_value,
    concat(CONVERT(DATE_FORMAT(FROM_DAYS(DATEDIFF(NOW(), p.birthday)), '%Y') + 0, char), ' ปี ',CONVERT(DATE_FORMAT(FROM_DAYS(DATEDIFF(NOW(), p.birthday)), '%m') - 1, char), ' เดือน ') as  patient_age,
    DATE_FORMAT( DATE_ADD( p.birthday, INTERVAL 543 YEAR ), '%d-%m-%Y' ) AS patient_birthday,
    DATE_FORMAT( DATE_ADD( b.donor_date, INTERVAL 543 YEAR ), '%d-%m-%Y' ) AS donor_date,
    DATE_FORMAT( DATE_ADD( p_cross.xm_date_time, INTERVAL 543 YEAR ), '%d-%m-%Y' ) AS date_xm,
    DATE_FORMAT( DATE_ADD( b.expiry_date, INTERVAL 543 YEAR ), '%d-%m-%Y' ) AS date_exp,
    bt.s_name,
    p_cross.bl_id,
    p_cross.xm_id,
    p_cross.xm_type ,
    DATE_FORMAT(DATE_ADD(p_req.use_datetime, INTERVAL 543 YEAR), '%d/%m/%Y %H:%i:%s') as use_time ,
    DATE_FORMAT(DATE_ADD(p_req.request_datetime, INTERVAL 543 YEAR), '%d/%m/%Y %H:%i:%s') as request_time
   FROM
    patient_crossmatch AS p_cross
    LEFT JOIN patient_request AS p_req ON p_req.order_number = p_cross.order_number
    LEFT JOIN bb_ward AS bb_w ON bb_w.ward = p_req.ward
    LEFT JOIN patient AS p ON p_req.hn = p.hn
    LEFT JOIN blood AS b ON p_cross.bl_id = b.id
    LEFT JOIN blood_type AS bt ON b.blood_type = bt.id 
   WHERE
    bl_id = ( SELECT l.id FROM blood AS l WHERE l.blood_no = '${keyword}' AND l.blood_type = '${keyword_type}' ) 
    AND p_cross.xm_status IN (4,11)
   ORDER BY
    p_cross.xm_date_time DESC 
    LIMIT 1;`;
  // console.log("-------->", query);
  dbConnection
    .execute(query)
    .then((results) => {
      res.send(results[0]);
    })
    .catch((error) => {
      return res.status(200).json({ message: "error", error: error.message });
    });
};
const get_blood_reverse_condition = (req, res) => {
  const query = `SELECT * from blood_reverse_condition`;
  // console.log("-------->", query);
  dbConnection
    .execute(query)
    .then((results) => {
      res.send(results[0]);
    })
    .catch((error) => {
      return res.status(200).json({ message: "error", error: error.message });
    });
};
const get_blood_reverse_choice = (req, res) => {
  const query = `SELECT * from blood_reverse_choice where rech_status = '1';`;
  // console.log("-------->", query);
  dbConnection
    .execute(query)
    .then((results) => {
      res.send(results[0]);
    })
    .catch((error) => {
      return res.status(200).json({ message: "error", error: error.message });
    });
};
const Add_blood_reverse_condition = (req, res) => {
  const { condition } = req.body;
  console.log("=========non>>>", condition);
  const query = `INSERT INTO blood_reverse_condition (bc_name) VALUES ('${condition}');`;
  // console.log("-------->", query);
  dbConnection
    .execute(query)
    .then((results) => {
      res.send(results[0]);
    })
    .catch((error) => {
      return res.status(200).json({ message: "error", error: error.message });
    });
};
const Add_blood_reverse_choice = (req, res) => {
  const { choice } = req.body;
  console.log("=========non>>>", choice);
  const query = `INSERT INTO blood_reverse_choice (rech_name,rech_status) VALUES ('${choice}',1);`;
  console.log("-----////--->", query);
  dbConnection
    .execute(query)
    .then((results) => {
      res.send(results[0]);
    })
    .catch((error) => {
      return res.status(200).json({ message: "error", error: error.message });
    });
};

const blood_reverse = async (req, res) => {
  const {
    order_number,
    blood_no,
    bl_id,
    xm_id,
    xm_type,
    bag_temp,
    bag_condition,
    staff_name,
  } = req.body;
  try {
    const query = `INSERT INTO blood_reverse (order_number,unit_no,date,save_name,type,result_id,status,import_id,bag_temp,bag_condition) 
    VALUES ('${order_number}','${blood_no}',now(),'${staff_name}','${xm_type}','${xm_id}','8','${bl_id}','${bag_temp}','${bag_condition}')`;
    const query_update = `update patient_crossmatch set xm_status = '8', xm_cancel_staft='${staff_name}',xm_cancel_date_time = now() where xm_id = '${xm_id}'`;
    const query_update_blood = `update blood set status = '1' where id ='${bl_id}'`;
    await dbConnection.execute(query);
    await dbConnection.execute(query_update);
    await dbConnection.execute(query_update_blood);
    return res.status(200).json({ message: "success" });
  } catch (error) {
    return res.status(500).json({ message: "error", message: error.message });
  }
};

const search_his_reverse = (req, res) => {
  const { date_start, date_end, unit_no_search } = req.query;
  console.log("data.......>", req.query);
  const whereCondition = [];

  if (unit_no_search) {
    whereCondition.push(`br.unit_no = '${unit_no_search}'  `);
  }
  const query = `
                SELECT  br.*
                ,bt.s_name as type_name
                ,bs.bl_status_name as status_name
                ,p_req.blood_gr as gr
                ,p_req.blood_rh as rh
                ,concat(p_req.blood_gr, p_req.blood_rh) AS full_group
                ,DATE_FORMAT(DATE_ADD(br.date, INTERVAL 543 YEAR), '%d/%m/%Y %H:%i:%s') as reverse_date
                FROM blood_reverse as br
                left join blood_type as bt on bt.id = br.type
                left join blood_status as bs on bs.bl_status_id = br.status
                LEFT JOIN patient_request AS p_req ON p_req.order_number = br.order_number
                WHERE br.date  BETWEEN '${date_start} 00:00:00' and '${date_end} 23:59:59'  
                ${
                  whereCondition.length > 0
                    ? `AND ${whereCondition} and br.status = '8'`
                    : "and br.status = '8'"
                }`;
  console.log(query);
  dbConnection
    .execute(query)
    .then((results) => {
      res.send(results[0]);
    })
    .catch((error) => {
      return res.status(500).json({ message: "error", error: error.message });
    });
};
module.exports = {
  search_blood_retrun,
  get_blood_reverse_condition,
  Add_blood_reverse_condition,
  get_blood_reverse_choice,
  Add_blood_reverse_choice,
  blood_reverse,
  search_his_reverse,
};
