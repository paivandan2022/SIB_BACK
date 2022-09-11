const express = require("express");
const path = require("path");
const cookieSession = require("cookie-session");
const dbConnection = require("./database");
const cors = require("cors");

const signin = require("./controller/signin");
const stock = require("./controller/stock");
const stock_detail = require("./controller/stock_detail");
const stock_import = require("./controller/stock_import");
const user = require("./controller/user");
const donor = require("./controller/donor");
const confirmpass = require("./controller/confirmpass");
const result_import = require("./controller/result_import");
const settings = require("./controller/settings");
const spin = require("./controller/spin");
const patient = require("./controller/patient");
const patient_request = require("./controller/patient_request");
const stock_view = require("./controller/stock_view_blooddetail");
const stock_split_bag = require("./controller/stock_split_bag");
const stock_blood_release = require("./controller/stock_blood_release");
const stock_return_blood = require("./controller/stock_return_blood");
const setting_bloodtype = require("./controller/setting_bloddtype");
const stock_deposit = require("./controller/stock_deposit");
const trans_reverse = require("./controller/trans_reverse_blood");
const patient_view = require("./controller/patient_view");
const qc = require("./controller/qc");
const home = require("./controller/home");
const patient_tran_waed = require("./controller/patient_tran_waed");
const rpStock = require("./controller/report_stock");
const rpDonor = require("./controller/report_donor");
const rpDaily = require("./controller/report_daily");
const stock_pool = require("./controller/stock_pool");
const setting_map_items = require("./controller/setting_map_items");

const bodyParser = require("body-parser");
const configs = require("./configs");
const multer = require("multer");
const app = express();
const fs = require("fs");

const PORT = 3006;
// const corsOptions = {
//   origin: "http://localhost:3005",
//   credentials: true,
// };
app.use(cors());
// app.use(express.urlencoded({ extended: false }));
// app.use(cors(corsOptions));

app.use((req, res, next) => {
  let ALLOW_ORIGIN = ["*"];
  let ORIGIN = req.headers.origin;
  if (ALLOW_ORIGIN.includes(ORIGIN)) {
    res.header("Access-Control-Allow-Origin", ORIGIN);
  }
  res.header(
    "Access-Control-Allow-Methods",
    "POST, GET, PUT, PATCH, DELETE, OPTIONS"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Option, Authorization"
  );
  return next();
});

app.use(bodyParser.json({ limit: "20mb" }));
app.use(bodyParser.json({ type: "application/vnd.api+json" }));
app.use(bodyParser.urlencoded({ limit: "20mb", extended: true }));
// SET OUR VIEWS AND VIEW ENGINE

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// APPLY COOKIE SESSION MIDDLEWARE
app.use(
  cookieSession({
    name: "session",
    keys: ["key1", "key2"],
    maxAge: 3600 * 1000, // 1hr
  })
);

// ROOT PAGE

app.post("/signin", signin.signin);
// api ดึงข้อมูล user ทั้งหมด //
app.get("/user", user.user);

app.get("/namehos", (req, res) => {
  dbConnection
    .execute("SELECT hos_long_name_th FROM bb_hospitals where hos_id=1")
    .then((results) => {
      res.send(results);
    })
    .catch((error) => {
      return res.status(200).json({ message: "error" });
    });
});

app.post("/Confirm_password", (req, res) => {
  const password = req.body.password;
  const strQuery = `SELECT * FROM bb_user where  password = '${password}' and flag_delete = 1`;
  dbConnection
    .execute(strQuery)
    .then((results) => {
      res.send(results[0][0]);
    })

    .catch((error) => {
      return res.status(200).json({ message: "error", message: error.message });
    });
});

app.get("/Hospitals_choice", (req, res) => {
  dbConnection
    .execute(
      `select hos_id, hos_long_name_th from bb_hospitals  where hos_active = 1 order by hos_id asc `
    )
    .then((results) => {
      res.send(results);
    })

    .catch((error) => {
      return res.status(200).json({ message: "error" });
    });
});

app.get("/Doctor_choice", (req, res) => {
  dbConnection
    .execute(
      `select * from bb_doctor  where active = 'Y' and (pname = 'นพ.' or pname = 'พญ.') order by code asc `
    )
    .then((results) => {
      res.send(results);
    })

    .catch((error) => {
      return res.status(200).json({ message: "error" });
    });
});

app.get("/Ward_choice", (req, res) => {
  dbConnection
    .execute(`select * from bb_ward  order by ward asc `)
    .then((results) => {
      res.send(results);
    })

    .catch((error) => {
      return res.status(200).json({ message: "error" });
    });
});

