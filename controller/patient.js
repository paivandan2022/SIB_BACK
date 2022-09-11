const dbConnection = require("../database");

const hn_user = (req, res) => {
  const { hn } = req.query;
  // console.log("b",req.body);
  // console.log("q",req.query);

  // console.log("hn", hn);

  const query_hn = `SELECT
  h.hos_long_name_th,
  p.hn,
  p.pname,
  p.fname,
  p.lname,
    date_format(p.birthday, '%Y-%m-%d') AS bd_eng,
    date_format(DATE_ADD(p.birthday, INTERVAL 543 YEAR), '%Y-%m-%d')
       AS bd_th,
       p.sex,
       p.bloodgrp,
       p.bloodrh,
       p.subgroup_abo,
    concat(CONVERT(DATE_FORMAT(FROM_DAYS(DATEDIFF(NOW(), p.birthday)), '%Y') + 0, char), ' ปี ',CONVERT(DATE_FORMAT(FROM_DAYS(DATEDIFF(NOW(), p.birthday)), '%m') - 1, char), ' เดือน ', CONVERT(DATE_FORMAT(FROM_DAYS(DATEDIFF(NOW(), p.birthday)), '%d') - 1, char), ' วัน ') as age
  FROM patient as p
  left join bb_hospitals as h
  on p.hos_id = h.hos_id
  WHERE hn = '${hn}' `;

  // console.log("query_hn", query_hn);
  dbConnection
    .execute(query_hn)
    .then((results) => {
      res.send(results[0]);
    })
    .catch((error) => {
      return res.status(200).json({ message: "error" });
    });
};

const hn_user_req = (req, res) => {
  const { hn } = req.query;
  const query_hn = `SELECT *,
  DATE_FORMAT(DATE_ADD(abs_date_time, INTERVAL 543 YEAR), '%d/%m/%Y %H:%i:%s') as abs_date_time_format ,
  DATE_FORMAT(DATE_ADD(autologous_datetime, INTERVAL 543 YEAR), '%d/%m/%Y %H:%i:%s') as autologous_datetime_format ,
  DATE_FORMAT(DATE_ADD(dat_datetime, INTERVAL 543 YEAR), '%d/%m/%Y %H:%i:%s') as dat_datetime_format 
  FROM patient_request WHERE hn = '${hn}' and request_status <> 1 `;

  dbConnection
    .execute(query_hn)
    .then((results) => {
      res.send(results[0]);
      //console.log("setPatientGroup", results[0]);
    })
    .catch((error) => {
      return res.status(200).json({ message: "error" });
    });
};

const hn_grouping = (req, res) => {
  const { hn } = req.query;
  const query_hn = `SELECT hn,order_number,anti_a,anti_b,anti_ab,anti_d,anti_a1,anti_h,cell_a,cell_b,cell_o,cell_ctrl,
  blood_gr,blood_sub_gr,rhd_rt,rhd_37c,rhd_iat,blood_rh,request_note,grouping_datetime
  ,grouping_staff
  ,grouping_datetime
  ,concat (DATE_FORMAT(DATE_ADD(grouping_datetime, INTERVAL 543 YEAR ),'%d/%m/%Y')," ",DATE_FORMAT(DATE_ADD(grouping_datetime, INTERVAL 543 YEAR ),'%H:%i:%s')) as date_pg
  FROM patient_request 
  WHERE hn = '${hn}' 
  and request_status <> 1 
  and grouping_datetime IS NOT NULL
  order by order_number desc
  `;
  //console.log("setPatientGroup", query_hn);
  dbConnection
    .execute(query_hn)
    .then((results) => {
      res.send(results[0]);
      // console.log("setPatientGroup", results);
    })
    .catch((error) => {
      return res.status(200).json({ message: "error" });
    });
};

const hn_antibody = (req, res) => {
  const { hn } = req.query;
  const query_hn = `SELECT hn,order_number,abs_o1_rt,abs_o1_37c,abs_o1_iat,abs_o2_rt,abs_o2_37c,abs_o2_iat,abs_result,
  DATE_FORMAT(DATE_ADD(abs_date_time, INTERVAL 543 YEAR), '%d/%m/%Y %H:%i:%s') as abs_date_time_format 
  FROM patient_request 
  WHERE hn = '${hn}' 
  and request_status <> 1 
  and abs_result IS NOT NULL
  `;
  // console.log("hn_antibody", query_hn);

  dbConnection
    .execute(query_hn)
    .then((results) => {
      res.send(results[0]);
      //console.log("setPatientGroup", results[0]);
    })
    .catch((error) => {
      return res.status(200).json({ message: "error" });
    });
};

const hn_dat = (req, res) => {
  const { hn } = req.query;
  const query_hn = `SELECT hn,order_number,dat_rt,dat_37c,dat_iat,dat_result,dat_staff,autologous_rt,autologous_37c,
  autologous_iat,autologous_result,autologous_staff,
  DATE_FORMAT(DATE_ADD(autologous_datetime, INTERVAL 543 YEAR), '%d/%m/%Y %H:%i:%s') as autologous_datetime_format ,
  DATE_FORMAT(DATE_ADD(dat_datetime, INTERVAL 543 YEAR), '%d/%m/%Y %H:%i:%s') as dat_datetime_format 
  FROM patient_request 
  WHERE hn = '${hn}' 
  and request_status <> 1 
  and (autologous_result IS NOT NULL or dat_result IS NOT NULL)
  `;
  // console.log("hn_dat", query_hn);

  dbConnection
    .execute(query_hn)
    .then((results) => {
      res.send(results[0]);
      //console.log("setPatientGroup", results[0]);
    })
    .catch((error) => {
      return res.status(200).json({ message: "error" });
    });
};

const hn_user_search = (req, res) => {
  const { keyword } = req.query;
  //console.log(keyword);
  const query_hn = `SELECT     hn,
  pname,
  fname,
  lname,
  date_format(birthday, '%Y-%m-%d') AS bd_eng,
  date_format(DATE_ADD(birthday, INTERVAL 543 YEAR), '%Y-%m-%d')
     AS bd_th,
  sex,
  bloodgrp,
  bloodrh,
  subgroup_abo,
  concat(CONVERT(DATE_FORMAT(FROM_DAYS(DATEDIFF(NOW(), birthday)), '%Y') + 0, char), ' ปี ',CONVERT(DATE_FORMAT(FROM_DAYS(DATEDIFF(NOW(), birthday)), '%m') - 1, char), ' เดือน ', CONVERT(DATE_FORMAT(FROM_DAYS(DATEDIFF(NOW(), birthday)), '%d') - 1, char), ' วัน ') as age
  FROM patient
  where ( hn like '%${keyword}%' or concat(fname,' ' ,lname) like '%${keyword}%' )
  `;

  dbConnection
    .execute(query_hn)
    .then((results) => {
      res.send(results[0]);
    })
    .catch((error) => {
      return res.status(200).json({ message: "error" });
    });
};

