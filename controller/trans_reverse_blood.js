const dbConnection = require("../database");

const search_trans_blood_reverse = (req, res) => {
  const { keyword, keyword_type } = req.query;
  console.log("=========non>>>", keyword);
  const query = `SELECT t.*
  ,b.blood_group as gr
  ,b.blood_rh as rh
  ,concat(b.blood_group,b.blood_rh) as full_group
  ,DATE_FORMAT(DATE_ADD(b.donor_date, INTERVAL 543 YEAR), '%d/%m/%Y %H:%i:%s') as recivce_date
  ,DATE_FORMAT(DATE_ADD(b.expiry_date, INTERVAL 543 YEAR), '%d/%m/%Y %H:%i:%s') as expiry_date
  ,b.blood_value
  ,bt.s_name as type_name
  ,DATE_FORMAT(DATE_ADD(t.date, INTERVAL 543 YEAR), '%d/%m/%Y %H:%i:%s') as payment_date
,t.Pname as payment_name
,t.recipient as recipient_name
,h.hos_long_name_th as hos_name
,c.order_number
  from blood_transfer_hospital as t
  LEFT JOIN blood AS b ON t.bl_id = b.id
  LEFT JOIN blood_type AS bt ON b.blood_type = bt.id 
  LEFT JOIN bb_hospitals as h on t.hos_id = h.hos_id
  LEFT JOIN patient_crossmatch as c on t.bl_id = c.bl_id 
  where t.unit_no = '${keyword}' and t.type = '${keyword_type}'
  and t.status = '4'`;
  console.log("-------->", query);
  dbConnection
    .execute(query)
    .then((results) => {
      res.send(results[0]);
    })
    .catch((error) => {
      return res.status(200).json({ message: "error", error: error.message });
    });
};
// const get_blood_reverse_condition = (req, res) => {
//   const query = `SELECT * from blood_reverse_condition`;
//   // console.log("-------->", query);
//   dbConnection
//     .execute(query)
//     .then((results) => {
//       res.send(results[0]);
//     })
//     .catch((error) => {
//       return res.status(200).json({ message: "error", error: error.message });
//     });
// };
// const get_blood_reverse_choice = (req, res) => {
//   const query = `SELECT * from blood_reverse_choice where rech_status = '1';`;
//   // console.log("-------->", query);
//   dbConnection
//     .execute(query)
//     .then((results) => {
//       res.send(results[0]);
//     })
//     .catch((error) => {
//       return res.status(200).json({ message: "error", error: error.message });
//     });
// };
// const Add_blood_reverse_condition = (req, res) => {
//   const { condition } = req.body;
//   console.log("=========non>>>", condition);
//   const query = `INSERT INTO blood_reverse_condition (bc_name) VALUES ('${condition}');`;
//   // console.log("-------->", query);
//   dbConnection
//     .execute(query)
//     .then((results) => {
//       res.send(results[0]);
//     })
//     .catch((error) => {
//       return res.status(200).json({ message: "error", error: error.message });
//     });
// };
// const Add_blood_reverse_choice = (req, res) => {
//   const { choice } = req.body;
//   console.log("=========non>>>", choice);
//   const query = `INSERT INTO blood_reverse_choice (rech_name,rech_status) VALUES ('${choice}',1);`;
//   console.log("-----////--->", query);
//   dbConnection
//     .execute(query)
//     .then((results) => {
//       res.send(results[0]);
//     })
//     .catch((error) => {
//       return res.status(200).json({ message: "error", error: error.message });
//     });
// };

const save_trans_reverse = async (req, res) => {
  const {
    order_number,
    unit_no,
    save_name,
    type,
    import_id
  } = req.body;
  console.log(req.body);

  try {
    const query = `INSERT INTO blood_reverse_hospital (order_number,unit_no,date,save_name,type,import_id,status,detail) 
    VALUES ('${order_number}','${unit_no}',now(),'${save_name}','${type}','${import_id}','8','คืนเลือด')`;
    const query_update = `update blood_transfer_hospital set status = '8',reverse_datetime = now() ,reverse_staff = '${save_name}' where bl_id = '${import_id}'`;
    const query_update_blood = `update blood set status = '1' where id ='${import_id}'`;
    await dbConnection.execute(query);
    await dbConnection.execute(query_update);
    await dbConnection.execute(query_update_blood);
    return res.status(200).json({ message: "success" });
  } catch (error) {
    return res.status(500).json({ message: "error", message: error.message });
  }
};

const search_his_trans_reverse = (req, res) => {
  const { date_start, date_end, unit_no_search } = req.query;
  console.log("data.......>", req.query);
  const whereCondition = [];

  if (unit_no_search) {
    whereCondition.push(`br.unit_no = '${unit_no_search}'  `);
  }
  const query = `
                SELECT  br.*
                ,bt.s_name as type_name
                ,br.detail
                ,p_req.blood_gr as gr
                ,p_req.blood_rh as rh
                ,concat(p_req.blood_gr, p_req.blood_rh) AS full_group
                ,DATE_FORMAT(DATE_ADD(br.date, INTERVAL 543 YEAR), '%d/%m/%Y %H:%i:%s') as reverse_date
                FROM blood_reverse_hospital as br
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
  search_trans_blood_reverse,
  save_trans_reverse,
  // get_blood_reverse_condition,
  // Add_blood_reverse_condition,
  // get_blood_reverse_choice,
  // Add_blood_reverse_choice,
  // blood_reverse,
  search_his_trans_reverse,
};