app.get("/Mob_choice", (req, res) => {
  dbConnection
    .execute(`SELECT * FROM donor_mobile order by MOBCODE asc `)
    .then((results) => {
      res.send(results);
    })

    .catch((error) => {
      return res.status(200).json({ message: "error" });
    });
});

app.get("/timeWorking_choice", (req, res) => {
  dbConnection
    .execute(`SELECT * FROM time_working `)
    .then((results) => {
      res.send(results);
    })

    .catch((error) => {
      return res.status(200).json({ message: "error" });
    });
});

app.get("/Blood_eject_choice", (req, res) => {
  dbConnection
    .execute(`select * from blood_eject_choice order by id  asc `)
    .then((results) => {
      res.send(results);
    })

    .catch((error) => {
      return res.status(200).json({ message: "error" });
    });
});

app.get("/Staff_choice", (req, res) => {
  dbConnection
    .execute(
      `select *, concat(pname,fname,' ',lname) as fullname from bb_user  order by id_user  asc  `
    )
    .then((results) => {
      res.send(results);
    })

    .catch((error) => {
      return res.status(200).json({ message: "error" });
    });
});

app.get("/pname", (req, res) => {
  dbConnection
    .execute("SELECT * FROM `bb_title_name`")
    .then((results) => {
      res.send(results[0]);
    })
    .catch((error) => {
      return res.status(200).json({ message: "error" });
    });
});

app.get("/Sequence_choice", (req, res) => {
  dbConnection
    .execute(`select * from donor_sequence   order by id  asc `)
    .then((results) => {
      res.send(results);
    })

    .catch((error) => {
      return res.status(200).json({ message: "error" });
    });
});

//--Upload--//
const imageUploadPath = configs.IMAGE_PATH;
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, imageUploadPath);
  },
  filename: function (req, file, cb) {
    cb(null, `${req.query.id}`);
  },
});
const imageUpload = multer({ storage: storage, maxCount: 1 });
//--POST--//
app.post("/image-upload", imageUpload.array("my-image-file"), (req, res) => {
  console.log("POST request received to /image-upload.");
  console.log("Axios POST body: ", Object.keys(req));
  res.send({
    message: req.query.id,
  });
});
// Upload New
//--Upload--//
const imageUploadPath2 = configs.IMAGE_PATH_2;
const storage2 = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, imageUploadPath2);
  },
  filename: function (req, file, cb) {
    cb(null, `${req.query.id}`);
  },
});
const imageUpload2 = multer({ storage: storage2, maxCount: 1 });
//--POST--//
app.post(
  "/image-upload-donor",
  imageUpload2.array("my-image-file"),
  (req, res) => {
    console.log("POST request received to /image-upload.");
    console.log("Axios POST body: ", Object.keys(req));
    res.send({
      message: req.query.id,
    });
  }
);
//--PUT--//
app.put("/update_pic/:id", (req, res) => {
  const strQuery2 =
    "UPDATE bb_user set pic = '" +
    req.body.pic +
    "' WHERE id_user = " +
    req.params.id +
    ";";

  dbConnection
    .execute(strQuery2)
    .then((results) => {
      res.send(results[0]);
    })
    .catch((error) => {
      return res.status(200).json({ message: "error" });
    });
});
///-End Upload-////

// นำ img ออกไปแสดง ///
let d = new Date();
const test_mounth = d.getMonth() + 1;
const test_year = d.getFullYear() + 543;
let a = {};
let path_instrument_result = {};
if (test_mounth < 10) {
  a = "0" + test_mounth;
} else {
  a = test_mounth;
}
path_instrument_result = test_year + a;
let full_path_instrument_result = path_instrument_result.slice(2, 6);
const PATH_Alarm_PREQ = configs.IMAGE_PATH_Alarm_P_REQ;

app.get("/image/:image_name", (req, res) => {
  const pathType = req.query.pathType;
  fs.readFile(
    `${
      pathType === "2"
        ? imageUploadPath2
        : pathType == "3"
        ? PATH_Alarm_PREQ
        : imageUploadPath
    }/${req.params.image_name}`,
    function (err, data) {
      if (!err) {
        res.writeHead(200, {
          "Content-Type":
            "image/png ,image/jpg, image/jpeg, image/bmp , image/tif",
        });
        res.end(data);
      } else {
        console.log(err);
        res.status(500).send(err);
      }
    }
  );
});
// end นำ img ออกไปแสดง ///

// Add data user //
app.post("/adddata_user", user.adddata_user);
//*************************//