const hospitals = (req, res) => {
  dbConnection
    .execute("SELECT * FROM bb_hospitals ")
    .then((results) => {
      res.send(results);
    })
    .catch((error) => {
      return res.status(200).json({ message: "error" });
    });
};

const doctor = (req, res) => {
  dbConnection
    .execute(
      "SELECT * FROM bb_doctor WHERE active = 'Y' AND name like '%พญ.%' or name like '%นพ.%' AND active = 'Y'"
    )
    .then((results) => {
      res.send(results);
    })
    .catch((error) => {
      return res.status(200).json({ message: "error" });
    });
};

const blood_draw = (req, res) => {
  dbConnection
    .execute(
      "SELECT * FROM bb_doctor WHERE active = 'Y' AND name like '%นาย%' or name like '%นาง%' or name like '%น.ส.%' AND active = 'Y'"
    )
    .then((results) => {
      res.send(results);
    })
    .catch((error) => {
      return res.status(200).json({ message: "error" });
    });
};

const department = (req, res) => {
  dbConnection
    .execute("SELECT * FROM bb_kskdepartment")
    .then((results) => {
      res.send(results);
    })
    .catch((error) => {
      return res.status(200).json({ message: "error" });
    });
};

const ward = (req, res) => {
  dbConnection
    .execute("SELECT * FROM bb_ward")
    .then((results) => {
      res.send(results);
    })
    .catch((error) => {
      return res.status(200).json({ message: "error" });
    });
};

const diag = (req, res) => {
  dbConnection
    .execute("SELECT * FROM patient_diag")
    .then((results) => {
      res.send(results);
    })
    .catch((error) => {
      return res.status(200).json({ message: "error" });
    });
};

const need_priority = (req, res) => {
  dbConnection
    .execute("SELECT * FROM patient_priority")
    .then((results) => {
      res.send(results);
    })
    .catch((error) => {
      return res.status(200).json({ message: "error" });
    });
};

const need_fast = (req, res) => {
  dbConnection
    .execute("SELECT * FROM patient_priority_emergency")
    .then((results) => {
      res.send(results);
    })
    .catch((error) => {
      return res.status(200).json({ message: "error" });
    });
};

const blood_type = (req, res) => {
  const { type_id } = req.query;
  //console.log("type_id:", type_id);
  // const filterTypeID = type_id.map((item) => item != undefined )
  // console.log("filterTypeID:", filterTypeID);

  let strQuery;

  if (type_id === "" || type_id === undefined || type_id === null) {
    strQuery =
      "select id, s_name from blood_type where active = 1 order by component_type asc , display asc";
  } else {
    strQuery =
      "select id, s_name from blood_type where active = 1 and id not in (" +
      type_id +
      ") order by component_type asc , display asc";
  }

  // console.log("strQuery====", strQuery);
  dbConnection
    .execute(strQuery)
    .then((results) => {
      res.send(results[0]);
    })
    .catch((error) => {
      return res.status(200).json({ message: "error" });
    });
};

const count_hid = (req, res) => {
  dbConnection
    .execute(
      "select (hos_id+1) as hos_id from bb_hospitals order by hos_id desc limit 1"
    )
    .then((results) => {
      res.send(results[0]);
    })
    .catch((error) => {
      return res.status(200).json({ message: "error" });
    });
};

const addHospital = (req, res) => {
  const {
    hos_id,
    hos_long_name_th,
    hos_shot_name_th,
    hos_shot_name_en,
    hos_long_name_en,
    hos_display,
    hos_active,
  } = req.body;

  const queryAddHos = `insert into bb_hospitals (
    hos_id
   ,hos_long_name_th
   ,hos_shot_name_th
   ,hos_long_name_en
   ,hos_shot_name_en
   ,hos_display
   ,hos_active
 ) VALUES (
   '${hos_id}'
   ,'${hos_long_name_th}'  
   ,'${hos_shot_name_th}'  
   ,'${hos_long_name_en}'  
   ,'${hos_shot_name_en}'  
   ,${hos_display}   
   ,${hos_active}
    )`;
  //console.log("queryAddHos",queryAddHos);
  dbConnection
    .execute(queryAddHos)
    .then((results) => {
      res.send(results[0]);
    })
    .catch((error) => {
      return res.status(200).json({ message: "error" });
    });
};

const uqHospital = (req, res) => {
  const queryUpdateHos = `update bb_hospitals SET
 hos_long_name_th = '${req.body.hos_long_name_th}' 
 ,hos_shot_name_th = '${req.body.hos_shot_name_th}' 
 ,hos_long_name_en = '${req.body.hos_long_name_en}' 
 ,hos_shot_name_en = '${req.body.hos_shot_name_en}' 
 ,hos_display = '${req.body.hos_display}'
 ,hos_active = '${req.body.hos_active}'
WHERE hos_id = '${req.body.hos_id}' `;
  //console.log("queryAddHos",queryAddHos);
  dbConnection
    .execute(queryUpdateHos)
    .then((results) => {
      res.send(results[0]);
    })
    .catch((error) => {
      return res.status(200).json({ message: "error" });
    });
};

const DeleteHospital = (req, res) => {
  const { hos_id } = req.query;
  dbConnection
    .execute(`DELETE FROM bb_hospitals WHERE hos_id = ${hos_id};`)
    .then((results) => {
      res.send(results[0]);
    })
    .catch((error) => {
      return res.status(200).json({ message: "error" });
    });
};

const request_blood_his = (req, res) => {
  const { hn } = req.query;
  dbConnection
    .execute(
      `select 
    DATE_FORMAT(DATE_ADD(request_datetime, INTERVAL 543 YEAR), '%d/%m/%Y %H:%i:%s') as request_datetime_format 
    from patient_request where hn = '${hn}' order by request_datetime desc limit 1`
    )
    .then((results) => {
      res.send(results[0][0]);
    })
    .catch((error) => {
      return res.status(200).json({ message: "error" });
    });
};

const receive_blood_his = (req, res) => {
  const { hn } = req.query;
  dbConnection
    .execute(
      `select  
    DATE_FORMAT(DATE_ADD(c.trans_date_time, INTERVAL 543 YEAR), '%d/%m/%Y %H:%i:%s') as receive_datetime_format 
    from patient_request as req 
    left join patient_crossmatch as c 
    ON req.order_number = c.order_number
    where req.hn = '${hn}'
    and xm_status = 4 
    order by trans_date_time desc limit 1`
    )
    .then((results) => {
      res.send(results[0][0]);
    })
    .catch((error) => {
      return res.status(200).json({ message: "error" });
    });
};

const patient_note = (req, res) => {
  const { hn } = req.query;
  const query = `SELECT 
  DATE_FORMAT(DATE_ADD(note_datetime, INTERVAL 543 YEAR), '%d/%m/%Y %H:%i:%s') as note_datetime_format 
  ,note_detail 
  FROM patient_note WHERE hn = '${hn}' `;
  dbConnection
    .execute(query)
    .then((results) => {
      res.send(results[0]);
    })
    .catch((error) => {
      return res.status(500).json({ message: "error", message: error.message });
    });
  // console.log("2111",query);
};

