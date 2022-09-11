const dbConnection = require("../database");

const UP_BBCODE = (req, res) => {
  const strQuery2 = `UPDATE patient_request SET bb_code='${req.body.bb_code}' Where order_number = '${req.body.order_num}'
    `;
  dbConnection
    .execute(strQuery2)
    .then((results) => {
      res.send(results[0]);
    })
    .catch((error) => {
      return res.status(200).json({ message: "error", message: error.message });
    });
};
const UP_Patient_Grouping = (req, res) => {
  const strQuery2 = `UPDATE patient_request SET anti_a = '${req.body.anti_a}' ,anti_b = '${req.body.anti_b}',anti_ab= '${req.body.anti_ab}'
  ,anti_d= '${req.body.anti_d}'
  ,anti_a1= '${req.body.anti_a1}'
  ,anti_h= '${req.body.anti_h}'
  ,cell_a= '${req.body.cell_a}'
  ,cell_b= '${req.body.cell_b}'
  ,cell_o= '${req.body.cell_o}'
  ,cell_ctrl= '${req.body.cell_ctrl}'
  ,blood_gr= '${req.body.blood_gr}'
  ,blood_sub_gr= '${req.body.blood_sub_gr}'
  ,rhd_rt= '${req.body.rhd_rt}'
  ,rhd_37c= '${req.body.rhd_37c}'
  ,rhd_iat= '${req.body.rhd_iat}'
  ,blood_rh= '${req.body.blood_rh}'
  ,grouping_staff='${req.body.staff}'
  ,note_Grouping='${req.body.note_Grouping}'

  ,grouping_datetime= NOW()
    Where order_number = '${req.body.order_num}'
    `;
  dbConnection
    .execute(strQuery2)
    .then((results) => {
      res.send(results[0]);
    })
    .catch((error) => {
      return res.status(200).json({ message: "error", message: error.message });
    });
};

const UP_AntibodyScreening = (req, res) => {
  // console.log("data.body", req.body);
  // console.log("data.quyery", req.query);
  const strQuery3 = `UPDATE patient_request SET note_ABS='${req.body.note_ABS}',abs_o1_rt = '${req.body.abs_o1_rt}' ,abs_o1_37c = '${req.body.abs_o1_37c}',abs_o1_iat= '${req.body.abs_o1_iat}',abs_o2_rt = '${req.body.abs_o2_rt}' ,abs_o2_37c = '${req.body.abs_o2_37c}',abs_o2_iat= '${req.body.abs_o2_iat}',abs_o3_rt = '${req.body.abs_o3_rt}' ,abs_o3_37c = '${req.body.abs_o3_37c}',abs_o3_iat= '${req.body.abs_o3_iat}',abs_result= '${req.body.abs_result}',abs_staff='${req.body.staff}',abs_date_time= NOW() Where order_number = '${req.body.order_num}'`;
  // console.log("UP_AntibodyScreening", strQuery3);
  dbConnection
    .execute(strQuery3)
    .then((results) => {
      res.send(results[0]);
    })
    .catch((error) => {
      return res.status(200).json({ message: "error", message: error.message });
    });
};
const UP_DATandAutocontrol = (req, res) => {
  // console.log("data.body", req.body);
  // console.log("data.quyery", req.query);
  const strQuery2 = `UPDATE patient_request SET dat_rt = '${req.body.dat_rt}' ,dat_rt = '${req.body.dat_rt}',dat_iat= '${req.body.dat_iat}',dat_result = '${req.body.dat_result}' ,autologous_rt = '${req.body.autologous_rt}',autologous_37c= '${req.body.autologous_37c}',autologous_iat = '${req.body.autologous_iat}' ,autologous_result = '${req.body.autologous_result}',autologous_staff= '${req.body.staff}',dat_staff='${req.body.staff}',note_Dat_Autocontrol='${req.body.note_Dat_Autocontrol}',autologous_datetime=NOW(),dat_datetime=NOW() Where order_number = '${req.body.order_num}'`;
  // console.log("UP_DATandAutocontrol", strQuery2);
  dbConnection
    .execute(strQuery2)
    .then((results) => {
      res.send(results[0]);
    })
    .catch((error) => {
      return res.status(200).json({ message: "error", message: error.message });
    });
};
const UP_antibodyiden = (req, res) => {
  // console.log("data.body", req.body);
  // console.log("data.quyery", req.query);
  const strQuery2 = `
  INSERT INTO patient_antibody (id,A1,H,D,c1,e1,c2,e2,cw,k1,k2,kpa,kpb,jsa,jsb,jka,jkb,jk3,m,n,s1,s2,mia,lea,leb,fya,fyb,fy3,dia,dib,i1,i2,coa,cob,ct,wt,hemolysis,xga,fm,p1,tja,uniden,lua,lub,rf,iden_result,save_staff,hn,save_date,note_antibody) VALUES 
  ((select (t1.id+1) from patient_antibody as t1 order by t1.id desc limit 1),'${req.body.A1}','${req.body.H}','${req.body.D}','${req.body.c1}','${req.body.e1}','${req.body.c2}','${req.body.e2}','${req.body.cw}','${req.body.k1}','${req.body.k2}','${req.body.kpa}','${req.body.kpb}','${req.body.jsa}','${req.body.jsb}','${req.body.jka}','${req.body.jkb}','${req.body.jk3}','${req.body.m}','${req.body.n}','${req.body.s1}','${req.body.s2}','${req.body.mia}','${req.body.lea}','${req.body.leb}','${req.body.fya}','${req.body.fyb}','${req.body.fy3}','${req.body.dia}','${req.body.dib}','${req.body.i1}','${req.body.i2}','${req.body.coa}','${req.body.cob}','${req.body.ct}','${req.body.wt}','${req.body.hemolysis}','${req.body.xga}','${req.body.fm}','${req.body.p1}','${req.body.tja}','${req.body.uniden}','${req.body.lua}','${req.body.lub}','${req.body.rf}','${req.body.resultATB}' ,'${req.body.staff}','${req.body.hn}',NOW(),'${req.body.note_antibody}')`;
  // console.log("antibody_testquery", strQuery2);
  dbConnection
    .execute(strQuery2)
    .then((results) => {
      res.send(results[0]);
    })
    .catch((error) => {
      return res.status(200).json({ message: "error", message: error.message });
    });
};

const UP_antigeniden = (req, res) => {
  // console.log("data.body", req.body);
  // console.log("data.quyery", req.query);
  const strQuery2 = `INSERT INTO patient_antigen (id,a1,H,D,c1,c2,e1,e2,k1,k2,dia,dib,m,n,s1,s2,mia,lea,leb,coa,cob,jka,jkb,i1,i2,p1,p,lua,lub,fya,fyb,result,note_antigen,save_staff,save_date,hn)
  values ((select (t1.id+1) from patient_antigen as t1 order by t1.id desc limit 1),'${req.body.a1}','${req.body.H}','${req.body.D}','${req.body.c1}','${req.body.c2}','${req.body.e1}','${req.body.e2}','${req.body.k1}','${req.body.k2}','${req.body.dia}','${req.body.dib}','${req.body.m}','${req.body.n}','${req.body.s1}','${req.body.s2}','${req.body.mia}','${req.body.lea}','${req.body.leb}','${req.body.coa}','${req.body.cob}','${req.body.jka}','${req.body.jkb}','${req.body.i1}','${req.body.i2}','${req.body.p1}','${req.body.p}','${req.body.lua}','${req.body.lub}','${req.body.fya}','${req.body.fyb}','${req.body.resultATG}','${req.body.note_antigen}','${req.body.staff}',NOW(),'${req.body.hn}')
   `;
  // console.log("UP_antigeniden", strQuery2);
  dbConnection
    .execute(strQuery2)
    .then((results) => {
      res.send(results[0]);
    })
    .catch((error) => {
      return res.status(200).json({ message: "error", message: error.message });
    });
};

