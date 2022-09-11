const dbConnection = require("../database");

const GetUnitReadyType = (req, res) => {
  const page = Number(req.query.page || 0 || 1);
  const limit = Number(req.query.limit || 10);
  const start = Number((page - 1) * 10);

  const strqr = `call ST_Get_UnitReadyType(
    '${req.query.type_id}',
    '${req.query.value_search || ""}',
    ${start}
    )`;

  dbConnection
    .execute(strqr)
    .then((results) => {
      res.send(results[0]);
    })

    .catch((error) => {
      return res.status(200).json({ message: "error" });
    });
};
//*********************************//
const search_All =  (req, res) => {
  const {value_search, blood_no} = req.query

const query = `select * from (
  select b.id as id
  , b.blood_no as unit_no
  , concat(SUBSTRING(b.blood_no FROM 1 FOR 3), '.'
  , SUBSTRING(b.blood_no FROM 4 FOR 2), '.'
  , SUBSTRING(b.blood_no FROM 6 FOR 1), '.'
  , SUBSTRING(b.blood_no FROM 7)) as unit_no_dot
  , b.blood_group as gr
  , b.blood_rh as rh
  , concat(b.blood_group,b.blood_rh) as abo
  , t.s_name as component_type
  , DATE_FORMAT(DATE_ADD(b.receive_date , INTERVAL 543 YEAR), '%d/%m/%Y') as date_received
  , DATE_FORMAT(DATE_ADD(b.donor_date , INTERVAL 543 YEAR), '%d/%m/%Y') as date_collect
  , DATE_FORMAT(DATE_ADD(b.expiry_date, INTERVAL 543 YEAR), '%d/%m/%Y') as date_exp
  , DATEDIFF(b.expiry_date,now()) as num_exp
  , (@row_number:=@row_number + 1) as Row_no
  from (SELECT @rownum:= 0) as r, blood as b
  left join blood_type as t ON b.blood_type = t.id
  left join blood_status as s ON b.status = s.bl_status_id
  where b.status = 1
  and b.blood_no = '${blood_no}'
  and if(('${value_search}') <> 'all', b.blood_group = '${value_search}', b.blood_group is not null)
  order by b.expiry_date asc, b.blood_group asc) as t1
--   where Row_no > 0 limit 10 `;

  console.log("q",query);

  dbConnection
  .execute(query)
  .then((results) => {
    res.send(results[0]);
  })

  .catch((error) => {
    return res.status(200).json({ message: "error" });
  });
}

const click_All =  (req, res) => {
  const {group, page} = req.query

const query = `select * from (
  select b.id as id
  , b.blood_no as unit_no
  , concat(SUBSTRING(b.blood_no FROM 1 FOR 3), '.'
  , SUBSTRING(b.blood_no FROM 4 FOR 2), '.'
  , SUBSTRING(b.blood_no FROM 6 FOR 1), '.'
  , SUBSTRING(b.blood_no FROM 7)) as unit_no_dot
  , b.blood_group as gr
  , b.blood_rh as rh
  , concat(b.blood_group,b.blood_rh) as abo
  , t.s_name as component_type
  , DATE_FORMAT(DATE_ADD(b.receive_date , INTERVAL 543 YEAR), '%d/%m/%Y') as date_received
  , DATE_FORMAT(DATE_ADD(b.donor_date , INTERVAL 543 YEAR), '%d/%m/%Y') as date_collect
  , DATE_FORMAT(DATE_ADD(b.expiry_date, INTERVAL 543 YEAR), '%d/%m/%Y') as date_exp
  , DATEDIFF(b.expiry_date,now()) as num_exp
  , (@row_number:=@row_number + 1) as Row_no
  from (SELECT @rownum:= 0) as r, blood as b
  left join blood_type as t ON b.blood_type = t.id
  left join blood_status as s ON b.status = s.bl_status_id
  where b.status = 1
  -- and b.blood_group = '${group}'
  -- and b.blood_type = Type_id
  -- and if(trim(value_search) <> '', b.blood_no like concat('%', value_search,'%'), b.blood_no is not null)
  order by b.expiry_date asc, b.blood_group asc) as t1
  -- where Row_no > ${page} limit 10 `;

  console.log("q",query);

  dbConnection
  .execute(query)
  .then((results) => {
    res.send(results[0]);
  })

  .catch((error) => {
    return res.status(200).json({ message: "error" });
  });
}