app.put("/update_pic/:id", (req, res) => {
  const strQuery2 =
    "UPDATE bb_user set pic = '" +
    req.body.pic +
    "' WHERE id_user = " +
    req.params.id +
    ";";

  dbConnection
    .execute(strQuery2)
    .then((results) => {
      res.send(results[0]);
    })
    .catch((error) => {
      return res.status(200).json({ message: "error" });
    });
});
//*************************//
app.put("/update_user", user.update_user);
// End Add data user ////////////////
app.get("/getabocountall", stock.getabocountall);
/// ///////////////////////
app.get("/totaluser", (req, res) => {
  dbConnection
    .execute("call US_Get_UserCount();")
    .then((results) => {
      res.send(results[0]);
    })

    .catch((error) => {
      return res.status(200).json({ message: "error" });
    });
});
///////////--STOCK BLOOD--/////////////
app.get(`/GetComponentCountAll`, stock.GetComponentCountAll);
app.get(`/GetComponentCountGroup`, stock.GetComponentCountGroup);
app.get(`/GetUnitReadyTypeGroup`, stock.GetUnitReadyTypeGroup);
app.get(`/GetUnitReadyType`, stock.GetUnitReadyType);
app.get(`count_bloodgroup`, stock.count_bloodgroup);
app.get(`/GetUnitDetail`, stock.GetUnitDetail);
app.get(`/OptionType`, stock.OptionType);
app.get(`/SenderBlood`, stock.SenderBlood);
app.get(`/BagType`, stock.BagType);
app.get(`/Blood_Name`, stock.Blood_name);
app.get(`/Rh_Name`, stock.Rh_Name);
app.get(`/Staff_Name`, stock.Staff_Name);
app.get(`/Blood_Liquid`, stock.Blood_Liquid);
app.get(`/GetUnitUpdateDetail`, stock.GetUnitUpdateDetail);
app.get(`/CheckUnitEdit`, stock.CheckUnitEdit);
app.get(`/GetDateTypeExp`, stock.GetDateTypeExp);
app.put(`/Update_Stock`, stock.Update_Stock);
app.get(`/Eject_choice`, stock.Eject_choice);
app.get(`/Eject_staff`, stock.Eject_staff);
app.put(`/UpdateEject`, stock.UpdateEject);
app.get(`/click_Group`, stock.click_Group);
app.get(`/click_All`, stock.click_All);
app.get(`/search_All`, stock.search_All);

///////////--STOCK BLOOD DETAIL--/////////////
app.get(`/Stock_Detail_status`, stock_detail.Stock_Detail_status);
app.get(`/Stock_count_status`, stock_detail.Stock_count_status);
app.get(`/Stock_Detail_Component`, stock_detail.Stock_Detail_Component);
app.get(`/Stock_Detail_Component2`, stock_detail.Stock_Detail_Component2);

app.get(`/Stock_Detail_unit`, stock_detail.Stock_Detail_unit);
app.get(`/Stock_Detail_unit_dorn`, stock_detail.Stock_Detail_unit_dorn);

//22072565
app.get(`/Stock_Detail_all`, stock_detail.Stock_Detail_all);
app.get(`/Stock_Detail_all_dorn`, stock_detail.Stock_Detail_all_dorn);

///////////--STOCK IMPORT--/////////////
//app.get(`/CheckUnitImport`, stock_import.CheckUnitImport);
app.post(`/Insert_Import_Blood`, stock_import.Insert_Import_Blood);
app.put(`/Update_Import_Blood`, stock_import.Update_Import_Blood);
app.get(`/Select_Import_Blood`, stock_import.Select_Import_Blood);
app.delete(`/Delete_Import_Blood`, stock_import.Delete_Import_Blood);
app.get(`/Sum_blood`, stock_import.Sum_blood);