const Search_bloodNO = (req, res) => {
  // console.log("data.body", req.body);
  // console.log("data.quyery", req.query);
  const query = ` 
  SELECT bt.component_type
  ,b.*
    ,bs.*
    ,ifnull(bt.s_name,'') as component_name
    ,ifnull(b.blood_group,'') as bl_gr
        ,ifnull(b.blood_rh,'') as bl_rh
   , concat(ifnull(b.blood_group,'') ,ifnull(b.blood_rh,'')) as gr
   ,ifnull(b.blood_value,'') as blood_value
   ,DATE_FORMAT(DATE_ADD(b.donor_date, INTERVAL 543 YEAR ),'%d/%m/%Y') as collectdate
   ,DATE_FORMAT(DATE_ADD(expiry_date, INTERVAL 543 YEAR ),'%d/%m/%Y') as expiry_date
   , DATEDIFF(b.expiry_date, NOW()) as b_exp 
  
    from blood as b
    left join blood_type as bt on b.blood_type = bt.id
    left join blood_status as bs on b.status = bs.bl_status_id
 where b.blood_no = '${req.body.Unit_no_csm}'   and b.blood_type = '${req.body.blood_status_search}'
  `;
  console.log("query", query);

  dbConnection
    .execute(query)
    .then((results) => {
      res.send(results[0]);
    })
    .catch((error) => {
      return res.status(500).json({ message: "error", message: error.message });
    });
};

const con_pg = (req, res) => {
  //  console.log("b", req.body);
  //  console.log("q", req.query);

  const { staff, confirm, order_num } = req.body;
  try {
    const strQuery2 = `UPDATE patient_request SET cross_confirm = ('${confirm}') 
  ,staff_cross_confirm_update=('${staff}')
  ,date_cross_confirm_update= NOW()
    Where order_number = ('${order_num}') 

    `;
    dbConnection.execute(strQuery2);
    return res.status(200).json({ message: "success" });
  } catch (error) {
    return res.status(500).json({ message: "error", message: error.message });
  }
};
const Chexkcon_pg = (req, res) => {
  const { order_num } = req.query;
  const query = `
  select cross_confirm 
  from patient_request WHERE order_number = '${order_num}' 
  `;
  dbConnection
    .execute(query)
    .then((results) => {
      res.send(results[0]);
    })
    .catch((error) => {
      return res.status(500).json({ message: "error", message: error.message });
    });
};
const Chexkcon_Groupcon = (req, res) => {
  const { order_num } = req.query;
  const query = `
  select blood_gr ,blood_rh
  from patient_request WHERE order_number = '${order_num}' 
  `;
  // console.log(query);
  dbConnection
    .execute(query)
    .then((results) => {
      res.send(results[0]);
    })
    .catch((error) => {
      return res.status(500).json({ message: "error", message: error.message });
    });
};

const showChexkcon_pg = (req, res) => {
  const { NUM_BT } = req.query;

  dbConnection
    .execute(
      ` select cross_confirm 
      ,staff_cross_confirm_update
      , DATE_FORMAT(DATE_ADD(date_cross_confirm_update, INTERVAL 543 YEAR ),'%d/%m/%Y') as cross_savedate
    , DATE_FORMAT(DATE_ADD(date_cross_confirm_update, INTERVAL 543 YEAR ),'%H:%i:%s') as cross_savetime
    
      from patient_request WHERE order_number = '${NUM_BT}' `
    )

    .then((results) => {
      res.send(results);
      //  console.log("ssss2s", results);
    })

    .catch((error) => {
      return res.status(200).json({ message: "error" });
    });
};

const insert_BloodDetil = (req, res) => {
  //  console.log("b", req.body);
  //  console.log("q", req.query);

  ////  console.log("BB", req.body.A1_IDC);

  const strQuery2 = `INSERT INTO patient_request (cross_confirm,test2,test3,test4,test5) 
    VALUES  ('${req.body.Lab_IN}','${req.body.H_ATJ}','${req.body.RT_ABS}','${req.body.RT_DAT}','${req.body.A1_IDC}')`;

  dbConnection
    .execute(strQuery2)
    .then((results) => {
      res.send(results[0]);
    })
    .catch((error) => {
      return res.status(200).json({ message: "error", message: error.message });
    });
};

const Choiciall = (req, res) => {
  dbConnection
    .execute(`select name from bb_choice  where type = 1 order by id asc`)
    .then((results) => {
      res.send(results);
    })

    .catch((error) => {
      return res.status(200).json({ message: "error" });
    });
};
const blood_group_subgroup = (req, res) => {
  dbConnection
    .execute(`select * from blood_group_subgroup  order by subgroup_id asc`)
    .then((results) => {
      res.send(results);
    })

    .catch((error) => {
      return res.status(200).json({ message: "error" });
    });
};

const Antibody_Screening = (req, res) => {
  dbConnection
    .execute(`select name from bb_choice  where type = 3 order by id asc`)
    .then((results) => {
      res.send(results);
    })

    .catch((error) => {
      return res.status(200).json({ message: "error" });
    });
};
const Crossmatching_Result = (req, res) => {
  dbConnection
    .execute(`select name from bb_choice  where type = 2 order by id asc`)
    .then((results) => {
      res.send(results);
    })

    .catch((error) => {
      return res.status(200).json({ message: "error" });
    });
};
// ------------------- หน้ารายการขอเลือด

const ShowINdexBlooddetil = (req, res) => {
  dbConnection
    .execute(
      `
      SELECT req.order_number 
      , req.his_ln
      , if(req.his_an <>'',req.his_an,req.his_vn) as 'VN/AN'
      , req.hn
      , concat(p.pname,p.fname,' ' ,p.lname) as patientname
      , concat(p.bloodgrp , p.bloodrh ) as ABO
      , DATE_FORMAT(DATE_ADD(req.request_datetime, INTERVAL 543 YEAR ),'%d/%m/%Y') as req_date
      , DATE_FORMAT(DATE_ADD(req.request_datetime, INTERVAL 543 YEAR ),'%H:%i:%s') as req_time
      
      , DATE_FORMAT(DATE_ADD(req.use_datetime, INTERVAL 543 YEAR ),'%d/%m/%Y') as req_usedate
      , DATE_FORMAT(DATE_ADD(req.use_datetime, INTERVAL 543 YEAR ),'%H:%i:%s') as req_usetime
      
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
      ,p_prty.priority_name
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
      
      where req.request_datetime between '2021-09-03 00:00:00' and '2022-09-03 23:59:59' 
      limit 100 ;
      
      


    `
    )
    //     LEFT JOIN patient_request ON patient.hn = patient_request.hn
    // LEFT JOIN patient_request_status ON patient_request.request_status= patient_request_status.rq_stutus_id
    //   LEFT JOIN patient_crossmatch ON patient_request.order_number = patient_crossmatch.order_number
    .then((results) => {
      res.send(results);
      ////  console.log("show",results);
    })

    .catch((error) => {
      return res.status(200).json({ message: "error" });
    });
};
const BB_kskdepartment = (req, res) => {
  dbConnection
    .execute(`select * from bb_kskdepartment   `)
    .then((results) => {
      res.send(results);
    })

    .catch((error) => {
      return res.status(200).json({ message: "error" });
    });
};
const Hospitals = (req, res) => {
  dbConnection
    .execute(`select * from bb_hospitals   `)
    .then((results) => {
      res.send(results);
    })

    .catch((error) => {
      return res.status(200).json({ message: "error" });
    });
};