const click_Group =  (req, res) => {
  const {group} = req.query
const query = `select * from (
  select b.id as id
  , b.blood_no as unit_no
  , concat(SUBSTRING(b.blood_no FROM 1 FOR 3), '.'
  , SUBSTRING(b.blood_no FROM 4 FOR 2), '.'
  , SUBSTRING(b.blood_no FROM 6 FOR 1), '.'
  , SUBSTRING(b.blood_no FROM 7)) as unit_no_dot
  , b.blood_group as gr
  , b.blood_rh as rh
  , concat(b.blood_group,b.blood_rh) as abo
  , t.s_name as component_type
  , DATE_FORMAT(DATE_ADD(b.receive_date , INTERVAL 543 YEAR), '%d/%m/%Y') as date_received
  , DATE_FORMAT(DATE_ADD(b.donor_date , INTERVAL 543 YEAR), '%d/%m/%Y') as date_collect
  , DATE_FORMAT(DATE_ADD(b.expiry_date, INTERVAL 543 YEAR), '%d/%m/%Y') as date_exp
  , DATEDIFF(b.expiry_date,now()) as num_exp
  , (@row_number:=@row_number + 1) as Row_no
  from (SELECT @rownum:= 0) as r, blood as b
  left join blood_type as t ON b.blood_type = t.id
  left join blood_status as s ON b.status = s.bl_status_id
  where b.status = 1
  and b.blood_group = '${group}'
  -- and b.blood_type = Type_id
  -- and if(trim(value_search) <> '', b.blood_no like concat('%', value_search,'%'), b.blood_no is not null)
  order by b.expiry_date asc, b.blood_group asc) as t1
  -- where Row_no > page_from limit 10 `;

  dbConnection
  .execute(query)
  .then((results) => {
    res.send(results[0]);
  })

  .catch((error) => {
    return res.status(200).json({ message: "error" });
  });
}

const count_bloodgroup = (req, res) => {
  dbConnection
    .execute(
      "SELECT if (blood_group = '','cryO',blood_group )AS ABO, count( id ) AS num FROM blood WHERE STATUS = '1' " +
        "GROUP BY " +
        "REPLACE ( blood_group, '3', '' ) " +
        "ORDER BY " +
        "blood_group ASC"
    )
    .then((results) => {
      res.send(results);
    })
    .catch((error) => {
      return res.status(200).json({ message: "error" });
    });
};
//*********************************//
const GetUnitReadyTypeGroup = (req, res) => {
  // const strqr2 = `call ST_Get_UnitReadyTypeGroup(
  // '${req.query.type_id}',
  // '${req.query.blood_group}',
  // '${req.query.value_search || ""}',
  // '${req.query.page || "" || "0"}'
  // )`;
  dbConnection
    .execute(
      `call ST_Get_UnitReadyTypeGroup(
        '${req.query.type_id}',
        '${req.query.blood_group}',
        '${req.query.value_search || ""}',
        '${req.query.page || "" || "0"}'
        )`
    )
    .then((results) => {
      res.send(results[0]);
    })

    .catch((error) => {
      console.log("error====", error);
      return res.status(200).json({ message: "error" });
    });
};
//*********************************//
const GetComponentCountGroup = (req, res) => {
  dbConnection
    .execute(`call ST_Get_ComponentCountGroup('` + req.query.group + `')`)
    .then((results) => {
      res.send(results[0]);
    })

    .catch((error) => {
      return res.status(200).json({ message: "error" });
    });
};
//*********************************//
const GetUnitDetail = (req, res) => {
  dbConnection
    .execute(`call ST_Get_UnitDetail('${req.query.blood_id}')`)
    .then((results) => {
      res.send(results[0]);
    })

    .catch((error) => {
      return res.status(200).json({ message: "error" });
    });
};
//*********************************//
const GetComponentCountAll = (req, res) => {
  dbConnection
    .execute(`call ST_Get_ComponentCountAll();`)
    .then((results) => {
      res.send(results[0]);
    })

    .catch((error) => {
      return res.status(200).json({ message: "error" });
    });
};
//*********************************//
const OptionType = (req, res) => {
  dbConnection
    .execute(
      `select id, s_name from blood_type where active = 1 order by component_type asc`
    )
    .then((results) => {
      res.send(results[0]);
    })

    .catch((error) => {
      return res.status(200).json({ message: "error" });
    });
};
//*********************************//
const SenderBlood = (req, res) => {
  dbConnection
    .execute(
      `select hos_id, hos_shot_name_th from bb_hospitals order by hos_shot_name_th`
    )
    .then((results) => {
      res.send(results[0]);
    })

    .catch((error) => {
      return res.status(200).json({ message: "error" });
    });
};
//*********************************//
const BagType = (req, res) => {
  dbConnection
    .execute(
      `select  bagcode, bagtype FROM blood_bag_type where status = 1 order by display asc`
    )
    .then((results) => {
      res.send(results[0]);
    })

    .catch((error) => {
      return res.status(200).json({ message: "error" });
    });
};
//*********************************//
const Blood_name = (req, res) => {
  dbConnection
    .execute(`select  blood_name from blood_group order by  blood_id asc`)
    .then((results) => {
      res.send(results[0]);
    })

    .catch((error) => {
      return res.status(200).json({ message: "error" });
    });
};
//*********************************//
const Rh_Name = (req, res) => {
  dbConnection
    .execute(`select rh_shot_name from blood_rh order by rh_id asc`)
    .then((results) => {
      res.send(results);
    })

    .catch((error) => {
      return res.status(200).json({ message: "error" });
    });
};
//*********************************//
const Staff_Name = (req, res) => {
  dbConnection
    .execute(
      `select CONCAT( fname,' ', lname) as staff from bb_user where flag_delete = 1 order by fname asc `
    )
    .then((results) => {
      res.send(results[0]);
    })

    .catch((error) => {
      return res.status(200).json({ message: "error" });
    });
};
//*********************************//
const Blood_Liquid = (req, res) => {
  dbConnection
    .execute(`select  id, name from blood_liquid `)
    .then((results) => {
      res.send(results[0]);
    })

    .catch((error) => {
      return res.status(200).json({ message: "error" });
    });
};
//*********************************//
const getabocountall = (req, res) => {
  dbConnection
    .execute(`call ST_Get_ABOCountAll();`)
    .then((results) => {
      res.send(results[0]);
    })

    .catch((error) => {
      return res.status(200).json({ message: "error", eror: error.message });
    });
};
//*********************************//
const GetUnitUpdateDetail = (req, res) => {
  dbConnection
    .execute(`call ST_Get_UnitUpdateDetail('${req.query.id}')`)
    .then((results) => {
      res.send(results[0]);
    })

    .catch((error) => {
      return res.status(200).json({ message: "error" });
    });
};

