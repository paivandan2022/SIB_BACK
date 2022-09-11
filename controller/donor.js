const { all } = require("express/lib/application");
const dbConnection = require("../database");

const pname_en_th = (req, res) => {
  dbConnection
    .execute(
      " select t1.perfix_id as prefix_id_th, t1.perfix_name as pname_th ,t2.perfix_id as prefix_id_en, t2.perfix_name as pname_en " +
        " from (select perfix_id, perfix_name from donor_prefix) as t1  " +
        " ,(select perfix_id, perfix_name from donor_prefix_eng) as t2 " +
        " where t1.perfix_id = t2.perfix_id "
    )
    .then((results) => {
      res.send(results[0]);
    })
    .catch((error) => {
      return res.status(200).json({ message: "error" });
    });
};
//=============================//
const Add_guest_donor = (req, res) => {
  const {
    cid,
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
    image,
  } = req.body;

  const strAdd_G_donor = `INSERT INTO donor_guest
    (
      cid, bloodgroup,blood_rh, pname, fname, lname, pname_en, fname_en, lname_en, sex, marrystatus, job, phone,  email, birthday, addrpart, 
      soipart, moopart, roadpart, chwpart, tmbpart, amppart, postcode ,image,insert_date,status
    ) 
    VALUES  
    (
    '${cid}' , 
    '${bloodgroup}' , 
    '${blood_rh}' , 
    '${pname}' , 
    '${fname}' , 
    '${lname}' , 
    '${pname_en || ""}' ,
    '${fname_en || ""}' , 
    '${lname_en || ""}' , 
    '${sex}' , 
    '${marrystatus || ""}' , 
    '${job || ""}' , 
    '${donor_phone || ""}' ,
    '${donor_email || ""}' , 
    '${birthday}' ,
    '${addrpart}' ,
    '${soipart || ""}' ,
    '${moopart || ""}' , 
    '${roadpart || ""}' , 
    '${chwpart}' , 
    '${tmbpart}' , 
    '${amppart}' ,
    '${postcode}',
    '${image}',
    now(),
    '1'
      )`;

  //console.log("strAdd_Guest_donor-=====>", strAdd_G_donor);
  dbConnection
    .execute(strAdd_G_donor)
    .then((results) => {
      res.send("OK");
    })
    .catch((error) => {
      return res.status(200).json({ message: "error", error: error.message });
    });
};
//=============================//
const Get_group = (req, res) => {
  dbConnection
    .execute("select * from blood_group")
    .then((results) => {
      res.send(results[0]);
    })
    .catch((error) => {
      return res.status(200).json({ message: "error" });
    });
};
//=============================//
const Get_mary = (req, res) => {
  dbConnection
    .execute("SELECT * FROM donor_marital_status")
    .then((results) => {
      res.send(results[0]);
    })
    .catch((error) => {
      return res.status(200).json({ message: "error" });
    });
};
//=============================//
const Get_occu = (req, res) => {
  dbConnection
    .execute("SELECT * FROM donor_occupation ")
    .then((results) => {
      res.send(results[0]);
    })
    .catch((error) => {
      return res.status(200).json({ message: "error" });
    });
};
//=============================//
const Get_sex = (req, res) => {
  dbConnection
    .execute("SELECT * FROM bb_sex")
    .then((results) => {
      res.send(results[0]);
      // console.log("เพศ", results[0]);
    })
    .catch((error) => {
      return res.status(200).json({ message: "error" });
    });
};
//=============================//
const Get_Zip = (req, res) => {
  dbConnection
    .execute(
      "select zipcode from donor_zipcodes where district_code = '" +
        req.query.DISTRICT_CODE +
        "' "
    )
    .then((results) => {
      res.send(results[0]);
    })
    .catch((error) => {
      return res.status(200).json({ message: "error" });
    });
};
//=============================//
const Get_Tumbon = (req, res) => {
  dbConnection
    .execute(
      "select DISTRICT_CODE , DISTRICT_NAME from donor_districts where AMPHUR_ID = '" +
        req.query.AMPHUR_ID +
        "' order by DISTRICT_NAME asc; "
    )
    .then((results) => {
      res.send(results[0]);
    })
    .catch((error) => {
      return res.status(200).json({ message: "error" });
    });
};
//=============================//
const Get_Aumpure = (req, res) => {
  dbConnection
    .execute(
      "select AMPHUR_ID, AMPHUR_NAME from donor_amphures where PROVINCE_ID = '" +
        req.query.PROVINCE_ID +
        "' order by AMPHUR_NAME asc "
    )
    .then((results) => {
      res.send(results[0]);
    })
    .catch((error) => {
      return res.status(200).json({ message: "error" });
    });
};
//=============================//
const Get_Province = (req, res) => {
  dbConnection
    .execute(
      "select PROVINCE_ID, PROVINCE_NAME from donor_provinces order by PROVINCE_NAME asc; "
    )
    .then((results) => {
      res.send(results[0]);
    })
    .catch((error) => {
      return res.status(200).json({ message: "error" });
    });
};
//=============================//
//============fetchnew=================//
const Get_Tumbon_new = (req, res) => {
  dbConnection
    .execute(
      "select DISTRICT_CODE , DISTRICT_NAME from donor_districts where AMPHUR_ID = '" +
        req.query.AMPHUR_ID +
        "' order by DISTRICT_NAME asc; "
    )
    .then((results) => {
      res.send(results[0]);
    })
    .catch((error) => {
      return res.status(200).json({ message: "error" });
    });
};
//=============================//
const Get_Aumpure_new = (req, res) => {
  dbConnection
    .execute(
      "select AMPHUR_ID, AMPHUR_NAME from donor_amphures where PROVINCE_ID = '" +
        req.query.PROVINCE_ID +
        "' order by AMPHUR_NAME asc "
    )
    .then((results) => {
      res.send(results[0]);
    })
    .catch((error) => {
      return res.status(200).json({ message: "error" });
    });
};
//=============================//
const Get_Province_new = (req, res) => {
  dbConnection
    .execute(
      "select PROVINCE_ID, PROVINCE_NAME from donor_provinces order by PROVINCE_NAME asc; "
    )
    .then((results) => {
      res.send(results[0]);
    })
    .catch((error) => {
      return res.status(200).json({ message: "error" });
    });
};
const Get_Zip_new = (req, res) => {
  dbConnection
    .execute(
      `select zipcode from donor_zipcodes where district_code = '${req.query.DISTRICT_CODE}' ;`
    )
    .then((results) => {
      res.send(results[0]);
    })
    .catch((error) => {
      return res.status(200).json({ message: "error", message: error.message });
    });
};
//=============================//
const Get_donor_list = (req, res) => {
  const { date_start, date_end, keyword, keyword_status } = req.query;

  const whereCondition = [];

  if (date_start && date_end) {
    whereCondition.push(
      `insert_date between "${date_start} 00:00:00" and "${date_end} 23:59:59"`
    );
  }
  if (keyword) {
    whereCondition.push(
      ` concat(fname, ' ', lname) like '%${keyword}%' or cid='${keyword}'  `
    );
  }
  if (keyword_status) {
    whereCondition.push(` status ='${keyword_status}'  `);
  }
  const queryString =
    " SELECT gd.*, " +
    " concat(gd.pname,' ', gd.fname, ' ', gd.lname) as fullname , " +
    " job.occu_name, " +
    " marry.status_name, " +
    " t.DISTRICT_NAME, " +
    " a.AMPHUR_NAME, " +
    " p.PROVINCE_NAME, " +
    " gd.image, " +
    " gd.phone, " +
    " sex.name AS sex, " +
    " DATE_FORMAT(DATE_ADD(gd.eject_date, INTERVAL 543 YEAR),'%d/%m/%Y %H:%i:%s') AS date_eject, " +
    " concat(CONVERT(DATE_FORMAT(FROM_DAYS(DATEDIFF(NOW(), gd.birthday)), '%Y') + 0, char), ' ปี ',CONVERT(DATE_FORMAT(FROM_DAYS(DATEDIFF(NOW(), gd.birthday)), '%m') - 1, char), ' เดือน ') as age" +
    " ,bs.status_name " +
    " FROM donor_guest AS gd " +
    " LEFT JOIN donor_provinces AS p " +
    "   ON gd.chwpart = p.PROVINCE_ID " +
    " LEFT JOIN donor_amphures AS a " +
    "   ON gd.amppart = a.AMPHUR_ID " +
    " LEFT JOIN donor_districts AS t " +
    "   ON gd.tmbpart = t.DISTRICT_CODE " +
    " LEFT JOIN donor_marital_status AS marry " +
    "   ON gd.marrystatus = marry.status_id " +
    " LEFT JOIN donor_occupation AS job " +
    "   ON gd.job = job.occu_id " +
    " LEFT JOIN bb_sex AS sex" +
    "   ON gd.sex = sex.code " +
    " left join donor_blood_status as bs ON gd.status = bs.id " +
    `${
      whereCondition.length > 0 ? ` where ${whereCondition.join(" AND ")}` : ""
    }`;
  dbConnection
    .execute(queryString)
    .then((results) => {
      res.send(results[0]);
    })
    .catch((error) => {
      return res.status(500).json({ message: "error", error: error.message });
    });
};
const Get_donor_list_open = (req, res) => {
  const { pid } = req.query;
  //console.log("Get_donor_list_open",req.query);
  const queryString =
    " SELECT gd.*, " +
    " concat(gd.pname,' ', gd.fname, ' ', gd.lname) as fullname , " +
    " job.occu_name, " +
    " d.phone as donor_phone, " +
    " gd.birthday as dob, " +
    " d.email as donor_email, " +
    " marry.status_name, " +
    " t.DISTRICT_NAME, " +
    " a.AMPHUR_NAME, " +
    " p.PROVINCE_NAME, " +
    " gd.image, " +
    " gd.sex, " +
    "CONVERT(DATE_FORMAT(FROM_DAYS(DATEDIFF(NOW(), gd.birthday)), '%Y') + 0, char) as age_year, " +
    " concat(CONVERT(DATE_FORMAT(FROM_DAYS(DATEDIFF(NOW(), gd.birthday)), '%Y') + 0, char), ' ปี ',CONVERT(DATE_FORMAT(FROM_DAYS(DATEDIFF(NOW(), gd.birthday)), '%m') - 1, char), ' เดือน ', CONVERT(DATE_FORMAT(FROM_DAYS(DATEDIFF(NOW(), gd.birthday)), '%d') - 1, char), ' วัน ') as age " +
    " , d.donor_no as donor_no " +
    ",d.addrpart_new " +
    ",d.moopart_new " +
    ",d.soipart_new " +
    ",d.roadpart_new " +
    ",d.tmbpart_new " +
    ",d.amppart_new " +
    ",d.chwpart_new " +
    ",d.postcode_new " +
    ",d.address_more " +
    " FROM donor_guest AS gd " +
    " left join donor as d ON gd.cid = d.cid " +
    " LEFT JOIN donor_provinces AS p " +
    "   ON gd.chwpart = p.PROVINCE_ID " +
    " LEFT JOIN donor_amphures AS a " +
    "   ON gd.amppart = a.AMPHUR_ID " +
    " LEFT JOIN donor_districts AS t " +
    "   ON gd.tmbpart = t.DISTRICT_CODE " +
    " LEFT JOIN donor_marital_status AS marry " +
    "   ON gd.marrystatus = marry.status_id " +
    " LEFT JOIN donor_occupation AS job " +
    "   ON gd.job = job.occu_id " +
    ` where gd.pid = '${pid}' `;
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
//===============ประวัติการบริจาคเลือด==============//
const Get_history_donor = (req, res) => {
  dbConnection
    .execute(
      "select donor_count as count_his ,  unit_no as number_his , donor_date as date_his , CONCAT( dorngro,  dornrh ) as group_his  from donor_blood "
    )
    .then((results) => {
      res.send(results[0]);
    })
    .catch((error) => {
      return res.status(200).json({ message: "error" });
    });
};
//=============================//
const Get_data_donetion = (req, res) => {
  const { pid } = req.query;
  const queryString = `select le.last_exception as last_exception_name, l.type_blood, bt.bagtype , b.* ,dd.donate as donate_name
  from donor_blood as b
  left join blood_bag_type as bt on b.donor_type = bt.bagcode
  left join donor_last_blood as l on b.last_blood = l.id
  left join donor_last_exception as le on b.last_exception = le.id
  left join donor_donation_detail as dd on b.donation_datail = dd.id
  where pid = '${pid}'`;
  dbConnection
    .execute(queryString)
    .then((results) => {
      res.send(results[0]);
    })
    .catch((error) => {
      return res.status(200).json({ message: "error", error: error.message });
    });
};

//===============รายชื่อเจ้าหน้าที่==============//
const Get_staff = (req, res) => {
  dbConnection
    .execute(
      "select concat(pname,' ',fname,' ',lname) as fullname from bb_user "
    )
    .then((results) => {
      res.send(results[0]);
    })
    .catch((error) => {
      return res.status(200).json({ message: "error" });
    });
};
//==============คำถามก่อนกดสมัคร ยืนยัน==============//
const Get_question = (req, res) => {
  dbConnection
    .execute("select * from donor_questionnaire_list")
    .then((results) => {
      res.send(results[0]);
      // console.log("คำถาม", results[0]);
    })
    .catch((error) => {
      return res.status(200).json({ message: "error" });
    });
};
// ===========เพิ่มข้อมูลหน้า frmedit=========
const Add_donor_frmedit = async (req, res) => {
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
    addrpart_new,
    soipart_new,
    moopart_new,
    roadpart_new,
    chwpart_new,
    tmbpart_new,
    amppart_new,
    postcode_new,
    image,
    address_more,
    pid_donor,
  } = req.body;
  console.log(req.body);
  let chk_pid_donor;
  if (pid_donor != null) {
    chk_pid_donor = `SELECT pid,donor_no from donor where pid = '${pid_donor}';`;
    console.log("chk_pid_donor 1", chk_pid_donor);
  } else {
    chk_pid_donor = `SELECT pid,donor_no from donor where cid = '${cid}';`;
    console.log("chk_pid_donor 2", chk_pid_donor);
  }

  try {
    let results = await dbConnection.execute(chk_pid_donor);
    let strAdd_history_donor;
    if (results[0].length > 0) {
      console.log("if_1");
      //Update
      strAdd_history_donor = `update  donor  set
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
         ,  email ='${donor_email || ""}'
         , birthday ='${birthday}' 
         , addrpart=  '${addrpart}'
         , soipart ='${soipart}'
         , moopart ='${moopart}'
         , roadpart ='${roadpart}'
         , chwpart ='${chwpart}'
         , tmbpart ='${tmbpart}'
         , amppart = '${amppart}'
         , postcode = '${postcode}'
          , addrpart_new ='${addrpart_new}'
          ,soipart_new ='${soipart_new}'
          ,moopart_new ='${moopart_new}' 
          ,roadpart_new ='${roadpart_new}' 
          ,chwpart_new ='${chwpart_new}'
          ,tmbpart_new ='${tmbpart_new}' 
          ,amppart_new ='${amppart_new}'
          ,postcode_new ='${postcode_new}'
          ,image =  '${image}'
          ,address_more =  '${address_more || ""}'
          where pid =  '${results[0][0].pid}';`;
    } else {
      console.log("else_1");
      const pid = `SELECT (d.pid+1) as pid from donor as d order by d.pid DESC limit 1`;
      const result_pid = await dbConnection.execute(pid);
      console.log("result_pid", result_pid[0][0].pid);
      strAdd_history_donor = `INSERT INTO donor 
    (pid,cid, donor_no, bloodgroup, bloodgroup_rh, pname, fname, lname, pname_en, fname_en, lname_en, sex, marrystatus, job, phone,  email, birthday, addrpart, soipart, moopart, roadpart, chwpart, tmbpart, amppart, 
    postcode , addrpart_new,soipart_new,moopart_new,roadpart_new,chwpart_new,tmbpart_new,amppart_new,postcode_new,image,address_more) 
    VALUES  ('${result_pid[0][0].pid}',
    '${cid}' ,
    '${donor_no || ""}',
    '${bloodgroup}' , 
    '${blood_rh || ""}' , 
    '${pname}' , 
    '${fname}' , 
    '${lname}' , 
    '${pname_en || ""}' ,
    '${fname_en || ""}' , 
    '${lname_en || ""}' , 
    if('${sex}'='หญิง','2',if('${sex}' = 'ชาย','1','${sex}')) , 
    '${marrystatus}' , 
    '${job}' , 
    '${donor_phone || ""}' ,
    '${donor_email || ""}' , 
    '${birthday}' ,
    '${addrpart}' ,
    '${soipart || ""}' ,
    '${moopart || ""}' , 
    '${roadpart || ""}' , 
    '${chwpart}' , 
    '${tmbpart}' , 
    '${amppart}' ,
    '${postcode}',
    '${addrpart_new}' ,
    '${soipart_new}' ,
    '${moopart_new}' , 
    '${roadpart_new}' , 
    '${chwpart_new}' , 
    '${tmbpart_new}' , 
    '${amppart_new}' ,
    '${postcode_new}',
    '${image}',
    '${address_more || ""}'
    );`;
      console.log("in**********", strAdd_history_donor);
    }
    dbConnection.execute(strAdd_history_donor);

    let insert_donor_blood;
    let update_donor_guest;

    const check = `SELECT * from donor_blood where cid = '${cid}' and status ='2' ;`;
    const resultscheck = await dbConnection.execute(check);
    if (resultscheck[0].length > 0) {
      console.log("----if_2");

      console.log(
        "---------2",
        `${results[0][0].donor_no}`,
        `${results[0][0].pid}`
      );

      insert_donor_blood = `update donor_blood set cid='${cid}', donor_no = '${results[0][0].donor_no}',pid='${results[0][0].pid}' , staff_register = '${staff}' where dn = '${resultscheck[0][0].dn}';`;
      console.log("insert_donor_blood", insert_donor_blood);

      update_donor_guest = `update donor_guest set  dn = '${
        resultscheck[0][0].dn
      }' ,
      staff_register = '${staff}',
      status = '2',
      cid = '${cid}',
      pname = '${pname}',
      fname = '${fname}',
      lname = '${lname}',
      sex = '${sex}',
      birthday = '${birthday}',
      marrystatus = '${marrystatus}',
      job = '${job}',
      addrpart = '${addrpart}',
      moopart = '${moopart}',
      roadpart = '${roadpart}',
      tmbpart = '${tmbpart}',
      amppart = '${amppart}',
      chwpart = '${chwpart}',
      phone = '${donor_phone}',
      email = '${donor_email}',
      pname_en = '${pname_en}',
      fname_en = '${fname_en}',
      lname_en = '${lname_en}',
      postcode = '${postcode}',
      soipart= '${soipart}',
      bloodgroup = '${bloodgroup}',
      blood_rh = '${blood_rh || ""} ',
      pid_donor='${results[0][0].pid}'
      where pid = '${pid}' and (status = '1' or status = '2');`;
      console.log("update_donor_guest", update_donor_guest);
    } else {
      console.log("else_2");
      const check2 = `SELECT (dn+1) as dn from donor_blood order by dn DESC limit 1;`;
      const resultscheck2 = await dbConnection.execute(check2);
      console.log("check2", resultscheck2);

      insert_donor_blood = `insert into donor_blood (dn,cid, donor_no,pid, donor_date, status, staff_register,dorngro,dornrh) values ('${
        resultscheck2[0][0].dn
      }','${cid}', '${donor_no || ""}',
        (SELECT d.pid from donor as d where cid ='${cid}' order by pid DESC limit 1) ,now(), '2', '${staff}','${bloodgroup}','${blood_rh}');`;

      dbConnection.execute(insert_donor_blood);

      update_donor_guest = `update donor_guest set status = '2', dn = '${resultscheck2[0][0].dn}', pid_donor = (SELECT d.pid from donor as d where cid ='${cid}' order by pid DESC limit 1)  where pid = '${pid}';`;
      dbConnection.execute(update_donor_guest);
    }
    console.log("update_donor_guest***", update_donor_guest);
    // dbConnection.execute(strAdd_history_donor);
    // dbConnection.execute(insert_donor_blood);

    // const results2 = await Promise.all([
    //   dbConnection.execute(strAdd_history_donor),
    //   dbConnection.execute(insert_donor_blood),
    //   dbConnection.execute(update_donor_guest),
    // ]);

    return res.status(200).json({ message: "success" });
  } catch (error) {
    return res.status(500).json({ message: "error", message: error.message });
  }
};
const Get_Donor_Blood = async (req, res) => {
  const { donor_no } = req.query;
  const str = `select db.donor_no AS donor_no,
db.donor_count AS donor_count,db.dn AS dn,
concat(
SUBSTRING( db.unit_no FROM 1 FOR 3 ),
'.',
SUBSTRING( db.unit_no FROM 4 FOR 2 ),
'.',
SUBSTRING( db.unit_no FROM 6 FOR 1 ),
'.',
SUBSTRING( db.unit_no FROM 7 ) 
) AS Unitnumber_dot,
DATE_FORMAT( DATE_ADD( db.donor_date, INTERVAL 543 YEAR ), '%d/%m/%Y' ) AS donor_date,
DATEDIFF(now(),db.donor_date) AS sumday,
DATE_FORMAT(DATE_ADD(DATE_ADD( db.donor_date, INTERVAL 90 day ), INTERVAL 543 YEAR ), '%d/%m/%Y' ) AS to_donate_date,
m.MOBNAME AS mobname,
db.donor_type AS donor_type,
concat( db.dorngro, ifnull( db.dornrh, '' ) ) AS bag_gr,
concat(
ifnull( db.Saline, ' ' ),
ifnull( db.Papain, ' ' ),
ifnull( db.Coombs, ' ' ),
ifnull( db.antia, ' ' ),
ifnull( db.antib, ' ' ),
ifnull( db.hbsag, ' ' ),
ifnull( db.TPHA, ' ' ),
ifnull( db.hiv, ' ' ),
ifnull( db.HBVNAT, ' ' ),
ifnull( db.HCVNAT, ' ' ),
ifnull( db.HIVNAT, ' ' ),
ifnull( db.alt, ' ' ),
ifnull( db.hcv, ' ' ),
ifnull( db.hivag, ' ' ) 
) AS blood_result 
FROM donor_blood as db
LEFT JOIN donor_mobile AS m ON db.service_id = m.MOBCODE
where db.donor_no = '${donor_no}'
and db.result IS NOT NULL 
order by db.dn desc;`;
  dbConnection
    .execute(str)
    .then((results) => {
      res.send(results[0]);
    })
    .catch((error) => {
      return res.status(200).json({ message: "error", message: error.message });
    });
};
const Get_His_Donation_blood = async (req, res) => {
  const { dn } = req.query;
  const str = `select db.donor_no AS donor_no,
db.donor_count AS donor_count,db.dn AS dn,
concat(
SUBSTRING( db.unit_no FROM 1 FOR 3 ),
'.',
SUBSTRING( db.unit_no FROM 4 FOR 2 ),
'.',
SUBSTRING( db.unit_no FROM 6 FOR 1 ),
'.',
SUBSTRING( db.unit_no FROM 7 ) 
) AS Unitnumber_dot,
DATE_FORMAT( DATE_ADD( db.donor_date, INTERVAL 543 YEAR ), '%d/%m/%Y' ) AS donor_date,
DATEDIFF(now(),db.donor_date) AS sumday,
DATE_FORMAT(DATE_ADD(DATE_ADD( db.donor_date, INTERVAL 90 day ), INTERVAL 543 YEAR ), '%d/%m/%Y' ) AS to_donate_date,
m.MOBNAME AS mobname,
db.donor_type AS donor_type,
concat( db.dorngro, ifnull( db.dornrh, '' ) ) AS bag_gr,
concat(
ifnull( db.Saline, ' ' ),
ifnull( db.Papian, ' ' ),
ifnull( db.Coombs, ' ' ),
ifnull( db.antia, ' ' ),
ifnull( db.antib, ' ' ),
ifnull( db.hbsag, ' ' ),
ifnull( db.TPHA, ' ' ),
ifnull( db.hiv, ' ' ),
ifnull( db.HBVNAT, ' ' ),
ifnull( db.HCVNAT, ' ' ),
ifnull( db.HIVNAT, ' ' ),
ifnull( db.alt, ' ' ),
ifnull( db.hcv, ' ' ),
ifnull( db.hivag, ' ' ) 
) AS blood_result 
FROM donor_blood as db
LEFT JOIN donor_mobile AS m ON db.service_id = m.MOBCODE
where db.dn = '${dn}'
and db.result IS NOT NULL 
order by db.dn desc;`;
  dbConnection
    .execute(str)
    .then((results) => {
      res.send(results[0]);
    })
    .catch((error) => {
      return res.status(200).json({ message: "error", message: error.message });
    });
};
const Eject_register = async (req, res) => {
  const { eject_note, staff, pid, ignore_status } = req.body;
  let strQuery = `update donor_guest set status = '5',eject_note='${
    eject_note || ""
  }', staff_eject='${staff}', eject_date = now() where pid = '${pid}' `;
  console.log("-----", strQuery);
  if (ignore_status === true) {
    strQuery += `;`;
  } else {
    strQuery += ` and status = '1';`;
  }
  dbConnection
    .execute(strQuery)
    .then((results) => {
      res.send(results[0]);
    })
    .catch((error) => {
      return res.status(200).json({ message: "error", error: error.message });
    });
};
const Search_donor_list = (req, res) => {
  const { cid, donor_no } = req.query;
  // " SELECT *, concat(CONVERT(DATE_FORMAT(FROM_DAYS(DATEDIFF(NOW(), birthday)), '%Y') + 0, char), ' ปี ',CONVERT(DATE_FORMAT(FROM_DAYS(DATEDIFF(NOW(), birthday)), '%m') - 1, char), ' เดือน ', CONVERT(DATE_FORMAT(FROM_DAYS(DATEDIFF(NOW(), birthday)), '%d') - 1, char), ' วัน ') as age from donor " +

  const queryString =
    " SELECT * from donor " +
    `${cid ? ` where cid = '${cid}' ` : ` where donor_no = '${donor_no}'  `}` +
    "order by pid desc; ";

    console.log("***",queryString);
  dbConnection
    .execute(queryString)
    .then((results) => {
      res.send(results[0]);
    })
    .catch((error) => {
      return res.status(500).json({ message: "error", error: error.message });
    });
};