const Bloodneed_API = (req, res) => {
  dbConnection
    .execute(`select * from patient_priority  order by  priority_id asc`)
    .then((results) => {
      res.send(results);
    })

    .catch((error) => {
      return res.status(200).json({ message: "error" });
    });
};
const ST_RE_API = (req, res) => {
  dbConnection
    .execute(`select * from patient_request_status  order by  rq_stutus_id asc`)
    .then((results) => {
      res.send(results);
    })

    .catch((error) => {
      return res.status(200).json({ message: "error" });
    });
};
const BloodGR_pc = (req, res) => {
  dbConnection
    .execute(`select * from blood_group  `)
    .then((results) => {
      res.send(results);
    })

    .catch((error) => {
      return res.status(200).json({ message: "error" });
    });
};
const WARD_API = (req, res) => {
  dbConnection
    .execute(`select * from bb_ward  `)
    .then((results) => {
      res.send(results);
    })

    .catch((error) => {
      return res.status(200).json({ message: "error" });
    });
};
const TypeBlood_API = (req, res) => {
  const { pid } = req.query;
  dbConnection
    .execute(
      `          select t.id 
    , t.s_name
    , brq.count_unit
    FROM patient_request_blood as brq
    left join blood_type as t ON brq.type_id = t.id
    where order_number = '${pid}'
    order by t.component_type asc, t.display asc; `
    )
    .then((results) => {
      res.send(results);
    })

    .catch((error) => {
      return res.status(200).json({ message: "error" });
    });
};
const Count_TypeBlood_API = (req, res) => {
  const { counttype, od } = req.query;
  const query = `    
SELECT count_unit FROM patient_request_blood WHERE  order_number = '${od}'and  type_id = '${counttype}' ;`;
  // console.log(query);
  dbConnection
    .execute(query)
    .then((results) => {
      res.send(results);
    })

    .catch((error) => {
      return res.status(200).json({ message: "error" });
    });
};

const Search_bloodDetil = (req, res) => {
  const {
    Request_date_blood_search,
    Request_date_blood_to_search,
    HN_search,
    blood_request_number_search,
    blood_request_point_search,
    station_search,
    date_of_use_search,
    date_of_use_to_search,
    blood_need_search,
    blood_group_re_search,
    blood_status_search,
    CheckBox_search,
    WARD_search,
  } = req.query;

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
  left join bb_kskdepartment as dep ON req.dep_code = dep.depcode `;

  // where req.request_datetime  BETWEEN '${Request_date_blood_search} 00:00:00' AND '${Request_date_blood_to_search} 23:59:59'  `;

  // ตัวเลือดการค้นหา

  if (CheckBox_search == "TRUE") {
    queryString += ` where req.request_status IS NOT NULL `;
    if (HN_search != "") {
      queryString += `and req.hn = '${HN_search.trim()}' `;
    }

    if (blood_request_number_search != "") {
      queryString += ` and (req.order_number = '${blood_request_number_search.trim()}' OR  req.his_ln = '${blood_request_number_search.trim()}') `;
    }
  } else {
    queryString += `where req.request_datetime  BETWEEN '${Request_date_blood_search} 00:00:00' AND '${Request_date_blood_to_search} 23:59:59'  `;

    if (date_of_use_search != "") {
      queryString += ` AND req.use_datetime  BETWEEN '${date_of_use_search} 00:00:00' AND '${date_of_use_to_search} 23:59:59' `;
    }

    if (HN_search != "") {
      queryString += `and req.hn = '${HN_search.trim()}' `;
    }

    if (blood_request_number_search != "") {
      queryString += ` and (req.order_number = '${blood_request_number_search.trim()}' OR  req.his_ln = '${blood_request_number_search.trim()}') `;
    }
    if (blood_request_point_search != "") {
      queryString += ` and req.dep_code = '${blood_request_point_search.trim()}' `;
    }

    if (station_search != "") {
      queryString += `and req.hos_point = '${station_search.trim()}' `;
    }

    if (blood_status_search != "") {
      queryString += ` and req.request_status = '${blood_status_search.trim()}' `;
    }

    if (WARD_search != "") {
      queryString += `and req.ward = '${WARD_search.trim()}' `;
    }
    if (blood_group_re_search != "") {
      queryString += `and p.bloodgrp = '${blood_group_re_search.trim()}' `;
    }
    if (blood_need_search != "") {
      queryString += `and req.priority = '${blood_need_search.trim()}' `;
    }
  }
  // `
  //   OR req.use_datetime  BETWEEN '${req.query.date_of_use_search}' AND '${req.query.date_of_use_to_search}'

  // if(${req.query.HN_search} != ""){ and req.hn = '${req.query.HN_search}' }

  //   OR req.hn = '${req.query.HN_search}'
  //   OR  req.order_number = '${req.query.blood_request_number_search}'
  //   OR  dep.department = '${req.query.blood_request_point_search}'
  //   or hos.hos_long_name_th = '${req.query.station_search}'
  //   or priority_name = '${req.query.blood_need_search}'
  //   or p.bloodgrp = '${req.query.blood_group_re_search}'
  //   or re_status.rq_stutus_name = '${req.query.blood_status_search}'

  //   `

  ////  console.log(queryString);

  dbConnection
    .execute(queryString)

    .then((results) => {
      res.send(results[0]);
    })

    .catch((error) => {
      return res.status(500).json({ message: "error", error: error.message });
    });
};

// ----------------- Crossmatch --------------------------

const Crossmatch_TB_API = (req, res) => {
  const { TB } = req.query;

  dbConnection
    .execute(
      `select cs.xm_status_name
      , b.blood_no
      , concat(SUBSTRING(b.blood_no FROM 1 FOR 3), '.',SUBSTRING(b.blood_no FROM 4 FOR 2), '.',SUBSTRING(b.blood_no FROM 6 FOR 1), '.',SUBSTRING(b.blood_no FROM 7)) as bl_unit_no
      , c.xm_segment
      , b.blood_group
      , b.blood_rh
      , t.s_name
      , concat(b.blood_group , b.blood_rh ) as GR
      , c.xm_vol
      ,c.xm_confirm
      , c.xm_rt
      , c.xm_37c
      , c.xm_iat
      , c.xm_gel
      , c.xm_result
      , if (c.xm_edit_staff is not null, c.xm_edit_staff,c.xm_staft) as xm_staft
      , if (c.xm_edit_date_time is not null,DATE_FORMAT(DATE_ADD(c.xm_edit_date_time, INTERVAL 543 YEAR), '%d/%m/%Y %H:%i:%s') ,DATE_FORMAT(DATE_ADD(c.xm_date_time, INTERVAL 543 YEAR), '%d/%m/%Y %H:%i:%s')) as xm_date_time
      , c.xm_id
      , c.xm_status
      , q.request_status
      , c.xm_instru_datetime
      , DATE_FORMAT(DATE_ADD(b.expiry_date , INTERVAL 543 YEAR), '%d/%m/%Y') as exp
      , ifnull(c.xm_confirm_staff,'') as xm_confirm_staff
, ifnull(c.xm_confirm_date_time,'') as xm_confirm_date_time

      FROM patient_request as q
      left join patient_crossmatch as c ON q.order_number = c.order_number
      left join blood as b ON c.bl_id = b.id
      left join patient_crossmatch_status as cs ON c.xm_status = cs.xm_status_id
      left join blood_type as t ON b.blood_type = t.id
      where q.order_number = '${TB}'
      and c.xm_id is not null 
     -- group by t.id 
      order by t.component_type asc, t.id asc, c.xm_status asc , c.xm_id desc;`
    )
    .then((results) => {
      res.send(results);
    })

    .catch((error) => {
      return res.status(200).json({ message: "error" });
    });
};
// ----------------- END Crossmatch --------------------------