//////////--Donor--////////////////
// start จังหวัด อำเภอ ตำบล
// จังหวัด
app.get(`/Get_Province`, donor.Get_Province);
// อำเภอ
app.get(`/Get_Aumpure`, donor.Get_Aumpure);
// ตำบล
app.get(`/Get_Tumbon`, donor.Get_Tumbon);
// ไปรษณีย์
app.get(`/Get_Zip`, donor.Get_Zip);
// จังหวัด_new
app.get(`/Get_Province_new`, donor.Get_Province_new);
// อำเภอ
app.get(`/Get_Aumpure_new`, donor.Get_Aumpure_new);
// ตำบล
app.get(`/Get_Tumbon_new`, donor.Get_Tumbon_new);
// ไปรษณีย์
app.get(`/Get_Zip_new`, donor.Get_Zip_new);
// เพศ
app.get(`/Get_sex`, donor.Get_sex);
// อาชีพ
app.get(`/Get_occu`, donor.Get_occu);
// สถานะ
app.get(`/Get_mary`, donor.Get_mary);
// bloodgroup
app.get(`/Get_group`, donor.Get_group);
// เพิ่ม guest_regis
app.post(`/Add_guest_donor`, donor.Add_guest_donor);
app.get(`/pname_en_th`, donor.pname_en_th);
app.get(`/Get_donor_list`, donor.Get_donor_list);
app.get(`/Get_donor_list_open`, donor.Get_donor_list_open);
// หน้า Donor_donation_list
app.get(`/Get_history_donor`, donor.Get_history_donor);
app.get(`/Get_staff`, donor.Get_staff);
app.get(`/Get_question`, donor.Get_question);
app.put(`/Add_donor_frmedit`, donor.Add_donor_frmedit);
app.get(`/Get_Donor_Blood`, donor.Get_Donor_Blood);
app.post(`/Eject_register`, donor.Eject_register);
app.get(`/Search_donor_list`, donor.Search_donor_list);
app.put(`/Add_donor`, donor.Add_donor);
app.get(`/Get_bagtype`, donor.Get_bagtype);
app.get(`/Get_Mobile`, donor.Get_Mobile);
app.get(`/Get_Mobile_frist`, donor.Get_Mobile_frist);
app.get(`/Get_donor_last_blood`, donor.Get_donor_last_blood);
app.get(`/Get_donor_donation_detail`, donor.Get_donor_donation_detail);
app.get(`/Get_donor_last_exception`, donor.Get_donor_last_exception);
app.get(`/Get_donor_blood_status`, donor.Get_donor_blood_status);
app.put(`/Add_donor_blood`, donor.Add_donor_blood);
app.put(`/Update_staff_check`, donor.Update_staff_check);
app.get(`/Get_data_donetion`, donor.Get_data_donetion);
app.get(`/Get_data_blood`, donor.Get_data_blood);
app.post(`/Chk_unit_no`, donor.Chk_unit_no);
app.get(`/Get_Rh_Name`, donor.Get_Rh_Name);
app.get(`/Get_donor_count`, donor.Get_donor_count);
app.get(`/Get_Search_donor_view`, donor.Get_Search_donor_view);
app.get(`/Get_History_regis`, donor.Get_History_regis);
app.get(`/Get_His_Donation_blood`, donor.Get_His_Donation_blood);
app.get(`/Search_donor_detail`, donor.Search_donor_detail);
app.get(`/questionnaire_list`, donor.questionnaire_list);
app.put(`/Add_questionnaire`, donor.Add_questionnaire);
app.get(`/fetch_questionnaire`, donor.fetch_questionnaire);
app.get(`/check_donor_not_done`, donor.check_donor_not_done);
app.put(`/Add_fileTxt`, donor.Add_fileTxt);
app.get(`/check_repeat`, donor.check_repeat);

app.post(`/Add_mobile`, donor.Add_mobile);
app.put(`/Update_mobile`, donor.Update_mobile);
app.get(`/Search_moblie`, donor.Search_moblie);

app.get(`/Search_donor`, donor.Search_donor);

//--END Donor--//
// confirm pass //
app.get(`Confirm_password2`, confirmpass.Confirm_password2);
// result_import //
app.get(`/Getdata`, result_import.Getdata);
app.get(`/Get_Group`, result_import.Get_Group);
app.get(`/Get_RH`, result_import.Get_RH);
app.get(`/Get_Choice`, result_import.Get_Choice);
app.get(`/Get_Inf`, result_import.Get_Inf);
app.put(`/Update_result`, result_import.Update_result);

///////
app.get(`/bag_choice`, spin.bag_choice);
app.get(`/get_bagblood`, spin.get_bagblood);
app.get(`/spin_choice_cell`, spin.spin_choice_cell);
app.get(`/spin_choice_platelet`, spin.spin_choice_platelet);
app.get(`/spin_choice_pasma`, spin.spin_choice_pasma);
app.get(`/Search_all_unitno`, spin.Search_all_unitno);
app.get(`/Search_unit_no`, spin.Search_unit_no);
app.get(`/Search_unit_no_option4_2`, spin.Search_unit_no);
app.get(`/Show_1`, spin.Show_1);
app.get(`/Show_2`, spin.Show_2);
app.get(`/Search_unit_no_by_id_list`, spin.Search_unit_no_by_id_list);
app.put(`/Submit_spin_list`, spin.Submit_spin_list);

app.get(`/setting_bag`, spin.setting_bag);
app.get(`/search_bag`, spin.search_bag);
app.get(`/setting_all`, spin.setting_all);
app.put(`/update_setting_bag`, spin.update_setting_bag);

app.put(`/Update_setting`, spin.Update_setting);

app.put(`/setting_inf`, settings.setting_inf);
app.get(`/Check_inf`, settings.Check_inf);

