import { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { Plus } from "react-feather";

export default function FormEmploye({
  rowsEdu = [],
  setRowsEdu,
  rowsCourse = [],
  setRowsCourse,
  rowsWorking = [],
  setRowsWorking,
  detailBioData = {},
  location,
}) {
  const [isHidden, setIsHidden] = useState(
    location !== null && location !== undefined
  );

  const handleAddRowEdu = () => {
    setRowsEdu([
      ...rowsEdu,
      { education: "", university: "", major: "", yearComplete: "", ipk: "" },
    ]);
  };

  const handleAddRowCourse = () => {
    setRowsCourse([
      ...rowsCourse,
      {
        courseName: "",
        certificated: "",
        year: "",
      },
    ]);
  };

  const handleAddRowWorking = () => {
    setRowsWorking([
      ...rowsWorking,
      {
        companyName: "",
        lastPosition: "",
        lastSalary: "",
        year: "",
      },
    ]);
  };

  const handleChangeEdu = (index, fieldName, value) => {
    const updatedRows = [...rowsEdu];
    updatedRows[index][fieldName] = value;
    setRowsEdu(updatedRows);
  };
  const handleChangeCourse = (index, fieldName, value) => {
    const updatedRows = [...rowsCourse];
    updatedRows[index][fieldName] = value;
    setRowsCourse(updatedRows);
  };
  const handleChangeWorking = (index, fieldName, value) => {
    const updatedRows = [...rowsWorking];
    updatedRows[index][fieldName] = value;
    setRowsWorking(updatedRows);
  };

  return (
    <>
      <Form.Group
        as={Row}
        className="mb-3"
        // controlId="formHorizontalEmail"
      >
        <Form.Label
          column
          sm={3}
        >
          Position Apply
        </Form.Label>
        <Col sm={9}>
          <Form.Control
            type="text"
            id="positionApply"
            name="positionApply"
            defaultValue={detailBioData.position_apply || ""}
          />
        </Col>
      </Form.Group>

      <Form.Group
        as={Row}
        className="mb-3"
        // controlId="formHorizontalEmail"
      >
        <Form.Label
          column
          sm={3}
        >
          Name
        </Form.Label>
        <Col sm={9}>
          <Form.Control
            type="text"
            id="name"
            name="name"
            defaultValue={detailBioData.name || ""}
          />
        </Col>
      </Form.Group>

      <Form.Group
        as={Row}
        className="mb-3"
        // controlId="formHorizontalEmail"
      >
        <Form.Label
          column
          sm={3}
        >
          ID. KTP
        </Form.Label>
        <Col sm={9}>
          <Form.Control
            type="text"
            id="idKtp"
            name="idKtp"
            defaultValue={detailBioData.id_ktp || ""}
          />
        </Col>
      </Form.Group>

      <Form.Group
        as={Row}
        className="mb-3"
        // controlId="formHorizontalEmail"
      >
        <Form.Label
          column
          sm={3}
        >
          Place, Date Birth
        </Form.Label>
        <Col sm={9}>
          <Form.Control
            type="text"
            id="placeOfBirth"
            name="placeOfBirth"
            defaultValue={detailBioData.place_birth || ""}
          />
        </Col>
      </Form.Group>

      <Form.Group
        as={Row}
        className="mb-3"
      >
        <Form.Label
          column
          sm={3}
        >
          Gender
        </Form.Label>
        <Col sm={9}>
          <select
            className="form-select"
            aria-label="Default select example"
            id="gender"
            name="gender"
            defaultValue={detailBioData.gender || ""}
          >
            <option value="">Please Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </Col>
      </Form.Group>

      <Form.Group
        as={Row}
        className="mb-3"
        // controlId="formHorizontalEmail"
      >
        <Form.Label
          column
          sm={3}
        >
          Religion
        </Form.Label>
        <Col sm={9}>
          <Form.Control
            type="text"
            id="religion"
            name="religion"
            defaultValue={detailBioData.religion || ""}
          />
        </Col>
      </Form.Group>

      <Form.Group
        as={Row}
        className="mb-3"
        // controlId="formHorizontalEmail"
      >
        <Form.Label
          column
          sm={3}
        >
          Blood Group
        </Form.Label>
        <Col sm={9}>
          <Form.Control
            type="text"
            id="bloadGroup"
            name="bloodGroup"
            defaultValue={detailBioData.bload_group || ""}
          />
        </Col>
      </Form.Group>

      <Form.Group
        as={Row}
        className="mb-3"
        // controlId="formHorizontalEmail"
      >
        <Form.Label
          column
          sm={3}
        >
          Marital Status
        </Form.Label>
        <Col sm={9}>
          <Form.Control
            type="text"
            id="status"
            name="status"
            defaultValue={detailBioData.status_nikah || ""}
          />
        </Col>
      </Form.Group>

      <Form.Group
        as={Row}
        className="mb-3"
        // controlId="formHorizontalEmail"
      >
        <Form.Label
          column
          sm={3}
        >
          Address KTP
        </Form.Label>
        <Col sm={9}>
          <Form.Control
            type="text"
            id="addressKtp"
            name="addressKtp"
            defaultValue={detailBioData.address_ktp || ""}
          />
        </Col>
      </Form.Group>

      <Form.Group
        as={Row}
        className="mb-3"
        // controlId="formHorizontalEmail"
      >
        <Form.Label
          column
          sm={3}
        >
          Address Domicilies
        </Form.Label>
        <Col sm={9}>
          <Form.Control
            type="text"
            id="addressDomicilies"
            name="addressDomicilies"
            defaultValue={detailBioData.address_domicilies || ""}
          />
        </Col>
      </Form.Group>

      <Form.Group
        as={Row}
        className="mb-3"
        controlId="formHorizontalEmail"
      >
        <Form.Label
          column
          sm={3}
        >
          Email
        </Form.Label>
        <Col sm={9}>
          <Form.Control
            type="email"
            id="email"
            name="email"
            required
            defaultValue={detailBioData.email || ""}
          />
        </Col>
      </Form.Group>

      <Form.Group
        as={Row}
        className="mb-3"
        controlId="formHorizontalEmail"
      >
        <Form.Label
          column
          sm={3}
        >
          Mobile
        </Form.Label>
        <Col sm={9}>
          <Form.Control
            type="text"
            id="mobile"
            name="mobile"
            defaultValue={detailBioData.mobile || ""}
          />
        </Col>
      </Form.Group>

      <Form.Group
        as={Row}
        className="mb-3"
        controlId="formHorizontalEmail"
      >
        <Form.Label
          column
          sm={3}
        >
          Emergency Contact
        </Form.Label>
        <Col sm={9}>
          <Form.Control
            type="text"
            id="emergencyContact"
            name="emergencyContact"
            defaultValue={detailBioData.emergency_contact || ""}
          />
        </Col>
      </Form.Group>

      <Form.Group
        as={Row}
        className="mb-3"
        controlId="formHorizontalEmail"
      >
        <Form.Label
          column
          sm={3}
        >
          Last Education
        </Form.Label>
        <Col sm={9}>
          <Form.Control
            type="text"
            id="lastEducation"
            name="lastEducation"
            defaultValue={detailBioData.last_education || ""}
          />
        </Col>
      </Form.Group>

      <Form.Group
        as={Row}
        className="mb-3"
        controlId="formHorizontalEmail"
      >
        <Form.Label
          column
          sm={3}
        >
          Skill
        </Form.Label>
        <Col sm={9}>
          <Form.Control
            as="textarea"
            id="skill"
            name="skill"
            defaultValue={detailBioData.skill || ""}
          />
        </Col>
      </Form.Group>

      <div className="table-responsive mt-5">
        <div className="pt-3 mb-2 d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
          <h5>Education</h5>
        </div>
        <table className="table table-striped table-sm">
          <thead>
            <tr>
              <th scope="col">Title</th>
              <th scope="col">University</th>
              <th scope="col">Major</th>
              <th scope="col">Year Complete</th>
              <th scope="col">IPK</th>
            </tr>
          </thead>

          <tbody>
            {rowsEdu &&
              rowsEdu.map((row, index) => (
                <tr key={index}>
                  <td>
                    <Form.Control
                      type="text"
                      defaultValue={row.education}
                      onChange={(e) =>
                        handleChangeEdu(index, "education", e.target.value)
                      }
                      className="form-control-sm"
                    />
                  </td>
                  <td>
                    <Form.Control
                      type="text"
                      defaultValue={row.university}
                      onChange={(e) =>
                        handleChangeEdu(index, "university", e.target.value)
                      }
                      className="form-control-sm"
                    />
                  </td>
                  <td>
                    <Form.Control
                      type="text"
                      defaultValue={row.major}
                      onChange={(e) =>
                        handleChangeEdu(index, "major", e.target.value)
                      }
                      className="form-control-sm"
                    />
                  </td>
                  <td>
                    <Form.Control
                      type="text"
                      defaultValue={row.yearComplete}
                      onChange={(e) =>
                        handleChangeEdu(index, "yearComplete", e.target.value)
                      }
                      className="form-control-sm"
                    />
                  </td>
                  <td>
                    <Form.Control
                      type="number"
                      defaultValue={row.ipk}
                      onChange={(e) =>
                        handleChangeEdu(index, "ipk", e.target.value)
                      }
                      className="form-control-sm"
                    />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      {location === "detail data" ? null : (
        <Button
          variant="warning"
          onClick={handleAddRowEdu}
          className="mb-4"
        >
          Add Education
        </Button>
      )}
      {/* End Education */}

      {/* Start Kursus */}
      <div className="table-responsive">
        <div className="pt-4 mb-2 d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
          <h5>Course</h5>
        </div>
        <table className="table table-striped table-sm">
          <thead>
            <tr>
              <th scope="col">Course Name</th>
              <th scope="col">Certificated</th>
              <th scope="col">Year</th>
            </tr>
          </thead>
          <tbody>
            {rowsCourse &&
              rowsCourse.map((row, index) => (
                <tr key={index}>
                  <td>
                    <Form.Control
                      type="text"
                      defaultValue={row.courseName}
                      onChange={(e) =>
                        handleChangeCourse(index, "courseName", e.target.value)
                      }
                      className="form-control-sm"
                    />
                  </td>

                  <td>
                    <Form.Control
                      as="select"
                      defaultValue={row.certificated}
                      // style={{ width: "300px" }}
                      className="form-select form-select-sm"
                      onChange={(e) =>
                        handleChangeCourse(
                          index,
                          "certificated",
                          e.target.value
                        )
                      }
                    >
                      <option
                        // disabled
                        selected
                      >
                        Please Select
                      </option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </Form.Control>
                  </td>

                  <td>
                    <Form.Control
                      type="number"
                      defaultValue={row.year}
                      onChange={(e) =>
                        handleChangeCourse(index, "year", e.target.value)
                      }
                      className="form-control-sm"
                    />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      {location === "detail data" ? null : (
        <Button
          variant="warning"
          onClick={handleAddRowCourse}
          className="mb-4"
        >
          Add Course
        </Button>
      )}
      {/* End Course */}

      {/* Start History Working exp */}
      <div className="table-responsive">
        <div className="pt-4 mb-2 d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
          <h5>Work Experience</h5>
        </div>
        <table className="table table-striped table-sm">
          <thead>
            <tr>
              <th scope="col">Company Name</th>
              <th scope="col">Last Position</th>
              <th scope="col">Last Salary</th>
              <th scope="col">Year</th>
            </tr>
          </thead>
          <tbody>
            {rowsWorking &&
              rowsWorking.map((row, index) => (
                <tr key={index}>
                  <td>
                    <Form.Control
                      type="text"
                      defaultValue={row.companyName}
                      onChange={(e) =>
                        handleChangeWorking(
                          index,
                          "companyName",
                          e.target.value
                        )
                      }
                      className="form-control-sm"
                    />
                  </td>
                  <td>
                    <Form.Control
                      type="text"
                      defaultValue={row.lastPosition}
                      onChange={(e) =>
                        handleChangeWorking(
                          index,
                          "lastPosition",
                          e.target.value
                        )
                      }
                      className="form-control-sm"
                    />
                  </td>
                  <td>
                    <Form.Control
                      type="text"
                      defaultValue={row.lastSalary}
                      onChange={(e) =>
                        handleChangeWorking(index, "lastSalary", e.target.value)
                      }
                      className="form-control-sm"
                    />
                  </td>

                  <td>
                    <Form.Control
                      type="number"
                      defaultValue={row.year}
                      onChange={(e) =>
                        handleChangeWorking(index, "year", e.target.value)
                      }
                      className="form-control-sm"
                    />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      {location === "detail data" ? null : (
        <Button
          variant="warning"
          onClick={handleAddRowWorking}
          className="mb-4"
        >
          Add Working Experience
        </Button>
      )}
      {/* End History Working exp */}

      {/* tambahan  bisa dibawah*/}

      <div className="mt-4">
        <Form.Group
          as={Row}
          className="mb-3"
          // controlId="formHorizontalEmail"
        >
          <Form.Label
            column
            sm={8}
          >
            Are you willing to be placed throughout the company ?
          </Form.Label>
          <Col sm={4}>
            <select
              class="form-select"
              aria-label="Default select example"
              id="willingPlaced"
              name="willingPlaced"
              defaultValue={detailBioData.willing_placed || ""}
            >
              <option value="">Please Select</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </Col>
        </Form.Group>

        <Form.Group
          as={Row}
          className="mb-3"
          // controlId="formHorizontalEmail"
        >
          <Form.Label
            column
            sm={3}
          >
            Salary Expected
          </Form.Label>
          <Col sm={9}>
            <Form.Control
              type="number"
              id="salaryExpected"
              name="salaryExpected"
              defaultValue={detailBioData.salary_expected || ""}
            />
          </Col>
        </Form.Group>
      </div>
    </>
  );
}