const Blood_Request_Table = (req, res) => {
  ////  console.log("bo", req.body);
  ////  console.log("qy", req.query);

  const { NUM_BT } = req.query;
  //  console.log("qy", { NUM_BT });

  dbConnection
    .execute(
      `     select 
      t.s_name
      ,peb.count_unit
      from patient_request_blood as peb 
         left join blood_type as t ON peb.type_id = t.id
         
       WHERE order_number = '${NUM_BT}' `
    )
    .then((results) => {
      res.send(results);
    })

    .catch((error) => {
      return res.status(200).json({ message: "error" });
    });
};

const Fromshowdata = (req, res) => {
  ////  console.log("bo", req.body);
  ////  console.log("qy", req.query);

  const { NUM_BT } = req.query;

  //  console.log("qy", { NUM_BT });

  dbConnection
    .execute(
      `   SELECT pp.order_number 
      ,pp.his_ln
      ,IF(pp.his_ln Is Null,"",pp.his_ln) as his_ln
      ,pp.hn
      
      , pp.request_datetime
      , pp.use_datetime 
        
      , DATE_FORMAT(DATE_ADD(pp.request_datetime, INTERVAL 543 YEAR ),'%d/%m/%Y') as requestDD
      , DATE_FORMAT(DATE_ADD(pp.use_datetime, INTERVAL 543 YEAR ),'%d/%m/%Y') as useDD


      ,pp.ward
      ,IF(pp.ward Is Null,"",pp.ward) as ward

      ,W.name
      ,IF(W.name Is Null,"",W.name) as name
      ,concat(PC.pname,PC.fname,' ' ,PC.lname) as patientname

      
      ,PC.sex 
      ,IF(PC.sex Is Null,"",PC.sex) as sex


      ,pp.use_datetime
      ,IF(pp.use_datetime Is Null,"",pp.use_datetime) as use_datetime
      
      ,pp.request_datetime
      ,pp.doctor_name
,pp.diag_1 
,IF(pp.diag_1  Is Null,"",pp.diag_1 ) as diag_1
    
    ,concat(pp.blood_gr,pp.blood_rh) as ggg
    ,PC.birthday

    ,concat(CONVERT(DATE_FORMAT(FROM_DAYS(DATEDIFF(NOW(), PC.birthday)), '%Y') + 0, char), ' ปี ',CONVERT(DATE_FORMAT(FROM_DAYS(DATEDIFF(NOW(), PC.birthday)), '%m') - 1, char), ' เดือน ') as age



      FROM patient_request AS pp
      left join patient as PC ON pp.hn = PC.hn
      left join bb_ward as W ON pp.ward = W.ward
    
    
    WHERE pp.order_number = '${NUM_BT}' `
    )

    .then((results) => {
      res.send(results);
      ////  console.log("ssss2s", results);
    })

    .catch((error) => {
      return res.status(200).json({ message: "error" });
    });
};

