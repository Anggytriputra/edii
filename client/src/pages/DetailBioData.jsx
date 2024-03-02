import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FormEmploye from "../components/FormEmploye";
import api from "../api/api";

const DetailBioData = () => {
  const { id } = useParams();

  const location = "detail data";
  const [detailBioData, setDetailBiodata] = useState();
  const [rowsEdu, setRowsEdu] = useState();
  const [rowsCourse, setRowsCourse] = useState();
  const [rowsWorking, setRowsWorking] = useState();

  async function fetchDetail(id) {
    const res = await api.get(`/biodata/detail/${id}`);

    setDetailBiodata(res.data.bioData[0]);
    setRowsEdu(res.data.education);
    setRowsCourse(res.data.course);
    setRowsWorking(res.data.workExp);
  }

  useEffect(() => {
    fetchDetail(id);
  }, [id]);

  return (
    <>
      <div className="pt-5 mb-5 d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1>Personal Data</h1>
      </div>
      <div className="mb-5">
        <FormEmploye
          detailBioData={detailBioData}
          rowsEdu={rowsEdu}
          rowsCourse={rowsCourse}
          rowsWorking={rowsWorking}
          location={location}
        />
      </div>
    </>
  );
};

export default DetailBioData;
