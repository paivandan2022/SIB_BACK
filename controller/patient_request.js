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
  // // console.log("data.body", req.body);
  // // console.log("data.quyery", req.query);
  const strQuery3 = `UPDATE patient_request SET note_ABS='${req.body.note_ABS}',abs_o1_rt = '${req.body.abs_o1_rt}' ,abs_o1_37c = '${req.body.abs_o1_37c}',abs_o1_iat= '${req.body.abs_o1_iat}',abs_o2_rt = '${req.body.abs_o2_rt}' ,abs_o2_37c = '${req.body.abs_o2_37c}',abs_o2_iat= '${req.body.abs_o2_iat}',abs_o3_rt = '${req.body.abs_o3_rt}' ,abs_o3_37c = '${req.body.abs_o3_37c}',abs_o3_iat= '${req.body.abs_o3_iat}',abs_result= '${req.body.abs_result}',abs_staff='${req.body.staff}',abs_date_time= NOW() Where order_number = '${req.body.order_num}'`;
  // // console.log("UP_AntibodyScreening", strQuery3);
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
  // // console.log("data.body", req.body);
  // // console.log("data.quyery", req.query);
  const strQuery2 = `UPDATE patient_request SET dat_rt = '${req.body.dat_rt}' ,dat_rt = '${req.body.dat_rt}',dat_iat= '${req.body.dat_iat}',dat_result = '${req.body.dat_result}' ,autologous_rt = '${req.body.autologous_rt}',autologous_37c= '${req.body.autologous_37c}',autologous_iat = '${req.body.autologous_iat}' ,autologous_result = '${req.body.autologous_result}',autologous_staff= '${req.body.staff}',dat_staff='${req.body.staff}',note_Dat_Autocontrol='${req.body.note_Dat_Autocontrol}',autologous_datetime=NOW(),dat_datetime=NOW() Where order_number = '${req.body.order_num}'`;
  // // console.log("UP_DATandAutocontrol", strQuery2);
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
  // // console.log("data.body", req.body);
  // // console.log("data.quyery", req.query);
  const strQuery2 = `
  INSERT INTO patient_antibody (id,A1,H,D,c1,e1,c2,e2,cw,k1,k2,kpa,kpb,jsa,jsb,jka,jkb,jk3,m,n,s1,s2,mia,lea,leb,fya,fyb,fy3,dia,dib,i1,i2,coa,cob,ct,wt,hemolysis,xga,fm,p1,tja,uniden,lua,lub,rf,iden_result,save_staff,hn,save_date,note_antibody) VALUES 
  ((select (t1.id+1) from patient_antibody as t1 order by t1.id desc limit 1),'${req.body.A1}','${req.body.H}','${req.body.D}','${req.body.c1}','${req.body.e1}','${req.body.c2}','${req.body.e2}','${req.body.cw}','${req.body.k1}','${req.body.k2}','${req.body.kpa}','${req.body.kpb}','${req.body.jsa}','${req.body.jsb}','${req.body.jka}','${req.body.jkb}','${req.body.jk3}','${req.body.m}','${req.body.n}','${req.body.s1}','${req.body.s2}','${req.body.mia}','${req.body.lea}','${req.body.leb}','${req.body.fya}','${req.body.fyb}','${req.body.fy3}','${req.body.dia}','${req.body.dib}','${req.body.i1}','${req.body.i2}','${req.body.coa}','${req.body.cob}','${req.body.ct}','${req.body.wt}','${req.body.hemolysis}','${req.body.xga}','${req.body.fm}','${req.body.p1}','${req.body.tja}','${req.body.uniden}','${req.body.lua}','${req.body.lub}','${req.body.rf}','${req.body.resultATB}' ,'${req.body.staff}','${req.body.hn}',NOW(),'${req.body.note_antibody}')`;
  // // console.log("antibody_testquery", strQuery2);
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
  // // console.log("data.body", req.body);
  // // console.log("data.quyery", req.query);
  const strQuery2 = `INSERT INTO patient_antigen (id,a1,H,D,c1,c2,e1,e2,k1,k2,dia,dib,m,n,s1,s2,mia,lea,leb,coa,cob,jka,jkb,i1,i2,p1,p,lua,lub,fya,fyb,result,note_antigen,save_staff,save_date,hn)
  values ((select (t1.id+1) from patient_antigen as t1 order by t1.id desc limit 1),'${req.body.a1}','${req.body.H}','${req.body.D}','${req.body.c1}','${req.body.c2}','${req.body.e1}','${req.body.e2}','${req.body.k1}','${req.body.k2}','${req.body.dia}','${req.body.dib}','${req.body.m}','${req.body.n}','${req.body.s1}','${req.body.s2}','${req.body.mia}','${req.body.lea}','${req.body.leb}','${req.body.coa}','${req.body.cob}','${req.body.jka}','${req.body.jkb}','${req.body.i1}','${req.body.i2}','${req.body.p1}','${req.body.p}','${req.body.lua}','${req.body.lub}','${req.body.fya}','${req.body.fyb}','${req.body.resultATG}','${req.body.note_antigen}','${req.body.staff}',NOW(),'${req.body.hn}')
   `;
  // // console.log("UP_antigeniden", strQuery2);
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
  // // console.log("data.body", req.body);
  // // console.log("data.quyery", req.query);
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
 where b.blood_no = '${req.body.Unit_no_csm}'   and bt.s_name = '${req.body.blood_status_search}'
  `;
  // // console.log("query", query);

  dbConnection
    .execute(query)
    .then((results) => {
      res.send(results[0]);
    })
    .catch((error) => {
      return res.status(500).json({ message: "error", message: error.message });
    });
};
const con_cross = async (req, res) => {
  // console.log("b", req.body);
  // // console.log("q", req.query);
  const { staff, order_num, xm_id } = req.body;
  try {
    // // console.log("req.body.xm_id", xm_id);

    if (
      xm_id == [] ||
      xm_id == "" ||
      xm_id == null ||
      xm_id == undefined ||
      xm_id == {}
    ) {
      const query2 = `UPDATE patient_crossmatch SET xm_confirm = ('Y'),xm_confirm_staff=('${staff}'),xm_confirm_date_time= NOW() Where order_number = ('${order_num}')and xm_confirm IS NULL or xm_confirm =''   `;
      const results2 = await dbConnection.execute(query2);
      // console.log("query2", query2);
    } else {
      let arry_xmid = "";
      for (let i = 0; i < xm_id.length; i++) {
        // // console.log("xm_id::",xm_id[i]);
        arry_xmid = xm_id[i];
        const query1 = `UPDATE patient_crossmatch SET xm_confirm = ('Y'),xm_confirm_staff=('${staff}'),xm_confirm_date_time= NOW() Where  xm_id = ('${xm_id[i]}')  `;
        const results1 = await dbConnection.execute(query1);
        // console.log("query1", query1);
      }
    }

    return res.status(200).json({ message: "success" });
  } catch (error) {
    return res.status(500).json({ message: "error", message: error.message });
  }

  //   const strQuery2 = `UPDATE patient_crossmatch SET xm_confirm = ('Y'),xm_confirm_staff=('${staff}'),xm_confirm_date_time= NOW() Where order_number = ('${order_num}')and xm_confirm IS NULL or xm_confirm =''
  //   `;
  //   // // console.log("ss",strQuery2);
  //   dbConnection.execute(strQuery2);
  //   return res.status(200).json({ message: "success" });
};
const con_pg = (req, res) => {
  //  // console.log("b", req.body);
  //  // console.log("q", req.query);

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
  // // console.log(query);
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
      //  // console.log("ssss2s", results);
    })

    .catch((error) => {
      return res.status(200).json({ message: "error" });
    });
};

