const dbConnection = require("../database");

const bag_choice = (req, res) => {
  const strQuery = `SELECT * FROM blood_bag_type where status = 1`;
  dbConnection
    .execute(strQuery)
    .then((results) => {
      res.send(results[0]);
    })
    .catch((error) => {
      return res.status(500).json({ message: "error", message: error.message });
    });
};
const spin_choice_cell = (req, res) => {
  const strQuery = `SELECT s_name, id, type_code
    FROM blood_type
    where component_type = 1 and active = 1`;
  dbConnection
    .execute(strQuery)
    .then((results) => {
      res.send(results[0]);
    })
    .catch((error) => {
      return res.status(500).json({ message: "error", message: error.message });
    });
};
const spin_choice_platelet = (req, res) => {
  const strQuery = `SELECT s_name, id, type_code
      FROM blood_type
      where component_type = 2 and active = 1`;
  dbConnection
    .execute(strQuery)
    .then((results) => {
      res.send(results[0]);
    })
    .catch((error) => {
      return res.status(500).json({ message: "error", message: error.message });
    });
};
const spin_choice_pasma = (req, res) => {
  const strQuery = `SELECT s_name, id, type_code
      FROM blood_type
      where component_type in(3,4) and active = 1`;
  dbConnection
    .execute(strQuery)
    .then((results) => {
      res.send(results[0]);
    })
    .catch((error) => {
      return res.status(500).json({ message: "error", message: error.message });
    });
};

const get_bagblood = (req, res) => {
  const { unit_no_start, unit_no_end } = req.query;
  const strQuery = `SELECT * FROM donor_blood where separate_status = 0 AND unit_no BETWEEN '${unit_no_start}' AND '${unit_no_end}'
    `;
  dbConnection
    .execute(strQuery)
    .then((results) => {
      res.send(results[0]);
    })
    .catch((error) => {
      return res.status(500).json({ message: "error", message: error.message });
    });
};

const Update_setting = async (req, res) => {
  const { blood_type, sep_cell, sep_platelet, sep_pasma } = req.body;
  console.log("req.body....", req.body);

  try {
    const Query = `UPDATE blood_bag_type set
      bag_sep1 ='${sep_cell}'
      ,bag_sep2 = '${sep_platelet}'
      ,bag_sep3 = '${sep_pasma}'
      where bagcode  = '${blood_type}';`;
    console.log("Query....", Query);

    const result = await dbConnection.execute(Query);
    return res.status(200).json({
      message: "success",
    });
  } catch (error) {
    return res.status(500).json({ message: "error", message: error.message });
  }
};
const setting_bag = (req, res) => {
  const Query = `select b.bagcode
  , b.bagtype
  ,b.bag_sep1
  , (select s_name from blood_type where id = b.bag_sep1 and type_code is not null) as b1 
  , (select type_code from blood_type where id = b.bag_sep1) as b1_typecode 
  ,b.bag_sep2
  , (select s_name from blood_type where id = b.bag_sep2 and type_code is not null) as b2 
  , (select type_code from blood_type where id = b.bag_sep2) as b2_typecode 
  ,b.bag_sep3
  , (select s_name from blood_type where id = b.bag_sep3 and type_code is not null) as b3 
  , (select type_code from blood_type where id = b.bag_sep3) as b3_typecode 
  from blood_bag_type as b where status = 1 and bagcode <> '0'`;
  dbConnection
    .execute(Query)
    .then((results) => {
      res.send(results[0]);
    })
    .catch((error) => {
      return res.status(500).json({ message: "error", message: error.message });
    });
};