const Search_donor_detail = (req, res) => {
  const { choice, keyword } = req.query;
  let queryString;
  if (choice === "1") {
    queryString = ` SELECT *, concat(pname,' ', fname, ' ', lname) as fullname
    ,concat(CONVERT(DATE_FORMAT(FROM_DAYS(DATEDIFF(NOW(), birthday)), '%Y') + 0, char), ' ปี '
    ,CONVERT(DATE_FORMAT(FROM_DAYS(DATEDIFF(NOW(), birthday)), '%m') - 1, char), ' เดือน '
    , CONVERT(DATE_FORMAT(FROM_DAYS(DATEDIFF(NOW(), birthday)), '%d') - 1, char), ' วัน ') as age from donor 
     where cid = '${keyword}'  order by pid desc; `;
  } else if (choice === "2") {
    queryString = ` SELECT *, concat(pname,' ', fname, ' ', lname) as fullname
    , concat(CONVERT(DATE_FORMAT(FROM_DAYS(DATEDIFF(NOW(), birthday)), '%Y') + 0, char), ' ปี '
    ,CONVERT(DATE_FORMAT(FROM_DAYS(DATEDIFF(NOW(), birthday)), '%m') - 1, char), ' เดือน '
    , CONVERT(DATE_FORMAT(FROM_DAYS(DATEDIFF(NOW(), birthday)), '%d') - 1, char), ' วัน ') as age from donor 
     where donor_no = '${keyword}'  order by pid desc; `;
  } else if (choice === "3") {
    queryString = ` SELECT *, concat(pname,' ', fname, ' ', lname) as fullname
    , concat(CONVERT(DATE_FORMAT(FROM_DAYS(DATEDIFF(NOW(), birthday)), '%Y') + 0, char), ' ปี '
    ,CONVERT(DATE_FORMAT(FROM_DAYS(DATEDIFF(NOW(), birthday)), '%m') - 1, char), ' เดือน '
    , CONVERT(DATE_FORMAT(FROM_DAYS(DATEDIFF(NOW(), birthday)), '%d') - 1, char), ' วัน ') as age from donor 
     where concat(fname, ' ', lname) like '%${keyword}%'  order by pid desc; `;
  } else if (choice === "4") {
    queryString = ` SELECT *, concat(pname,' ', fname, ' ', lname) as fullname
      , concat(CONVERT(DATE_FORMAT(FROM_DAYS(DATEDIFF(NOW(), birthday)), '%Y') + 0, char), ' ปี '
      ,CONVERT(DATE_FORMAT(FROM_DAYS(DATEDIFF(NOW(), birthday)), '%m') - 1, char), ' เดือน '
      , CONVERT(DATE_FORMAT(FROM_DAYS(DATEDIFF(NOW(), birthday)), '%d') - 1, char), ' วัน ') as age from donor 
       where phone = '${keyword}'  order by pid desc; `;
  }

  dbConnection
    .execute(queryString)
    .then((results) => {
      res.send(results[0]);
    })
    .catch((error) => {
      return res.status(500).json({ message: "error", error: error.message });
    });
};