//--------------- setting bloodtype -------------------//
app.get(`/fetch_bloodtype`, setting_bloodtype.fetch_bloodtype);
app.get(`/fetch_component_choice`, setting_bloodtype.fetch_component_choice);
app.put(`/update_set_bloodtype`, setting_bloodtype.update_set_bloodtype);
app.put(`/add_set_bloodtype`, setting_bloodtype.add_set_bloodtype);

//--------------- Patient -------------------//

//------------------------ FEW -------------------//
// patient_request
app.get(`/ShowINdexBlooddetil`, patient_request.ShowINdexBlooddetil);
app.get(`/Choiciall`, patient_request.Choiciall);
app.get(`/blood_group_subgroup`, patient_request.blood_group_subgroup);
app.get(`/Antibody_Screening`, patient_request.Antibody_Screening);
app.get(`/Crossmatching_Result`, patient_request.Crossmatching_Result);
app.get(`/BB_kskdepartment`, patient_request.BB_kskdepartment);
app.get(`/Hospitals`, patient_request.Hospitals);
app.get(`/Bloodneed_API`, patient_request.Bloodneed_API);
app.get(`/ST_RE_API`, patient_request.ST_RE_API);
app.get(`/Search_bloodDetil`, patient_request.Search_bloodDetil);
app.get(`/BloodGR_pc`, patient_request.BloodGR_pc);
app.get(`/WARD_API`, patient_request.WARD_API);
app.get(`/TypeBlood_API`, patient_request.TypeBlood_API);
app.get(`/Crossmatch_TB_API`, patient_request.Crossmatch_TB_API);
app.get(`/Blood_Request_Table`, patient_request.Blood_Request_Table);
app.get(`/Patient_Grouping`, patient_request.Patient_Grouping);
app.get(
  `/Antibody_Screening_Result`,
  patient_request.Antibody_Screening_Result
);
app.get(`/DATandAutocontrol_Result`, patient_request.DATandAutocontrol_Result);
app.get(`/AntibodyResult`, patient_request.AntibodyResult);
app.get(`/AntigenResult`, patient_request.AntigenResult);
app.get(`/Fromshowdata`, patient_request.Fromshowdata);
app.get(`/hn_user_search_modal`, patient_request.hn_user_search_modal);
app.get(`/Search_bloodDetil_madal`, patient_request.Search_bloodDetil_madal);
app.get(`/Data_bloodrequesresult`, patient_request.Data_bloodrequesresult);
app.post(`/insert_BloodDetil`, patient_request.insert_BloodDetil);

app.put(`/con_pg`, patient_request.con_pg);
app.get(`/Chexkcon_pg`, patient_request.Chexkcon_pg);
app.get(`/showChexkcon_pg`, patient_request.showChexkcon_pg);
app.get(`/Count_TypeBlood_API`, patient_request.Count_TypeBlood_API);
app.get(`/Chexkcon_Groupcon`, patient_request.Chexkcon_Groupcon);
app.get(`/request_blood_hisINTap`, patient_request.request_blood_hisINTap);
// few++22-06-2565
app.post(`/UP_Patient_Grouping`, patient_request.UP_Patient_Grouping);
app.post(`/UP_AntibodyScreening`, patient_request.UP_AntibodyScreening);
app.post(`/UP_DATandAutocontrol`, patient_request.UP_DATandAutocontrol);
app.post(`/UP_antibodyiden`, patient_request.UP_antibodyiden);
app.post(`/UP_antigeniden`, patient_request.UP_antigeniden);
app.post(`/Search_bloodNO`, patient_request.Search_bloodNO);
app.post(`/UP_BBCODE`, patient_request.UP_BBCODE);
app.get(`/Blood_Request_Crossmatch`, patient_request.Blood_Request_Crossmatch);
app.get(`/receive_blood_hisINTap`, patient_request.receive_blood_hisINTap);
//index few++29/06/2565
app.get(`/Crossmatch_API`, patient_request.Crossmatch_API);
app.get(`/Crossmatch_EDIT`, patient_request.Crossmatch_EDIT);
app.get(`/insert_crossmatch`, patient_request.insert_crossmatch);
app.get(`/UP_Crossmatch`, patient_request.UP_Crossmatch);
//index few++ 07-07-2565
app.put(`/con_cross`, patient_request.con_cross);
// few++ 12-7-2565
app.get(`/Search_bloodDetil_newlab`, patient_request.Search_bloodDetil_newlab);
// few++ 14-7-2565
app.get(
  `/bb_choice_patient_reqSearch`,
  patient_request.bb_choice_patient_reqSearch
);
// few++ 15-7-2565
app.get(`/finger`, patient_request.finger);
app.get(`/blood_typr_api`, patient_request.blood_typr_api);
// few++ 19-7-2565
app.get(`/Phenotype_API`, patient_request.Phenotype_API);
// few++ 20-7-2565
app.get(`/lab_order_api`, patient_request.lab_order_api);
app.post(`/save_lab_order_api`, patient_request.save_lab_order_api);
// few++ 21-7-2565
app.get(`/up_staff_type_screen`, patient_request.up_staff_type_screen);
app.get(`/show_labcodeAll`, patient_request.show_labcodeAll);
// few++ 22-7-2565
app.post(`/save_lab_order_munti_api`, patient_request.save_lab_order_munti_api);
// few++24-7-2565
app.post(`/insert_crossmatch_UnGR`, patient_request.insert_crossmatch_UnGR);

