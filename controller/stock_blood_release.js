const dbConnection = require("../database");
const search_unit_no = (req, res) => {
  const { keyword, keyword_type } = req.query;

  const query = `
  select p_cross.order_number 
,p_req.hn as hn
,bb_w.name as ward_name
,concat(p.pname,p.fname,' ',p.lname) as patientname
,b.blood_no
,b.blood_group
,b.blood_rh
,b.blood_type
,DATE_FORMAT(DATE_ADD(p_cross.xm_date_time, INTERVAL 543 YEAR),'%d-%m-%Y') as date_xm
,DATE_FORMAT(DATE_ADD(b.expiry_date, INTERVAL 543 YEAR),'%d-%m-%Y') as date_exp
,bt.s_name
,p_cross.bl_id
,p_cross.xm_id
,p_cross.xm_type

FROM patient_crossmatch as p_cross
left JOIN patient_request as p_req on p_req.order_number=p_cross.order_number
left JOIN bb_ward as bb_w on bb_w.ward=p_req.ward
left JOIN patient as p on p_req.hn=p.hn
left JOIN blood as b on p_cross.bl_id=b.id
left join blood_type as bt on b.blood_type=bt.id
WHERE bl_id = (select l.id from blood as l 
WHERE l.blood_no ='${keyword}' 
and l.blood_type = '${keyword_type}')
and p_cross.xm_status = '3'
ORDER BY p_cross.xm_date_time desc limit 1;`;

  dbConnection
    .execute(query)
    .then((results) => {
      res.send(results[0]);
    })
    .catch((error) => {
      return res.status(200).json({ message: "error", error: error.message });
    });
};
const save_blood_release = async (req, res) => {
  console.log("rrrrrrrrrrr------>", req.body.data);

  const { order_number, blood_no, bl_id, xm_id, xm_type } = req.body.data;
  const { staff_name } = req.body;
  try {
    const query = `INSERT INTO blood_reverse (order_number,unit_no,date,save_name,type,result_id,status) VALUES ('${order_number}','${blood_no}',now(),'${staff_name}','${xm_type}','${xm_id}','13')`;
    const query_update = `update patient_crossmatch set xm_status = '13', xm_cancel_staft='${staff_name}',xm_cancel_date_time = now() where xm_id = '${xm_id}'`;
    const query_update_blood = `update blood set status = '1' where id ='${bl_id}'`;
    await dbConnection.execute(query);
    await dbConnection.execute(query_update);
    await dbConnection.execute(query_update_blood);
    return res.status(200).json({ message: "success" });
  } catch (error) {
    return res.status(500).json({ message: "error", message: error.message });
  }
};
const search_his_release = (req, res) => {
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
                    ? `AND ${whereCondition} and br.status = '13'`
                    : "and br.status = '13'"
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
  search_unit_no,
  save_blood_release,
  search_his_release,
};
