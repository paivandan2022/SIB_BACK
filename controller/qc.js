const dbConnection = require("../database");

const Get_result_qc = (req, res) => {
  const { qc_lot, qc_instrument } = req.query;

  let queryString = `select qc.*,a.*,l.*
      ,DATE_FORMAT(DATE_ADD(qc.qc_date, INTERVAL 543 YEAR), '%d/%m/%Y ') as date
      ,DATE_FORMAT(DATE_ADD(l.qc_lot_exp, INTERVAL 543 YEAR), '%d/%m/%Y ') as date_exp_lot
      from qc_result as qc
      left join qc_action_list as a on qc.qc_action = a.qc_action_id
      left join qc_lot as l ON qc.qc_lot = l.qc_lot_id
   WHERE qc.qc_result_id is not null `;
  if (qc_lot != "") {
    queryString += `and  qc_lot = '${qc_lot}' `;
  }
  if (qc_instrument != "") {
    queryString += ` and qc_instrument = '${qc_instrument}' `;
  }
  queryString += `order by qc.qc_date asc, qc.qc_count asc `;

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

const Get_action = (req, res) => {
  const { qc_lot, qc_instrument } = req.query;

  let queryString = `select  
  CONVERT(concat('A'
  ,qc.qc_action_code
  ,'  '
  ,qc.qc_action
  ,if(qc.qc_comment is not null and qc.qc_comment != ' ' ,concat(' (Comment : ' , qc.qc_comment,')  '),'  ')
  , qc_action_staff
  ,' '
  , qc_action_datetime),char)  as qc_lot_no
	,qc_lot  
  , qc_result_id
  ,qc.qc_comment
      from qc_result as qc
   WHERE qc.qc_action_code is not null `;
  if (qc_lot != "") {
    queryString += `and  qc_lot = '${qc_lot}' `;
  }
  if (qc_instrument != "") {
    queryString += ` and qc_instrument = '${qc_instrument}' `;
  }
  queryString += `order by qc_lot asc, qc_action_code asc `;

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

const Get_choice_qc = (req, res) => {
  const queryString = `select * from qc_choice `;
  dbConnection
    .execute(queryString)
    .then((results) => {
      res.send(results[0]);
    })
    .catch((error) => {
      return res.status(500).json({ message: "error", error: error.message });
    });
};

const Get_action_qc = (req, res) => {
  const queryString = `select * from qc_action_list `;
  dbConnection
    .execute(queryString)
    .then((results) => {
      res.send(results[0]);
    })
    .catch((error) => {
      return res.status(500).json({ message: "error", error: error.message });
    });
};

const Get_group_qc = (req, res) => {
  const queryString = `select * from qc_group `;
  dbConnection
    .execute(queryString)
    .then((results) => {
      res.send(results[0]);
    })
    .catch((error) => {
      return res.status(500).json({ message: "error", error: error.message });
    });
};

const Add_group_qc = async (req, res) => {
  const { qc_group_name } = req.body;

  const checkGr = `select * from qc_group where qc_group_name = '${qc_group_name}'`;
  const resultCheckGr = await dbConnection.execute(checkGr);

  if (resultCheckGr[0][0]) {
    // console.log("มีเเล้ว");
    return res.status(200).json({ message: "duplicate" });
  } else {
    const queryString = `INSERT INTO qc_group (qc_group_name) VALUES ('${qc_group_name}') `;
    dbConnection
      .execute(queryString)
      .then((results) => {
        res.send(results[0]);
      })
      .catch((error) => {
        return res.status(500).json({ message: "error", error: error.message });
      });
  }
};

const Add_action_qc = async (req, res) => {
  const { qc_action_name } = req.body;

  const checkAction = `select * from qc_action_list where qc_action_name = '${qc_action_name}'`;
  const resultCheckAction = await dbConnection.execute(checkAction);

  if (resultCheckAction[0][0]) {
    // console.log("มีเเล้ว");
    return res.status(200).json({ message: "duplicate" });
  } else {
    const queryString = `INSERT INTO qc_action_list (qc_action_name) VALUES ('${qc_action_name}') `;

    dbConnection
      .execute(queryString)
      .then((results) => {
        res.send(results[0]);
      })
      .catch((error) => {
        return res.status(500).json({ message: "error", error: error.message });
      });
  }
};

const Save_qc = async (req, res) => {
  const {
    qc_result_id,
    qc_result_barcode,
    qc_date,
    qc_time,
    qc_count,
    qc_instrument,
    qc_anti_a,
    qc_anti_b,
    qc_anti_d,
    qc_a_cell,
    qc_b_cell,
    qc_group,
    qc_o1,
    qc_o2,
    qc_abs,
    qc_dat,
    qc_ag,
    qc_staff,
    qc_action,
    qc_comment,
    qc_lot,
  } = req.body;
  // console.log("add", req.body);

  if (qc_result_id) {
    const queryString = `UPDATE qc_result SET 
    qc_save_staff = '${qc_staff}'
    ,qc_count = ${qc_count}
    ,qc_instrument = '${qc_instrument || ""}'
    ,qc_anti_a = '${qc_anti_a}'
    ,qc_anti_b = '${qc_anti_b}' 
    ,qc_anti_d = '${qc_anti_d}'
    ,qc_a_cell = '${qc_a_cell}'
    ,qc_b_cell = '${qc_b_cell}'
    ,qc_group = '${qc_group}'
    ,qc_o1 = '${qc_o1}' 
    ,qc_o2 = '${qc_o2}' 
    ,qc_abs = '${qc_abs}'
    ,qc_dat = '${qc_dat}'
    ,qc_ag = '${qc_ag}' 
    ,qc_result_barcode = '${qc_result_barcode || ""}'
    where qc_result_id  = '${qc_result_id}' `;
    // console.log("มีเเล้วupdate", queryString);

    const resultUpdate = await dbConnection.execute(queryString);
    return res.status(200).json({ message: "success" });
  } else {
    const queryString = `INSERT INTO qc_result
      (
      qc_result_barcode,
      qc_date,
      qc_time,
      qc_count,
      qc_anti_a,
      qc_anti_b,
      qc_anti_d,
      qc_a_cell,
      qc_b_cell,
      qc_group,
      qc_o1,
      qc_o2,
      qc_abs,
      qc_dat,
      qc_ag,
      qc_save_staff,
      qc_save_datetime,
      qc_review_staff,
      qc_review_datetime,
      qc_lot,
      qc_instrument
      ) VALUES (
        '${qc_result_barcode || ""}',
          '${qc_date}',
      '${qc_time}',
      '${qc_count}',
      '${qc_anti_a}',
      '${qc_anti_b}',
      '${qc_anti_d}',
      '${qc_a_cell}',
      '${qc_b_cell}',
      '${qc_group}',
      '${qc_o1}',
      '${qc_o2}',
      '${qc_abs}',
      '${qc_dat}',
      '${qc_ag}',
      '${qc_staff}',
      now(),
      '${qc_staff}',
      now(),
      '${qc_lot}',
      '${qc_instrument}'
      )`;
    // console.log("q", queryString);
    const resultInert = await dbConnection.execute(queryString);
    return res.status(200).json({ message: "success" });
  }
};

const Update_qc = async (req, res) => {
  const {
    qc_action,
    qc_comment,
    qc_staff,
    qc_result_id,
    qc_lot,
    qc_action_code,
  } = req.body;
  let query;
  console.log("up", qc_action_code);

  const checkAction = `select MAX(qc_action_code) as maxCount  from qc_result where qc_lot =  '${qc_lot}'`;
  const resultCheckAction = await dbConnection.execute(checkAction);
  console.log("checkAction", resultCheckAction[0][0].maxCount);

  if (resultCheckAction[0][0].maxCount != null) {
    if (qc_action_code) {
      query = `UPDATE qc_result SET 
      qc_action = '${qc_action || ""}'
      ,qc_comment = '${qc_comment || ""}'
      ,qc_action_staff = '${qc_staff}'
      ,qc_action_datetime = now()
      ,qc_action_code = '${qc_action_code}'
      where qc_result_id  = '${qc_result_id}' `;
    } else {
      const checkActionCode = `select (qc_action_code+1) as qc_action_code from qc_result where qc_lot = '${qc_lot}' order By qc_action_code desc limit 1`;
      const result = await dbConnection.execute(checkActionCode);
      query = `UPDATE qc_result SET 
    qc_action = '${qc_action || ""}'
    ,qc_comment = '${qc_comment || ""}'
    ,qc_action_staff = '${qc_staff}'
    ,qc_action_datetime = now()
    ,qc_action_code = '${result[0][0].qc_action_code}'
    where qc_result_id  = '${qc_result_id}' `;
    }
  } else {
    query = `UPDATE qc_result SET 
    qc_action = '${qc_action || ""}'
    ,qc_comment = '${qc_comment || ""}'
    ,qc_save_staff = '${qc_staff}'
    ,qc_action_code = '1'
    where qc_result_id  = '${qc_result_id}' `;
  }
  try {
    const resultUpdate = await dbConnection.execute(query);
    return res.status(200).json({ message: "success" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const Get_setting_qc = async (req, res) => {
  const { qc_lot } = req.query;
  // console.log("set", req.query);
  const query = `select * 
  from qc_lot as l 
  left join qc_result as r on  l.qc_lot_id = r.qc_lot 
  where l.qc_lot_id = '${qc_lot}'`;
  // console.log("queryset", query);

  dbConnection
    .execute(query)
    .then((results) => {
      res.send(results[0]);
    })

    .catch((error) => {
      return res.status(500).json({ message: "error" });
    });
};

const Get_setting = async (req, res) => {
  const query = `select *,DATE_FORMAT(DATE_ADD(qc_lot_exp, INTERVAL 543 YEAR), '%d/%m/%Y ') as qc_date_exp from qc_lot`;

  dbConnection
    .execute(query)
    .then((results) => {
      res.send(results[0]);
    })

    .catch((error) => {
      return res.status(500).json({ message: "error" });
    });
};

const Add_setting_log = async (req, res) => {
  const {
    qc_lot_id,
    qc_lot_exp,
    qc_lot_anti_a,
    qc_lot_anti_b,
    qc_lot_anti_d,
    qc_lot_cell_a,
    qc_lot_cell_b,
    qc_lot_abo,
    qc_lot_o1,
    qc_lot_o2,
    qc_lot_abs,
    qc_lot_dat,
    qc_lot_ag,
    qc_lot_staff,
    qc_lot_datetime,
    qc_lot_staff_del,
  } = req.body;
  // console.log("up", req.body);

  try {
    const queryString = `INSERT INTO qc_lot_log 
    (
      qc_lot_id,
      qc_lot_exp,
      qc_lot_anti_a,
      qc_lot_anti_b,
      qc_lot_anti_d,
      qc_lot_cell_a,
      qc_lot_cell_b,
      qc_lot_abo,
      qc_lot_o1,
      qc_lot_o2,
      qc_lot_abs,
      qc_lot_dat,
      qc_lot_ag,
      qc_lot_staff,
      qc_lot_datetime,
      qc_lot_staff_del,
      qc_lot_datetime_del
      ) VALUES (
        '${qc_lot_id}',
        '${qc_lot_exp}',
        '${qc_lot_anti_a}',
        '${qc_lot_anti_b}',
        '${qc_lot_anti_d}',
        '${qc_lot_cell_a}',
        '${qc_lot_cell_b}',
        '${qc_lot_abo}',
        '${qc_lot_o1}',
        '${qc_lot_o2}',
        '${qc_lot_abs}',
        '${qc_lot_dat}',
        '${qc_lot_ag}',
        '${qc_lot_staff}',
        '${qc_lot_datetime}',
        '${qc_lot_staff_del}',
        now()
      ) `;
    const resultAdd = await dbConnection.execute(queryString);
    return res.status(200).json({ message: "success" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const Del_setting = async (req, res) => {
  const { qc_lot_id } = req.body;
  // console.log("up", req.body);

  try {
    const queryString = `DELETE FROM qc_lot WHERE qc_lot_id = ${qc_lot_id}`;
    const resultDel = await dbConnection.execute(queryString);
    return res.status(200).json({ message: "success" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const Add_setting = async (req, res) => {
  const {
    qc_lot_id,
    qc_lot_exp,
    qc_lot_anti_a,
    qc_lot_anti_b,
    qc_lot_anti_d,
    qc_lot_cell_a,
    qc_lot_cell_b,
    qc_lot_abo,
    qc_lot_o1,
    qc_lot_o2,
    qc_lot_abs,
    qc_lot_dat,
    qc_lot_ag,
    qc_lot_staff,
  } = req.body;
  // console.log("up", qc_lot_exp);

  const checkLot = `select * from qc_lot where qc_lot_id = '${qc_lot_id}'`;
  const resultCheckLot = await dbConnection.execute(checkLot);

  try {
    if (resultCheckLot[0][0]) {
      // console.log("มีเเล้ว");
      return res.status(200).json({ message: "duplicate" });
    } else {
      // console.log("else");
      const queryString = `INSERT INTO qc_lot
    (
      qc_lot_id,
      qc_lot_exp,
      qc_lot_anti_a,
      qc_lot_anti_b,
      qc_lot_anti_d,
      qc_lot_cell_a,
      qc_lot_cell_b,
      qc_lot_abo,
      qc_lot_o1,
      qc_lot_o2,
      qc_lot_abs,
      qc_lot_dat,
      qc_lot_ag,
      qc_lot_staff,
      qc_lot_datetime
    ) VALUES (
      '${qc_lot_id}',
      '${qc_lot_exp}',
      '${qc_lot_anti_a}',
      '${qc_lot_anti_b}',
      '${qc_lot_anti_d}',
      '${qc_lot_cell_a}',
      '${qc_lot_cell_b}',
      '${qc_lot_abo}',
      '${qc_lot_o1}',
      '${qc_lot_o2}',
      '${qc_lot_abs}',
      '${qc_lot_dat}',
      '${qc_lot_ag}',
      '${qc_lot_staff}',
      now()
    )`;
      console.log("queryString", queryString);
      const resultAdd = await dbConnection.execute(queryString);
      return res.status(200).json({ message: "success" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const Up_review_staff = async (req, res) => {
  const { qc_review_staff, qc_result_id } = req.body;

  // console.log("/******", req.body);

  try {
    const query = `UPDATE qc_result SET 
    qc_review_staff = '${qc_review_staff}',
    qc_review_datetime = now()
    where qc_result_id  = '${qc_result_id}' `;
    const resultUpdate = await dbConnection.execute(query);
    return res.status(200).json({ message: "success" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const Up_approve_staff = async (req, res) => {
  const { qc_approve_staff, qc_result_id } = req.body;

  // console.log("/******", req.body);

  try {
    const query = `UPDATE qc_result SET 
    qc_approve_staff = '${qc_approve_staff}',
    qc_approve_datetime = now()
    where qc_result_id  = '${qc_result_id}' `;
    const resultUpdate = await dbConnection.execute(query);
    return res.status(200).json({ message: "success" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const Get_inst_qc = (req, res) => {
  const queryString = `select * from qc_instrument `;
  dbConnection
    .execute(queryString)
    .then((results) => {
      res.send(results[0]);
    })
    .catch((error) => {
      return res.status(500).json({ message: "error", error: error.message });
    });
};

const Add_inst_qc = async (req, res) => {
  const { qc_inst_name, qc_inst_staff } = req.body;
  // console.log("req.body", req.body);

  const checkInst = `select * from qc_instrument where qc_inst_name = '${qc_inst_name}'`;
  const resultCheckInst = await dbConnection.execute(checkInst);

  const idNew = `select (qc_inst_id+1) as qc_inst_id from qc_instrument order by qc_inst_id desc limit 1 `;
  const resultID = await dbConnection.execute(idNew);

  // console.log("id", resultID[0][0].qc_inst_id);

  if (resultCheckInst[0][0]) {
    // console.log("มีเเล้ว");
    return res.status(200).json({ message: "duplicate" });
  } else {
    const queryString = `INSERT INTO qc_instrument (
      qc_inst_id
      ,qc_inst_name
      ,qc_inst_staff
      ,qc_inst_datetime
      ) VALUES (
        '${resultID[0][0].qc_inst_id}'
        ,'${qc_inst_name}'
        ,'${qc_inst_staff}'
        ,now()
        ) `;
    dbConnection
      .execute(queryString)
      .then((results) => {
        res.send(results[0]);
      })
      .catch((error) => {
        return res.status(500).json({ message: "error", error: error.message });
      });
  }
};
const Get_result_not_review = (req, res) => {
  const query = `select qc.*,a.*,l.*
      ,DATE_FORMAT(DATE_ADD(qc.qc_date, INTERVAL 543 YEAR), '%d/%m/%Y ') as date
      ,DATE_FORMAT(DATE_ADD(l.qc_lot_exp, INTERVAL 543 YEAR), '%d/%m/%Y ') as date_exp_lot
      from qc_result as qc
      left join qc_action_list as a on qc.qc_action = a.qc_action_id
      left join qc_lot as l ON qc.qc_lot = l.qc_lot_id
			WHERE qc.qc_review_staff IS null  order BY qc.qc_date asc`;

  // console.log(query);

  dbConnection
    .execute(query)
    .then((results) => {
      res.send(results[0]);
    })
    .catch((error) => {
      return res.status(500).json({ message: "error", error: error.message });
    });
};
const Get_action_not_review = (req, res) => {
  const query = `select  
  CONVERT(concat('A',qc.qc_action_code,'  ',qc.qc_action
  ,if(qc.qc_comment is not null and qc.qc_comment != ' ' ,concat(' (Comment : ' , qc.qc_comment,')  '),'  ')
  , qc.qc_action_staff,' ', qc_action_datetime),char)  as qc_lot_no
	,qc.qc_lot  
  , qc.qc_result_id
  ,qc.qc_comment
      from qc_result as qc
   WHERE qc.qc_action_code is not null and qc.qc_review_staff IS null order by qc.qc_lot asc, qc.qc_action_code asc`;

  // console.log(query);

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
  Get_result_qc,
  Get_choice_qc,
  Get_action_qc,
  Get_group_qc,
  Add_group_qc,
  Add_action_qc,
  Save_qc,
  Update_qc,
  Get_setting_qc,
  Get_setting,
  Add_setting_log,
  Del_setting,
  Add_setting,
  Up_review_staff,
  Up_approve_staff,
  Get_inst_qc,
  Add_inst_qc,
  Get_action,
  Get_result_not_review,
  Get_action_not_review,
};