const insert_BloodDetil = (req, res) => {
  //  // console.log("b", req.body);
  //  // console.log("q", req.query);

  ////  // console.log("BB", req.body.A1_IDC);

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
      ////  // console.log("show",results);
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
  // // console.log(query);
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
  // console.log("------------------------------------------------");
  // console.log("data.body", req.body);
  // console.log("data.quyery", req.query);
  // console.log("------------------------------------------------");

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
    name_search,
  } = req.query;

  //  // console.log("b", req.body);
  //  // console.log("q", req.query);
  // const { keyword } = req.query;
  //  // console.log(req.query.CheckBox_search);
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
      queryString += `and req.hn like '%${HN_search.trim()}%' `;
    }

    if (blood_request_number_search != "") {
      queryString += ` and (req.order_number like '%${blood_request_number_search.trim()}%' OR  req.his_ln like '%${blood_request_number_search.trim()}%') `;
    }
  } else {
    queryString += `where req.request_datetime  BETWEEN '${Request_date_blood_search} 00:00:00' AND '${Request_date_blood_to_search} 23:59:59'  `;

    if (date_of_use_search != "") {
      queryString += ` AND req.use_datetime  BETWEEN '${date_of_use_search} 00:00:00' AND '${date_of_use_to_search} 23:59:59' `;
    }

    if (HN_search != "") {
      queryString += `and req.hn = '${HN_search.trim()}' `;
    }
    if (name_search != "") {
      queryString += ` concat(fname, ' ', lname) like '%${name_search.trim()}%' `;
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
  queryString += `order by req.request_datetime desc , req.order_number asc; `;

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

  ////  // console.log(queryString);

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
      `select 
      ifnull( cs.xm_status_name,'') as xm_status_name
      ,ifnull( b.blood_no,'') as blood_no
      

      , concat(SUBSTRING(ifnull( b.blood_no,'') FROM 1 FOR 3), '.',SUBSTRING(ifnull( b.blood_no,'') FROM 4 FOR 2), '.',SUBSTRING(ifnull( b.blood_no,'') FROM 6 FOR 1), '.',SUBSTRING(ifnull( b.blood_no,'') FROM 7)) as bl_unit_no
       , concat(ifnull( b.blood_group,''),ifnull( b.blood_rh,'')) as GR
      ,ifnull( b.blood_group,'') as blood_group
      ,ifnull( b.blood_rh,'') as blood_rh
      ,ifnull( b.blood_value,'') as blood_value
      ,t.id as id_blood_ty

      ,ifnull( c.xm_segment,'') as xm_segment


      ,ifnull( t.s_name,'') as s_name


      ,ifnull( c.xm_vol,'') as xm_vol
      ,ifnull( c.xm_confirm,'') as xm_confirm
      ,ifnull( c.xm_rt,'') as xm_rt
      ,ifnull( c.xm_37c,'') as xm_37c
      ,ifnull( c.xm_iat,'') as xm_iat
      ,ifnull( c.xm_gel,'') as xm_gel
      ,ifnull( c.xm_result,'') as xm_result


      , if (c.xm_edit_staff is not null, c.xm_edit_staff,c.xm_staft) as xm_staft
      , if (c.xm_edit_date_time is not null,DATE_FORMAT(DATE_ADD(c.xm_edit_date_time, INTERVAL 543 YEAR), '%d/%m/%Y %H:%i:%s') ,DATE_FORMAT(DATE_ADD(c.xm_date_time, INTERVAL 543 YEAR), '%d/%m/%Y %H:%i:%s')) as xm_date_time
      , c.xm_id

      ,ifnull( c.xm_status,'') as xm_status
      , DATEDIFF(b.expiry_date, NOW()) as b_exp
      , c.xm_status
      , q.request_status
      , c.xm_instru_datetime
      , DATE_FORMAT(DATE_ADD(b.expiry_date , INTERVAL 543 YEAR), '%d/%m/%Y') as exp
      , ifnull(c.xm_confirm_staff,'') as xm_confirm_staff
, ifnull(c.xm_confirm_date_time,'') as xm_confirm_date_time
, ifnull(c.xm_note,'') as xm_note


      FROM patient_request as q
      left join patient_crossmatch as c ON q.order_number = c.order_number
      left join blood as b ON c.bl_id = b.id
      left join patient_crossmatch_status as cs ON c.xm_status = cs.xm_status_id
      left join blood_type as t ON b.blood_type = t.id
      where q.order_number = '${TB}'
      -- and t.id = 1
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
  ////  // console.log("bo", req.body);
  ////  // console.log("qy", req.query);

  const { NUM_BT } = req.query;
  //  // console.log("qy", { NUM_BT });

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
  ////  // console.log("bo", req.body);
  ////  // console.log("qy", req.query);

  const { NUM_BT } = req.query;

  //  // console.log("qy", { NUM_BT });

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
      ////  // console.log("ssss2s", results);
    })

    .catch((error) => {
      return res.status(200).json({ message: "error" });
    });
};

const Data_bloodrequesresult = (req, res) => {
  ////  // console.log("bo", req.body);
  // // console.log("qy", req.query);
  const { NUM_BT } = req.query;
  const test = `SELECT req.order_number 
  , ifnull(req.anti_a_pic,'') as anti_a_pic
  , ifnull(req.anti_b_pic,'') as anti_b_pic
  , ifnull(req.anti_d_pic,'') as anti_d_pic
  , ifnull(req.cell_a_pic,'') as cell_a_pic
  , ifnull(req.cell_b_pic,'') as cell_b_pic
  , ifnull(req.cell_ctrl_pic,'') as cell_ctrl_pic
  , ifnull(req.abs_o1_iat_pic,'') as abs_o1_iat_pic
  , ifnull(req.abs_o2_iat_pic,'') as abs_o2_iat_pic
  , ifnull(req.autologous_iat_pic,'') as autologous_iat_pic
  , ifnull(req.dat_iat_pic,'') as dat_iat_pic
  , ifnull(req.instru_datetime,'') as instru_datetime
  , ifnull(pmom.barcode,'') as barcode_mom
  , ifnull(pmom.anti_a,'') as anti_a_mom
, ifnull(pmom.anti_b,'') as anti_b_mom
, ifnull(pmom.anti_d,'') as anti_d_mom
, ifnull(pmom.cell_a,'') as cell_a_mom
, ifnull(pmom.cell_b,'') as cell_b_mom
, ifnull(pmom.cell_ctrl,'') as cell_ctrl_mom
, ifnull(pmom.blood_gr,'') as blood_gr_mom
, ifnull(pmom.blood_rh,'') as blood_rh_mom
, ifnull(pmom.dat_iat,'') as dat_iat_mom
, ifnull(pmom.dat_result,'') as dat_result_mom
, ifnull(pmom.autologous_iat,'') as autologous_iat_mom
, ifnull(pmom.autologous_result,'') as autologous_result_mom
, ifnull(pmom.abs_o1_iat,'') as abs_o1_iat_mom
, ifnull(pmom.abs_o2_iat,'') as abs_o2_iat_mom
, ifnull(pmom.abs_o3_iat,'') as abs_o3_iat_mom
, ifnull(pmom.abs_result,'') as abs_result_mom
, ifnull(pmom.file_date,'') as file_date_mom
, ifnull(pmom.status,'') as status_mom
, ifnull(pmom.anti_a_pic,'') as anti_a_pic_mom
, ifnull(pmom.anti_b_pic,'') as anti_b_pic_mom
, ifnull(pmom.anti_d_pic,'') as anti_d_pic_mom
, ifnull(pmom.cell_a_pic,'') as cell_a_pic_mom
, ifnull(pmom.cell_b_pic,'') as cell_b_pic_mom
, ifnull(pmom.cell_ctrl_pic,'') as cell_ctrl_pic_mom
, ifnull(pmom.abs_o1_iat_pic,'') as abs_o1_iat_pic_mom
, ifnull(pmom.abs_o2_iat_pic,'') as abs_o2_iat_pic_mom
, ifnull(pmom.autologous_iat_pic,'') as autologous_iat_pic_mom
, ifnull(pmom.dat_iat_pic,'') as dat_iat_pic_mom



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
  left join patient_request_mom as pmom ON req.order_number = pmom.order_number
  

  
  where  req.order_number = '${NUM_BT}'`;
  // // console.log(test);
  dbConnection
    .execute(
      `  SELECT req.order_number 
      , ifnull(req.anti_a_pic,'') as anti_a_pic
      , ifnull(req.anti_b_pic,'') as anti_b_pic
      , ifnull(req.anti_d_pic,'') as anti_d_pic
      , ifnull(req.cell_a_pic,'') as cell_a_pic
      , ifnull(req.cell_b_pic,'') as cell_b_pic
      , ifnull(req.cell_ctrl_pic,'') as cell_ctrl_pic
      , ifnull(req.abs_o1_iat_pic,'') as abs_o1_iat_pic
      , ifnull(req.abs_o2_iat_pic,'') as abs_o2_iat_pic
      , ifnull(req.autologous_iat_pic,'') as autologous_iat_pic
      , ifnull(req.dat_iat_pic,'') as dat_iat_pic
      , ifnull(req.instru_datetime,'') as instru_datetime
      , ifnull(pmom.barcode,'') as barcode_mom
      , ifnull(pmom.anti_a,'') as anti_a_mom
, ifnull(pmom.anti_b,'') as anti_b_mom
, ifnull(pmom.anti_d,'') as anti_d_mom
, ifnull(pmom.cell_a,'') as cell_a_mom
, ifnull(pmom.cell_b,'') as cell_b_mom
, ifnull(pmom.cell_ctrl,'') as cell_ctrl_mom
, ifnull(pmom.blood_gr,'') as blood_gr_mom
, ifnull(pmom.blood_rh,'') as blood_rh_mom
, ifnull(pmom.dat_iat,'') as dat_iat_mom
, ifnull(pmom.dat_result,'') as dat_result_mom
, ifnull(pmom.autologous_iat,'') as autologous_iat_mom
, ifnull(pmom.autologous_result,'') as autologous_result_mom
, ifnull(pmom.abs_o1_iat,'') as abs_o1_iat_mom
, ifnull(pmom.abs_o2_iat,'') as abs_o2_iat_mom
, ifnull(pmom.abs_o3_iat,'') as abs_o3_iat_mom
, ifnull(pmom.abs_result,'') as abs_result_mom
, ifnull(pmom.file_date,'') as file_date_mom
, ifnull(pmom.status,'') as status_mom
, ifnull(pmom.anti_a_pic,'') as anti_a_pic_mom
, ifnull(pmom.anti_b_pic,'') as anti_b_pic_mom
, ifnull(pmom.anti_d_pic,'') as anti_d_pic_mom
, ifnull(pmom.cell_a_pic,'') as cell_a_pic_mom
, ifnull(pmom.cell_b_pic,'') as cell_b_pic_mom
, ifnull(pmom.cell_ctrl_pic,'') as cell_ctrl_pic_mom
, ifnull(pmom.abs_o1_iat_pic,'') as abs_o1_iat_pic_mom
, ifnull(pmom.abs_o2_iat_pic,'') as abs_o2_iat_pic_mom
, ifnull(pmom.autologous_iat_pic,'') as autologous_iat_pic_mom
, ifnull(pmom.dat_iat_pic,'') as dat_iat_pic_mom



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
      left join patient_request_mom as pmom ON req.order_number = pmom.order_number
      

      
      where  req.order_number = '${NUM_BT}' `
    )

    .then((results) => {
      res.send(results);
      //  // console.log("ssss2s", results);
    })

    .catch((error) => {
      return res.status(200).json({ message: "error" });
    });
};
const Patient_Grouping = (req, res) => {
  ////  // console.log("bo", req.body);
  ////  // console.log("qy", req.query);

  const { NUM_BT } = req.query;
  //  // console.log("qy", { NUM_BT });

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
      //  // console.log("ssss2s", results);
    })

    .catch((error) => {
      return res.status(200).json({ message: "error" });
    });
};
const Antibody_Screening_Result = (req, res) => {
  ////  // console.log("bo", req.body);
  ////  // console.log("qy", req.query);

  const { NUM_BT } = req.query;
  //  // console.log("qy", { NUM_BT });

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
      //  // console.log("ssss2s", results);
    })

    .catch((error) => {
      return res.status(200).json({ message: "error" });
    });
};

const DATandAutocontrol_Result = (req, res) => {
  ////  // console.log("bo", req.body);
  ////  // console.log("qy", req.query);

  const { NUM_BT } = req.query;
  //  // console.log("qy", { NUM_BT });

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
      //  // console.log("ssss2s", results);
    })

    .catch((error) => {
      return res.status(200).json({ message: "error" });
    });
};

const AntibodyResult = (req, res) => {
  ////  // console.log("bo", req.body);
  ////  // console.log("qy", req.query);

  const { NUM_BT } = req.query;
  //  // console.log("qy", { NUM_BT });

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
      //  // console.log("ssss2s", results);
    })

    .catch((error) => {
      return res.status(200).json({ message: "error" });
    });
};

const AntigenResult = (req, res) => {
  ////  // console.log("bo", req.body);
  ////  // console.log("qy", req.query);

  const { NUM_BT } = req.query;
  //  // console.log("qy", { NUM_BT });

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
      //  // console.log("ssss2s", results);
    })

    .catch((error) => {
      return res.status(200).json({ message: "error" });
    });
};

const hn_user_search_modal = (req, res) => {
  const { keyword } = req.query;
  ////  // console.log(keyword);
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

  //  // console.log("b", req.body);
  //  // console.log("q", req.query);
  // const { keyword } = req.query;
  //  // console.log(req.query.CheckBox_search);
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

  //  // console.log(queryString);

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
  // // console.log("99999",query);
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
  // // console.log("888888",query);
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
  // // console.log("2111",query);
};

const Crossmatch_API = (req, res) => {
  //  // console.log("data.body", req.body);
  // // console.log("data.quyery", req.query);
  const { TB } = req.query;

  const strQuery2 = `select cs.xm_status_name
  , b.blood_no
  , concat(SUBSTRING(b.blood_no FROM 1 FOR 3), '.',SUBSTRING(b.blood_no FROM 4 FOR 2), '.',SUBSTRING(b.blood_no FROM 6 FOR 1), '.',SUBSTRING(b.blood_no FROM 7)) as bl_unit_no
  , c.xm_segment
  , b.blood_group
  , b.blood_rh
  , t.s_name as s_name
  , concat(ifnull(b.blood_group,'') , ifnull(b.blood_rh,'') ) as GR
  , c.xm_vol
  ,c.xm_confirm
  ,t.id as id_blood_ty
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
const insert_crossmatch_inmodal = async (req, res) => {
  // // console.log("-------");
  // // console.log("datass.body", req.body);
  // // console.log("datass.quyery", req.query);
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
    doctor_name,
    note,
    ward,
  } = req.body;

  const query = ` SELECT xm_id FROM patient_crossmatch where order_number='${order_num}' ORDER BY xm_id desc`;
  const results = await dbConnection.execute(query);

  const querydoc = ` SELECT code,name FROM bb_doctor where code='${doctor_name}' `;
  const resultsdoc = await dbConnection.execute(querydoc);

  const queryward = ` SELECT * FROM bb_ward where ward='${ward}' `;
  const resultsward = await dbConnection.execute(queryward);
  let new_xmid = "";

  try {
    if (
      results[0][0] == "" ||
      results[0][0] == null ||
      results[0][0] == undefined
    ) {
      new_xmid = Number(order_num) + "01";
    } else {
      new_xmid = Number(results[0][0].xm_id) + 1;
    }

    // // console.log("new_xmid :: ", new_xmid);
    // let query_insert_cross = "";

    if (new_xmid != "") {
      query_insert_cross = `
      INSERT INTO patient_crossmatch (xm_id, order_number, xm_type, xm_status,bl_id,xm_vol,xm_segment,xm_rt,xm_37c,xm_iat,xm_gel,xm_result,xm_note,xm_staft,xm_date_time)
      VALUES ('${new_xmid}', '${order_num}', '${blood_status_search}','0', '${id}', '${Volume_csm}', '${Segment_csm}', '${RT_csm}', '${temperature_room_csm}', '${IAT_csm}', '${Gel_csm}', '${Result_csm}', '${xm_note}', '${staff}',NOW())
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

      // const insert_cross_un_group = `INSERT INTO patient_crossmatch_ungroup (order_number, xm_id,bl_id,doc_id,doc_name,ward_id,ward,note,staff,date_time)
      // VALUES ('${order_num}', '${new_xmid}', '${id}', '${resultsdoc[0][0].code}','${resultsdoc[0][0].name}','${resultsward[0][0].ward}','${resultsward[0][0].name}','${note}','${staff}',NOW());
      // `;

      // const resultun_group = await dbConnection.execute(insert_cross_un_group);

      return res.status(200).json({ message: "success" });
    } else {
    }
  } catch (error) {
    return res.status(500).json({ message: "error", message: error.message });
  }
};
const insert_crossmatch = async (req, res) => {
  // // console.log("datass.body", req.body);
  // // console.log("datass.quyery", req.query);
  const {
    order_num,

    blood_status_search,

    id,
    staff,
    // doctor_name,

    // ward,
  } = req.query;

  const query = ` SELECT xm_id FROM patient_crossmatch where order_number='${order_num}' ORDER BY xm_id desc`;
  const results = await dbConnection.execute(query);
  const querysname = ` SELECT id FROM  blood_type  WHERE s_name = '${blood_status_search}' `;
  const results_sname = await dbConnection.execute(querysname);
  let new_xmid = "";
  try {
    if (
      results[0][0] == "" ||
      results[0][0] == null ||
      results[0][0] == undefined
    ) {
      new_xmid = Number(order_num) + "01";
    } else {
      new_xmid = Number(results[0][0].xm_id) + 1;
    }
    if (new_xmid != "") {
      query_insert_cross = `
      INSERT INTO patient_crossmatch (xm_id, order_number, xm_type, xm_status,bl_id,xm_staft,xm_date_time)
      VALUES ('${new_xmid}', '${order_num}', '${results_sname[0][0].id}','0', '${id}','${staff}',now())
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
const insert_crossmatch_UnGR = async (req, res) => {
  // // console.log("datass.body", req.body);
  // // console.log("datass.quyery", req.query);
  const {
    order_num,
    blood_status_search,
    // ,checkbox_CSM_TABLE
    id,
    doctor_name,
    note,
    ward,
    staff,
  } = req.body;

  const query = ` SELECT xm_id FROM patient_crossmatch where order_number='${order_num}' ORDER BY xm_id desc`;
  const results = await dbConnection.execute(query);

  const querydoc = ` SELECT code,name FROM bb_doctor where code='${doctor_name}' `;
  const resultsdoc = await dbConnection.execute(querydoc);

  const queryward = ` SELECT * FROM bb_ward where ward='${ward}' `;
  const resultsward = await dbConnection.execute(queryward);

  const querysname = ` SELECT id FROM  blood_type  WHERE s_name = '${blood_status_search}' `;
  const results_sname = await dbConnection.execute(querysname);
  // let new_xmid = "";
  try {
    if (
      results[0][0] == "" ||
      results[0][0] == null ||
      results[0][0] == undefined
    ) {
      new_xmid = Number(order_num) + "01";
    } else {
      new_xmid = Number(results[0][0].xm_id) + 1;
    }

    // let query_insert_cross = "";

    if (new_xmid != "") {
      query_insert_cross = `
      INSERT INTO patient_crossmatch (xm_id, order_number, xm_type, xm_status,bl_id,xm_staft,xm_date_time)
      VALUES ('${new_xmid}', '${order_num}', '${results_sname[0][0].id}','0', '${id}','${staff}',now())
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

      const insert_cross_un_group = `INSERT INTO patient_crossmatch_ungroup (order_number, xm_id,bl_id,doc_id,doc_name,ward_id,ward,note,staff,date_time)
      VALUES ('${order_num}', '${new_xmid}', '${id}', '${resultsdoc[0][0].code}','${resultsdoc[0][0].name}','${resultsward[0][0].ward}','${resultsward[0][0].name}','${note}','${staff}',NOW());
      `;

      const resultun_group = await dbConnection.execute(insert_cross_un_group);

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


      ,ifnull( c.xm_vol,'') as xm_vol
      ,ifnull( c.xm_confirm,'') as xm_confirm
      ,ifnull( c.xm_rt,'') as xm_rt
      ,ifnull( c.xm_37c,'') as xm_37c
      ,ifnull( c.xm_iat,'') as xm_iat
      ,ifnull( c.xm_gel,'') as xm_gel
      ,ifnull( c.xm_result,'') as xm_result
      ,ifnull( c.xm_note,'') as xm_note
      , c.xm_id
      , c.xm_status
      , q.request_status
      , c.xm_instru_datetime
      , DATE_FORMAT(DATE_ADD(b.expiry_date , INTERVAL 543 YEAR), '%d/%m/%Y') as exp
      , ifnull(c.xm_confirm_staff,'') as xm_confirm_staff
, ifnull(c.xm_confirm_date_time,'') as xm_confirm_date_time
,ifnull(c.xm_note,'') as xm_note

      ,ifnull(c.xm_staft,'') as xm_staft
      , DATE_FORMAT(DATE_ADD(c.xm_date_time, INTERVAL 543 YEAR ),'%d/%m/%Y') as xm_savedate
      , concat(DATE_FORMAT(DATE_ADD(c.xm_date_time, INTERVAL 543 YEAR ),'%H:%i:%s'),' ','น.' ) as xm_savetime

      ,ifnull(c.xm_edit_staff,'') as xm_edit_staff
      , DATE_FORMAT(DATE_ADD(c.xm_edit_date_time, INTERVAL 543 YEAR ),'%d/%m/%Y') as xm_edit_date_time_savedate
      , concat(DATE_FORMAT(DATE_ADD(c.xm_edit_date_time, INTERVAL 543 YEAR ),'%H:%i:%s'),' ','น.' ) as xm_edit_date_time_savetime
     

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
const Search_bloodDetil_newlab = async (req, res) => {
  //    // console.log("data.body", req.body);
  console.log("data.quyery", req.query);
  // // console.log("------------------------------------------------");
  const {
    Request_date_blood_search,
    Request_date_blood_to_search,
    Type_choice,
    Search_value,
    CheckBox_search,

    // HN_search,
    // blood_request_number_search,
    // blood_request_point_search,
    // station_search,
    // blood_need_search,
    // blood_group_re_search,
    // blood_status_search,
    // //
    // WARD_search,
  } = req.query;

  // // console.log("b", req.body);
  // // console.log("q", req.query);
  // const { keyword } = req.query;
  //  // console.log(req.query.CheckBox_search);

  // const query2 = `SELECT  max(fgt_id) as id_max FROM patient_fingertip WHERE fgt_hn='${HN_search.trim()}'	 `;
  // const results5 = await dbConnection.execute(query2);

  let queryString = `
  SELECT req.order_number 
  , req.his_ln
  , if(req.his_an <>'',req.his_an,req.his_vn) as 'VN_AN'
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
,p.bloodrh
  ,p_prty.priority_name
  ,req.hos_point
  ,hos.hos_long_name_th
  ,req.request_status 
  ,re_status.rq_stutus_name
  ,req.cancel_detail
  ,req.patient_type
  ,req.ward
  ,req.req_ln
  ,req.req_mvc
  ,req.req_mch
  ,req.req_mchc
  ,req.confirm_status
  

  ,wd.name as wd_name
  ,req.priority
  ,p_prty.priority_id
  ,req.dep_code
  ,dep.department as dep_c

  ,req.request_old_tube
  , ifnull( req.department,'') as department
  , ifnull( req.lab_hgb,'') as lab_hgb
  , ifnull( req.lab_hct,'') as lab_hct
  , ifnull( req.lab_plt,'') as lab_plt
  , ifnull( pdi.diag_name,'') as diag_name
  , ifnull( p.sex,'') as sex
  , DATE_FORMAT(DATE_ADD(p.birthday, INTERVAL 543 YEAR ),'%d/%m/%Y') as birthday
  ,concat('(', CONVERT(concat(timestampdiff(year, p.birthday, curdate()) ,' ป. '
  , timestampdiff(month, date_add(p.birthday, interval timestampdiff(year, p.birthday, curdate())year), curdate()) , ' ด. '
                      , TIMESTAMPDIFF(DAY, DATE_ADD(DATE_ADD(p.birthday, INTERVAL TIMESTAMPDIFF(YEAR, p.birthday, CURDATE()) YEAR)
                      , INTERVAL TIMESTAMPDIFF(MONTH, DATE_ADD(p.birthday, INTERVAL TIMESTAMPDIFF(YEAR,p.birthday, CURDATE()) YEAR)
                     , CURDATE()) MONTH), CURDATE()) , ' ว.'),CHAR(50)),')') as age
  ,ifnull(req.note,'') as note



  FROM patient_request AS req
  left join patient as p ON req.hn = p.hn
  left join bb_hospitals as hos ON req.hos_point = hos.hos_id
  left join patient_request_status as re_status ON req.request_status = re_status.rq_stutus_id
  left join bb_ward as wd ON req.ward = wd.ward
  left join patient_priority as p_prty ON req.priority = p_prty.priority_id
  left join bb_kskdepartment as dep ON req.dep_code = dep.depcode 
  left join patient_diag as pdi ON req.diag_1 = pdi.diag_id 
 
  
  `;
  // left join patient_fingertip as pfg ON req.hn = pfg.fgt_hn

  // where req.request_datetime  BETWEEN '${Request_date_blood_search} 00:00:00' AND '${Request_date_blood_to_search} 23:59:59'  `;

  // ตัวเลือดการค้นหา
  //   , concat(ifnull(pfg.fgt_blood_gr,'') ,'', ifnull(pfg.fgt_blood_rh,'') ) as finger

  // if (CheckBox_search) {
  // // console.log("มีค่ามา");

  if (CheckBox_search == "false" || CheckBox_search == "") {
    queryString += `where req.request_datetime  BETWEEN '${Request_date_blood_search} 00:00:00' AND '${Request_date_blood_to_search} 23:59:59'  `;
  } else if (CheckBox_search == "true" || CheckBox_search) {
    if (Search_value != "") {
      queryString += `where req.request_datetime is not null  `;
    } else {
      queryString += `where req.request_datetime  BETWEEN '${Request_date_blood_search} 00:00:00' AND '${Request_date_blood_to_search} 23:59:59'  `;
    }
  }

  if (Type_choice == "hn" && Search_value != "") {
    queryString += `and req.hn like '%${Search_value.trim()}%' `;
  }

  if (Type_choice == "req" && Search_value != "") {
    queryString += ` and (req.order_number = '${Search_value.trim()}' OR  req.his_ln = '${Search_value.trim()}') `;
  }
  if (Type_choice == "dep" && Search_value != "") {
    queryString += ` and req.dep_code = '${Search_value.trim()}' `;
  }

  if (Type_choice == "hos" && Search_value != "") {
    queryString += `and req.hos_point = '${Search_value.trim()}' `;
  }

  if (CheckBox_search == "false") {
    if (Type_choice == "stu" && Search_value != "") {
      queryString += ` and req.request_status = '${Search_value.trim()}' `;
    }
  } else if (CheckBox_search == "true") {
    queryString += ` and req.request_status <> 99 `;
  }

  if (Type_choice == "wd" && Search_value != "") {
    queryString += `and req.ward = '${Search_value.trim()}' `;
  }
  if (Type_choice == "abo" && Search_value != "") {
    queryString += `and p.bloodgrp = '${Search_value.trim()}' `;
  }
  if (Type_choice == "pri" && Search_value != "") {
    queryString += `and req.priority = '${Search_value.trim()}' `;
  }

  queryString += `order by req.request_datetime desc , req.order_number asc; `;

  // // console.log("queryString : ", queryString);

  //   if (`pfg.fgt_id` != "") {
  //   queryString += `and pfg.fgt_id ='${results5[0][0].id_max}' Group by  req.order_number`;
  // }
  //  // console.log(queryString);
  // // console.log(results5[0][0].id_max);
  dbConnection
    .execute(queryString)

    .then((results) => {
      // // console.log("results : ", results[0].length);
      res.send(results[0]);
    })

    .catch((error) => {
      return res.status(500).json({ message: "error", error: error.message });
    });
  // } else {
  // // console.log("ไม่มีค่ามา");
  // }
};

const bb_choice_patient_reqSearch = (req, res) => {
  dbConnection
    .execute(`select * from bb_req_search order by ch_display asc `)
    .then((results) => {
      res.send(results);
    })

    .catch((error) => {
      return res.status(200).json({ message: "error" });
    });
};

const finger = (req, res) => {
  const { hn } = req.query;
  const query = `
  SELECT  fgt_blood_rh,fgt_blood_gr FROM patient_fingertip  WHERE fgt_hn='${hn}' 	ORDER BY fgt_id desc limit 1

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

const blood_typr_api = (req, res) => {
  const query = `
  SELECT id,s_name FROM blood_type  

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

const Phenotype_API = (req, res) => {
  const { hn } = req.query;
  const query = `
  SELECT result  FROM patient_antigen  WHERE hn='${hn}' 	ORDER BY id desc limit 1

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

const Blood_Request_Crossmatch = (req, res) => {
  const { order_number } = req.query;
  // // console.log("order_number :::" ,order_number);
  const query = `call PT_Get_ReqBlood('${order_number}')`;

  // , c.xm_status
  // // console.log(query);
  dbConnection
    .execute(query)
    .then((results) => {
      res.send(results[0]);
    })
    .catch((error) => {
      return res.status(500).json({ message: "error", message: error.message });
    });
};
const lab_order_api = async (req, res) => {
  const { order_number } = req.query;
  const queryresult_labreq = `
  SELECT 
	po.order_number
	,po.items_code
	,po.create_staff
	,pl.items_name
	FROM patient_request_lab_order  as po
  left join patient_request_lab_items as pl ON po.items_code =pl.items_code
  WHERE order_number='${order_number}' 
  group by po.items_code

  `;
  const result_labreq = await dbConnection.execute(queryresult_labreq);

  const query_date_result_all = `call PT_Get_Typescreendata('${order_number}')`;
  const result_all = await dbConnection.execute(query_date_result_all);

  const q_map = `SELECT * FROM patient_request_lab_items_map_code`;
  const result_mapcode = await dbConnection.execute(q_map);
  let resultdata = "";
  let data_resultfinal = [];
  for (let i = 0; i < result_labreq[0].length; i++) {
    console.log(
      "result_labreq[0][i].items_code",
      result_labreq[0][i].items_code
    );
    resultdata = "";
    let data_items = {};
    for (let c = 0; c < result_mapcode[0].length; c++) {
      if (result_labreq[0][i].items_code == result_mapcode[0][c].lab_code) {
        switch (result_mapcode[0][c].bb_items) {
          case "1":
            resultdata += result_all[0][0][0].anti_a + ", ";
            break;
          case "2":
            resultdata += result_all[0][0][0].anti_b + ", ";
            break;
          case "3":
            resultdata += result_all[0][0][0].anti_ab + ", ";
            break;
          case "4":
            resultdata += result_all[0][0][0].anti_d + ", ";
            break;
          case "5":
            resultdata += result_all[0][0][0].anti_a1 + ", ";
            break;
          case "6":
            resultdata += result_all[0][0][0].anti_h + ", ";
            break;
          case "7":
            resultdata += result_all[0][0][0].cell_a + ", ";
            break;
          case "8":
            resultdata += result_all[0][0][0].cell_b + ", ";
            break;
          case "9":
            resultdata += result_all[0][0][0].cell_o + ", ";
            break;
          case "10":
            resultdata += result_all[0][0][0].cell_ctrl + ", ";
            break;
          case "11":
            resultdata += result_all[0][0][0].blood_gr + ", ";
            break;
          case "12":
            resultdata += result_all[0][0][0].blood_sub_gr + ", ";
            break;
          case "13":
            resultdata += result_all[0][0][0].blood_rh + ", ";
            break;
          case "14":
            resultdata += result_all[0][0][0].abs_o1_rt + ", ";
            break;
          case "15":
            resultdata += result_all[0][0][0].abs_o1_37c + ", ";
            break;
          case "16":
            resultdata += result_all[0][0][0].abs_o1_iat + ", ";
            break;
          case "17":
            resultdata += result_all[0][0][0].abs_o2_rt + ", ";
            break;
          case "18":
            resultdata += result_all[0][0][0].abs_o2_37c + ", ";
            break;
          case "19":
            resultdata += result_all[0][0][0].abs_o2_iat + ", ";
            break;
          case "20":
            resultdata += result_all[0][0][0].abs_o3_rt + ", ";
            break;
          case "21":
            resultdata += result_all[0][0][0].abs_o3_37c + ", ";
            break;
          case "22":
            resultdata += result_all[0][0][0].abs_o3_iat + ", ";
            break;
          case "23":
            resultdata += result_all[0][0][0].abs_result + ", ";
            break;
          case "24":
            resultdata += result_all[0][0][0].mother_iat + ", ";
            break;
          case "25":
            resultdata += result_all[0][0][0].dat_rt + ", ";
            break;
          case "26":
            resultdata += result_all[0][0][0].dat_37c + ", ";
            break;
          case "27":
            resultdata += result_all[0][0][0].dat_iat + ", ";
            break;
          case "28":
            resultdata += result_all[0][0][0].dat_result + ", ";
            break;
          case "29":
            "";
          case "30":
            resultdata += result_all[0][0][0].autologous_rt + ", ";
            break;
          case "31":
            resultdata += result_all[0][0][0].autologous_37c + ", ";
            break;
          case "32":
            resultdata += result_all[0][0][0].autologous_iat + ", ";
            break;
          case "33":
            resultdata += result_all[0][0][0].autologous_result + ", ";
            break;
          case "34":
            "";
          case "35":
            resultdata += result_all[0][0][0].antigen_result + ", ";
            break;
          case "36":
            resultdata += result_all[0][0][0].antibody_result + ", ";
            break;
          default:
            break;
        }
      }
    }
    const data = resultdata.substring(0, resultdata.length - 2);
    data_resultfinal.push({
      items_code: result_labreq[0][i].items_code,
      items_name: result_labreq[0][i].items_name,
      create_staff: result_labreq[0][i].create_staff,
      lab_result: data,
    });
  }

  return res.send(data_resultfinal);
};

const save_lab_order_api = async (req, res) => {
  // // console.log("b", req.body);
  // // console.log("q", req.query);

  const { items_code, order_number, staff } = req.body;

  const query1 = ` SELECT * FROM patient_request_lab_items  WHERE items_code='${items_code}'`;
  const results1 = await dbConnection.execute(query1);

  // // console.log("results1 : ",results1[0][0]);

  const query2 = `  SELECT * FROM patient_request_lab_order  WHERE order_number='${order_number}' and items_code='${items_code}'`;
  const results2 = await dbConnection.execute(query2);
  // // console.log("results2 : ",results2[0][0]);

  if (results1[0][0] == undefined) {
    res.send("No_Lab");
  } else if (results1[0][0] != undefined && results2[0][0] == undefined) {
    //  res.send("มีข้อมูลLab บันทึกสิครับ");
    const insert_laborder = `INSERT INTO patient_request_lab_order (order_number, items_code,create_staff,create_datetime)  VALUES ('${order_number}', '${items_code}', '${staff}',now());`;
    // console.log("insert_laborder:::::", insert_laborder);
    const resultun_group = await dbConnection.execute(insert_laborder);
    return res.status(200).json({ message: "success" });
  } else if (results1[0][0] != undefined && results2[0][0] != undefined) {
    res.send("Lab_Haveinformation");
  }
};
const up_staff_type_screen = (req, res) => {
  const { order_number, staff } = req.query;
  const query = `
  Update patient_request_lab_order set create_staff='${staff}', create_datetime=now() where order_number = '${order_number}' and create_staff IS NULL;
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

const up_status_cross_api = async (req, res) => {
  const { order_number } = req.query;

  query = `
  Update patient_crossmatch set xm_status='3'where order_number = '${order_number}' and xm_status = '0';
  `;
  // // console.log("query :", query);
  dbConnection
    .execute(query)
    .then((results) => {
      res.send(results[0]);
    })
    .catch((error) => {
      return res.status(500).json({ message: "error", message: error.message });
    });
};

const show_labcodeAll = (req, res) => {
  const query = `
  SELECT * FROM patient_request_lab_items  order by items_display asc
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

const save_lab_order_munti_api = async (req, res) => {
  // // console.log(
  //   "------------------------------------------------------------------------------------"
  // );
  // // console.log("b", req.body);
  // // console.log("q", req.query);

  try {
    const { items_code, order_number, staff } = req.body;
    let munti_sritem = "";
    for (let i = 0; i < items_code.length; i++) {
      // // console.log(i);
      // // console.log("aaa",[i],(items_code[i]));
      munti_sritem = items_code[i];

      const query2 = `  SELECT count(order_number) as t1 FROM patient_request_lab_order  WHERE order_number='${order_number}' and items_code='${items_code[i]}'`;
      const results2 = await dbConnection.execute(query2);
      // // console.log("results2 : ", results2[0][0].t1);

      if (results2[0][0].t1 == "0") {
        // // console.log("ค่าที่ไม่มีในฐาน", items_code[i]);
        const insert_laborder = `INSERT INTO patient_request_lab_order (order_number, items_code,create_staff,create_datetime) VALUES ('${order_number}', '${items_code[i]}', '${staff}',now());`;
        // // console.log("ดู ::", insert_laborder);
        const resultun_group = await dbConnection.execute(insert_laborder);
        // dbConnection
        // .execute(insert_laborder)
        // .then((results) => {
        //   res.send(results[0]);
        // })
        return res
          .status(200)
          .json({ message: "success", data: resultun_group });
      } else {
      }
    }
  } catch (error) {
    return res.status(500).json({ message: "error", message: error.message });
  }
};

const delete_lab_order = (req, res) => {
  // // console.log("b", req.body);
  // // console.log("q", req.query);
  const { order_number, items_code } = req.body;
  try {
    const strQuery = `
    DELETE FROM patient_request_lab_order WHERE order_number ='${order_number}' and items_code ='${items_code}'
    `;
    // // console.log("ss", strQuery);
    dbConnection.execute(strQuery);
    return res.status(200).json({ message: "success" });
  } catch (error) {
    return res.status(500).json({ message: "error", message: error.message });
  }
};
const delete_crossmatch = (req, res) => {
  // console.log("b", req.body);
  // console.log("q", req.query);
  // const { xm_id, order_num } = req.body;
  // try {
  //   const strQuery2 = `UPDATE patient_crossmatch SET xm_confirm = ('Y'),xm_confirm_staff=('${staff}'),xm_confirm_date_time= NOW() Where order_number = ('${order_num}')and xm_confirm IS NULL or xm_confirm =''
  //   `;
  //   // // console.log("ss",strQuery2);
  //   dbConnection.execute(strQuery2);
  //   return res.status(200).json({ message: "success" });
  // } catch (error) {
  //   return res.status(500).json({ message: "error", message: error.message });
  // }
};
const Search_bloodNO_inmodal = (req, res) => {
  // // console.log("data.body", req.body);
  // // console.log("data.quyery", req.query);
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
 where b.blood_no = '${req.body.Unit_no_csm}'   and bt.id = '${req.body.blood_status_search}'
  `;
  // // console.log("query", query);

  dbConnection
    .execute(query)
    .then((results) => {
      res.send(results[0]);
    })
    .catch((error) => {
      return res.status(500).json({ message: "error", message: error.message });
    });
};
const insert_crossmatch_inmodal_ungroup = async (req, res) => {
  // // console.log("-------");
  // // console.log("datass.body", req.body);
  // // console.log("datass.quyery", req.query);
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
    doctor_name,
    note,
    ward,
  } = req.body;

  const query = ` SELECT xm_id FROM patient_crossmatch where order_number='${order_num}' ORDER BY xm_id desc`;
  const results = await dbConnection.execute(query);

  const querydoc = ` SELECT code,name FROM bb_doctor where code='${doctor_name}' `;
  const resultsdoc = await dbConnection.execute(querydoc);

  const queryward = ` SELECT * FROM bb_ward where ward='${ward}' `;
  const resultsward = await dbConnection.execute(queryward);
  let new_xmid = "";

  try {
    if (
      results[0][0] == "" ||
      results[0][0] == null ||
      results[0][0] == undefined
    ) {
      new_xmid = Number(order_num) + "01";
    } else {
      new_xmid = Number(results[0][0].xm_id) + 1;
    }

    // // console.log("new_xmid :: ", new_xmid);
    // let query_insert_cross = "";

    if (new_xmid != "") {
      query_insert_cross = `
      INSERT INTO patient_crossmatch (xm_id, order_number, xm_type, xm_status,bl_id,xm_vol,xm_segment,xm_rt,xm_37c,xm_iat,xm_gel,xm_result,xm_note,xm_staft,xm_date_time)
      VALUES ('${new_xmid}', '${order_num}', '${blood_status_search}','0', '${id}', '${Volume_csm}', '${Segment_csm}', '${RT_csm}', '${temperature_room_csm}', '${IAT_csm}', '${Gel_csm}', '${Result_csm}', '${xm_note}', '${staff}',NOW())
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

      const insert_cross_un_group = `INSERT INTO patient_crossmatch_ungroup (order_number, xm_id,bl_id,doc_id,doc_name,ward_id,ward,note,staff,date_time)
      VALUES ('${order_num}', '${new_xmid}','${id}', '${resultsdoc[0][0].code}','${resultsdoc[0][0].name}','${resultsward[0][0].ward}','${resultsward[0][0].name}','${note}','${staff}',NOW());
      `;

      const resultun_group = await dbConnection.execute(insert_cross_un_group);

      return res.status(200).json({ message: "success" });
    } else {
    }
  } catch (error) {
    return res.status(500).json({ message: "error", message: error.message });
  }
};

const UP_Crossmatch = async (req, res) => {
  // console.log("-----------------------------------------------");
  // // console.log("UP_Crossmatch.body", req.body);

  // // console.log("UP_Crossmatch.quyery", req.query);
  // console.log("req.query.staff", req.query.staff);
  if (req.query.staff != "") {
    const strQuery = `UPDATE patient_crossmatch SET
    xm_vol = '${
      req.query.xm_vol == "" ? req.query.blood_value : req.query.xm_vol
    }' 
   ,xm_segment='${req.query.xm_segment}'
   ,xm_rt='${req.query.xm_rt}'
   ,xm_37c='${req.query.xm_37c}'
   ,xm_iat='${req.query.xm_iat}'
   ,xm_gel='${req.query.xm_gel}'
   ,xm_result='${req.query.xm_result}'
   ,xm_note='${req.query.xm_note}'
   ,xm_edit_staff='${req.query.staff}'
   ,xm_edit_date_time=Now()
 
     Where xm_id = '${req.query.xm_id}'
     `;
    // // console.log("strQuery2", strQuery2);
    //   ,xm_edit_staff='${req.query.staff}'
    //   ,xm_edit_date_time= NOW()
    const strQuery0 = await dbConnection.execute(strQuery);

    const strQuery_blood = `UPDATE blood SET
    blood_value =  '${
      req.query.xm_vol == "" ? req.query.blood_value : req.query.xm_vol
    }' 
     Where blood_no = '${req.query.blood_no}' and blood_type = '${
      req.query.type
    }'
     `;

    const strQuery_blood1 = await dbConnection.execute(strQuery_blood);
  } else {
    const strQuery2 = `UPDATE patient_crossmatch SET
    xm_vol =  '${
      req.query.xm_vol == "" ? req.query.blood_value : req.query.xm_vol
    }' 
   ,xm_segment='${req.query.xm_segment}'
   ,xm_rt='${req.query.xm_rt}'
   ,xm_37c='${req.query.xm_37c}'
   ,xm_iat='${req.query.xm_iat}'
   ,xm_gel='${req.query.xm_gel}'
   ,xm_result='${req.query.xm_result}'
   ,xm_note='${req.query.xm_note}'
 
     Where xm_id = '${req.query.xm_id}'
     `;

    const strQuery1 = await dbConnection.execute(strQuery2);

    const strQuery_blood02 = `UPDATE blood SET
    blood_value = '${
      req.query.xm_vol == "" ? req.query.blood_value : req.query.xm_vol
    }' 
    Where blood_no = '${req.query.blood_no}' and blood_type = '${
      req.query.type
    }'
     `;
    // console.log("strQuery_blood:::::", strQuery_blood02);

    const strQuery_blood2 = await dbConnection.execute(strQuery_blood02);
  }

  return res.status(200).json({ message: "success" });

  // console.log("-----------------------------------------------");
};

const con_type_andscreen = (req, res) => {
  //  // console.log("b", req.body);
  //  // console.log("q", req.query);

  const { hn, confirm, order_num } = req.body;
  try {
    const strQuery2 = `UPDATE patient_request SET confirm_status = ('Y') 
  ,staffconfirm_status=('${staff}')
  ,dateconfirm_status= NOW()
    Where order_number = ('${order_num}') 

    `;
    dbConnection.execute(strQuery2);
    return res.status(200).json({ message: "success" });
  } catch (error) {
    return res.status(500).json({ message: "error", message: error.message });
  }
};
const Rh_Name_PREQ = (req, res) => {
  dbConnection
    .execute(`select rh_midle_name from blood_rh order by rh_id asc`)
    .then((results) => {
      res.send(results);
    })

    .catch((error) => {
      return res.status(200).json({ message: "error" });
    });
};
const patient_note_api = (req, res) => {
  // // console.log("b", req.body);
  // // console.log("q", req.query);
  const { hn } = req.body;
  const querys = `SELECT note_staff,note_detail,DATE_FORMAT(DATE_ADD(note_datetime, INTERVAL 543 YEAR ),'%d/%m/%Y') as datetime FROM patient_note WHERE hn ='${hn}'    `;
  // // console.log("note000 :: ", querys);
  dbConnection
    .execute(querys)
    .then((results) => {
      res.send(results);
    })
    .catch((error) => {
      return res.status(500).json({ message: "error", message: error.message });
    });
};
const patient_note_api_all = (req, res) => {
  // // console.log("b", req.body);
  // // console.log("q", req.query);

  const querys = `SELECT * FROM patient_note  GROUP BY note_detail  `;
  dbConnection
    .execute(querys)
    .then((results) => {
      res.send(results);
    })
    .catch((error) => {
      return res.status(500).json({ message: "error", message: error.message });
    });
};
const insert_pt_note_api = (req, res) => {
  // console.log("b", req.body);
  // console.log("q", req.query);

  ////  // console.log("BB", req.body.A1_IDC);

  const strQuery2 = `INSERT INTO patient_note (hn,note_datetime,note_staff,note_detail)
    VALUES  ('${req.body.hn}',now(),'${req.body.staff}','${req.body.pt_note_select}')`;

  // console.log("strQuery2 ::", strQuery2);
  dbConnection
    .execute(strQuery2)
    .then((results) => {
      res.send(results[0]);
    })
    .catch((error) => {
      return res.status(200).json({ message: "error", message: error.message });
    });
};

const delete_paitentnote = (req, res) => {
  // // console.log("b", req.body);
  // // console.log("q", req.query);
  const { hn, note_detail, note_staff } = req.body;
  try {
    const strQuery = `
    DELETE FROM patient_note WHERE hn ='${hn}' and note_detail ='${note_detail}'and note_staff ='${note_staff}'
    `;
    // // console.log("ss", strQuery);
    dbConnection.execute(strQuery);
    return res.status(200).json({ message: "success" });
  } catch (error) {
    return res.status(500).json({ message: "error", message: error.message });
  }
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
  Search_bloodDetil_newlab,
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
  con_cross,
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
  insert_crossmatch,
  Crossmatch_EDIT,
  UP_Crossmatch,
  bb_choice_patient_reqSearch,
  finger,
  blood_typr_api,
  Phenotype_API,
  lab_order_api,
  save_lab_order_api,
  up_staff_type_screen,
  show_labcodeAll,
  save_lab_order_munti_api,
  insert_crossmatch_UnGR,
  up_status_cross_api,
  delete_lab_order,
  delete_crossmatch,
  insert_crossmatch_inmodal,
  Search_bloodNO_inmodal,
  insert_crossmatch_inmodal_ungroup,
  con_type_andscreen,
  Rh_Name_PREQ,
  patient_note_api,
  insert_pt_note_api,
  patient_note_api_all,
  delete_paitentnote,
};