const Data_bloodrequesresult = (req, res) => {
  ////  console.log("bo", req.body);
  ////  console.log("qy", req.query);
  const { NUM_BT } = req.query;
  dbConnection
    .execute(
      `  SELECT req.order_number 
      , ifnull(req.his_ln,'') as his_ln
      , ifnull( req.hn,'') as hn
      , concat(p.pname,p.fname,' ' ,p.lname) as patientname
      ,ifnull( p.birthday,'') as birthday
      ,concat(CONVERT(DATE_FORMAT(FROM_DAYS(DATEDIFF(NOW(), p.birthday)), '%Y') + 0, char), ' ปี ',CONVERT(DATE_FORMAT(FROM_DAYS(DATEDIFF(NOW(), p.birthday)), '%m') - 1, char), ' เดือน ', CONVERT(DATE_FORMAT(FROM_DAYS(DATEDIFF(NOW(), p.birthday)), '%d') - 1, char), ' วัน ') as age
      ,ifnull( p.sex,'') as sex
      ,ifnull( p.bloodgrp,'') as bloodgrp
      , concat(p.bloodgrp , p.bloodrh ) as ABO
      , ifnull( req.request_datetime,'') as request_datetime
      , ifnull( req.use_datetime,'') as use_datetime
      , req.request_datetime
          , DATE_FORMAT(DATE_ADD(req.request_datetime, INTERVAL 543 YEAR ),'%d/%m/%Y') as req_date
         , concat(DATE_FORMAT(DATE_ADD(req.request_datetime, INTERVAL 543 YEAR ),'%H:%i:%s'),' ','น.' ) as req_time
      , req.use_datetime 
          , DATE_FORMAT(DATE_ADD(req.use_datetime, INTERVAL 543 YEAR ),'%d/%m/%Y') as req_usedate
          , concat(DATE_FORMAT(DATE_ADD(req.use_datetime, INTERVAL 543 YEAR ),'%H:%i:%s'),' ','น.' ) as req_usetime
          ,ifnull( p.bloodgrp,'') as bloodgrp
          ,ifnull( p_prty.priority_name,'') as priority_name
          , ifnull( req.hos_point,'') as hos_point
          , ifnull( hos.hos_long_name_th,'') as hos_long_name_th
          , ifnull( req.request_status,'') as request_status
          , ifnull(re_status.rq_stutus_name,'') as rq_stutus_name
          , ifnull( req.cancel_detail,'') as cancel_detail
          , ifnull( req.department,'') as department
          , ifnull( req.patient_type,'') as patient_type
          , ifnull( req.request_status,'') as request_status
          , ifnull( req.ward,'') as ward
          , ifnull( wd.name ,'') as wd_name
          , ifnull( req.priority,'') as priority
          , ifnull( p_prty.priority_id,'') as priority_id
          , ifnull( req.dep_code,'') as dep_code
          , ifnull( req.request_old_tube,'') as request_old_tube
          , ifnull( req.his_an,'') as his_an
          , ifnull( req.his_vn,'') as his_vn
          , ifnull( req.patient_type,'') as patient_type
          , ifnull( req.doctor_name,'') as doctor_name
          , ifnull( req.punct_staff,'') as punct_staff
          , ifnull( req.dep_code,'') as dep_code
          , ifnull( doc.name,'') as Doc
          , ifnull(req.punct_datetime ,'') as punct_datetime
      , DATE_FORMAT(DATE_ADD(req.punct_datetime, INTERVAL 543 YEAR ),'%d/%m/%Y') as punct_date
      , ifnull( req.priority_trans_emergency,'') as priority_trans_emergency
      , ifnull( req.priority_trans,'') as priority_trans
      , ifnull( req.lab_hgb,'') as lab_hgb
      , ifnull( req.diag_1,'') as diag_1
      , ifnull( req.diag_more,'') as diag_more
      , ifnull( req.lab_plt,'') as lab_plt
      , ifnull( req.lab_hct,'') as lab_hct
      , ifnull( pdi.diag_name,'') as diag_name
      ,ifnull(req.anti_a,'') as anti_a
      , ifnull( req.anti_b,'') as anti_b
      , ifnull( req.anti_ab,'') as anti_ab
      , ifnull( req.anti_d,'') as anti_d
      ,ifnull(req.anti_a1,'') as anti_a1
      ,ifnull(req.anti_h,'') as anti_h

      ,ifnull(req.cell_a,'') as cell_a
      ,ifnull(req.cell_b,'') as cell_b
      ,ifnull(req.cell_o,'') as cell_o
      ,ifnull(req.cell_ctrl,'') as cell_ctrl
      ,ifnull(req.blood_gr,'') as blood_gr
      ,ifnull(req.blood_sub_gr,'') as blood_sub_gr
      ,ifnull(req.rhd_rt,'') as rhd_rt
      ,ifnull(req.rhd_37c,'') as rhd_37c
      ,ifnull(req.rhd_iat,'') as rhd_iat
      ,ifnull(req.blood_rh,'') as blood_rh
      ,ifnull(req.grouping_staff,'') as grouping_staff
      ,ifnull(req.grouping_datetime,'') as grouping_datetime
      , DATE_FORMAT(DATE_ADD(grouping_datetime, INTERVAL 543 YEAR ),'%d/%m/%Y') as pg_savedate
      , concat(DATE_FORMAT(DATE_ADD(grouping_datetime, INTERVAL 543 YEAR ),'%H:%i:%s'),' ','น.' ) as pg_savetime


      
      
      ,ifnull(req.note_Grouping,'') as note_Grouping
      ,ifnull(req.abs_o1_rt,'') as abs_o1_rt
      ,ifnull(req.abs_o1_37c,'') as abs_o1_37c
      ,ifnull(req.abs_o1_iat,'') as abs_o1_iat
      ,ifnull(req.abs_o2_rt,'') as abs_o2_rt
      ,ifnull(req.abs_o2_37c,'') as abs_o2_37c
      ,ifnull(req.abs_o2_iat,'') as abs_o2_iat
      ,ifnull(req.abs_o3_rt,'') as abs_o3_rt
      ,ifnull(req.abs_o3_37c,'') as abs_o3_37c
      ,ifnull(req.abs_o3_iat,'') as abs_o3_iat
      ,ifnull(req.abs_result,'') as abs_result
      ,ifnull(req.abs_staff,'') as abs_staff
      ,ifnull(req.abs_date_time,'') as abs_date_time
      ,ifnull(req.dat_rt,'') as dat_rt
      ,ifnull(req.dat_iat,'') as dat_iat
      ,ifnull(req.dat_37c,'') as dat_37c
      ,ifnull(req.dat_result,'') as dat_result
      ,ifnull(req.dat_staff,'') as dat_staff
      ,ifnull(req.dat_datetime,'') as dat_datetime
      ,ifnull(req.autologous_rt,'') as autologous_rt
    , DATE_FORMAT(DATE_ADD(req.abs_date_time, INTERVAL 543 YEAR ),'%d/%m/%Y') as abs_savedate
    , concat(DATE_FORMAT(DATE_ADD(req.abs_date_time, INTERVAL 543 YEAR ),'%H:%i:%s'),' ','น.' ) as abs_savetime
    , DATE_FORMAT(DATE_ADD(req.dat_datetime, INTERVAL 543 YEAR ),'%d/%m/%Y') as dat_savedate
    , concat(DATE_FORMAT(DATE_ADD(req.dat_datetime, INTERVAL 543 YEAR ),'%H:%i:%s'),' ','น.' ) as dat_savetime

   
    ,ifnull(req.autologous_37c,'') as autologous_37c
    ,ifnull(req.autologous_iat,'') as autologous_iat
    ,ifnull(req.autologous_result,'') as autologous_result
    ,ifnull(req.autologous_staff,'') as autologous_staff
    ,ifnull(req.note_Grouping,'') as note_Grouping
    ,ifnull(req.confirm_staff,'') as confirm_staff
    ,ifnull(req.confirm_datetime,'') as confirm_datetime
    ,ifnull(req.note_ABS,'') as note_ABS
    ,ifnull(req.note_Dat_Autocontrol,'') as note_Dat_Autocontrol
    ,ifnull(req.autologous_datetime,'') as autologous_datetime
    ,ifnull(pn.note_datetime,'') as note_datetime
    ,ifnull(pn.note_detail,'') as note_detail
    ,DATE_FORMAT(DATE_ADD(req.autologous_datetime, INTERVAL 543 YEAR ),'%d/%m/%Y') as at_savedate
    , concat(DATE_FORMAT(DATE_ADD(req.autologous_datetime, INTERVAL 543 YEAR ),'%H:%i:%s'),' ','น.' ) as at_savetime
    ,DATE_FORMAT(DATE_ADD(pn.note_datetime, INTERVAL 543 YEAR), '%d/%m/%Y %H:%i:%s') as note_datetime_format 

    ,ifnull(pfg.fgt_blood_gr,'') as fgt_blood_gr
    ,ifnull(pfg.fgt_blood_rh,'') as fgt_blood_rh
    , concat(fgt_blood_gr , fgt_blood_rh ) as finger

    ,ifnull(req.note,'') as note
    ,ifnull(req.bb_code,'') as bb_code
      FROM patient_request AS req
      left join patient as p ON req.hn = p.hn
      left join patient_note as pn ON req.hn = pn.hn
      left join bb_hospitals as hos ON req.hos_point = hos.hos_id
      left join patient_request_status as re_status ON req.request_status = re_status.rq_stutus_id
      left join bb_ward as wd ON req.ward = wd.ward
      left join patient_priority as p_prty ON req.priority = p_prty.priority_id
      left join bb_kskdepartment as dep ON req.dep_code = dep.depcode 
      left join bb_doctor as doc ON req.punct_staff = doc.code 
      left join patient_diag as pdi ON req.diag_1 = pdi.diag_id 
      left join patient_fingertip as pfg ON req.hn = pfg.fgt_hn
      

      
      where  req.order_number = '${NUM_BT}' `
    )

    .then((results) => {
      res.send(results);
      //  console.log("ssss2s", results);
    })

    .catch((error) => {
      return res.status(200).json({ message: "error" });
    });
};
const Patient_Grouping = (req, res) => {
  ////  console.log("bo", req.body);
  ////  console.log("qy", req.query);

  const { NUM_BT } = req.query;
  //  console.log("qy", { NUM_BT });

  dbConnection
    .execute(
      ` SELECT 
      order_number 
      ,req.anti_a
      ,IF(anti_a Is Null,'',anti_a) as anti_a
      ,req.anti_b
      ,IF(anti_b Is Null,'',anti_b) as anti_b
      ,req.anti_ab
      ,IF(anti_ab Is Null,'',anti_ab) as anti_ab
      ,req.anti_d
      ,IF(anti_d Is Null,'',anti_d) as anti_d
      ,req.anti_a1
      ,IF(anti_a1 Is Null,'',anti_a1) as anti_a1
      
      ,req.anti_h
      ,IF(anti_h Is Null,'',anti_h) as anti_h

      ,req.cell_a
      ,IF(cell_a Is Null,'',cell_a) as cell_a

      ,req.cell_b
      ,IF(cell_b Is Null,'',cell_b) as cell_b

      ,req.cell_o
      ,IF(cell_o Is Null,'',cell_o) as cell_o

      ,req.cell_ctrl
      ,IF(cell_ctrl Is Null,'',cell_ctrl) as cell_ctrl

      ,req.blood_gr
      ,IF(blood_gr Is Null,'',blood_gr) as blood_gr

      ,req.blood_sub_gr
      ,IF(blood_sub_gr Is Null,'',blood_sub_gr) as blood_sub_gr

      ,req.rhd_rt
      ,IF(rhd_rt Is Null,'',rhd_rt) as rhd_rt

      ,req.rhd_37c
      ,IF(rhd_37c Is Null,'',rhd_37c) as rhd_37c

      ,req.rhd_iat
      ,IF(rhd_iat Is Null,'',rhd_iat) as rhd_iat

      ,req.blood_rh
      ,IF(blood_rh Is Null,'',blood_rh) as blood_rh

      ,req.grouping_staff
      ,IF(grouping_staff Is Null,'',grouping_staff) as grouping_staff

      ,req.grouping_datetime
      ,IF(grouping_datetime Is Null,'',grouping_datetime) as grouping_datetime

      , DATE_FORMAT(DATE_ADD(grouping_datetime, INTERVAL 543 YEAR ),'%d/%m/%Y') as pg_savedate
      , DATE_FORMAT(DATE_ADD(grouping_datetime, INTERVAL 543 YEAR ),'%H:%i:%s') as pg_savetime


        FROM patient_request 
      
      WHERE order_number  = '${NUM_BT}' `
    )

    .then((results) => {
      res.send(results);
      //  console.log("ssss2s", results);
    })

    .catch((error) => {
      return res.status(200).json({ message: "error" });
    });
};
const Antibody_Screening_Result = (req, res) => {
  ////  console.log("bo", req.body);
  ////  console.log("qy", req.query);

  const { NUM_BT } = req.query;
  //  console.log("qy", { NUM_BT });

  dbConnection
    .execute(
      ` SELECT 
      order_number
      ,ifnull(req.abs_o1_rt,'') as abs_o1_rt
      ,ifnull(req.abs_o1_37c,'') as abs_o1_37c
      ,ifnull(req.abs_o1_iat,'') as abs_o1_iat

      ,ifnull(req.abs_o2_rt,'') as abs_o2_rt
      ,ifnull(req.abs_o2_37c,'') as abs_o2_37c
      ,ifnull(req.abs_o2_iat,'') as abs_o2_iat

      ,ifnull(req.abs_o3_rt,'') as abs_o3_rt
      ,ifnull(req.abs_o3_37c,'') as abs_o3_37c
      ,ifnull(req.abs_o3_iat,'') as abs_o3_iat


      ,ifnull(req.abs_result,'') as abs_result
      ,ifnull(req.abs_staff,'') as abs_staff
  
		,req.abs_date_time
    , DATE_FORMAT(DATE_ADD(req.abs_date_time, INTERVAL 543 YEAR ),'%d/%m/%Y') as abs_savedate
    , DATE_FORMAT(DATE_ADD(req.abs_date_time, INTERVAL 543 YEAR ),'%H:%i:%s') as abs_savetime

        FROM patient_request 
      
      
      WHERE order_number  = '${NUM_BT}' `
    )

    .then((results) => {
      res.send(results);
      //  console.log("ssss2s", results);
    })

    .catch((error) => {
      return res.status(200).json({ message: "error" });
    });
};

