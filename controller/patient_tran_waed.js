const dbConnection = require("../database");

const patient_data = (req, res) => {
  // console.log(req.query);
  const { hn } = req.query;
  const query_hn = `SELECT 
    DATE_FORMAT(DATE_ADD(p.punct_datetime, INTERVAL 543 YEAR), '%Y-%m-%d') as punct_date,
    DATE_FORMAT(DATE_ADD(p.request_datetime, INTERVAL 543 YEAR), '%Y-%m-%d %H:%i:%s') as date_request,
    TIME(p.request_datetime) as time_request,
    DATE_FORMAT(DATE_ADD(p.use_datetime, INTERVAL 543 YEAR), '%Y-%m-%d %H:%i:%s') as date_use,
    TIME(p.use_datetime) as time_use,
    p.order_number,    
    p.hn,
    p.hos_point,
    p.request_datetime,
    p.use_datetime,
    p.bb_code,
    p.his_ln,
    p.his_an,
    p.his_vn,
    p.diag_1,
    p.diag_more,
    p.department,
    p.patient_type,
    p.doctor_code,
    p.doctor_name,
    p.dep_code,
    p.ward,
    p.punct_staff,
    p.lab_hgb,
    p.lab_hct,
    p.lab_plt,
    p.priority_trans,
    p.priority_trans_emergency,
    p.note,
    h.hos_long_name_th,
    w.name as ward_name,
    dep.department,
    d.name,
    pr.priority_name,
    e.emer_name
    FROM patient_request  as p
    LEFT JOIN bb_hospitals as h  ON p.hos_point = h.hos_id
    LEFT JOIN bb_ward as w  ON p.ward = w.ward
    LEFT JOIN bb_kskdepartment as dep  ON p.dep_code = dep.depcode
    LEFT JOIN bb_doctor as d  ON p.punct_staff = d.code
    LEFT JOIN patient_priority as pr  ON p.priority_trans = pr.priority_id
    LEFT JOIN patient_priority_emergency as e  ON p.priority_trans_emergency = e.emer_id
    WHERE
    p.hn = '${hn}' `;
  console.log(query_hn);
  //console.log("setPatientGroup", query_hn);
  dbConnection
    .execute(query_hn)
    .then((results) => {
      res.send(results[0]);
      //  console.log("setPatientGroup", results);
    })
    .catch((error) => {
      return res.status(200).json({ message: "error" });
    });
};
const check_xmId_wd = (req, res) => {
  const { order_number, xm_id } = req.query;
  const query_check = `select c.xm_id ,c.order_number
    , b.blood_no 
    , t.l_name 
    , b.id 
    , concat(IFNULL(b.blood_group,''), IFNULL(b.blood_rh,'')) as Gr
    , DATEDIFF(b.expiry_date, NOW()) as b_exp 
    , c.bl_id 
    , t.id as typeId
    , t.s_name 
    , t.component_type 
    , b.blood_value 
    , p.cross_confirm  
    , concat(SUBSTRING(b.blood_no FROM 1 FOR 3), '.'
  , SUBSTRING(b.blood_no FROM 4 FOR 2), '.'
  , SUBSTRING(b.blood_no FROM 6 FOR 1), '.'
  , SUBSTRING(b.blood_no FROM 7)) as unit_no_dot
    from patient_crossmatch as c 
    left join blood as b ON c.bl_id = b.id 
    left join blood_type as t ON b.blood_type = t.id 
    left join patient_request as p ON p.order_number = c.order_number
    where 
     c.xm_id  = '${xm_id}' 
    and c.xm_status <> 8 and c.xm_status <> 4 `;
  console.log(query_check);
  // c.order_number = '${order_number}'
  dbConnection
    .execute(query_check)
    .then((results) => {
      res.send(results[0]);
    })
    .catch((error) => {
      return res.status(200).json({ message: "error" });
    });
};

const Search_ordernumber_ward = (req, res) => {
  console.log("------------------------------------------------");
  console.log("data.body", req.body);
  console.log("data.quyery", req.query);
  console.log("------------------------------------------------");

  const { order_number } = req.query;

  //  console.log("b", req.body);
  //  console.log("q", req.query);
  // const { keyword } = req.query;
  //  console.log(req.query.CheckBox_search);
  let queryString = `
    SELECT req.order_number 
    , req.his_ln
    , if(req.his_an <>'',req.his_an,req.his_vn) as 'VN/AN'
    , req.hn
    , concat(p.pname,p.fname,' ' ,p.lname) as patientname
    , concat(p.bloodgrp , p.bloodrh ) as ABO
    , req.request_datetime
        , DATE_FORMAT(DATE_ADD(req.request_datetime, INTERVAL 543 YEAR ),'%d/%m/%Y') as req_date
        , DATE_FORMAT(DATE_ADD(req.request_datetime, INTERVAL 543 YEAR ),'%H:%i:%s') as req_time
        
    , req.use_datetime 
        , DATE_FORMAT(DATE_ADD(req.use_datetime, INTERVAL 543 YEAR ),'%d/%m/%Y') as req_usedate
        , DATE_FORMAT(DATE_ADD(req.use_datetime, INTERVAL 543 YEAR ),'%H:%i:%s') as req_usetime
    
  ,p.bloodgrp
    ,p_prty.priority_name
    ,req.hos_point
    ,hos.hos_long_name_th
    ,req.request_status 
    ,re_status.rq_stutus_name
    ,req.cancel_detail
    ,req.department
    ,req.patient_type
    ,req.ward
    ,wd.name as wd_name
    ,req.priority
    ,p_prty.priority_id
    ,req.dep_code
    ,dep.department as dep_c
  
    ,req.request_old_tube
    
    FROM patient_request AS req
    left join patient as p ON req.hn = p.hn
    left join bb_hospitals as hos ON req.hos_point = hos.hos_id
    left join patient_request_status as re_status ON req.request_status = re_status.rq_stutus_id
    left join bb_ward as wd ON req.ward = wd.ward
    left join patient_priority as p_prty ON req.priority = p_prty.priority_id
    left join bb_kskdepartment as dep ON req.dep_code = dep.depcode
  `;
  queryString += ` where req.order_number = '${order_number}' `;

  dbConnection
    .execute(queryString)

    .then((results) => {
      res.send(results[0]);
    })

    .catch((error) => {
      return res.status(500).json({ message: "error", error: error.message });
    });
};

const up_tranward = async (req, res) => {
  console.log(
    "------------------------------------------------------------------------------------"
  );
  console.log("b", req.body);
  console.log("q", req.query);

  try {
    const { xm_id, staff } = req.body;
    let data_xmid = "";
    for (let i = 0; i < xm_id.length; i++) {
      // console.log("xm_id",xm_id);
      console.log("aaa", [i], xm_id[i]);
      data_xmid = xm_id[i];

      const xm_q = `  Update patient_crossmatch set trans_ward_staff='${staff}' ,trans_ward_datetime=now() where xm_id = '${xm_id[i]}';`;
      console.log("ดู ::", xm_q);
      const resultun_group = await dbConnection.execute(xm_q);

     
    }
    return res
      .status(200)
      .json({ message: "success" });
  } catch (error) {
    return res.status(500).json({ message: "error", message: error.message });
  }
};

module.exports = {
  patient_data,
  check_xmId_wd,
  Search_ordernumber_ward,
  up_tranward,
};