const CheckUnitEdit = (req, res) => {
  const { type_id, unit_no, blood_id } = req.query;
  dbConnection
    .execute(
      `select * from blood 
        where blood_no = ${unit_no}
        and blood_type = ${type_id}
        and id <> ${blood_id}`
    )
    .then((results) => {
      if (results[0].length > 0) {
        res.status(200).json({ message: "fail" });
      } else {
        res.status(200).json({ message: "pass" });
      }
    })
    .catch((error) => {
      return res.status(200).json({ message: "error" });
    });
};
//*********************************//
const GetDateTypeExp = (req, res) => {
  const { type_id } = req.query;
  dbConnection
    .execute(
      `select date_expri,component_type  FROM blood_type where id = ${type_id};`
    )
    .then((results) => {
      res.send(results[0]);
    })

    .catch((error) => {
      return res.status(200).json({ message: "error" });
    });
};
//********************************//
const Update_Stock = (req, res) => {
  const strQuery2 =
    "UPDATE blood set blood_type = '" +
    req.body.type_id +
    "', blood_receive= '" +
    req.body.hos_id +
    "', blood_bag_type_id = '" +
    req.body.bag_type_id +
    "', liquid = '" +
    req.body.liquid_id +
    "', receive_date = '" +
    req.body.date_received +
    "', donor_date = '" +
    req.body.date_collect +
    "', expiry_date = '" +
    req.body.date_exp +
    " " +
    req.body.exp_time +
    "', blood_group = '" +
    req.body.blood_group +
    "', blood_rh = '" +
    req.body.blood_rh +
    "', blood_value = '" +
    req.body.volume +
    "', blood_no = '" +
    req.body.unit_no +
    "', note = '" +
    req.body.note +
    "', staff_name = '" +
    req.body.staff_name +
    "' WHERE id = '" +
    req.body.blood_id +
    "';";
  dbConnection
    .execute(strQuery2)
    .then((results) => {
      res.send(results[0]);
    })
    .catch((error) => {
      return res.status(200).json({ message: "error" });
    });
};
//********************************//
const Eject_choice = (req, res) => {
  dbConnection
    .execute(`select * from blood_eject_choice order by id `)
    .then((results) => {
      res.send(results[0]);
    })

    .catch((error) => {
      return res.status(200).json({ message: "error" });
    });
};
//********************************//
const Eject_staff = (req, res) => {
  dbConnection
    .execute(
      `select *, concat(pname,fname,' ',lname) as full_name from bb_user where flag_delete = 1 order by concat (fname,lname) asc ;
      `
    )
    .then((results) => {
      res.send(results[0]);
    })

    .catch((error) => {
      return res.status(200).json({ message: "error" });
    });
};
//********************************//
const UpdateEject = (req, res) => {
  const { blood_id, unit_no, eject_note, eject_staff } = req.body;
  const strqry = `insert into blood_eject (unit_id, unit_no, ej_note, ej_date, ej_staff) 
  values(
  '${blood_id}'
  , '${unit_no}'
  , '${eject_note}'
  , now()
  , '${eject_staff}'
  );
  `;

  const strqry2 = `update blood set status = '14' where id ='${blood_id}';`;

  dbConnection
    .execute(strqry)
    .then((results1) => {
      return dbConnection.execute(strqry2);
    })
    .then((results) => {
      res.send(results[0]);
    })

    .catch((error) => {
      return res.status(200).json({ message: "error", error: error.message });
    });
};
module.exports = {
  GetUnitReadyType,
  count_bloodgroup,
  GetUnitReadyTypeGroup,
  GetComponentCountGroup,
  GetComponentCountAll,
  GetUnitDetail,
  OptionType,
  getabocountall,
  SenderBlood,
  BagType,
  Blood_name,
  Rh_Name,
  Staff_Name,
  Blood_Liquid,
  GetUnitUpdateDetail,
  CheckUnitEdit,
  GetDateTypeExp,
  Update_Stock,
  Eject_choice,
  Eject_staff,
  UpdateEject,
  click_Group,
  click_All,
  search_All
};
