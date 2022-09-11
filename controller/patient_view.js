const dbConnection = require("../database");

const Search_patient = (req, res) => {
  const { keyword } = req.query;
  const whereCondition = [];

  if (keyword) {
    whereCondition.push(
      `where p.hn like '%${keyword}%' or concat(trim(p.fname),' ', trim(p.lname)) like '%${keyword}%'`
    );
  }

  const queryString = `select *
  ,concat(CONVERT(DATE_FORMAT(FROM_DAYS(DATEDIFF(NOW(), p.birthday)), '%Y') + 0, char), ' ปี ',
  CONVERT(DATE_FORMAT(FROM_DAYS(DATEDIFF(NOW(), p.birthday)), '%m') - 1, char), ' เดือน ', 
  CONVERT(DATE_FORMAT(FROM_DAYS(DATEDIFF(NOW(), p.birthday)), '%d') - 1, char), ' วัน ') as cal_age 
  ,DATE_FORMAT(DATE_ADD(p.birthday, INTERVAL 543 YEAR), '%d/%m/%Y') as birthday_date
    from patient as p 
      ${whereCondition.length > 0 ? `${whereCondition}` : ""}`;
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

const update_data_patient = async (req, res) => {
  const { hn, pname, fname, lname, dob, sex, bloodgrp, bloodrh, staff } =
    req.body;
  console.log("up", req.body);
  try {
    const queryUpdate = `UPDATE patient SET 
  pname = '${pname}',
  fname = '${fname}',
  lname = '${lname}',
  birthday = '${dob}',
  sex = '${sex}',
  bloodgrp = '${bloodgrp}',
  bloodrh = '${bloodrh}'
  where hn ='${hn}' `;
    await dbConnection.execute(queryUpdate);

    return res.status(200).json({ message: "success" });
  } catch (error) {
    return res.status(500).json({ message: "error", message: error.message });
  }
};

const GetAntibodyResult = (req, res) => {
  ////  console.log("bo", req.body);
  ////  console.log("qy", req.query);

  const { hn } = req.query;
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
      
      
      WHERE p.hn  =  '${hn}'   order BY ab.save_date desc  LIMIT 1`
    )

    .then((results) => {
      res.send(results);
      //  console.log("ssss2s", results);
    })

    .catch((error) => {
      return res.status(200).json({ message: "error" });
    });
};

const GetAntigenResult = (req, res) => {

  const { hn } = req.query;

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
      
      
      WHERE p.hn  =  '${hn}' order BY  aj.save_date desc  LIMIT 1`
    )

    .then((results) => {
      res.send(results);
    })

    .catch((error) => {
      return res.status(200).json({ message: "error" });
    });
};



module.exports = {
  Search_patient,
  update_data_patient,
  GetAntibodyResult,
  GetAntigenResult
};
