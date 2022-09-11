const dbConnection = require("../database");

const item_api = (req, res) => {
  const query = `
    SELECT * FROM patient_request_lab_items  order by items_display
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

const save_itemdata = async (req, res) => {
  console.log("b", req.body);
  console.log("q", req.query);

  const { items_code, items_name, items_display } = req.body;
  const insert_laborder = `INSERT INTO patient_request_lab_items (items_code, items_name,items_display)  VALUES ('${items_code}', '${items_name}', '${items_display}');`;
  // console.log("insert_laborder:::::", insert_laborder);
  const resultun_group = await dbConnection.execute(insert_laborder);
  return res.status(200).json({ message: "success" });
};

const delete_itemdata = (req, res) => {
  //   console.log("b", req.body);
  //   console.log("q", req.query);
  const { items_code } = req.body;
  try {
    const strQuery = `
      DELETE FROM patient_request_lab_items WHERE items_code ='${items_code}'
      `;
    // console.log("ss", strQuery);
    dbConnection.execute(strQuery);
    return res.status(200).json({ message: "success" });
  } catch (error) {
    return res.status(500).json({ message: "error", message: error.message });
  }
};
const UP_itemdata = async (req, res) => {
  // console.log("-----------------------------------------------");
  // console.log("UP_Crossmatch.body", req.body);
  const { items_code, items_name, items_display } = req.query;
  try {
    const strQuery = `
        UPDATE patient_request_lab_items SET
        items_code = '${items_code}' 
        ,items_name = '${items_name}' 
        ,items_display = '${items_display}' 
        WHERE items_code ='${items_code}'   
          `;
    console.log("ss", strQuery);
    dbConnection.execute(strQuery);
    return res.status(200).json({ message: "success" });
  } catch (error) {
    return res.status(500).json({ message: "error", message: error.message });
  }
};

const bb_items_api = (req, res) => {
  const query = `
      SELECT * FROM bb_items  order by mi_code
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

const save_mapcode = async (req, res) => {
  // console.log(
  //   "------------------------------------------------------------------------------------"
  // );
  // console.log("b", req.body);
  // console.log("q", req.query);
  try {
    const { items_code, map } = req.body;
    for (let i = 0; i < map.length; i++) {
      // console.log(i);
      // console.log("aaa",[i],(items_code[i]));

      const query2 = `  SELECT count(lab_code) as t1 FROM patient_request_lab_items_map_code  WHERE lab_code='${items_code}' and bb_items='${map[i]}'`;
      const results2 = await dbConnection.execute(query2);
      console.log("query2", query2);
      // console.log("results2 : ", results2[0][0].t1);

      if (results2[0][0].t1 == "0") {
        // console.log("ค่าที่ไม่มีในฐาน", items_code[i]);
        const insert_laborder = `INSERT INTO patient_request_lab_items_map_code (lab_code,bb_items,bb_status) VALUES ('${items_code}', '${map[i]}','1');`;
        // console.log("ดู ::", insert_laborder);
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

const dataSetting_Mapcode = (req, res) => {
  const query = `
  SELECT * FROM patient_request_lab_items_map_code as p
  LEFT JOIN bb_items as bb on p.bb_items = bb.mi_code
  LEFT JOIN patient_request_lab_items as i on p.lab_code = i.items_code
  ORDER BY p.lab_code asc`;

  dbConnection
    .execute(query)
    .then((results) => {
      res.send(results[0]);
    })
    .catch((error) => {
      return res.status(500).json({ message: "error", message: error.message });
    });
};

const UP_dataSetting_Mapcode = async (req, res) => {
  // console.log("-----------------------------------------------");
  //  console.log("b", req.body);
  // console.log("q", req.query);
  const { bb_items, items_code } = req.query;

  const query2 = `  SELECT bb_status FROM patient_request_lab_items_map_code  WHERE lab_code='${items_code}' and bb_items='${bb_items}'`;
  const results2 = await dbConnection.execute(query2);
  // console.log("results2", results2[0][0]);
  try {
    if (results2[0][0].bb_status == "0") {
      const insert_laborder = `
        UPDATE patient_request_lab_items_map_code SET
        bb_status = '1'
        WHERE lab_code='${items_code}' and bb_items='${bb_items}'
          `;
      const resultun_group = await dbConnection.execute(insert_laborder);
      return res.status(200).json({ message: "success", data: resultun_group });
    } else if (results2[0][0].bb_status == "1") {
      const insert_laborder2 = `
      UPDATE patient_request_lab_items_map_code SET
      bb_status = '0'
      WHERE lab_code='${items_code}' and bb_items='${bb_items}'
        `;
      const resultun_group = await dbConnection.execute(insert_laborder2);
      return res.status(200).json({ message: "success", data: resultun_group });
    }
  } catch (error) {
    return res.status(500).json({ message: "error", message: error.message });
  }
};
const showdata_edit_mapcode = async (req, res) => {
  // console.log("b", req.body);
  // console.log("q", req.query);

  const { lab_code } = req.query;
  const query = `SELECT * FROM patient_request_lab_items_map_code as m
  left join bb_items as bb on m.bb_items = bb.mi_code WHERE lab_code='${lab_code}'`;

  // console.log("query-------------->",query);
  dbConnection
    .execute(query)
    .then((results) => {
      res.send(results[0]);
    })
    .catch((error) => {
      return res.status(500).json({ message: "error", message: error.message });
    });
};

const save_mapcode_dataedit = async (req, res) => {
  // console.log(
  //   "------------------------------------------------------------------------------------"
  // );
  // console.log("b", req.body);
  // console.log("q", req.query);
  try {
    const { items_code } = req.query;
    const del_q = ` DELETE  FROM patient_request_lab_items_map_code  WHERE lab_code='${items_code}' `;
    dbConnection.execute(del_q);
    return res.status(200).json({ message: "success" });
  } catch (error) {
    return res.status(500).json({ message: "error", message: error.message });
  }
};
module.exports = {
  item_api,
  save_itemdata,
  delete_itemdata,
  UP_itemdata,
  bb_items_api,
  save_mapcode,
  dataSetting_Mapcode,
  UP_dataSetting_Mapcode,
  showdata_edit_mapcode,
  save_mapcode_dataedit,
};