const setting_all = (req, res) => {
  const Query = `select b.* 
  ,if(b.status ='1','เปิด','ปิด') as statusNew
  , (select s_name from blood_type where id = b.bag_sep1 and type_code is not null) as b1 
  , (select s_name from blood_type where id = b.bag_sep2 and type_code is not null) as b2 
  , (select s_name from blood_type where id = b.bag_sep3 and type_code is not null) as b3 
  from blood_bag_type as b where  b.bagcode <> '0'`;
  dbConnection
    .execute(Query)
    .then((results) => {
      res.send(results[0]);
    })
    .catch((error) => {
      return res.status(500).json({ message: "error", message: error.message });
    });
};

const search_bag = (req, res) => {
  const { bagCode } = req.query;
  console.log("4", bagCode);

  const Query = `select b.bagcode
  , b.bagtype
  ,b.bag_sep1
  , (select s_name from blood_type where id = b.bag_sep1 and type_code is not null) as b1 
  , (select type_code from blood_type where id = b.bag_sep1) as b1_typecode 
  ,b.bag_sep2
  , (select s_name from blood_type where id = b.bag_sep2 and type_code is not null) as b2 
  , (select type_code from blood_type where id = b.bag_sep2) as b2_typecode 
  ,b.bag_sep3
  , (select s_name from blood_type where id = b.bag_sep3 and type_code is not null) as b3 
  , (select type_code from blood_type where id = b.bag_sep3) as b3_typecode 
  from blood_bag_type as b where  b.bagcode = '${bagCode}'`;

  dbConnection
    .execute(Query)
    .then((results) => {
      res.send(results[0]);
    })
    .catch((error) => {
      return res.status(500).json({ message: "error", message: error.message });
    });
};

const update_setting_bag = async (req, res) => {
  const {
    bagcode,
    bagtype,
    sep_cell_edit,
    sep_platelet_edit,
    sep_pasma_edit,
    status,
    his_bag_id
  } = req.body;

  try {
    console.log("4", req.body);

    const Query = `UPDATE blood_bag_type set
  bagtype ='${bagtype}'
  ,bag_sep1 ='${sep_cell_edit}'
  ,bag_sep2 = '${sep_platelet_edit}'
  ,bag_sep3 = '${sep_pasma_edit}'
  ,status = ${status}
  ,his_bag_type_id = ${his_bag_id}
  where bagcode  = '${bagcode}';`;

    console.log("Modal", Query);

    const result = await dbConnection.execute(Query);

    return res.status(200).json({
      message: "success",
    });
  } catch (error) {
    return res.status(500).json({ message: "error", message: error.message });
  }
};

const Search_all_unitno = (req, res) => {
  const strQuery = `SELECT * FROM donor_blood where separate_status = 0 `;
  dbConnection
    .execute(strQuery)
    .then((results) => {
      res.send(results[0]);
    })
    .catch((error) => {
      return res.status(500).json({ message: "error", message: error.message });
    });
};

const Search_unit_no = (req, res) => {
  const { unit_no } = req.query;
  // console.log("Search_unit_noreq.Query", req.query);
  const strQuery = `SELECT * FROM donor_blood where  unit_no = '${unit_no}'  and separate_status = '0' `;
  dbConnection
    .execute(strQuery)
    .then((results) => {
      res.send(results[0]);
    })
    .catch((error) => {
      return res.status(500).json({ message: "error", message: error.message });
    });
};
const Search_unit_no_option4_2 = (req, res) => {
  const { unit_no } = req.query;
  // console.log("Search_unit_noreq.Query", req.query);
  const strQuery = `SELECT * FROM donor_blood where  unit_no = '${unit_no}'  and separate_status = '0' `;
  dbConnection
    .execute(strQuery)
    .then((results) => {
      res.send(results[0]);
    })
    .catch((error) => {
      return res.status(500).json({ message: "error", message: error.message });
    });
};
const Show_1 = (req, res) => {
  const strQuery = ` SELECT t.type_code, t.s_name, t.component_type, c.component_name FROM blood_type as t inner join blood_component_type as c ON t.component_type = c.component_type WHERE t.active = 1 AND t.id <> 0 and(t.type_code <> '' or t.type_code is not null) ORDER BY t.component_type asc, t.display ASC `;
  dbConnection
    .execute(strQuery)
    .then((results) => {
      res.send(results[0]);
    })
    .catch((error) => {
      return res.status(500).json({ message: "error", message: error.message });
    });
};
const Show_2 = (req, res) => {
  const Query = `select concat(bagcode,' = ', bagtype) as bagtype FROM blood_bag_type where status = 1 and  (bagcode <> 0 or trim(bagtype) <>'' ) order by display asc;`;
  dbConnection
    .execute(Query)
    .then((results) => {
      res.send(results[0]);
    })
    .catch((error) => {
      return res.status(500).json({ message: "error", message: error.message });
    });
};