const DATandAutocontrol_Result = (req, res) => {
  ////  console.log("bo", req.body);
  ////  console.log("qy", req.query);

  const { NUM_BT } = req.query;
  //  console.log("qy", { NUM_BT });

  dbConnection
    .execute(
      ` SELECT 
      order_number

      ,ifnull(req.dat_rt,'') as dat_rt
      ,ifnull(req.dat_37c,'') as dat_37c
      ,ifnull(req.dat_iat,'') as dat_iat
      ,ifnull(req.dat_result,'') as dat_result
      ,ifnull(req.dat_staff,'') as dat_staff

,req.dat_datetime
, DATE_FORMAT(DATE_ADD(req.dat_datetime, INTERVAL 543 YEAR ),'%d/%m/%Y') as dat_savedate
, DATE_FORMAT(DATE_ADD(req.dat_datetime, INTERVAL 543 YEAR ),'%H:%i:%s') as dat_savetime

,ifnull(req.autologous_rt,'') as autologous_rt
,ifnull(req.autologous_37c,'') as autologous_37c
,ifnull(req.autologous_iat,'') as autologous_iat
,ifnull(req.autologous_result,'') as autologous_result
,ifnull(req.autologous_staff,'') as autologous_staff

,req.autologous_datetime
, DATE_FORMAT(DATE_ADD(req.autologous_datetime, INTERVAL 543 YEAR ),'%d/%m/%Y') as at_savedate
, DATE_FORMAT(DATE_ADD(req.autologous_datetime, INTERVAL 543 YEAR ),'%H:%i:%s') as at_savetime

      
        FROM patient_request 
      
      
      WHERE order_number  = '${NUM_BT}' `
    )

    .then((results) => {
      res.send(results);
      //  console.log("ssss2s", results);
    })

    .catch((error) => {
      return res.status(200).json({ message: "error" });
    });
};

const AntibodyResult = (req, res) => {
  ////  console.log("bo", req.body);
  ////  console.log("qy", req.query);

  const { NUM_BT } = req.query;
  //  console.log("qy", { NUM_BT });

  dbConnection
    .execute(
      `SELECT 
      p.order_number
		
,ab.A1
,ab.H
,ab.D
,ab.c1
,ab.e1
,ab.c2
,ab.e2
,ab.cw
,ab.k1
,ab.k2
,ab.kpa
,ab.kpb
,ab.jsa
,ab.jsb
,ab.jka

,ab.jkb
,ab.jk3
,ab.m
,ab.n
,ab.s1
,ab.s2
,ab.mia
,ab.lea
,ab.leb
,ab.fya
,ab.fyb
,ab.fy3
,ab.dia
,ab.dib
,ab.i1
,ab.i2
,ab.coa
,ab.cob
,ab.ct
,ab.wt
,ab.hemolysis
,ab.xga
,ab.fm
,ab.p1
,ab.tja
,ab.uniden
,ab.lua
,ab.lub
,ab.rf


,ifnull(ab.save_staff,'') as save_staff
,ifnull(ab.save_date,'') as save_date

,ifnull(ab.note_antibody,'') as note_antibody
,ifnull(ab.iden_result,'') as resultATB


, DATE_FORMAT(DATE_ADD(ab.save_date, INTERVAL 543 YEAR ),'%d/%m/%Y') as ATB_savedate
, DATE_FORMAT(DATE_ADD(ab.save_date, INTERVAL 543 YEAR ),'%H:%i:%s') as ATB_savetime
        FROM patient_request as p
				left join patient_antibody as ab ON p.hn = ab.hn
      
      
      WHERE p.order_number  =  '${NUM_BT}'   order BY ab.id DESC`
    )

    .then((results) => {
      res.send(results);
      //  console.log("ssss2s", results);
    })

    .catch((error) => {
      return res.status(200).json({ message: "error" });
    });
};