const Get_bagtype = (req, res) => {
  dbConnection
    .execute("Select bagcode as code , bagtype as type from blood_bag_type where status = 1")
    .then((results) => {
      res.send(results[0]);
    })
    .catch((error) => {
      return res.status(200).json({ message: "error" });
    });
};
const Get_Mobile = (req, res) => {
  dbConnection
    .execute("Select * from donor_mobile ")
    .then((results) => {
      res.send(results[0]);
    })
    .catch((error) => {
      return res.status(200).json({ message: "error" });
    });
};

const Get_Mobile_frist = (req, res) => {
  dbConnection
    .execute("Select * from donor_mobile ORDER BY MOBCODE asc limit 1")
    .then((results) => {
      res.send(results[0]);
    })
    .catch((error) => {
      return res.status(200).json({ message: "error" });
    });
};
const Get_donor_last_blood = (req, res) => {
  dbConnection
    .execute("SELECT * from donor_last_blood")
    .then((results) => {
      res.send(results[0]);
    })
    .catch((error) => {
      return res.status(200).json({ message: "error" });
    });
};
const Get_donor_donation_detail = (req, res) => {
  dbConnection
    .execute("SELECT * from donor_donation_detail")
    .then((results) => {
      res.send(results[0]);
    })
    .catch((error) => {
      return res.status(200).json({ message: "error" });
    });
};
const Add_mobile = (req, res) => {
  const { mob_code, mob_name } = req.body;
  const Query = ` INSERT INTO donor_mobile (MOBCODE, MOBNAME) VALUES ('${mob_code}','${mob_name}')`;

  dbConnection
    .execute(Query)
    .then((results) => {
      res.send(results[0]);
    })
    .catch((error) => {
      return res.status(200).json({ message: "error", message: error.message });
    });
};
const Update_mobile = (req, res) => {
  const { mob_code, mob_name } = req.body;
  const Query = `update donor_mobile set MOBNAME = '${mob_name}' where MOBCODE = '${mob_code}'`;

  dbConnection
    .execute(Query)
    .then((results) => {
      res.send(results[0]);
    })
    .catch((error) => {
      return res.status(200).json({ message: "error", message: error.message });
    });
};
const Search_moblie = (req, res) => {
  const { keyword } = req.query;
  const queryString = `select * from donor_mobile where  MOBNAME  like '%${keyword}%' or MOBCODE ='${keyword}' `;
  dbConnection
    .execute(queryString)
    .then((results) => {
      res.send(results[0]);
    })
    .catch((error) => {
      return res.status(500).json({ message: "error", error: error.message });
    });
};
const Search_donor = (req, res) => {
  const { keyword } = req.query;
  const queryString = `select d.*, 
  ds.DISTRICT_NAME as tmbpart_name,
  da.AMPHUR_NAME as amppart_name,
  dp.PROVINCE_NAME as chwpart_name,
  concat('เลขที่',' ',ifnull(d.addrpart_new,''),' ',
  'หมู่',' ',ifnull(d.moopart_new,''),' ',
  'ซอย',' ',ifnull(d.soipart_new,''),' ',
  'ถนน',' ',ifnull(d.roadpart_new,''),' ',
  'ตำบล',ifnull(ds.DISTRICT_NAME,''),' ',
  'อำเภอ',ifnull(da.AMPHUR_NAME,''),' ',
  'จังหวัด',' ',ifnull(dp.PROVINCE_NAME,''),' ',
  'ไปรษณีย์',' ',ifnull(d.postcode_new,'')) as address_new,
  concat(CONVERT(DATE_FORMAT(FROM_DAYS(DATEDIFF(NOW(), d.birthday)), '%Y') + 0, char), ' ปี ',
  CONVERT(DATE_FORMAT(FROM_DAYS(DATEDIFF(NOW(), d.birthday)), '%m') - 1, char), ' เดือน ', 
  CONVERT(DATE_FORMAT(FROM_DAYS(DATEDIFF(NOW(), d.birthday)), '%d') - 1, char), ' วัน ') as cal_age , 
  if(sex=1,'ชาย',if(sex=2,'หญิง','')) as sex_name 
  from donor as d 
  left join donor_districts as ds ON ds.DISTRICT_CODE = d.tmbpart_new
  left join donor_amphures as da ON da.AMPHUR_ID = d.amppart_new
  left join donor_provinces as dp ON dp.PROVINCE_ID = d.chwpart_new
  where  concat(trim(fname),' ', trim(lname)) like '%${keyword}%'  or cid like '%${keyword}%' or donor_no like '%${keyword}%' `;
  dbConnection
    .execute(queryString)
    .then((results) => {
      res.send(results[0]);
    })
    .catch((error) => {
      return res.status(500).json({ message: "error", error: error.message });
    });
};
const Get_Search_donor_view = (req, res) => {
  const { pid } = req.query;
  const queryString = `select d.* , 
  concat(CONVERT(DATE_FORMAT(FROM_DAYS(DATEDIFF(NOW(), d.birthday)), '%Y') + 0, char), ' ปี ',
    CONVERT(DATE_FORMAT(FROM_DAYS(DATEDIFF(NOW(), d.birthday)), '%m') - 1, char), ' เดือน ',
    CONVERT(DATE_FORMAT(FROM_DAYS(DATEDIFF(NOW(), d.birthday)), '%d') - 1, char), ' วัน ') as cal_age ,
    DATE_FORMAT(DATE_ADD(d.birthday, INTERVAL 543 YEAR),'%d/%m/%Y') AS date_birthday ,
    if(sex=1,'ชาย',if(sex=2,'หญิง','')) as sex_name  
    
    ,(select PROVINCE_NAME from donor_provinces where PROVINCE_ID = d.chwpart) as pro_name
    ,(select AMPHUR_NAME from donor_amphures where AMPHUR_ID = d.amppart and PROVINCE_ID = d.chwpart) as amp_name
    ,(select DISTRICT_NAME from donor_districts where DISTRICT_CODE = d.tmbpart and AMPHUR_ID = d.amppart) as tmp_name
    
    ,(select PROVINCE_NAME from donor_provinces where PROVINCE_ID = d.chwpart_new) as pro_name_new
    ,(select AMPHUR_NAME from donor_amphures where AMPHUR_ID = d.amppart_new and PROVINCE_ID = d.chwpart_new) as amp_name_new
    ,(select DISTRICT_NAME from donor_districts where DISTRICT_CODE = d.tmbpart_new and AMPHUR_ID = d.amppart_new) as tmp_name_new
    
    ,(select occu_name from donor_occupation where occu_id = d.job ) as occu_names
    from donor as d 
    left join donor_provinces as p ON d.chwpart
    where  pid = '${pid}'
    group by d.pid `;
  // console.log(queryString);

  dbConnection
    .execute(queryString)
    .then((results) => {
      res.send(results[0]);
    })
    .catch((error) => {
      return res.status(500).json({ message: "error", error: error.message });
    });
};
const Get_History_regis = (req, res) => {
  const { cid } = req.query;

  const queryString = `select dbs.status_name ,dg.* , DATE_FORMAT(DATE_ADD(dg.insert_date, INTERVAL 543 YEAR),'%d/%m/%Y %H:%i:%s') AS date_insert 
from donor_guest as dg
left join donor_blood_status as dbs ON dg.status = dbs.id 
where  dg.cid = '${cid}' and (dg.status = '4' or dg.status = '5') `;
  console.log(queryString);
  dbConnection
    .execute(queryString)
    .then((results) => {
      res.send(results[0]);
    })
    .catch((error) => {
      return res.status(500).json({ message: "error", error: error.message });
    });
};
const Get_donor_last_exception = (req, res) => {
  dbConnection
    .execute("SELECT * from donor_last_exception")
    .then((results) => {
      res.send(results[0]);
    })
    .catch((error) => {
      return res.status(200).json({ message: "error" });
    });
};
const Get_donor_blood_status = (req, res) => {
  dbConnection
    .execute("SELECT * from donor_blood_status")
    .then((results) => {
      res.send(results[0]);
    })
    .catch((error) => {
      return res.status(200).json({ message: "error" });
    });
};
const Add_donor = async (req, res) => {
  const {
    blood_rh,
    staff,
    cid,
    donor_no,
    bloodgroup,
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
    addrpart_new,
    soipart_new,
    moopart_new,
    roadpart_new,
    chwpart_new,
    tmbpart_new,
    amppart_new,
    postcode_new,
    image,
    address_more,
    pid_donor,
  } = req.body;

  let chk_pid_donor;
  if (pid_donor != null) {
    console.log("resultsPID IF");

    chk_pid_donor = `SELECT pid,donor_no from donor where pid = '${pid_donor}';`;
  } else {
    console.log("resultsPID ELSE");

    chk_pid_donor = `SELECT pid,donor_no from donor where cid = '${cid}';`;
  }
  const results = await dbConnection.execute(chk_pid_donor);

  try {
    let strAdd_history_donor;
    if (results[0].length > 0) {
      console.log("Update");
      //Update
      strAdd_history_donor = `update  donor  set cid = '${cid}'
         , donor_no = '${donor_no || ""}'
         , bloodgroup = '${bloodgroup}'
         , bloodgroup_rh = '${blood_rh}'
         , pname = '${pname}'
         , fname =' ${fname}'
         , lname =' ${lname}'
         , pname_en = '${pname_en || ""}' 
         , fname_en = '${fname_en || ""}' 
         , lname_en = '${lname_en || ""}' 
         , sex = if('${sex}'='หญิง','2',if('${sex}' = 'ชาย','1','${sex}'))
         , marrystatus = '${marrystatus}'
         , job ='${job}'
         , phone ='${donor_phone || ""}'
         ,  email ='${donor_email || ""}'
         , birthday ='${birthday}' 
         , addrpart=  '${addrpart}'
         , soipart ='${soipart}'
         , moopart ='${moopart}'
         , roadpart ='${roadpart}'
         , chwpart ='${chwpart}'
         , tmbpart ='${tmbpart}'
         , amppart = '${amppart}'
         , postcode = '${postcode}'
          ,addrpart_new ='${addrpart_new}'
          ,soipart_new ='${soipart_new}'
          ,moopart_new ='${moopart_new}' 
          ,roadpart_new ='${roadpart_new}' 
          ,chwpart_new ='${chwpart_new}'
          ,tmbpart_new ='${tmbpart_new}' 
          ,amppart_new ='${amppart_new}'
          ,postcode_new ='${postcode_new}'
          ,image =  '${image}'
          ,address_more =  '${address_more || ""}'
          where pid =  '${results[0][0].pid}';`;
      //console.log("update donor",strAdd_history_donor);
    } else {
      console.log("INSERT");
      const newPid = `SELECT (d.pid+1) as pid from donor as d order by d.pid DESC  limit 1`;
      const resultNewPid = await dbConnection.execute(newPid);

      strAdd_history_donor = `INSERT INTO donor 
    (
      pid,cid, donor_no, bloodgroup, bloodgroup_rh, pname, fname, lname, pname_en, fname_en, lname_en, sex, marrystatus, job, phone,  email, birthday, addrpart, soipart, moopart, roadpart, chwpart, tmbpart, amppart, 
      postcode , addrpart_new,soipart_new,moopart_new,roadpart_new,chwpart_new,tmbpart_new,amppart_new,postcode_new,image,address_more) 
    VALUES  
    (
    '${resultNewPid[0][0].pid}',
    '${cid}' ,
    '${donor_no || ""}',
    '${bloodgroup}' , 
    '${blood_rh}' , 
    '${pname}' , 
    '${fname}' , 
    '${lname}' , 
    '${pname_en || ""}' ,
    '${fname_en || ""}' , 
    '${lname_en || ""}' , 
    if('${sex}'='หญิง','2',if('${sex}' = 'ชาย','1','${sex}')) , 
    '${marrystatus}' , 
    '${job}' , 
    '${donor_phone || ""}' ,
    '${donor_email || ""}' , 
    '${birthday}' ,
    '${addrpart}' ,
    '${soipart || ""}' ,
    '${moopart || ""}' , 
    '${roadpart || ""}' , 
    '${chwpart}' , 
    '${tmbpart}' , 
    '${amppart}' ,
    '${postcode}',
    '${addrpart_new}' ,
    '${soipart_new || ""}' ,
    '${moopart_new || ""}' , 
    '${roadpart_new || ""}' , 
    '${chwpart_new}' , 
    '${tmbpart_new}' , 
    '${amppart_new}' ,
    '${postcode_new}',
    '${image}',
    '${address_more || ""}'
    );`;
    }

    const resultDonor = await dbConnection.execute(strAdd_history_donor);

    console.log("strAdd_history_donor ", strAdd_history_donor);
    //Insert Donor guest
    const check2 = `SELECT (dn+1) as dn from donor_blood order by dn DESC limit 1;`;
    const resultscheck2 = await dbConnection.execute(check2);

    const strAdd_G_donor = `INSERT INTO donor_guest
    (
      pid_donor, cid, bloodgroup, blood_rh, pname, fname, lname, pname_en, fname_en, lname_en, sex, marrystatus, job, phone,  email, birthday, addrpart, 
      soipart, moopart, roadpart, chwpart, tmbpart, amppart, postcode ,image,insert_date,status, dn,staff_register
    ) 
    VALUES  
    (
     (SELECT pid from donor where (cid = '${cid}' or donor_no = '${donor_no}') order by pid desc limit 1), 
    '${cid}' , 
    '${bloodgroup}' , 
    '${blood_rh}' , 
    '${pname}' , 
    '${fname}' , 
    '${lname}' , 
    '${pname_en || ""}' ,
    '${fname_en || ""}' , 
    '${lname_en || ""}' , 
    '${sex}' , 
    '${marrystatus}' , 
    '${job}' , 
    '${donor_phone || ""}' ,
    '${donor_email || ""}' , 
    '${birthday}' ,
    '${addrpart}' ,
    '${soipart || ""}' ,
    '${moopart || ""}' , 
    '${roadpart || ""}' , 
    '${chwpart}' , 
    '${tmbpart}' , 
    '${amppart}' ,
    '${postcode}',
    '${image}',
    now(),
    '2',
    '${resultscheck2[0][0].dn}',
    '${staff}'
      )`;
    console.log("strAdd_G_donor", strAdd_G_donor);
    const check3 = `SELECT pid from donor where (cid = '${cid}' or donor_no = '${donor_no}') order by pid desc limit 1;`;
    const resultscheck3 = await dbConnection.execute(check3);

    const insert_donor_blood = `insert into donor_blood (dn,cid, donor_no,pid, donor_date, status, staff_register,dorngro,dornrh) values ((SELECT (dd.dn+1) as dn from donor_blood as dd order by dd.dn DESC  limit 1),'${cid}', '${
      donor_no || ""
    }','${
      resultscheck3[0][0].pid
    }' ,now(), '2', '${staff}','${bloodgroup}','${blood_rh}');`;
    console.log("insert_donor_blood", insert_donor_blood);

    const results2 = await Promise.all([
      dbConnection.execute(strAdd_G_donor),
      dbConnection.execute(insert_donor_blood),
    ]);

    return res.status(200).json({ message: "success" });
  } catch (error) {
    return res.status(500).json({ message: "error", message: error.message });
  }
};
const Add_donor_blood = async (req, res) => {
  const {
    donation_datail_hn,
    donation_datail_fname,
    donation_datail_lname,
    donation_datail_note,
    dn,
    pid,
    pid_donor,
    blood_depth,
    blood_pressure_h,
    blood_pressure_l,
    donor_type,
    donation_datail,

    donor_hight,
    donor_weight,
    hb,
    hb_normal,
    heart,
    last_blood,
    last_exception,
    last_exception_note,
    place,
    pulse,
    pulse_value,
    staff_drill,
    staff_keep,
    staff_make,
    staff_register,
    unit_no,
    defer,
    medic,
    under_volume,
    high_volume,
    discard,
    donor_note,
    donor_no,
  } = req.body;
  console.log("Add_donor_blood---->", req.body);

  let strAdd_donor_blood;
  let update_donor_guest;
  const check_frmedit = `SELECT dn from donor_blood where dn = '${dn}';`;
  try {
    const results = await dbConnection.execute(check_frmedit);
    if (results.length > 0) {
      const get_donor_count = `SELECT ifnull((db.donor_count + 1),'1') as count  FROM donor_blood as db WHERE db.donor_no = '${donor_no}' ORDER BY db.donor_count DESC LIMIT 1`;
      const results_donor_count = await dbConnection.execute(get_donor_count);
      console.log(get_donor_count);
      console.log(results_donor_count[0][0].count);
      strAdd_donor_blood = `UPDATE donor_blood SET blood_depth ='${blood_depth}'
    ,blood_pressure_h ='${blood_pressure_h}'
    ,blood_pressure_l ='${blood_pressure_l}'
    ,donor_type ='${donor_type}'
    ,blood_type ='3'
    ,donation_datail ='${donation_datail}'
    ,donation_datail_note ='${donation_datail_note || ""}'
    ,donation_hn ='${donation_datail_hn || ""}'
    ,donation_fname ='${donation_datail_fname || ""}'
    ,donation_lname ='${donation_datail_lname || ""}'
    ,donor_date = now()
    ,donor_count = ${results_donor_count[0][0].count}
    ,donor_hight ='${donor_hight}'
    ,donor_weight ='${donor_weight}'
    ,hb ='${hb}'
    ,hb_normal ='${hb_normal}'
    ,heart ='${heart}'
    ,last_blood ='${last_blood}'
    ,last_exception ='${last_exception}'
    ,last_exception_note ='${last_exception_note || ""}'
    ,place ='${place}'
    ,service_id ='${place}'
    ,pulse ='${pulse}'
    ,pulse_value ='${pulse_value}'
    ,separate_status ='0'
    ,staff_drill ='${staff_drill}'
    ,staff_keep ='${staff_keep}'
    ,staff_make ='${staff_make}'
    ,staff_register ='${staff_register}'
    ,unit_no ='${unit_no}'
    ,defer ='${defer || ""}'
    ,medic ='${medic}'
    ,under_volume ='${under_volume}'
    ,high_volume ='${high_volume}'
    ,discard ='${discard}'
    ,donor_note ='${donor_note || ""}'
    WHERE dn = '${dn}' ;`;
    }
    console.log("ทดสอบการส่งข้อมูล frmblood", strAdd_donor_blood);

    if (results.length > 0) {
      update_donor_guest = `update donor_guest set status = '3' where (pid = '${pid}' and status = '2');`;
    }
    console.log("update_donor_guest", update_donor_guest);
    const results2 = await Promise.all([
      dbConnection.execute(update_donor_guest),
      dbConnection.execute(strAdd_donor_blood),
    ]);
    return res.status(200).json({ message: "success" });
  } catch (error) {
    return res.status(500).json({ message: "error", message: error.message });
  }
};
const Update_staff_check = async (req, res) => {
  const { staff_check, pid, pid_donor } = req.body;
  console.log("Update_staff_check---->", req.body);
  const check_frmedit = `SELECT pid from donor_blood where pid = '${pid}';`;
  const results = await dbConnection.execute(check_frmedit);
  let strAdd_donor_blood;
  let update_donor_guest;
  try {
    if (results.length > 0) {
      strAdd_donor_blood = `UPDATE donor_blood SET staff_check ='${staff_check}' , status = '0' WHERE pid = '${pid_donor}';`;
    }
    if (results.length > 0) {
      update_donor_guest = `update donor_guest set status = '4' where pid = '${pid}' and status = '3';`;
    }
    // console.log("update_donor_guest",update_donor_guest);
    const results2 = await Promise.all([
      dbConnection.execute(update_donor_guest),
      dbConnection.execute(strAdd_donor_blood),
    ]);
    return res.status(200).json({ message: "success" });
  } catch (error) {
    return res.status(500).json({ message: "error", message: error.message });
  }
};
const Get_data_blood = (req, res) => {
  const { pid, pid_donor } = req.query;
  const query = `Select m.MOBNAME, b.* from donor_blood as b 
  left join donor_mobile as m ON b.service_id = m.MOBCODE 
  where pid = '${pid_donor}' `;
  console.log("Get_data_blood", query);
  dbConnection
    .execute(query)
    .then((results) => {
      res.send(results[0]);
    })
    .catch((error) => {
      return res.status(200).json({ message: "error", message: error.message });
    });
};
const Chk_unit_no = (req, res) => {
  const { unit_no, dn } = req.body;

  dbConnection
    .execute(
      `Select unit_no  from donor_blood WHERE unit_no = '${unit_no}' and dn <> '${dn}';`
    )
    .then((results) => {
      res.send(results[0]);
    })
    .catch((error) => {
      return res.status(200).json({ message: "error" });
    });
};
const Get_Rh_Name = (req, res) => {
  dbConnection
    .execute(`select rh_shot_name from blood_rh order by rh_id asc`)
    .then((results) => {
      res.send(results);
    })

    .catch((error) => {
      return res.status(200).json({ message: "error" });
    });
};
const Get_donor_count = (req, res) => {
  const { donor_no } = req.query;
  dbConnection
    .execute(
      `SELECT donor_count   FROM donor_blood  WHERE donor_no = '${donor_no}' ORDER BY donor_count DESC LIMIT 1`
    )
    .then((results) => {
      res.send(results);
    })
    .catch((error) => {
      return res.status(200).json({ message: "error", message: error.message });
    });
};
const Add_fileTxt = async (req, res) => {
  try {
    // เช็ค unit_no ว่ามีไหม ที่ donor_blood ถ้ามีให้อัพเดท count,place,group,rh,saline,papian,coomb,antia,antib,tpha,hbsag,hiv,hbvnat,hcvnat,hivnat,alt,hcv,hivag
    // status , check_plamas , check_result ,staff_name,date(now)

    const { staff_name } = req.body;
    const {
      status,
      results,
      chk_plasma,
      donor_no,
      pname,
      fname,
      lname,
      sex,
      birth_day,
      address01,
      address02,
      address03,
      post_code,
      phone,
      cid,
      email,
      unit_no,
      count,
      place,
      exp,
      group,
      rh,
      saline,
      papian,
      coomb,
      antia,
      antib,
      tpha,
      hbsag,
      hiv,
      hbvnat,
      hcvnat,
      hivnat,
      alt,
      hcv,
      hivag,
      repeat,
    } = req.body.item;
    let action;
    let unit_no_;
    let donor_no_;
    let insert_donor_guest;
    let donor_pid;
    let blood_dn;
    let new_bd;

    if (birth_day.length > 5) {
      try {
        let bd_year = birth_day.slice(0, 2).trim();
        const bd_mont = birth_day.slice(2, 4).trim();
        const bd_day = birth_day.slice(4, 6).trim();

        bd_year = "25" + bd_year;
        bd_year = bd_year - 543;
        new_bd = bd_year + "-" + bd_mont + "-" + bd_day;
      } catch (error) {
        new_bd = "0000-01-01";
      }
    }
    if (repeat != "1") {
      ///////////////////////////  Donor /////////////////////////////
      console.log("เข้า donor มี repeat = 1");
      const check_donor_no = ` select pid from donor where donor_no = '${donor_no}' limit 1 ;`;
      const check_donor = await dbConnection.execute(check_donor_no);
      if (check_donor[0][0]) {
        //update
        // donor ถ้ามี donor_no อัพเดท ชื่อ นามสกุล เบอร์โทร  กรุ๊ป rh addressmore email
        donor_pid = check_donor[0][0].pid;
        donor_no_ = `UPDATE donor SET pname = '${pname}', fname = '${fname}',lname = '${lname}',phone = '${phone}',bloodgroup = '${group}',bloodgroup_rh = '${rh}',
        address_more = '${address01}${address02}${address03}${post_code}',email = '${email}' WHERE pid = '${donor_pid}';`;
        // console.log("เข้า donor มี donor", donor_no_);
      } else {
        console.log("เข้า donor ไม่มี donor");
        //insert
        const get_new_pid = `select (pid+1) as pid from donor order by pid desc limit 1 `;
        const new_pid = await dbConnection.execute(get_new_pid);
        donor_pid = new_pid[0][0].pid;
        donor_no_ = `INSERT INTO donor (pid,cid,donor_no,pname,fname,lname,sex,birthday,address_more,bloodgroup,bloodgroup_rh,phone,email) 
        VALUE  ('${donor_pid}','${cid}','${donor_no}','${pname}','${fname}','${lname}','${sex}','${new_bd}','${address01}' '${address02}' '${address03}'
        '${post_code}','${group}','${rh}','${phone}','${email}');`;
        // console.log("เข้า donor ไม่มี donor", donor_no_);
      }
      //console.log(donor_no_);
      const execute_donor = await dbConnection.execute(donor_no_);
      /////////////// Donor blood  //////////////////////////
      const check_unit_no = ` select dn from donor_blood where unit_no = '${unit_no}' limit 1 ;`;
      const check_unit = await dbConnection.execute(check_unit_no);
      let new_exp = "-" + exp.slice(0, 2) + "-" + exp.slice(2, 4);
      // ------------------------------------ //
      if (check_unit[0][0]) {
        console.log("เข้า donor_blood มี unit no");
        blood_dn = check_unit[0][0].dn;
        action = "success";
        unit_no_ = `UPDATE donor_blood SET
        donor_count = '${count}',
        place = '${place}',dorngro = '${group}',dornrh = '${rh}',Saline = '${saline}',Papain = '${papian}',Coombs = '${coomb}',antia = '${antia}',antib = '${antib}',TPHA = '${tpha}',hbsag = '${hbsag}',
        hiv = '${hiv}',HBVNAT = '${hbvnat}',HCVNAT = '${hcvnat}',HIVNAT = '${hivnat}',alt ='${alt}',hcv = '${hcv}',hivag = '${hivag}',status = '${status}',check_plasma = '${chk_plasma}',result = '${results}' ,
        staff_result = '${staff_name}',blood_expi =  concat(DATE_FORMAT(now(), "%Y"),'${new_exp}'),date_result = now(), separate_status = '0' where unit_no = '${unit_no}'`;
        console.log("เข้า donor_blood มี unit no", unit_no_);
      } else {
        action = "success insert";
        const check_dn = ` SELECT (d.dn+1) as dn from donor_blood as d order by d.dn DESC  limit 1;`;
        const new_dn = await dbConnection.execute(check_dn);
        blood_dn = new_dn[0][0].dn;
        // console.log("-------*-------", new_dn[0][0].dn);
        console.log("-------*-------2", blood_dn);

        unit_no_ = `INSERT INTO donor_blood (dn,donor_no,cid,unit_no,donor_date,donor_count,place,dorngro,dornrh,Saline,Papain,Coombs,antia,antib,TPHA,hbsag,hiv
         ,HBVNAT,HCVNAT,HIVNAT,alt,hcv,hivag,status,result,check_plasma,staff_result,blood_expi,separate_status)
          VALUE ('${blood_dn}','${donor_no}','${cid}','${unit_no}',now(),'${
          count || ""
        }',
        '${place}','${group}','${rh}','${saline}','${papian}','${coomb}','${antia}','${antib}','${tpha}','${hbsag}','${hiv}',
        '${hbvnat}','${hcvnat}','${hivnat}','${alt}','${hcv}','${hivag}','${status}','${results}','${chk_plasma}','${staff_name}',concat(DATE_FORMAT(now(), "%Y"),'${new_exp}'),'0');`;

        console.log(unit_no_);
        // console.log("เข้า donor_blood ไม่มี unit no", unit_no_);
      }
      const execute_donor_blood = await dbConnection.execute(unit_no_);

      ///////////////////////////   Donor Guest   ////////////////////////////
      const check_donor_guest = `select pid from donor_guest where pid_donor = '${donor_pid}' and dn ='${blood_dn}' order by pid desc limit 1;`;
      const check_guest_pid = await dbConnection.execute(check_donor_guest);

      if (check_guest_pid[0][0]) {
        //ถ้ามี ไม่ทำอะไร
        console.log("เข้า donor_guset มี pid_donor");
      } else {
        console.log("เข้า donor_guset ไม่มี pid_donor");

        //insert Donor_guest
        insert_donor_guest = `INSERT INTO donor_guest (cid,pname,fname,lname,sex,birthday,phone,email,postcode,bloodgroup,insert_date,status,dn,staff_register,blood_rh,pid_donor,address_more)
        VALUE ('${cid}',
        '${pname}',
        '${fname}',
        '${lname}',
        '${sex}',
        '${new_bd}',
        '${phone}',
        '${email}',
        '${post_code}',
        '${group}',
        now(),
        '4',
        '${blood_dn}',
        '${staff_name}',
        '${rh}',
        '${donor_pid}',
        '${address01} ${address02} ${address03} ${post_code}');`;
        console.log("เข้า donor_guset ไม่มี pid_donor", insert_donor_guest);
      }
      const execute_donor_guest = await dbConnection.execute(
        insert_donor_guest
      );
    }
    return res.status(200).json({ message: "success", action: action });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const check_repeat = async (req, res) => {
  const { unit_no } = req.query;
  // console.log(unit_no);
  const check_repeat = `select dn from donor_blood where unit_no ='${unit_no}' and (result <> null or trim(result) <>'');`;
  let repeat = 0;
  const check_unit_ = await dbConnection.execute(check_repeat);
  // console.log(check_unit_[0]);
  try {
    if (check_unit_[0].length > 0) {
      repeat++;
      // console.log("repeat", repeat);
      return res.status(200).json({ message: "success", repeat: repeat });
    } else {
      // console.log("repeat--", repeat);
      return res.status(200).json({ message: "success", repeat: repeat });
    }
  } catch (error) {
    return res.status(500).json({ message: "error" });
  }
};

const questionnaire_list = (req, res) => {
  dbConnection
    .execute(`select * from donor_questionnaire_list where quest_status = 1`)
    .then((results) => {
      res.send(results[0]);
    })
    .catch((error) => {
      return res.status(200).json({ message: "error" });
    });
};

const Add_questionnaire = async (req, res) => {
  console.log("Add_questionnaire", req.body);

  const isEmpty = Object.keys(req.body).length;
  console.log(Object.keys(req.body).length);

  const check = `select * from donor_questionnaire where dn = '${req.body[0].dn}'`;
  const resultsCheck = await dbConnection.execute(check);

  try {
    if (resultsCheck.length > 0) {
      const deleteDn = `delete FROM donor_questionnaire where dn = '${req.body[0].dn}'`;
      const resultsDeleteDn = await dbConnection.execute(deleteDn);
    }
    for (let i = 0; i < isEmpty; i++) {
      const query = `INSERT INTO donor_questionnaire (dn,quest_id,qn_value,qn_more,qn_save_datetime,qn_save_staff) VALUE (
      '${req.body[i].dn}',
      '${req.body[i].id}',
      '${req.body[i].ans}',
      '${req.body[i].more || ""}',
      now(),
      '${req.body[i].staff}'
    )`;
      console.log("query", query);
      const resultsQuery = await dbConnection.execute(query);
    }
    return res.status(200).json({ message: "success" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  // console.log("q0",ans.length);
};

const fetch_questionnaire = (req, res) => {
  const { dn } = req.query;

  dbConnection
    .execute(
      `SELECT l.*, q.qn_value, q.qn_more, q.qn_save_staff, q.qn_save_datetime
    ,DATE_FORMAT(DATE_ADD(q.qn_save_datetime, INTERVAL 543 YEAR ),'%d/%m/%Y %H:%i:%s') as save_datetime
    from donor_questionnaire_list as l 
    left join donor_questionnaire as q on (l.quest_id = q.quest_id and q.dn = '${dn}')
    WHERE l.quest_status = 1 `
    )
    .then((results) => {
      res.send(results[0]);
    })
    .catch((error) => {
      return res.status(200).json({ message: "error" });
    });
};
const check_donor_not_done = (req, res) => {
  const query = `SELECT * FROM donor_guest WHERE status not in(4,5) and DATE_FORMAT(insert_date,"%d-%m-%y") = DATE_FORMAT(now(),"%d-%m-%y")`;

  dbConnection
    .execute(query)
    .then((results) => {
      res.send(results[0]);
    })
    .catch((error) => {
      return res.status(200).json({ message: "error" });
    });
};
module.exports = {
  check_repeat,
  Add_fileTxt,
  Add_donor,
  Add_guest_donor,
  Add_donor_frmedit,
  Add_donor_blood,
  Add_mobile,
  Eject_register,
  Chk_unit_no,
  Get_donor_count,
  Get_Rh_Name,
  Get_group,
  Get_mary,
  Get_occu,
  Get_sex,
  Get_Zip,
  Get_Tumbon,
  Get_Aumpure,
  Get_Province,
  Get_Zip_new,
  Get_Tumbon_new,
  Get_Aumpure_new,
  Get_Province_new,
  Get_donor_list,
  Get_staff,
  Get_history_donor,
  Get_question,
  Get_donor_list_open,
  Get_data_donetion,
  Get_Donor_Blood,
  Get_His_Donation_blood,
  Get_bagtype,
  Get_Mobile,
  Get_Mobile_frist,
  Get_donor_last_blood,
  Get_donor_donation_detail,
  Get_donor_last_exception,
  Get_donor_blood_status,
  Get_data_blood,
  Get_Search_donor_view,
  Get_History_regis,
  Search_donor_list,
  Search_moblie,
  Search_donor,
  Update_mobile,
  Update_staff_check,
  pname_en_th,
  Search_donor_detail,
  questionnaire_list,
  Add_questionnaire,
  fetch_questionnaire,
  check_donor_not_done,
};
