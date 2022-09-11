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
      query = `select  id,blood_no as unit_no, blood_bag_type_id as donor_type, blood_group as dorngro, blood_rh as dornrh, expiry_date as blood_expi, donor_date  
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
const get_donor_modal = (req, res) => {
  const { donor_no } = req.query;
  //console.log("Get_donor_list_open",req.query);
  const queryString = `select *
  , DATE_FORMAT(DATE_ADD(birthday , INTERVAL 543 YEAR),'%Y-%m-%d') as birthday
  ,concat(CONVERT(DATE_FORMAT(FROM_DAYS(DATEDIFF(NOW(), birthday)), '%Y') + 0, char), ' ปี ',CONVERT(DATE_FORMAT(FROM_DAYS(DATEDIFF(NOW(), birthday)), '%m') - 1, char), ' เดือน ', CONVERT(DATE_FORMAT(FROM_DAYS(DATEDIFF(NOW(), birthday)), '%d') - 1, char), ' วัน ') as age 
   from donor 
   where donor_no = '${donor_no}';`;
  // console.log("queryString",queryString);
  dbConnection
    .execute(queryString)
    .then((results) => {
      res.send(results[0]);
    })
    .catch((error) => {
      return res.status(200).json({ message: "error", error: error.message });
    });
};
const donor_frmedit_modal = async (req, res) => {
  const {
    pid,
    staff,
    cid,
    donor_no,
    bloodgroup,
    blood_rh,
    pname,
    fname,
    lname,
    pname_en,
    fname_en,
    lname_en,
    sex,
    marrystatus,
    job,
    donor_phone,
    donor_email,
    birthday,
    addrpart,
    soipart,
    moopart,
    roadpart,
    chwpart,
    tmbpart,
    amppart,
    postcode,
    address_more,
    pid_donor,
  } = req.body;
  console.log("donor_frmedit_modal", req.body);

  //Update
  const query = `update  donor  set
           cid = '${cid}'
         , donor_no = '${donor_no || ""}'
         , bloodgroup = '${bloodgroup}'
         , bloodgroup_rh = '${blood_rh || ""}'
         , pname = '${pname}'
         , fname =' ${fname}'
         , lname =' ${lname}'
         , pname_en = '${pname_en || ""}' 
         , fname_en = '${fname_en || ""}' 
         , lname_en = '${lname_en || ""}' 
         , sex = if('${sex}'='หญิง','2', if('${sex}' = 'ชาย','1','${sex}'))
         , marrystatus = '${marrystatus}'
         , job ='${job}'
         , phone ='${donor_phone || ""}'
         , email ='${donor_email || ""}'
         , birthday ='${birthday}' 
         , addrpart=  '${addrpart || ""}'
         , soipart ='${soipart || ""}'
         , moopart ='${moopart || ""}'
         , roadpart ='${roadpart || ""}'
         , chwpart ='${chwpart}'
         , tmbpart ='${tmbpart}'
         , amppart = '${amppart}'
         , postcode = '${postcode}'
          ,address_more =  '${address_more || ""}'
          where pid =  '${pid}';`;
  dbConnection
    .execute(query)
    .then((results) => {
      res.send(results[0]);
    })
    .catch((error) => {
      return res.status(200).json({ message: "error", error: error.message });
    });
};

const updateBloodValue = async (req, res) => {
  const { blood_value, id } = req.body;
  console.log("sssss req.body", req.body);

  try {
    const checkInst = `update blood set
    blood_value = '${blood_value}'
    where id = '${id}'`;
    const resultCheckInst = await dbConnection.execute(checkInst);

    return res.status(200).json({ message: "success" });
  } catch (error) {
    return res.status(500).json({ message: "error", error: error.message });
  }
};
module.exports = {
  seacrh_unit_no,
  seacrh_donor,
  separate_blood,
  get_donor_modal,
  donor_frmedit_modal,
  updateBloodValue,
};