const AntigenResult = (req, res) => {
  ////  console.log("bo", req.body);
  ////  console.log("qy", req.query);

  const { NUM_BT } = req.query;
  //  console.log("qy", { NUM_BT });

  dbConnection
    .execute(
      `SELECT 
      p.order_number
			,p.hn
,aj.a1
,aj.H
,aj.D
,aj.c1
,aj.c2
,aj.e1
,aj.e2
,aj.k1
,aj.k2
,aj.dia
,aj.dib
,aj.m
,aj.n
,aj.s1
,aj.s2
,aj.mia
,aj.lea
,aj.leb
,aj.coa
,aj.cob
,aj.jka
,aj.jkb
,aj.i1
,aj.i2
,aj.p1
,aj.p
,aj.lua
,aj.lub
,aj.fya
,aj.fyb
,aj.xga

,ifnull(aj.result,'') as resultATG
,ifnull(aj.note_antigen,'') as note_antigen
,ifnull(aj.save_staff,'') as save_staff
,ifnull(aj.save_date,'') as save_date

, DATE_FORMAT(DATE_ADD(save_date, INTERVAL 543 YEAR ),'%d/%m/%Y') as ATG_savedate
, DATE_FORMAT(DATE_ADD(save_date, INTERVAL 543 YEAR ),'%H:%i:%s') as ATG_savetime

        FROM patient_request as p
				left join patient_antigen as aj ON p.hn = aj.hn
      
      
      WHERE p.order_number  =  '${NUM_BT}'  order BY aj.id DESC`
    )

    .then((results) => {
      res.send(results);
      //  console.log("ssss2s", results);
    })

    .catch((error) => {
      return res.status(200).json({ message: "error" });
    });
};

const hn_user_search_modal = (req, res) => {
  const { keyword } = req.query;
  ////  console.log(keyword);
  const query_hn = `SELECT     pp.hn,
  p.pname,
 p.fname,
  p.lname,
  date_format(birthday, '%Y-%m-%d') AS bd_eng,
  date_format(DATE_ADD(birthday, INTERVAL 543 YEAR), '%Y-%m-%d')
     AS bd_th,
  p.sex,
  p.bloodgrp,
  p.bloodrh,
  p.subgroup_abo,
  concat(CONVERT(DATE_FORMAT(FROM_DAYS(DATEDIFF(NOW(), birthday)), '%Y') + 0, char), ' ปี ',CONVERT(DATE_FORMAT(FROM_DAYS(DATEDIFF(NOW(), birthday)), '%m') - 1, char), ' เดือน ', CONVERT(DATE_FORMAT(FROM_DAYS(DATEDIFF(NOW(), birthday)), '%d') - 1, char), ' วัน ') as age
  FROM patient_request as pp
  left join patient as p on pp.hn = p. hn

  where ( pp.hn like '%${keyword}%' or concat(p.pname,p.fname,' ' ,p.lname) like '%${keyword}%'  ) limit 10;
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

const Search_bloodDetil_madal = (req, res) => {
  const { hn } = req.query;

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
  
  where  req.hn = '${hn}' `;

  //  console.log(queryString);

  dbConnection
    .execute(queryString)

    .then((results) => {
      res.send(results[0]);
    })

    .catch((error) => {
      return res.status(500).json({ message: "error", error: error.message });
    });
};

const request_blood_hisINTap = (req, res) => {
  const { pid, order_number } = req.query;

  const query = `select 
    DATE_FORMAT(DATE_ADD(request_datetime, INTERVAL 543 YEAR), '%d/%m/%Y %H:%i:%s') as request_datetime_format 
    from patient_request where hn = '${pid}' and order_number <> '${order_number}' order by request_datetime desc limit 1`;
  dbConnection
    .execute(query)
    .then((results) => {
      res.send(results[0]);
    })
    .catch((error) => {
      return res.status(500).json({ message: "error", message: error.message });
    });
  // console.log("99999",query);
};

const receive_blood_hisINTap = (req, res) => {
  const { pid, order_number } = req.query;

  const query = `select DATE_FORMAT(DATE_ADD(c.trans_date_time, INTERVAL 543 YEAR), '%d/%m/%Y %H:%i:%s') as receive_datetime_format 
  from patient_request as req 
  left join patient_crossmatch as c 
  ON req.order_number = c.order_number
  where req.hn = '${pid}' and req.order_number <> '${order_number}' 
  and xm_status = 4 
  order by trans_date_time desc limit 1`;
  dbConnection
    .execute(query)
    .then((results) => {
      res.send(results[0]);
    })
    .catch((error) => {
      return res.status(500).json({ message: "error", message: error.message });
    });
  // console.log("888888",query);
};