const Search_unit_no_by_id_list = (req, res) => {
  const { unit_no } = req.query;
  const strQuery = `SELECT * FROM donor_blood where unit_no IN (${unit_no})  and separate_status = '0' `;
  console.log(strQuery);
  dbConnection
    .execute(strQuery)
    .then((results) => {
      res.send(results[0]);
    })
    .catch((error) => {
      return res.status(500).json({ message: "error", message: error.message });
    });
};
const Submit_spin_list = async (req, res) => {
  const {
    dn,
    blood_type,
    sep_cell,
    sep_platelet,
    sep_plasma,
    ip_address,
    comp_name,
    staff_name,
  } = req.body;
  console.log("--------body--------", req.body);


  try {

    const strQuery1 = `SELECT pid,cid,donor_no,unit_no, DATE_FORMAT(donor_date, '%Y-%m-%d') as donor_date , dorngro,dornrh,if(status=10,'1','0') as b_status
    ,DATE_FORMAT(DATE_ADD(donor_date ,INTERVAL (SELECT date_expri FROM blood_type WHERE type_code = '${sep_cell}') DAY), '%Y-%m-%d')  as cell
    ,(SELECT id FROM blood_type WHERE type_code = '${sep_cell}')   as cell_type
    ,DATE_FORMAT(DATE_ADD(donor_date ,INTERVAL (SELECT date_expri FROM blood_type WHERE type_code = '${sep_platelet}') DAY), '%Y-%m-%d')  as platelet
    ,(SELECT id FROM blood_type WHERE type_code = '${sep_platelet}')   as platelet_type
    ,DATE_FORMAT(DATE_ADD(donor_date ,INTERVAL (SELECT date_expri FROM blood_type WHERE type_code = '${sep_plasma}') DAY), '%Y-%m-%d')  as plasma
    ,(SELECT id FROM blood_type WHERE type_code = '${sep_plasma}')   as plasma_type
    FROM donor_blood where dn = ${dn} `;
    const results = await dbConnection.execute(strQuery1);

    console.log('strQuery***',strQuery1);
    let query_cell = "";
    let query_platelet = "";
    let query_plasma = "";
    let query_update_dn_blood = "";
  
    console.log("results****", results[0][0]?.dorngro,results[0][0]?.dornrh);
   
    // for (let index = 0; index < results.length; index++) {
    //   const element = results[index];
    //   console.log("element", element);
    // }

    console.log("<>results<>", results[0][0].donor_no);
    if (results[0].length > 0) {
      if (sep_cell != null) {
        query_cell = `INSERT INTO blood (id,blood_type, blood_receive, blood_bag_type_id, liquid, receive_date, donor_date, expiry_date, blood_group, blood_rh, blood_value, blood_no, note,status,ip_address,computer_name,staff_name,insert_date,donor_id,cid) 
        VALUES ( (select (max(t1.id)+1) FROM blood as t1),
        '${results[0][0].cell_type}'
        ,'1'
        ,'${blood_type}'
        ,'0'
        ,now()
        ,'${results[0][0].donor_date}'
        ,'${results[0][0].cell}'
        ,'${results[0][0]?.dorngro}'
        ,'${results[0][0]?.dornrh}'
        ,'0'
        ,trim('${results[0][0].unit_no}')
        ,null
        ,'${results[0][0].b_status}'
        ,'${ip_address}'
        ,'${comp_name}'
        ,'${staff_name}'
        ,now()
        ,'${results[0][0]?.donor_no || ""}'
        ,'${results[0][0]?.cid || ""}'
        );`;
      }
      /////////////// query_platelet
      if (sep_platelet != null) {
        query_platelet = `INSERT INTO blood (id,blood_type, blood_receive, blood_bag_type_id, liquid, receive_date, donor_date, expiry_date, blood_group, blood_rh, blood_value, blood_no, note,status,ip_address,computer_name,staff_name,insert_date,donor_id,cid) 
        VALUES ( (select (max(t1.id)+1) FROM blood as t1),
        '${results[0][0].platelet_type}'
        ,'1'
        ,'${blood_type}'
        ,'0'
        ,now()
        ,'${results[0][0].donor_date}'
        ,'${results[0][0].platelet}'
        ,'${results[0][0]?.dorngro || ""}'
        ,'${results[0][0]?.dornrh || ""}'
        ,'0'
        ,trim('${results[0][0].unit_no}')
        ,null
        ,'${results[0][0].b_status}'
        ,'${ip_address}'
        ,'${comp_name}'
        ,'${staff_name}'
        ,now()
        ,'${results[0][0]?.donor_no || ""}'
        ,'${results[0][0]?.cid || ""}'
        );`;
      }
      /////////////// query_plasma
      if (sep_plasma != null) {
        query_plasma = `INSERT INTO blood (id,blood_type, blood_receive, blood_bag_type_id, liquid, receive_date, donor_date, expiry_date, blood_group, blood_rh, blood_value, blood_no, note,status,ip_address,computer_name,staff_name,insert_date,donor_id,cid) 
        VALUES ( (select (max(t1.id)+1) FROM blood as t1),
        '${results[0][0].plasma_type}'
        ,'1'
        ,'${blood_type}'
        ,'0'
        ,now()
        ,'${results[0][0].donor_date}'
        ,'${results[0][0].plasma}'
        ,'${results[0][0]?.dorngro || ""}'
        ,'${results[0][0]?.dornrh || ""}'
        ,'0'
        ,trim('${results[0][0].unit_no}')
        ,null
        ,'${results[0][0].b_status}'
        ,'${ip_address}'
        ,'${comp_name}'
        ,'${staff_name}'
        ,now()
        ,'${results[0][0]?.donor_no || ""}'
        ,'${results[0][0]?.cid || ""}'
        );`;
      }
      query_update_dn_blood = `update donor_blood set 
      donor_type = '${blood_type}'
      , sep_cell='${sep_cell}'
      , sep_platelet = '${sep_platelet}'
      , sep_plasma = '${sep_plasma}'
      , staff_separate = '${staff_name}'
      , separate_status = '12' 
      where dn = '${dn}';`;

      console.log(
        "Execute-->",
        query_cell + query_platelet + query_plasma + query_update_dn_blood
      );

      const results2 = await Promise.all([
        dbConnection.execute(query_cell),
        dbConnection.execute(query_platelet),
        dbConnection.execute(query_plasma),
        dbConnection.execute(query_update_dn_blood),
      ]);
      return res.status(200).json({ message: "success" });
    } else {
    }
  } catch (error) {
    return res.status(500).json({ message: "error", message: error.message });
  }

  console.log("------------", strQuery1);
};
module.exports = {
  Show_1,
  Show_2,
  bag_choice,
  get_bagblood,
  spin_choice_cell,
  spin_choice_platelet,
  spin_choice_pasma,
  setting_bag,
  Update_setting,
  Search_all_unitno,
  Search_unit_no,
  Search_unit_no_option4_2,
  Search_unit_no_by_id_list,
  Submit_spin_list,
  search_bag,
  setting_all,
  update_setting_bag,
};
