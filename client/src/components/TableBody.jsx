import React from "react";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

export default function TableBody({
  data = [],
  userRole,
  handleEdit,
  handleDelete,
  handleDetail,
  setAction,
  setHeaderForm,
}) {
  return (
    <>
      {data.map((v) => (
        <tbody key={v.id}>
          <tr>
            <td>{v.name}</td>
            <td>{v.place_birth}</td>
            <td>{v.position_apply}</td>
            <td>{v.last_education}</td>
            <td>
              <div className="d-flex">
                {userRole === "admin" ? (
                  <button
                    onClick={() => {
                      handleEdit(v.id);
                      setHeaderForm("Update Biodata");
                      setAction("Save Changes");
                    }}
                    className="btn btn-warning btn-sm mr-2"
                  >
                    <i className="ri ri-edit-fill"></i>
                  </button>
                ) : null}
                <Link
                  to={`/biodata/detail/${v.id}`}
                  className="btn btn-primary btn-sm"
                >
                  <i className="ri ri-eye-line"></i>
                </Link>
                {userRole === "admin" ? (
                  <button
                    onClick={() => {
                      handleDelete(v.id);
                    }}
                    className="btn btn-danger btn-sm"
                  >
                    <i className="ri ri-delete-bin-line"></i>
                  </button>
                ) : null}
              </div>
            </td>
          </tr>
        </tbody>
      ))}
    </>
  );
}