const patient_noteIntap = (req, res) => {
  const { pid } = req.query;
  const query = `SELECT DATE_FORMAT(DATE_ADD(note_datetime, INTERVAL 543 YEAR), '%d/%m/%Y %H:%i:%s') as note_datetime_format ,note_detail 
  FROM patient_note WHERE hn = '${pid}' `;
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

const Blood_Request_Crossmatch = (req, res) => {
  const { order_number } = req.query;
  const query = `
  select b.type_id 
  , t.s_name 
  , b.count_unit 
  , c.xm_status as num_status 
  , count(c.xm_id) as count_status 
  from patient_request_blood as b 
  left join blood_type as t ON b.type_id = t.id 
  left join patient_crossmatch as c ON(b.order_number = c.order_number and b.type_id = c.xm_type) 
  where b.order_number = '${order_number}' 
  group by b.type_id, c.xm_status 
  order by t.component_type asc, t.display asc
  `;
  dbConnection
    .execute(query)
    .then((results) => {
      res.send(results[0]);
    })
    .catch((error) => {
      return res.status(500).json({ message: "error", message: error.message });
    });
};

const Crossmatch_API = (req, res) => {
  //  console.log("data.body", req.body);
  // console.log("data.quyery", req.query);
  const { TB } = req.query;

  const strQuery2 = `select cs.xm_status_name
  , b.blood_no
  , concat(SUBSTRING(b.blood_no FROM 1 FOR 3), '.',SUBSTRING(b.blood_no FROM 4 FOR 2), '.',SUBSTRING(b.blood_no FROM 6 FOR 1), '.',SUBSTRING(b.blood_no FROM 7)) as bl_unit_no
  , c.xm_segment
  , b.blood_group
  , b.blood_rh
  , t.s_name
  , concat(b.blood_group , b.blood_rh ) as GR
  , c.xm_vol
  ,c.xm_confirm
  , c.xm_rt
  , c.xm_37c
  , c.xm_iat
  , c.xm_gel
  , c.xm_result
  , if (c.xm_edit_staff is not null, c.xm_edit_staff,c.xm_staft) as xm_staft
  , if (c.xm_edit_date_time is not null,DATE_FORMAT(DATE_ADD(c.xm_edit_date_time, INTERVAL 543 YEAR), '%d/%m/%Y %H:%i:%s') ,DATE_FORMAT(DATE_ADD(c.xm_date_time, INTERVAL 543 YEAR), '%d/%m/%Y %H:%i:%s')) as xm_date_time
  , c.xm_id
  , c.xm_status
  , q.request_status
  , c.xm_instru_datetime
  , DATE_FORMAT(DATE_ADD(b.expiry_date , INTERVAL 543 YEAR), '%d/%m/%Y') as exp
  , ifnull(c.xm_confirm_staff,'') as xm_confirm_staff
, ifnull(c.xm_confirm_date_time,'') as xm_confirm_date_time

  FROM patient_request as q
  left join patient_crossmatch as c ON q.order_number = c.order_number
  left join blood as b ON c.bl_id = b.id
  left join patient_crossmatch_status as cs ON c.xm_status = cs.xm_status_id
  left join blood_type as t ON b.blood_type = t.id
  where q.order_number = '${TB}' and b.blood_no = '${req.query.Unit_no_csm}'
  and c.xm_id is not null 
 -- group by c.bl_id 
  order by t.component_type asc, t.id asc, c.xm_status asc , c.xm_id asc;`;

  // console.log("strQuery2", strQuery2);

  dbConnection
    .execute(strQuery2)

    .then((results) => {
      res.send(results);
    })

    .catch((error) => {
      return res.status(200).json({ message: "error" });
    });
};

const Search_xmid = async (req, res) => {
  console.log("datass.body", req.body);
  console.log("datass.quyery", req.query);
  const {
    order_num,
    Gel_csm,
    IAT_csm,
    RT_csm,
    Result_csm,
    Segment_csm,
    Unit_no_csm,
    Volume_csm,
    blood_status_search,
    // ,checkbox_CSM_TABLE
    temperature_room_csm,
    staff,
    id,
    xm_note,
  } = req.body;

  const query = ` SELECT xm_id FROM patient_crossmatch where order_number='${order_num}' ORDER BY xm_id desc`;
  const results = await dbConnection.execute(query);

  // let new_xmid = "";
  try {
    if (
      results[0][0].xm_id != "" ||
      results[0][0].xm_id != null ||
      results[0][0].xm_id != undefined
    ) {
      new_xmid = Number(results[0][0].xm_id) + 1;
    } else {
      new_xmid = results[0][0].xm_id + "01";
      // console.log("noooo");
    }

    // let query_insert_cross = "";

    if (new_xmid != "") {
      query_insert_cross = `
      INSERT INTO patient_crossmatch (xm_id, order_number, xm_type, xm_status,bl_id,xm_vol,xm_segment,xm_rt,xm_37c,xm_iat,xm_gel,xm_result,xm_note,xm_staft,xm_date_time)
      VALUES ('${new_xmid}', '${order_num}', '${blood_status_search}','3', '${id}', '${Volume_csm}', '${Segment_csm}', '${RT_csm}', '${temperature_room_csm}', '${IAT_csm}', '${Gel_csm}', '${Result_csm}', '${xm_note}', '${staff}',NOW())
      `;

      const resultsAdd_datacross = await dbConnection.execute(
        query_insert_cross
      );

      const UpdateBlood = `UPDATE blood SET  
      used_date = now(),
      status = '3'
      WHERE id = '${id}' `;
      const resultUpdateBlood = await dbConnection.execute(UpdateBlood);

      const UpdateReqBlood = `UPDATE patient_request_blood SET 
    sum_trans = (SELECT PT_Get_Transcount('${order_num}')) , 
    sum_cross = (SELECT PT_Get_XMcount('${order_num}'))
    WHERE order_number= '${order_num}'`;
      const resultReqBlood = await dbConnection.execute(UpdateReqBlood);

      return res.status(200).json({ message: "success" });
    } else {
    }
  } catch (error) {
    return res.status(500).json({ message: "error", message: error.message });
  }
};
const Crossmatch_EDIT = (req, res) => {
  const { xm_id } = req.query;

  dbConnection
    .execute(
      `select cs.xm_status_name
      , b.blood_no
      , concat(SUBSTRING(b.blood_no FROM 1 FOR 3), '.',SUBSTRING(b.blood_no FROM 4 FOR 2), '.',SUBSTRING(b.blood_no FROM 6 FOR 1), '.',SUBSTRING(b.blood_no FROM 7)) as bl_unit_no
      , c.xm_segment
      , b.blood_group
      , b.blood_rh
      , t.s_name
    
      , concat(ifnull(b.blood_group,'') ,ifnull(b.blood_rh,'') ) as GR
      ,t.id as id_typeblood
      , c.xm_vol
      ,c.xm_confirm
      , c.xm_rt
      , c.xm_37c
      , c.xm_iat
      , c.xm_gel
      , c.xm_result
      , if (c.xm_edit_staff is not null, c.xm_edit_staff,c.xm_staft) as xm_staft
      , if (c.xm_edit_date_time is not null,DATE_FORMAT(DATE_ADD(c.xm_edit_date_time, INTERVAL 543 YEAR), '%d/%m/%Y %H:%i:%s') ,DATE_FORMAT(DATE_ADD(c.xm_date_time, INTERVAL 543 YEAR), '%d/%m/%Y %H:%i:%s')) as xm_date_time
      , c.xm_id
      , c.xm_status
      , q.request_status
      , c.xm_instru_datetime
      , DATE_FORMAT(DATE_ADD(b.expiry_date , INTERVAL 543 YEAR), '%d/%m/%Y') as exp
      , ifnull(c.xm_confirm_staff,'') as xm_confirm_staff
, ifnull(c.xm_confirm_date_time,'') as xm_confirm_date_time

,ifnull(c.xm_staft,'') as xm_staft
,ifnull(c.xm_note,'') as xm_note
      , DATE_FORMAT(DATE_ADD(c.xm_date_time, INTERVAL 543 YEAR ),'%d/%m/%Y') as xm_savedate
      , concat(DATE_FORMAT(DATE_ADD(c.xm_date_time, INTERVAL 543 YEAR ),'%H:%i:%s'),' ','น.' ) as xm_savetime


      FROM patient_request as q
      left join patient_crossmatch as c ON q.order_number = c.order_number
      left join blood as b ON c.bl_id = b.id
      left join patient_crossmatch_status as cs ON c.xm_status = cs.xm_status_id
      left join blood_type as t ON b.blood_type = t.id
      where c.xm_id = '${xm_id}'
      and c.xm_id is not null 
     -- group by c.bl_id 
      order by t.component_type asc, t.id asc, c.xm_status asc , c.xm_id asc;`
    )
    .then((results) => {
      res.send(results);
    })

    .catch((error) => {
      return res.status(200).json({ message: "error" });
    });
};
module.exports = {
  insert_BloodDetil,
  Choiciall,
  blood_group_subgroup,
  Antibody_Screening,
  ShowINdexBlooddetil,
  BB_kskdepartment,
  Hospitals,
  Bloodneed_API,
  ST_RE_API,
  Search_bloodDetil,
  BloodGR_pc,
  WARD_API,
  TypeBlood_API,
  Crossmatching_Result,
  Crossmatch_TB_API,
  Blood_Request_Table,
  Patient_Grouping,
  Antibody_Screening_Result,
  DATandAutocontrol_Result,
  AntibodyResult,
  AntigenResult,
  Fromshowdata,
  hn_user_search_modal,
  Search_bloodDetil_madal,
  Data_bloodrequesresult,
  Search_bloodNO,
  UP_Patient_Grouping,
  UP_AntibodyScreening,
  UP_DATandAutocontrol,
  con_pg,
  Chexkcon_pg,
  showChexkcon_pg,
  Count_TypeBlood_API,
  Chexkcon_Groupcon,
  UP_antibodyiden,
  request_blood_hisINTap,
  receive_blood_hisINTap,
  patient_noteIntap,
  UP_antigeniden,
  Blood_Request_Crossmatch,
  UP_BBCODE,
  Crossmatch_API,
  Search_xmid,
  Crossmatch_EDIT,
};
