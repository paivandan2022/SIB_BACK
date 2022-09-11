const dbConnection = require("../database");

const seacrh_unit_no = async (req, res) => {
  const { keyword } = req.query;
  let query;
  let results;
  try {
    const query_search = `select * 
    from donor_blood 
    where unit_no = '${keyword}' ;`;
    const results_search = await dbConnection.execute(query_search);
    if (results_search[0].length > 0) {
      query = `select * 
        from donor_blood 
        where unit_no = '${keyword}' ;`;
      results = await dbConnection.execute(query);
    } else {
      query = `select  blood_no as unit_no, blood_bag_type_id as donor_type, blood_group as dorngro, blood_rh as dornrh, expiry_date as blood_expi, donor_date  
      from blood 
      where blood_no = '${keyword}' limit 1;`;
      results = await dbConnection.execute(query);
    }
    return res.send(results);

    // return res.status(200).json({ message: "success" });
  } catch (error) {
    return res.status(500).json({ message: "error" });
  }
};

const seacrh_donor = (req, res) => {
  const { keyword } = req.query;
  const query = `select *
  from donor 
  where donor_no = '${keyword}' `;
  console.log(query);
  dbConnection
    .execute(query)
    .then((results) => {
      res.send(results);
    })
    .catch((error) => {
      return res.status(500).json({ message: "error" });
    });
};
const separate_blood = (req, res) => {
  const { keyword } = req.query;
  const query = `select b.blood_no,b.id, bt.s_name as component_name,
 bt.l_name as component_name_long,
 bs.bl_status_name ,
 pcs.xm_status_name,
 preq_s.rq_stutus_name,
 preq.order_number,
 preq.hn,
 b.blood_value,
 b.blood_group,
 b.blood_rh,
 b_rh.rh_long_name,
 concat(p.pname, p.fname,' ', p.lname ) as patient_name
   , DATE_FORMAT(DATE_ADD(b.receive_date , INTERVAL 543 YEAR), '%d/%m/%Y') as unit_receive
   , DATE_FORMAT(DATE_ADD(b.donor_date  , INTERVAL 543 YEAR), '%d/%m/%Y') as unit_collect
   , DATE_FORMAT(DATE_ADD(b.expiry_date , INTERVAL 543 YEAR), '%d/%m/%Y') as unit_exp
   , DATE_FORMAT(DATE_ADD(pc.trans_date_time , INTERVAL 543 YEAR), '%d/%m/%Y') as date_use
   , concat(SUBSTRING(b.blood_no FROM 1 FOR 3), '.'
   , SUBSTRING(b.blood_no FROM 4 FOR 2), '.'
   , SUBSTRING(b.blood_no FROM 6 FOR 1), '.'
   , SUBSTRING(b.blood_no FROM 7)) as unit_no_dot
 from blood as b

 left join blood_rh as b_rh on b.blood_rh =b_rh.rh_shot_name
 left join blood_type as bt on bt.id=b.blood_type 
 left join blood_status as bs on bs.bl_status_id = b.status
 left join patient_crossmatch as pc on (pc.bl_id = b.id and pc.xm_status in (3,4,11))
 left join patient_crossmatch_status as pcs on  pc.xm_status = pcs.xm_status_id
 left join patient_request as preq on pc.order_number = preq.order_number
 left join patient as p on preq.hn = p.hn
 left join patient_request_status as preq_s on preq.request_status=preq_s.rq_stutus_id
 where b.blood_no =  '${keyword}'
 GROUP BY b.id 
 ORDER BY pc.order_number desc 
 `;
  // console.log(query);
  dbConnection
    .execute(query)
    .then((results) => {
      res.send(results);
    })
    .catch((error) => {
      return res.status(500).json({ message: "error", message: message.error });
    });
};
const get_unit_no = (req, res) => {
  const { keyword, keyword_type } = req.query;
  console.log("Get_unit_no", req.query);
  const queryString = `select b.blood_no
  ,b.blood_group
  ,b.blood_receive
  ,b.blood_rh
  ,b.blood_value
  ,b.blood_type
  ,b.donor_date as date_collect
  ,b.expiry_date as date_exp
  ,bt.l_name,bb_hos.hos_long_name_th
  , DATE_FORMAT(DATE_ADD(b.donor_date , INTERVAL 543 YEAR), '%d/%m/%Y') as donor_date
  , DATE_FORMAT(DATE_ADD(b.expiry_date, INTERVAL 543 YEAR), '%d/%m/%Y') as expiry_date

  from blood as b
  left join bb_hospitals as bb_hos on b.blood_receive=bb_hos.hos_id
  left join blood_type as bt on bt.id=b.blood_type
  where b.blood_no = '${keyword}' and b.blood_type ='${keyword_type}' ;`;

  dbConnection
    .execute(queryString)
    .then((results) => {
      res.send(results[0]);
    })
    .catch((error) => {
      return res.status(200).json({ message: "error", error: error.message });
    });
};
const gen_unit_no = (req, res) => {
  const { keyword } = req.query;
  const query = `select b.blood_no
  ,b.blood_group
  ,b.blood_rh
  ,b.blood_value
  ,b.blood_type
  ,b.blood_receive
  ,bt.l_name
  ,bb_hos.hos_long_name_th
  , DATE_FORMAT(DATE_ADD(b.donor_date , INTERVAL 543 YEAR), '%d/%m/%Y') as donor_date
  , DATE_FORMAT(DATE_ADD(b.expiry_date, INTERVAL 543 YEAR), '%d/%m/%Y') as expiry_date
  ,(count(b.blood_no)+1) as run_num
  from blood as b
  left join bb_hospitals as bb_hos on b.blood_receive=bb_hos.hos_id
  left join blood_type as bt on bt.id=b.blood_type

  where b.blood_no like '%${keyword}-%' order by b.id desc ;`;
  console.log("gen_unit_no", query);
  dbConnection
    .execute(query)
    .then((results) => {
      res.send(results);
    })
    .catch((error) => {
      return res.status(500).json({ message: "error", message: message.error });
    });
};
const save_split_unit = (req, res) => {
  console.log("save_split_unit", req.body);
  const {
    blood_group,
    blood_rh,
    blood_value,
    blood_type,
    date_collect,
    date_exp,
    unit_no,
    computer_name,
    staff_name,
    ip,
  } = req.body;
  const query = `INSERT INTO blood (id
    ,blood_no
    ,blood_group
    ,blood_rh
    ,blood_type
    ,blood_value
    ,donor_date
    ,expiry_date 
    ,blood_receive
    ,staff_name
    ,ip_address
    ,computer_name
    ,insert_date
    ,status
    ) VALUES ((select (max(t1.id)+1) FROM blood as t1)
    ,'${unit_no}'
    ,'${blood_group}'
    ,'${blood_rh}'
    ,'${blood_type}'
    ,'${blood_value}'
    ,'${date_collect}'
    ,'${date_exp}' 
    ,'1'
    ,'${staff_name}' 
    ,'${ip}' 
    ,'${computer_name}' 
    ,now()
    ,'1'
    )`;
  console.log("save", query);
  dbConnection
    .execute(query)
    .then((results) => {
      res.send(results[0]);
    })
    .catch((error) => {
      return res.status(200).json({ message: "error", error: error.message });
    });
};
const setdata_tb = (req, res) => {
  console.log("setdata_tb", req.query);
  const { keyword } = req.query;
  const query = `SELECT i.* 
  ,bt.s_name
  ,bt.l_name
  ,b_rh.rh_long_name
  ,bs.bl_status_name
  ,DATE_FORMAT(DATE_ADD(i.expiry_date,INTERVAL 543 YEAR),'%d-%m-%Y') as expiry_date_unit
  FROM blood as i 
  left join blood_status as bs on i.status=bs.bl_status_id
  left join blood_type as bt on i.blood_type=bt.id
  left join blood_rh as b_rh on i.blood_rh=b_rh.rh_shot_name
  where i.blood_no like '%${keyword}-%' 
  order by i.id asc`;
  console.log("setdata_tb", query);
  dbConnection
    .execute(query)
    .then((results) => {
      res.send(results[0]);
    })
    .catch((error) => {
      return res.status(200).json({ message: "error", error: error.message });
    });
};
const option_type = async (req, res) => {
  const query = `SELECT * FROM blood_type WHERE active = '1';`;
  dbConnection
    .execute(query)
    .then((results) => {
      res.send(results[0]);
    })
    .catch((error) => {
      return res.status(200).json({ message: "error", error: error.message });
    });
};
module.exports = {
  seacrh_unit_no,
  seacrh_donor,
  separate_blood,
  get_unit_no,
  option_type,
  gen_unit_no,
  save_split_unit,
  setdata_tb,
};