const receive_blood_list = (req, res) => {
  const { hn } = req.query;
  dbConnection
    .execute(
      `select req.order_number
      , b.blood_no
      , concat(b.blood_group, b.blood_rh) as gr      
      , t.s_name as component
      , c.trans_staft
      , DATE_FORMAT(DATE_ADD(c.trans_date_time, INTERVAL 543 YEAR), '%d/%m/%Y %H:%i:%s') as trans_date_time_format 
      from patient_request as req 
      left join patient_crossmatch as c ON req.order_number = c.order_number
      left join blood as b ON c.bl_id = b.id
      left join blood_type as t ON b.blood_type = t.id
       WHERE req.hn = '${hn}' 
       and c.xm_status = 4
       order by c.trans_date_time desc 
       `
    )
    .then((results) => {
      res.send(results[0]);
    })
    .catch((error) => {
      return res.status(200).json({ message: "error" });
    });
};

const patient_react_list = (req, res) => {
  const { hn } = req.query;
  dbConnection
    .execute(
      `select  b.blood_no
      , b.blood_group
      , b.blood_rh
      , t.s_name as component
      , r.ac_save_staff
      , r.ac_action_detail
      , r.ac_action_datetime
      , DATE_FORMAT(DATE_ADD(r.ac_save_datetime, INTERVAL 543 YEAR), '%d/%m/%Y %H:%i:%s') as ac_save_datetime_format 
      , DATE_FORMAT(DATE_ADD(r.ac_action_datetime, INTERVAL 543 YEAR), '%d/%m/%Y %H:%i:%s') as ac_action_datetime_format 
      from patient_reaction as r
      left join patient_crossmatch as c ON r.xm_id = c.xm_id
      left join blood as b ON c.bl_id = b.id
      left join blood_type as t ON b.blood_type = t.id
      
      where r.ac_hn = '${hn}' 
      order by r.ac_save_datetime desc 
       `
    )
    .then((results) => {
      res.send(results);
    })
    .catch((error) => {
      return res.status(200).json({ message: "error" });
    });
};

const add_patient_request = async (req, res) => {
  console.log("b", req.body.dob);
  const {
    hn,
    hos_point,
    date_requet,
    time_request,
    date_use,
    time_use,
    bb_code,
    his_ln,
    his_an,
    his_vn,
    diag_1,
    diag_more,
    patient_type,
    doctor_code,
    dep_code,
    ward,
    punct_staff,
    date_punct,
    lab_hgb,
    lab_hct,
    lab_plt,
    priority_trans,
    priority_trans_emergency,
    note,
    request_staff,
    Blood_request,
    Blood_request_1,
    pname,
    fname,
    lname,
    dob,
    sex,
    abo_group,
    rhname,
  } = req.body;

  let Blood_req = Blood_request_1;

  //console.log("b", req.body);

  let doctor_name;
  if (doctor_code != "") {
    const check_doctor_name = `select name from bb_doctor where code = '${doctor_code}'`;
    const results_doctor_name = await dbConnection.execute(check_doctor_name);
    doctor_name = results_doctor_name[0][0].name;
  } else {
    doctor_name = "";
  }

  const check_number = `select * FROM patient_request_run_number `;
  const results = await dbConnection.execute(check_number);

  let year = results[0][0].order_number.slice(0, 2);
  const month = results[0][0].order_number.slice(2, 4);
  let number = results[0][0].order_number.slice(4, 8);

  let currentYear = new Date().getFullYear() + 543;
  currentYear = String(currentYear).slice(2, 4);
  let currentMonth = new Date().getMonth() + 1;
  if (currentMonth < 10) {
    currentMonth = "0" + currentMonth;
  }

  let order_number_new = "";
  try {
    //เช็ค run_number
    if (year == currentYear && month == currentMonth) {
      order_number_new = Number(results[0][0].order_number) + 1;
    } else {
      order_number_new = currentYear + currentMonth + "0001";
      // console.log("noooo");
    }

    let query_else = "";

    if (order_number_new != "") {
      //เเสดงว่าไม่ซ้ำ
      query_else = `INSERT INTO patient_request 
    (order_number,    
    hn,
    hos_point,
    request_datetime,
    use_datetime,
    bb_code,
    his_ln,
    his_an,
    his_vn,
    diag_1,
    diag_more,
    department,
    patient_type,
    doctor_code,
    doctor_name,
    dep_code,
    ward,
    punct_staff,
    punct_datetime,
    lab_hgb,
    lab_hct,
    lab_plt,
    priority_trans,
    priority_trans_emergency,
    note,
    request_staff,
    request_status ) 
VALUE (
  '${order_number_new}',
  '${hn}',
  '${hos_point}',
  concat('${date_requet}',' ','${time_request}'),
  concat('${date_use}',' ','${time_use}'),
  '${bb_code}',
  '${his_ln}',
  '${his_an}',
  '${his_vn}',
  '${diag_1}',
  '${diag_more}',
  '${patient_type}',
  '${patient_type}',
  '${doctor_code}',
  '${doctor_name}',
  '${dep_code}',
  '${ward}',
  '${punct_staff}',
  '${date_punct}',
  '${lab_hgb}',
  '${lab_hct}',
  '${lab_plt}',
  '${priority_trans}',
   ${priority_trans_emergency},
  '${note}',
  '${request_staff}',
  '1' 
  )`;
      const resultsAdd_data = await dbConnection.execute(query_else);

      //เช็ค hn ใน patient
      const check_hn = `select hn from patient where hn = '${hn}'`;
      const result_check_hn = await dbConnection.execute(check_hn);

      if (result_check_hn[0].length < 1) {
        console.log("ไม่มีข้อมูล");
        const add_data_hn = `insert into patient (hn, pname, fname, lname, birthday, sex, bloodgrp, bloodrh, hos_id) value 
      ('${hn}', '${pname}', '${fname}', '${lname}', '${dob}', '${sex}', '${abo_group}', '${rhname}', '${hos_point}')`;
        const result_add_data = await dbConnection.execute(add_data_hn);
      } else {
        console.log("มีข้อมูล");
      }

      let add_Blood_request;
      if (Blood_request_1 != "12345") {
        console.log(Blood_request_1);
        for (let i = 0; i < Blood_request_1.length; i++) {
          add_Blood_request = `INSERT INTO patient_request_blood (order_number,type_id,count_unit) VALUE ( '${order_number_new}','${Blood_request_1[i].type_name}','${Blood_request_1[i].count_unit}')`;
          console.log("add_Blood_request:", add_Blood_request);
          const results_Blood_request = await dbConnection.execute(
            add_Blood_request
          );
        }
      } else {
        console.log("elseee");
      }

      const query_order_number = `update patient_request_run_number set order_number = '${order_number_new}' , date_last = now() where id = 1`;
      const resultsUpdateNum = await dbConnection.execute(query_order_number);
    } else {
      //แสดงว่าซ้ำ จะไม่ update patient_request_run_number
      console.log("ซ้ำๆๆไม่ทำ");
    }

    return res.status(200).json({ message: "success" });
  } catch (error) {
    return res.status(500).json({ message: "error", message: error.message });
  }
};