app.put(`/delete_lab_order`, patient_request.delete_lab_order);
app.put(`/delete_crossmatch`, patient_request.delete_crossmatch);
// few++26-7-2565
app.post(`/insert_crossmatch_UnGR`, patient_request.insert_crossmatch_UnGR);
app.get(`/up_status_cross_api`, patient_request.up_status_cross_api);
app.put(`/delete_lab_order`, patient_request.delete_lab_order);
app.put(`/delete_crossmatch`, patient_request.delete_crossmatch);
// few++29-7-2565
app.post(
  `/insert_crossmatch_inmodal`,
  patient_request.insert_crossmatch_inmodal
);
app.post(`/Search_bloodNO_inmodal`, patient_request.Search_bloodNO_inmodal);
app.post(
  `/insert_crossmatch_inmodal_ungroup`,
  patient_request.insert_crossmatch_inmodal_ungroup
);
// few++05-08-2565
app.put(`/con_type_andscreen`, patient_request.con_type_andscreen);
// few++10/08/2565
app.post(`/patient_note_api`, patient_request.patient_note_api);
// few++14/08/2565
app.post(`/insert_pt_note_api`, patient_request.insert_pt_note_api);
// few++15/08/2565
app.put(`/delete_paitentnote`, patient_request.delete_paitentnote);
// few++17/08/2565
app.post(`/up_tranward`, patient_tran_waed.up_tranward);
// few++17/08/2565
app.post(`/up_tranward`, patient_tran_waed.up_tranward);

const folder_get = configs.IMAGE_PATH_LAB_TYPESC;
app.get("/image_typescreen/:folder/:image_name", (req, res) => {
  const pathType = req.query.pathType;
  fs.readFile(
    `${pathType === "99" ? folder_get : imageUploadPath}/${req.params.folder}/${
      req.params.image_name
    }`,
    function (err, data) {
      if (!err) {
        res.writeHead(200, {
          "Content-Type":
            "image/png ,image/jpg, image/jpeg, image/bmp , image/tif",
        });
        res.end(data);
      } else {
        console.log(err);
        res.status(500).send(err);
      }
    }
  );
});
// few++16/08/2565 tran ward
app.get(`/patient_data`, patient_tran_waed.patient_data);
app.get(`/check_xmId_wd`, patient_tran_waed.check_xmId_wd);
app.get(`/Search_ordernumber_ward`, patient_tran_waed.Search_ordernumber_ward);
app.get(`/patient_note_api_all`, patient_request.patient_note_api_all);
app.get(`/Rh_Name_PREQ`, patient_request.Rh_Name_PREQ);
//--------------------------- EARN ---------------------------//
//Patient_blood
app.get(`/hn_user_search`, patient.hn_user_search);
app.get(`/hn_user`, patient.hn_user);
app.get(`/hospitals`, patient.hospitals);
app.get(`/doctor`, patient.doctor);
app.get(`/department`, patient.department);
app.get(`/ward`, patient.ward);
app.get(`/diag`, patient.diag);
app.get(`/need_priority`, patient.need_priority);
app.get(`/need_fast`, patient.need_fast);
app.get(`/blood_draw`, patient.blood_draw);
app.get(`/blood_type`, patient.blood_type);
app.get(`/count_hid`, patient.count_hid);
app.post(`/addHospital`, patient.addHospital);
app.post(`/uqHospital`, patient.uqHospital);
app.delete(`/DeleteHospital`, patient.DeleteHospital);
app.get(`/request_blood_his`, patient.request_blood_his);
app.get(`/receive_blood_his`, patient.receive_blood_his);
app.get(`/patient_note`, patient.patient_note);
app.get(`/receive_blood_list`, patient.receive_blood_list);
app.get(`/patient_react_list`, patient.patient_react_list);
app.get(`/hn_grouping`, patient.hn_grouping);
app.get(`/hn_antibody`, patient.hn_antibody);
app.get(`/hn_dat`, patient.hn_dat);
app.get(`/hn_user_req`, patient.hn_user_req);
app.post(`/add_patient_request`, patient.add_patient_request);
app.post(`/edit_patient_request`, patient.edit_patient_request);
app.get(`/patient_request`, patient.patient_request);
app.get(`/blood_request_list`, patient.blood_request_list);
app.get(`/check_blood_request`, patient.check_blood_request);
app.get(`/Datail_cancel`, patient.Datail_cancel);
app.get(`/Datail_delete`, patient.Datail_delete);
app.post(`/cancel_order`, patient.cancel_order);
app.post(`/delete_order`, patient.delete_order);
//-------------------ERAN----------------------------
//TransBlood
app.get(`/check_fingerTip`, patient.check_fingerTip);
app.get(`/show_fingerTip`, patient.show_fingerTip);
app.get(`/check_xmId`, patient.check_xmId);
app.get(`/recived_staff`, patient.recived_staff);
app.post(`/update_coss_trans`, patient.update_coss_trans);
app.post(`/update_RceivedStaff`, patient.update_RceivedStaff);

