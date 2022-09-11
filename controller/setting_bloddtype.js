const dbConnection = require("../database");

const fetch_bloodtype = (req, res) => {
  const strQuery = `SELECT b.* 
    , (select component_name from blood_component_type where component_type = b.component_type ) as component_choice 
    FROM blood_type as b where b.id <> '0'`;
  dbConnection
    .execute(strQuery)
    .then((results) => {
      res.send(results[0]);
    })
    .catch((error) => {
      return res.status(500).json({ message: "error", message: error.message });
    });
};

const fetch_component_choice = (req, res) => {
  const strQuery = `select * from blood_component_type`;
  dbConnection
    .execute(strQuery)
    .then((results) => {
      res.send(results[0]);
    })
    .catch((error) => {
      return res.status(500).json({ message: "error", message: error.message });
    });
};

const update_set_bloodtype = async (req, res) => {
  const {
    id,
    l_name,
    s_name,
    date_expri,
    display,
    active,
    component_type,
    auto_result,
    separate_type,
  } = req.body;
  console.log("update", req.body);

  try {
    console.log("4",req.body);
  
    const Query = `UPDATE blood_type set
    s_name ='${s_name}'
    ,l_name ='${l_name}'
    ,date_expri = ${date_expri}
    ,display = '${display}'
    ,active = ${active}
    ,component_type = ${component_type}
    ,auto_result = '${auto_result}'
    where id  = ${id};`;
  
    console.log("Modal",Query);
  
    const result = await dbConnection.execute(Query);
  
  return res.status(200).json({
    message: "success",
  });
    } catch (error) {
    return res.status(500).json({ message: "error", message: error.message });
    }
};


const add_set_bloodtype = async (req, res) => {
  const {
    l_name,
    s_name,
    date_expri,
    display,
    active,
    component_type,
    auto_result,
    separate_type,
    type_code
  } = req.body;
  console.log("add", req.body);

  const id = `SELECT (id+1) as id from blood_type  order by id desc limit 1`;
  const resultId = await dbConnection.execute(id);
  console.log("resultId", resultId[0][0].id);


  try {


    const Query = `INSERT INTO blood_type 
    (id,type_code,s_name,l_name,date_expri,display,active,component_type,auto_result) VALUES (
      '${resultId[0][0].id}'
      , '${type_code}'
      , '${s_name}'
     ,'${l_name}'
     , ${date_expri}
     , '${display}'
     , ${active}
     , ${component_type}
     , '${auto_result}'
    )`
     
  
    console.log("add",Query);
  
    const result = await dbConnection.execute(Query);
  
  return res.status(200).json({
    message: "success",
  });
    } catch (error) {
    return res.status(500).json({ message: "error", message: error.message });
    }
};


module.exports = {
  fetch_bloodtype,
  fetch_component_choice,
  update_set_bloodtype,
  add_set_bloodtype
};