const edit_patient_request = async (req, res) => {
  // console.log("b", req.body);
  // console.log("p", req.body.priority_trans);
  // console.log("emer", req.body.priority_trans_emergency);

  const {
    order_number,
    hn,
    hos_point,
    date_requet,
    time_request,
    date_use,
    time_use,
    bb_code,
    his_ln,
    his_an,
    his_vn,
    diag_1,
    diag_more,
    patient_type,
    doctor_code,
    dep_code,
    ward,
    punct_staff,
    date_punct,
    lab_hgb,
    lab_hct,
    lab_plt,
    priority_trans,
    priority_trans_emergency,
    note,
    request_staff,
    Blood_request,
    Blood_request_1,
    pname,
    fname,
    lname,
    dob,
    sex,
    abo_group,
    rhname,
  } = req.body;

  let doctor_name,
    doctor_code_frm,
    ward_frm,
    dep_frm,
    punct_staff_frm,
    priority_frm,
    hos_frm;

  //doctor code
  if (req.body.doctor_code) {
    if (req.body.doctor_code.length > 7) {
      const check_doctor = `select code from bb_doctor where name = '${doctor_code}'`;
      const results_doctor = await dbConnection.execute(check_doctor);
      doctor_code_frm = results_doctor[0][0].code;
    } else {
      doctor_code_frm = req.body.doctor_code;
    }
  } else {
    doctor_code_frm = req.body.doctor_code;
  }
  //hospital
  if (req.body.hos_point) {
    if (req.body.hos_point.length > 7) {
      const check_hos = `select hos_id from bb_hospitals where hos_long_name_th = '${hos_point}'`;
      const results_hos = await dbConnection.execute(check_hos);
      hos_frm = results_hos[0][0].hos_id;
    } else {
      hos_frm = req.body.hos_point;
    }
  } else {
    hos_frm = req.body.hos_point;
  }
  //ward
  if (req.body.ward) {
    if (req.body.ward.length > 5) {
      const check_ward = `select ward from bb_ward where name = '${ward}'`;
      const results_ward = await dbConnection.execute(check_ward);
      ward_frm = results_ward[0][0].ward;
    } else {
      ward_frm = req.body.ward;
    }
  } else {
    ward_frm = req.body.ward;
  }
  //dep
  if (req.body.dep_code) {
    if (req.body.dep_code.length > 5) {
      const check_dep = `select depcode from bb_kskdepartment where department = '${dep_code}'`;
      const results_dep = await dbConnection.execute(check_dep);
      dep_frm = results_dep[0][0].depcode;
    } else {
      dep_frm = req.body.dep_code;
    }
  } else {
    dep_frm = req.body.dep_code;
  }
  // //staff punct
  if (req.body.punct_staff) {
    if (req.body.punct_staff.length > 7) {
      const check_staff = `select code from bb_doctor where name = '${punct_staff}'`;
      const results_staff = await dbConnection.execute(check_staff);
      punct_staff_frm = results_staff[0][0].code;
    } else {
      punct_staff_frm = req.body.punct_staff;
    }
  } else {
    punct_staff_frm = req.body.punct_staff;
  }
  // //priority
  if (req.body.priority_trans) {
    if (req.body.priority_trans.length > 5) {
      const check_priority = `select priority_id from patient_priority where priority_name = '${priority_trans}'`;
      const results_priority = await dbConnection.execute(check_priority);
      priority_frm = results_priority[0][0].priority_id;
    } else {
      priority_frm = req.body.priority_trans;
    }
  } else {
    priority_trans = req.body.priority_trans;
  }
  //doctor name
  if (doctor_code_frm != "") {
    const check_doctor_name = `select name from bb_doctor where code = '${doctor_code_frm}'`;
    const results_doctor_name = await dbConnection.execute(check_doctor_name);
    doctor_name = results_doctor_name[0][0].name;
  } else {
    doctor_name = "";
  }

  try {
    //update patient_request
    const query_update = `update patient_request SET
    hn = '${hn}'
    ,use_datetime = concat('${date_use}',' ','${time_use}')
    ,request_staff = '${request_staff}'
    ,request_datetime =  concat('${date_requet}',' ','${time_request}')
    ,punct_staff = '${punct_staff_frm}'
    ,punct_datetime = '${date_punct}'
    ,ward = '${ward_frm}'
    ,dep_code = '${dep_frm}'
    ,department = '${patient_type}'
    ,doctor_code = '${doctor_code_frm}'
    ,doctor_name = '${doctor_name}'
    ,priority_trans = '${priority_frm}'
    ,priority_trans_emergency = ${priority_trans_emergency}
    ,hos_point = '${hos_frm}'
    ,bb_code = '${bb_code}'
    ,patient_type = '${patient_type}'
    ,note = '${note}'
    ,diag_1 = '${diag_1}'
    ,diag_more = '${diag_more}'
    ,his_vn = '${his_vn}'
    ,his_ln = '${his_ln}'
    ,his_an = '${his_an}'
    ,lab_hgb = '${lab_hgb}'
    ,lab_hct = '${lab_hct}'
    ,lab_plt = '${lab_plt}'
  WHERE order_number = '${order_number}'`;
    const resultsUpdate = await dbConnection.execute(query_update);

    //update patient
    const query_patient = `update patient set 
     pname = '${pname}', 
     fname = '${fname}', 
     lname = '${lname}', 
     birthday = '${dob}', 
     sex = '${sex}', 
     bloodgrp = '${abo_group}', 
     bloodrh = '${rhname}',
    hos_id = '${hos_frm}'
    WHERE hn = '${hn}'`;
    const resultsUpdate_patient = await dbConnection.execute(query_patient);

    let add_Blood_request;
    if (Blood_request_1 != "ไม่มีข้อมูล") {
      //delete patient_request_blood
      const query_delete_reqBlood = `DELETE FROM patient_request_blood WHERE order_number =  ${order_number}`;
      const resultsDelete = await dbConnection.execute(query_delete_reqBlood);

      //insert patient_request_blood
      for (let i = 0; i < Blood_request_1.length; i++) {
        add_Blood_request = `INSERT INTO patient_request_blood (order_number,type_id,count_unit) VALUE ( '${order_number}','${Blood_request_1[i].type_name}','${Blood_request_1[i].count_unit}')`;
        const results_Blood_request = await dbConnection.execute(
          add_Blood_request
        );
      }
    } else {
      console.log("ไม่มีข้อมูล blood request");
    }
    // console.log("resultsUpdate",resultsUpdate);
    return res.status(200).json({ message: "success" });
  } catch (error) {
    return res.status(500).json({ message: "error", message: error.message });
  }
};