app.post(`/Add_Finger`, patient.Add_Finger);

//index earn++
app.get(`/check_data_blood`, patient.check_data_blood);
app.get(`/search_his_trans`, patient.search_his_trans);
app.post(`/add_trans_blood`, patient.add_trans_blood);
// index earn++ 04/07/2565
app.get(`/dataTransBlood`, patient.dataTransBlood);
// index earn++ 05/07/2565 add reaction blood
app.get(`/CheckDataBlood`, patient.CheckDataBlood);
app.get(`/ReactionList`, patient.ReactionList);
app.get(`/DataReactionHis`, patient.DataReactionHis);
app.post(`/addReactionBlood`, patient.addReactionBlood);
app.get(`/Search_detail`, patient.Search_detail);

// ------------------TOTO-------------------------
app.get(`/seacrh_unit_no`, stock_view.seacrh_unit_no);
app.get(`/seacrh_donor`, stock_view.seacrh_donor);
app.get(`/separate_blood`, stock_view.separate_blood);
app.get(`/get_donor_modal`, stock_view.get_donor_modal);
app.put(`/donor_frmedit_modal`, stock_view.donor_frmedit_modal);
app.put(`/updateBloodValue`, stock_view.updateBloodValue);

//--------------------TOTO-------------------------------
app.get(`/option_type`, stock_split_bag.option_type);
app.get(`/get_unit_no`, stock_split_bag.get_unit_no);
app.get(`/gen_unit_no`, stock_split_bag.gen_unit_no);
app.post(`/save_split_unit`, stock_split_bag.save_split_unit);
app.get(`/setdata_tb`, stock_split_bag.setdata_tb);
//-----------------------TOTO--------------------------------------
app.get(`/search_blood_release`, stock_blood_release.search_unit_no);
app.put(`/save_blood_release`, stock_blood_release.save_blood_release);
app.get(`/search_his_release`, stock_blood_release.search_his_release);

//-----------------stock_deposit-------------
app.get(`/fetch_deposit_common`, stock_deposit.fetch_deposit_common);
app.get(`/data_blood`, stock_deposit.data_blood);
app.post(`/add_deposit_blood`, stock_deposit.add_deposit_blood);
app.get(`/search_his_deposit`, stock_deposit.search_his_deposit);

app.get(`/search_blood_retrun`, stock_return_blood.search_blood_retrun);
app.get(
  `/get_blood_reverse_condition`,
  stock_return_blood.get_blood_reverse_condition
);
app.put(
  `/Add_blood_reverse_condition`,
  stock_return_blood.Add_blood_reverse_condition
);
app.get(
  `/get_blood_reverse_choice`,
  stock_return_blood.get_blood_reverse_choice
);
app.put(
  `/Add_blood_reverse_choice`,
  stock_return_blood.Add_blood_reverse_choice
);
app.put(`/blood_reverse`, stock_return_blood.blood_reverse);
app.get(`/search_his_reverse`, stock_return_blood.search_his_reverse);

//---------trans_reverse-----
app.get(
  `/search_trans_blood_reverse`,
  trans_reverse.search_trans_blood_reverse
);
app.put(`/save_trans_reverse`, trans_reverse.save_trans_reverse);
app.get(`/search_his_trans_reverse`, trans_reverse.search_his_trans_reverse);

//---------patient_view-----
app.get(`/Search_patient`, patient_view.Search_patient);
app.put(`/update_data_patient`, patient_view.update_data_patient);
app.get(`/GetAntibodyResult`, patient_view.GetAntibodyResult);
app.get(`/GetAntigenResult`, patient_view.GetAntigenResult);

