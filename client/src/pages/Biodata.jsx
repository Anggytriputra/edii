import React, { useEffect, useRef, useState } from "react";
import TableField from "../components/TableField";
import Modal from "../components/Modal";
import FormEmploye from "../components/FormEmploye";
import axios from "axios";
import api from "../api/api";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteConfirmationAlert,
  errorAlertWithMessage,
  successAlert,
} from "../helper/alert";
import TableBody from "../components/TableBody";

const Biodata = () => {
  const [openModal, setOpenModal] = useState(false);
  const [actionSend, setActionSend] = useState("");
  const [headerForm, setHeaderForm] = useState("");
  const refForm = useRef();

  const userGlobal = useSelector((state) => state.user);

  // const [positionApply, setPositionApply] = useState();
  const [bioData, setBiodata] = useState([]);
  console.log("bioData", bioData);
  const [detailBioData, setDetailBiodata] = useState({});
  console.log("detailBioData", detailBioData);

  const [rowsEdu, setRowsEdu] = useState([
    { education: "", university: "", major: "", yearComplete: "", ipk: "" },
  ]);
  console.log("rowsedu", rowsEdu);

  const [rowsCourse, setRowsCourse] = useState([
    { courseName: "", certificated: "", year: "" },
  ]);
  const [rowsWorking, setRowsWorking] = useState([
    { companyName: "", lastPosition: "", lastSalary: "", year: "" },
  ]);

  async function fetchBiodata(q) {
    const res = await api.get(`/biodata/${userGlobal.id}`, {
      params: { search: q },
    });
    console.log("test", res);
    setBiodata(res.data.result);
  }

  async function handleDetail(id) {
    const res = await api.get(`/biodata/detail/${id}`);
    console.log("res deta", res);
    setDetailBiodata(res.data.bioData[0]);
    setRowsEdu(res.data.education);
    setRowsCourse(res.data.course);
    setRowsWorking(res.data.workExp);
    if (res.status === 200) {
      setOpenModal(true);
    }
  }

  useEffect(() => {
    fetchBiodata();
  }, userGlobal.id);

  async function handleCreateBiodata(e) {
    e.preventDefault();
    // console.log("test input", e.target.positionApply?.value);
    const formData = {
      userId: userGlobal.id,
      positionApply: e.target.positionApply.value.trim(),
      name: e.target.name.value.trim(),
      idKtp: e.target.idKtp.value.trim(),
      placeOfBirth: e.target.placeOfBirth.value.trim(),
      gender: e.target.gender.value.trim(),
      religion: e.target.religion.value.trim(),
      bloadGroup: e.target.bloadGroup.value.trim(),
      status: e.target.status.value.trim(),
      addressKtp: e.target.addressKtp.value.trim(),
      addressDomicilies: e.target.addressDomicilies.value.trim(),
      email: e.target.email.value.trim(),
      mobile: e.target.mobile.value.trim(),
      emergencyContact: e.target.emergencyContact.value.trim(),
      lastEducation: e.target.lastEducation.value.trim(),
      skill: e.target.skill.value.trim(),
      willingPlaced: e.target.willingPlaced.value.trim(),
      salaryExpected: e.target.salaryExpected.value.trim(),
      education: rowsEdu,
      course: rowsCourse,
      workExp: rowsWorking,
    };

    // Filter out empty values
    const filteredFormData = Object.fromEntries(
      Object.entries(formData).filter(([_, value]) => value !== "")
    );

    try {
      if (actionSend === "Save Data") {
        await api.post("/biodata", filteredFormData).then((response) => {
          if (response && response.status === 200) {
            setTimeout(() => {
              setOpenModal(false);
            }, 2000);
            fetchBiodata();
            successAlert(response.data.message);
          }
        });
      } else if (actionSend === "Save Changes") {
        await api
          .patch(`/biodata/${detailBioData.id}`, filteredFormData)
          .then((response) => {
            if (response && response.status === 200) {
              setTimeout(() => {
                setOpenModal(false);
              }, 2000);
              fetchBiodata();
              successAlert(response.data.message);
            }
          });
      }
    } catch (error) {
      errorAlertWithMessage(error.response.data.message);
    }
  }

  function handleDelete(bioDataId) {
    deleteConfirmationAlert(
      async () =>
        await api.delete(`/biodata/${bioDataId}`).then((res) => {
          if (res && res.status === 200) {
            fetchBiodata();
            successAlert(res.data.message);
          }
        })
    );
  }

  function handleOpenModal() {
    setOpenModal(true);
  }

  function handleSearch(e) {
    e.preventDefault();
    const search = e.target.searchBiodata?.value;
    fetchBiodata(search).then((res) => {
      console.log("search then", res);
    });
  }

  return (
    <>
      <h1 className="mb-4 pt-5">List Employee</h1>

      {/* <div className=""> */}
      <Modal
        show={openModal}
        setShow={setOpenModal}
        handleSubmit={handleCreateBiodata}
        headerText={headerForm}
        buttonText={actionSend}
        child={
          <FormEmploye
            rowsEdu={rowsEdu}
            setRowsEdu={setRowsEdu}
            rowsCourse={rowsCourse}
            setRowsCourse={setRowsCourse}
            rowsWorking={rowsWorking}
            setRowsWorking={setRowsWorking}
            detailBioData={detailBioData}
          />
        }
      />
      <div className="d-flex mb-3 pt-4">
        {userGlobal.role === "admin" ? (
          <form
            onSubmit={handleSearch}
            className="d-flex col-md-6"
          >
            <input
              className="form-control form-control-dark"
              type="text"
              id="searchBiodata"
              name="searchBiodata"
              placeholder="Search name or position apply or last education..."
              style={{ width: "100%" }}
            />
            <button
              className="btn btn-success"
              type="submit"
            >
              Search
            </button>
          </form>
        ) : null}

        {userGlobal.role === "user" && bioData.length < 1 ? (
          <div className="ms-auto">
            <button
              type="button"
              onClick={() => {
                handleOpenModal();
                setHeaderForm("Biodata Entry");
                setActionSend("Save Data");
              }}
              className="btn btn-primary ms-2"
            >
              Add Employee
            </button>
          </div>
        ) : null}
      </div>

      <TableField
        tbody={
          <TableBody
            data={bioData}
            userRole={userGlobal.role}
            handleEdit={handleDetail}
            handleDelete={handleDelete}
            setHeaderForm={setHeaderForm}
            setAction={setActionSend}
          />
        }
      />
      {/* </div> */}
    </>
  );
};

export default Biodata;