const patient_request = (req, res) => {
  const { order_number } = req.query;
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
  p.order_number = '${order_number}' `;
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

const blood_request_list = (req, res) => {
  const { order_number } = req.query;
  const query_hn = `SELECT order_number,type_id,count_unit, t.s_name as type_name
  FROM patient_request_blood  as b 
	left join blood_type as t ON b.type_id = t.id
  WHERE order_number = '${order_number}' order by t.component_type asc , t.s_name asc  `;
  //console.log("setPatientGroup", query_hn);
  dbConnection
    .execute(query_hn)
    .then((results) => {
      res.send(results[0]);
      // console.log("setPatientGroup", results);
    })
    .catch((error) => {
      return res.status(200).json({ message: "error" });
    });
};

const check_blood_request = (req, res) => {
  // console.log("data", req.query);
  const { order_number, type_id } = req.query;

  try {
    const query = `select * from patient_crossmatch where order_number = '${order_number}' and xm_type = '${type_id}'`;
    dbConnection.execute(query).then((results) => {
      res.send(results[0]);
      // console.log("setPatientGroup", results);
    });
    // return res.status(200).json({ message: "seccess",results: query });
  } catch (error) {
    return res.status(500).json({ message: "error", message: message.error });
  }
};

const Datail_cancel = (req, res) => {
  dbConnection
    .execute(
      "select DISTINCT cancel_detail from patient_request WHERE cancel_detail is not null ORDER BY cancel_detail ASC"
    )
    .then((results) => {
      res.send(results[0]);
    })
    .catch((error) => {
      return res.status(200).json({ message: "error" });
    });
};

const cancel_order = async (req, res) => {
  const { order_number, cancel_detail, cancel_staff } = req.body;
  //console.log("cancel",order_number);

  const queryCheckCoss = `select * from patient_crossmatch as c left join blood as b on c.bl_id = b.id where order_number = '${order_number}'  and xm_status in (3,4,11) ORDER BY xm_status ASC `;
  const resultsqueryCoss = await dbConnection.execute(queryCheckCoss);
  // console.log("resultsquery",resultsqueryCoss[0].length);

  try {
    if (resultsqueryCoss[0]) {
      for (let i = 0; i < resultsqueryCoss[0].length; i++) {
        //UpCoss, InsertBloodReverse, Updeposit
        if (resultsqueryCoss[0][i]?.xm_status == 4) {
          const queryUpCoss4 = `update patient_crossmatch SET xm_status = 8 where xm_id = '${resultsqueryCoss[0][i].xm_id}'  `;
          const resultsqueryUpCoss4 = await dbConnection.execute(queryUpCoss4);

          const queryInReverse4 = `INSERT INTO blood_reverse 
        (order_number, unit_no, date, save_name, detail, type, import_id, result_id, status )VALUE
        ('${order_number}',
        '${resultsqueryCoss[0][i].blood_no}',
        now(),
        '${cancel_staff}',
        'คืนเลือดจากการยกเลิกรายการขอเลือด',
        '${resultsqueryCoss[0][i].xm_type}',
        '${resultsqueryCoss[0][i].bl_id}',
        '${resultsqueryCoss[0][i].xm_id}',
        8
        )`;
          const resultsqueryInReverse4 = await dbConnection.execute(
            queryInReverse4
          );
        } else if (resultsqueryCoss[0][i]?.xm_status == 11) {
          const queryUpCoss11 = `update patient_crossmatch SET xm_status = 8 where xm_id = '${resultsqueryCoss[0][i].xm_id}'  `;
          const resultsqueryUpCoss11 = await dbConnection.execute(
            queryUpCoss11
          );

          const queryInReverse11 = `INSERT INTO blood_reverse 
      (order_number, unit_no, date, save_name, detail, type, import_id, result_id, status )VALUE
      ('${order_number}',
      '${resultsqueryCoss[0][i].blood_no}',
      now(),
      '${cancel_staff}',
      'คืนเลือดจากการยกเลิกรายการขอเลือด',
      '${resultsqueryCoss[0][i].xm_type}',
      '${resultsqueryCoss[0][i].bl_id}',
      '${resultsqueryCoss[0][i].xm_id}',
      8
      )`;
          const resultsqueryInReverse11 = await dbConnection.execute(
            queryInReverse11
          );

          const queryUpdepo = `update blood_deposit_unit SET dep_status = 8 where result_id = '${resultsqueryCoss[0][i].xm_id}'  `;
          const resultsqueryUpdepo = await dbConnection.execute(queryUpdepo);
        } else if (resultsqueryCoss[0][i]?.xm_status == 3) {
          const queryUpCoss13 = `update patient_crossmatch SET xm_status = 13 where xm_id = '${resultsqueryCoss[0][i].xm_id}'  `;
          const resultsqueryUpCoss13 = await dbConnection.execute(
            queryUpCoss13
          );

          const queryInReverse13 = `INSERT INTO blood_reverse 
      (order_number, unit_no, date, save_name, detail, type, import_id, result_id, status )VALUE
      ('${order_number}',
      '${resultsqueryCoss[0][i].blood_no}',
      now(),
      '${cancel_staff}',
      'ปลดเลือดจากการยกเลิกรายการขอเลือด',
      '${resultsqueryCoss[0][i].xm_type}',
      '${resultsqueryCoss[0][i].bl_id}',
      '${resultsqueryCoss[0][i].xm_id}',
      13
      )`;
          const resultsqueryInReverse13 = await dbConnection.execute(
            queryInReverse13
          );
        }
      }
      //Up patient_request
      const queryUpPtReq = `update patient_request SET 
    cancel_staff = '${cancel_staff}'
    ,cancel_datetime = now()
    ,cancel_detail = '${cancel_detail}'
    ,request_status = 8
    WHERE order_number = '${order_number}'`;
      const resultsqueryUpPtReq = await dbConnection.execute(queryUpPtReq);
    } else {
      //Up patient_request
      const queryUpPtReq = `update patient_request SET 
    cancel_staff = '${cancel_staff}'
    ,cancel_datetime = now()
    ,cancel_detail = '${cancel_detail}'
    ,request_status = 8
    WHERE order_number = '${order_number}'`;
      const resultsqueryUpPtReq = await dbConnection.execute(queryUpPtReq);
    }
    return res.status(200).json({ message: "success" });
  } catch (error) {
    return res.status(500).json({ message: "error", message: error.message });
  }
};

const Datail_delete = (req, res) => {
  dbConnection
    .execute(
      "select DISTINCT delete_detail from patient_request_delete WHERE delete_detail is not null ORDER BY delete_detail ASC"
    )
    .then((results) => {
      res.send(results[0]);
    })
    .catch((error) => {
      return res.status(200).json({ message: "error" });
    });
};

const delete_order = async (req, res) => {
  const { order_number, delete_detail, delete_staff } = req.body;

  const queryCheckCoss = `select * from patient_crossmatch where order_number = '${order_number}'  and xm_status in (3,4,11) ORDER BY xm_status ASC `;
  const resultsqueryCoss = await dbConnection.execute(queryCheckCoss);
  console.log("resultsquery", resultsqueryCoss[0].length);

  try {
    if (resultsqueryCoss[0].length < 1) {
      console.log("if");

      const queryMoveData = `INSERT INTO patient_request_delete (SELECT *,'${delete_staff}' as delete_staff,'${delete_detail}' as delete_detail,now() as delete_datetime FROM patient_request  WHERE order_number = '${order_number}' ) `;
      console.log("queryMoveData", queryMoveData);
      const resultsqueryMoveData = await dbConnection.execute(queryMoveData);

      const queryDelete = `DELETE FROM patient_request WHERE order_number =  ${order_number}`;
      const resultsqueryDelete = await dbConnection.execute(queryDelete);
      return res.status(200).json({ message: "success" });
    } else {
      return res.status(200).json({ message: "warning" });
      console.log("else");
    }
  } catch (error) {
    return res.status(500).json({ message: "error", message: error.message });
  }
};

const check_fingerTip = (req, res) => {
  const { hn } = req.query;
  const query_check = `SELECT *  ,
  DATE_FORMAT(DATE_ADD(fgt_datetime_save, INTERVAL 543 YEAR), '%d/%m/%Y %H:%i:%s') as fgt_datetime_save_format 
  FROM patient_fingertip   WHERE  fgt_hn =  '${hn}' `;

  dbConnection
    .execute(query_check)
    .then((results) => {
      res.send(results[0]);
      //console.log("setPatientGroup", results[0]);
    })
    .catch((error) => {
      return res.status(200).json({ message: "error" });
    });
};

const show_fingerTip = (req, res) => {
  const { hn } = req.query;
  const query_check = `SELECT * 
  , DATE_FORMAT(DATE_ADD(fgt_datetime_save, INTERVAL 543 YEAR), '%d/%m/%Y %H:%i:%s') as datetime_save
  , concat(fgt_blood_gr,fgt_blood_rh) as Gr   from patient_fingertip WHERE  fgt_hn =  '${hn}' ORDER BY fgt_datetime_save DESC  `;

  dbConnection
    .execute(query_check)
    .then((results) => {
      res.send(results[0]);
      //console.log("setPatientGroup", results[0]);
    })
    .catch((error) => {
      return res.status(200).json({ message: "error" });
    });
};

const check_xmId = (req, res) => {
  const { order_number, xm_id } = req.query;
  const query_check = `select c.xm_id 
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
  where c.order_number = '${order_number}' 
  and c.xm_id  = '${xm_id}' 
  and c.xm_status <> 8 and c.xm_status <> 4 `;
  console.log(query_check);
  dbConnection
    .execute(query_check)
    .then((results) => {
      res.send(results[0]);
    })
    .catch((error) => {
      return res.status(200).json({ message: "error" });
    });
};

const recived_staff = (req, res) => {
  const { sr_ward } = req.query;
  let query_staff;

  if (sr_ward) {
    query_staff = `SELECT * FROM patient_received_staff WHERE sr_ward = '${sr_ward}'`;
  } else {
    query_staff = `SELECT * FROM patient_received_staff`;
  }

  dbConnection
    .execute(query_staff)
    .then((results) => {
      res.send(results);
      // console.log("query_check", results[0]);
    })
    .catch((error) => {
      return res.status(200).json({ message: "error" });
    });
};

const update_RceivedStaff = async (req, res) => {
  const { received_staff, ward } = req.body;

  const checkStaff = `SELECT * FROM patient_received_staff WHERE sr_name = '${received_staff}'`;
  const resultCheckStaff = await dbConnection.execute(checkStaff);

  if (resultCheckStaff[0][0]) {
    console.log("มีเเล้ว");
    return res.status(200).json({ message: "duplicate" });
  } else {
    const queryString = `INSERT INTO patient_received_staff (sr_name,sr_ward) VALUE ('${received_staff}','${ward}')`;
    dbConnection
      .execute(queryString)
      .then((results) => {
        res.send(results[0]);
      })
      .catch((error) => {
        return res.status(500).json({ message: "error", error: error.message });
      });
};
}

const update_coss_trans = async (req, res) => {
  const {
    order_number,
    depcode,
    received_staff,
    staff,
    ward,
    xm_id,
    blood_no,
    id,
  } = req.body;
  console.log(req.body);
  try {
    // const checkStaff = `SELECT * FROM patient_received_staff WHERE sr_name = '${received_staff}'`;
    // const resultCheckStaff = await dbConnection.execute(checkStaff);

    // if (resultCheckStaff[0].length < 1) {
    //   const AddStaff = `INSERT INTO patient_received_staff (sr_name,sr_ward) VALUE ('${received_staff}','${ward}')`;
    //   const resultAddStaff = await dbConnection.execute(AddStaff);
    // } else {
    //   console.log("received_staff", received_staff);
    // }

    for (let i = 0; i < xm_id.length; i++) {
      const UpdateCoss = `UPDATE patient_crossmatch SET  
    trans_staft = '${staff}',
    trans_dep = '${depcode}',
    trans_date_time = now(),
    recieved_ward = '${ward}',
    recieced_staft = '${received_staff}',
    xm_status = 4
    WHERE xm_id = '${xm_id[i]}' `;
      const resultUpdateCoss = await dbConnection.execute(UpdateCoss);
      //  console.log("loop",UpdateCoss);
    }

    for (let i = 0; i < id.length; i++) {
      const UpdateBlood = `UPDATE blood SET  
    used_date = now(),
    status = '4'
    WHERE id = '${id[i]}' `;
      const resultUpdateBlood = await dbConnection.execute(UpdateBlood);
      // console.log("loop",UpdateBlood);
    }

    const UpdateReqBlood = `UPDATE patient_request_blood SET 
  sum_trans = (SELECT PT_Get_Transcount('${order_number}')) , 
  sum_cross = (SELECT PT_Get_XMcount('${order_number}'))
  WHERE order_number= '${order_number}'`;
    const resultReqBlood = await dbConnection.execute(UpdateReqBlood);

    return res.status(200).json({ message: "success" });
  } catch (error) {
    return res.status(500).json({ message: "error", message: error.message });
  }
};

const Add_Finger = async (req, res) => {
  const {
    fgt_anti_a,
    fgt_anti_b,
    fgt_anti_ab,
    fgt_anti_d,
    abo_group,
    rh_name,
    staff,
    hn,
  } = req.body;

  try {
    const queryAddFingerTip = `INSERT INTO patient_fingertip
    (
      fgt_hn
     ,fgt_anti_a
     ,fgt_anti_b
     ,fgt_anti_ab
     ,fgt_anti_d
     ,fgt_blood_gr
     ,fgt_blood_rh
     ,fgt_staff
     ,fgt_datetime_save
   ) VALUES (
     '${hn}'
     ,'${fgt_anti_a}'  
     ,'${fgt_anti_b}'  
     ,'${fgt_anti_ab}'  
     ,'${fgt_anti_d}'  
     ,'${abo_group}'   
     ,'${rh_name}'
     ,'${staff}'
     ,now()
      )`;
    const resultsqueryAddFingerTip = await dbConnection.execute(
      queryAddFingerTip
    );
    return res.status(200).json({ message: "success" });
  } catch (error) {
    return res.status(500).json({ message: "error", message: error.message });
  }
};

const check_data_blood = (req, res) => {
  const { blood_no, blood_type } = req.query;
  const query_check = ` SELECT b.blood_no,b.blood_group,b.blood_rh	,b.blood_value 
  ,bt.l_name as component_name
  , bt.id as type_id
  ,b.id as bl_id
	 ,DATE_FORMAT(DATE_ADD(b.donor_date, INTERVAL 543 YEAR ),'%d/%m/%Y') as punct_date    
 ,DATE_FORMAT(DATE_ADD(b.expiry_date, INTERVAL 543 YEAR ),'%d/%m/%Y') as expiry_date
 ,DATE_FORMAT(DATE_ADD(b.receive_date, INTERVAL 543 YEAR ),'%d/%m/%Y') as receive_date
  , DATEDIFF(b.expiry_date, NOW()) as b_exp 
  , concat(SUBSTRING(b.blood_no FROM 1 FOR 3), '.'
, SUBSTRING(b.blood_no FROM 4 FOR 2), '.'
, SUBSTRING(b.blood_no FROM 6 FOR 1), '.'
, SUBSTRING(b.blood_no FROM 7)) as unit_no_dot
  from blood as b
  left join blood_type as bt on b.blood_type = bt.id
	where blood_no = '${blood_no}' and status = '1' and blood_type = '${blood_type}' `;
  // console.log(query_check);
  dbConnection
    .execute(query_check)
    .then((results) => {
      res.send(results[0]);
    })
    .catch((error) => {
      return res.status(200).json({ message: "error" });
    });
};

const search_his_trans = (req, res) => {
  const { date_start, date_last, hos_id, unit_no } = req.query;

  const whereCondition = [];

  if (unit_no) {
    whereCondition.push(` bth.unit_no = '${unit_no}'  `);
  }

  if (hos_id) {
    whereCondition.push(` bth.hos_id ='${hos_id}'  `);
  }

  const queryHisTrans = `
  SELECT   
concat(SUBSTRING(b.blood_no FROM 1 FOR 3), '.'
, SUBSTRING(b.blood_no FROM 4 FOR 2), '.'
, SUBSTRING(b.blood_no FROM 6 FOR 1), '.'
, SUBSTRING(b.blood_no FROM 7)) as unit_no_dot
,  concat(IFNULL(b.blood_group,''), IFNULL(b.blood_rh,'')) as Gr
, bt.s_name
,DATE_FORMAT(DATE_ADD(b.expiry_date, INTERVAL 543 YEAR ),'%d/%m/%Y') as expiry_date
,h.hos_long_name_th
,DATE_FORMAT(DATE_ADD(bth.date, INTERVAL 543 YEAR ),'%d/%m/%Y') as trans_date
,bth.Pname
,bth.recipient
,bth.payment
FROM blood_transfer_hospital as bth 
left join blood as b on bth.bl_id = b.id
left join blood_type as bt on bt.id = bth.type
left join bb_hospitals as h on h.hos_id = bth.hos_id
WHERE bth.date BETWEEN '${date_start} 00:00:00' and '${date_last} 00:00:00' 
${whereCondition.length > 0 ? `AND ${whereCondition.join(" AND ")}` : " "}`;

  dbConnection
    .execute(queryHisTrans)
    .then((results) => {
      res.send(results[0]);
      //console.log(results[0]);
    })
    .catch((error) => {
      return res.status(500).json({ message: "error", error: error.message });
    });
};

const add_trans_blood = async (req, res) => {
  // console.log("add", req.body);
  const { unit_no, type, hos_id, date, recipient, note, Pname, bl_id } =
    req.body;

  const checkPayment = `SELECT payment from blood_transfer_hospital ORDER BY id desc limit 1`;
  const resultCheckPayment = await dbConnection.execute(checkPayment);

  const year = String(resultCheckPayment[0][0].payment).slice(0, 2);
  const month = String(resultCheckPayment[0][0].payment).slice(2, 4);
  const number = String(resultCheckPayment[0][0].payment).slice(4, 8);

  let currentYear = new Date().getFullYear() + 543;
  currentYear = String(currentYear).slice(2, 4);

  let currentMonth = new Date().getMonth() + 1;
  if (currentMonth < 10) {
    currentMonth = "0" + currentMonth;
  }

  let payment_new = "";
  try {
    //เช็ค payment_new
    if (year == currentYear && month == currentMonth) {
      payment_new = resultCheckPayment[0][0].payment + 1;
    } else {
      payment_new = currentYear + currentMonth + "0001";
    }

    for (let i = 0; i < unit_no.length; i++) {
      const AddTrans = `
          INSERT INTO blood_transfer_hospital (
            payment
            ,bl_id
            ,unit_no
            ,type
            ,hos_id
            ,date
            ,Pname
            ,recipient
            ,note
            ,status
          ) VALUES (
            ${payment_new},
            ${bl_id[i]},
            ${unit_no[i]},
            '${type[i]}',
            ${hos_id},
            '${date}',
            '${Pname}',
            '${recipient}',
            '${note}',
            4
          )
          `;
      const resultAddTrans = await dbConnection.execute(AddTrans);

      const UpdateBlood = `UPDATE blood SET  
     used_date = now(),
     status = '4'
     WHERE id = '${bl_id[i]}' `;
      const resultUpdateBlood = await dbConnection.execute(UpdateBlood);

      // console.log("UpdateBlood", UpdateBlood);
    }

    return res.status(200).json({ message: "success" });
  } catch (error) {
    return res.status(500).json({ message: "error", message: error.message });
  }
};

const dataTransBlood = async (req, res) => {
  const { payment } = req.query;
  const checkPayment = `SELECT payment from blood_transfer_hospital ORDER BY id desc limit 1`;
  const resultCheckPayment = await dbConnection.execute(checkPayment);

  let dataPayMent;
  if (payment) {
    dataPayMent = payment;
  } else {
    dataPayMent = resultCheckPayment[0][0].payment;
  }

  // console.log("dataPayMent",dataPayMent);

  const query_check = `  SELECT   
	b.blood_no,
concat(SUBSTRING(b.blood_no FROM 1 FOR 3), '.'
, SUBSTRING(b.blood_no FROM 4 FOR 2), '.'
, SUBSTRING(b.blood_no FROM 6 FOR 1), '.'
, SUBSTRING(b.blood_no FROM 7)) as unit_no_dot
,  concat(IFNULL(b.blood_group,''), IFNULL(b.blood_rh,'')) as Gr
, bt.s_name
,DATE_FORMAT(DATE_ADD(b.expiry_date, INTERVAL 543 YEAR ),'%d/%m/%Y') as expiry_date
,h.hos_long_name_th
,DATE_FORMAT(DATE_ADD(bth.date, INTERVAL 543 YEAR ),'%d/%m/%Y') as trans_date
,bth.Pname
,bth.recipient
,bth.payment
FROM blood_transfer_hospital as bth 
left join blood as b on bth.bl_id = b.id
left join blood_type as bt on bt.id = bth.type
left join bb_hospitals as h on h.hos_id = bth.hos_id
WHERE  payment =  ${dataPayMent} `;

  dbConnection
    .execute(query_check)
    .then((results) => {
      res.send(results[0]);
      //console.log("5555", results[0]);
    })
    .catch((error) => {
      return res.status(200).json({ message: "error" });
    });
};

const CheckDataBlood = (req, res) => {
  const { order_number } = req.query;
  const queryDataBlood = `select b.blood_no  
  , t.s_name  
  , c.xm_id  
  , b.id  as blood_id
  ,concat(IFNULL(b.blood_group,''), IFNULL(b.blood_rh,'')) as Gr
  , b.expiry_date
  , c.order_number
	, p.hn
	, concat(pt.pname,pt.fname,' ',pt.lname) as fullname
	,w.name as name_ward
  FROM patient_crossmatch as c  
  left join blood as b ON c.bl_id = b.id  
  left join blood_type as t ON b.blood_type = t.id
  left join patient_request as p on c.order_number = p.order_number  
	left join patient as pt on p.hn = pt.hn
	left join bb_ward as w on p.ward = w.ward
  where c.order_number = '${order_number}'  
  and c.xm_status = 4  
  order by c.xm_id asc`;
  // console.log(queryDataBlood);

  dbConnection
    .execute(queryDataBlood)
    .then((results) => {
      res.send(results[0]);
      //console.log(results[0]);
    })
    .catch((error) => {
      return res.status(500).json({ message: "error", error: error.message });
    });
};

const DataReactionHis = (req, res) => {
  const { order_number } = req.query;

  const queryHisReact = ` select 
  DATE_FORMAT(r.ac_save_datetime ,'%d/%m/%Y %H:%i:%s') as date_save
  ,DATE_FORMAT(r.ac_action_datetime ,'%d/%m/%Y %H:%i:%s') as date_ac
  ,r.ac_action_datetime 
  ,bt.s_name
  ,r.ac_action_detail
  , b.blood_no
  ,r.ac_save_staff
  ,r.ac_id
  from patient_reaction as r
  left join blood as b ON r.ac_bl_id = b.id
  left join blood_type as bt ON bt.id = b.blood_type
  WHERE ac_order_number = '${order_number}'  `;

  dbConnection
    .execute(queryHisReact)
    .then((results) => {
      res.send(results);
      // console.log("React", results[0]);
    })
    .catch((error) => {
      return res.status(200).json({ message: "error" });
    });
};

const ReactionList = (req, res) => {
  dbConnection
    .execute("SELECT * FROM patient_reaction_list  WHERE reac_lt_id != 0")
    .then((results) => {
      res.send(results);
    })
    .catch((error) => {
      return res.status(200).json({ message: "error" });
    });
};

const addReactionBlood = async (req, res) => {
  console.log("b", req.body);
  const {
    ac_hn,
    ac_order_number,
    ac_save_staff,
    date_react,
    time_react,
    ac_action_detail,
    blood_no,
    ac_id,
  } = req.body;
  console.log("b", ac_id);

  try {
    if (!ac_id) {
      console.log("insert");

      const checkBloodNo = `select b.blood_no  
  , t.s_name  
  , c.xm_id  
  , b.id  as blood_id
  ,concat(IFNULL(b.blood_group,''), IFNULL(b.blood_rh,'')) as Gr
  , c.order_number
  FROM patient_crossmatch as c  
   join blood as b ON c.bl_id = b.id  
  left join blood_type as t ON b.blood_type = t.id  
  where c.order_number = '${ac_order_number}'  
  and b.blood_no = '${blood_no}'   
  and c.xm_status = 4  
  order by c.xm_id asc`;
      const resultCheckPayment = await dbConnection.execute(checkBloodNo);

      const xm_id = resultCheckPayment[0][0]?.xm_id;
      const bl_id = resultCheckPayment[0][0]?.blood_id;

      const queryInsert = `INSERT INTO patient_reaction (
      ac_hn
      ,ac_order_number
      ,ac_save_datetime
      ,ac_save_staff
      ,ac_bl_id
      ,ac_action_datetime
      ,ac_action_detail
      ,xm_id
    ) VALUES (
      '${ac_hn}',
      ${ac_order_number},
      now(),
      '${ac_save_staff}',
      ${bl_id},
      concat('${date_react}',' ','${time_react}'),
      '${ac_action_detail}',
      '${xm_id}'
    )`;
      console.log(queryInsert);
      const resultInsert = await dbConnection.execute(queryInsert);
    } else {
      console.log("update");
      const query = `select * from blood`;
      const queryUpdate = `UPDATE patient_reaction SET
     ac_hn = '${ac_hn}'
    ,ac_order_number = ${ac_order_number}
    ,ac_save_datetime = now()
    ,ac_save_staff = '${ac_save_staff}'
    ,ac_action_datetime = concat('${date_react}',' ','${time_react}')
    ,ac_action_detail = '${ac_action_detail}'
    WHERE ac_id = '${ac_id}' `;

      console.log(queryUpdate);
      const resultUpdate = await dbConnection.execute(queryUpdate);
    }
    return res.status(200).json({ message: "success" });
  } catch (error) {
    return res.status(500).json({ message: "error", message: error.message });
  }
};

const Search_detail = (req, res) => {
  const { keyword } = req.query;
  const queryString = `select 
  DISTINCT c.order_number
    , p.hn
    , concat(pt.pname,pt.fname,' ',pt.lname) as fullname
    , p.request_datetime
    , w.name as ward_name
  ,d.department	
  ,DATE_FORMAT(DATE_ADD(p.request_datetime, INTERVAL 543 YEAR), '%d/%m/%Y %H:%i:%s') as req_time 
    FROM patient_crossmatch as c  
    left join blood as b ON c.bl_id = b.id  
    left join blood_type as t ON b.blood_type = t.id
    left join patient_request as p on c.order_number = p.order_number  
    left join patient as pt on p.hn = pt.hn
    left join bb_ward as w on p.ward = w.ward
    left join bb_kskdepartment as d on p.dep_code = d.depcode
    where p.hn = '${keyword}' or c.order_number ='${keyword}' 
    and c.xm_status = 4  
    GROUP BY c.order_number desc `;
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

module.exports = {
  hn_user_req,
  hn_user,
  hospitals,
  doctor,
  department,
  ward,
  diag,
  need_priority,
  need_fast,
  blood_draw,
  blood_type,
  hn_user_search,
  count_hid,
  addHospital,
  uqHospital,
  DeleteHospital,
  request_blood_his,
  receive_blood_his,
  patient_note,
  receive_blood_list,
  patient_react_list,
  hn_grouping,
  hn_antibody,
  hn_dat,
  add_patient_request,
  edit_patient_request,
  patient_request,
  blood_request_list,
  check_blood_request,
  Datail_cancel,
  cancel_order,
  Datail_delete,
  delete_order,
  check_fingerTip,
  show_fingerTip,
  check_xmId,
  recived_staff,
  update_coss_trans,
  update_RceivedStaff,
  Add_Finger,
  check_data_blood,
  search_his_trans,
  add_trans_blood,
  dataTransBlood,
  CheckDataBlood,
  ReactionList,
  DataReactionHis,
  addReactionBlood,
  Search_detail,
};