//---------qc-----
app.get(`/Get_result_qc`, qc.Get_result_qc);
app.get(`/Get_choice_qc`, qc.Get_choice_qc);
app.get(`/Get_action_qc`, qc.Get_action_qc);
app.get(`/Get_group_qc`, qc.Get_group_qc);
app.put(`/Add_group_qc`, qc.Add_group_qc);
app.put(`/Add_action_qc`, qc.Add_action_qc);
app.put(`/Save_qc`, qc.Save_qc);
app.put(`/Update_qc`, qc.Update_qc);
app.get(`/Get_setting_qc`, qc.Get_setting_qc);
app.get(`/Get_setting`, qc.Get_setting);
app.put(`/Add_setting_log`, qc.Add_setting_log);
app.put(`/Del_setting`, qc.Del_setting);
app.put(`/Add_setting`, qc.Add_setting);
app.put(`/Up_review_staff`, qc.Up_review_staff);
app.put(`/Up_approve_staff`, qc.Up_approve_staff);
app.get(`/Get_inst_qc`, qc.Get_inst_qc);
app.put(`/Add_inst_qc`, qc.Add_inst_qc);
app.get(`/Get_action`, qc.Get_action);
app.get(`/Get_result_not_review`, qc.Get_result_not_review);
app.get(`/Get_action_not_review`, qc.Get_action_not_review);

//---------home-----
app.get(`/Get_stockBlood`, home.Get_stockBlood);
app.get(`/Get_news`, home.Get_news);
app.get(`/Get_newType`, home.Get_newType);
app.put(`/Add_News`, home.Add_News);

//---------report stock-----
app.get(`/Get_report_ready`, rpStock.Get_report_ready);
app.get(`/data_resive`, rpStock.data_resive);
app.get(`/data_report_exp`, rpStock.data_report_exp);
app.get(
  `/data_report_stock_Separates_Bloods`,
  rpStock.data_report_stock_Separates_Bloods
);
app.get(`/Get_report_xm`, rpStock.Get_report_xm);
app.get(`/Get_report_trans_revers`, rpStock.Get_report_trans_revers);
app.get(`/Get_report_trans`, rpStock.Get_report_trans);

//---------report Donor-----
app.get(`/data_report_donor_getneedle`, rpDonor.data_report_donor_getneedle);
app.get(`/Get_report_blood_result`, rpDonor.Get_report_blood_result);
app.get(`/Get_report_out_area`, rpDonor.Get_report_out_area);
app.get(
  `/Get_report_donor_donationnotification`,
  rpDonor.Get_report_donor_donationnotification
);
app.get(`/Get_report_donor_infect`, rpDonor.Get_report_donor_infect);
app.get(
  `/Get_report_donor_rare_blood_type`,
  rpDonor.Get_report_donor_rare_blood_type
);

//---------report Daily-----
app.get(`/Get_daily_request`, rpDaily.Get_daily_request);
app.get(`/Get_daily_CT_ratio`, rpDaily.Get_daily_CT_ratio);
app.get(`/Get_daily_CT_ratio_ward`, rpDaily.Get_daily_CT_ratio_ward);
app.get(`/Get_daily_trans_blood`, rpDaily.Get_daily_trans_blood);
app.get(`/Get_Get_daily_blood_deposit`, rpDaily.Get_Get_daily_blood_deposit);
app.get(`/Get_report_daily_Antibody`, rpDaily.Get_report_daily_Antibody);
app.get(`/Get_report_daily_cut_blood`, rpDaily.Get_report_daily_cut_blood);
app.get(`/Get_daily_turnaround_time`, rpDaily.Get_daily_turnaround_time);
app.get(`/Get_daily_p4p`, rpDaily.Get_daily_p4p);

// ---------stock_pool -------
app.get(`/search_unit`, stock_pool.search_unit);
app.get(`/search_plete`, stock_pool.search_plete);

// ---------setting map Item----------
app.get(`/item_api`, setting_map_items.item_api);
app.post(`/save_itemdata`, setting_map_items.save_itemdata);
app.put(`/delete_itemdata`, setting_map_items.delete_itemdata);
app.get(`/UP_itemdata`, setting_map_items.UP_itemdata);
app.get(`/bb_items_api`, setting_map_items.bb_items_api);
app.post(`/save_mapcode`, setting_map_items.save_mapcode);
app.get(`/dataSetting_Mapcode`, setting_map_items.dataSetting_Mapcode);
app.get(`/UP_dataSetting_Mapcode`, setting_map_items.UP_dataSetting_Mapcode);
app.get(`/showdata_edit_mapcode`, setting_map_items.showdata_edit_mapcode);
app.get(`/save_mapcode_dataedit`, setting_map_items.save_mapcode_dataedit);

// --------------------------

app.listen(`${PORT}`, () =>
  console.log("Server is Running... // Port", `${PORT}`)
);
