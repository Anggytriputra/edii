const db = require("../config/db.js");

async function getBiodata(req, res) {
  try {
    const userId = parseInt(req.params.id);
    const search = req.query.search;

    const [userDb] = await db
      .promise()
      .query(`SELECT * FROM users where id = "${userId}"`);

    const role = userDb[0].role;
    console.log("role", role);

    const clauseFilter = role === "admin" ? "" : `WHERE user_id = ${userId}`;

    console.log("caluserfilter", clauseFilter);
    const clauseSearch =
      role === "admin" && search
        ? `WHERE name = "${search}" OR position_apply = "${search}" OR last_education = "${search}"`
        : "";

    console.log("clause search", clauseSearch);
    const [result] = await db.promise().query(
      `SELECT id, name, 
        place_birth, 
        position_apply,
        last_education
        FROM biodata 
        ${clauseFilter}
        ${clauseSearch}`
    );

    return res.status(200).send({ message: "OK", result });
  } catch (error) {
    console.log("err", error);
    return res.status(400).send(error);
  }
}

async function getDetailBio(req, res) {
  try {
    const bioDataId = parseInt(req.params.id);

    const [dbBiodata] = await db
      .promise()
      .query(`SELECT * FROM biodata WHERE id = ${bioDataId}`);

    const [dbEdu] = await db.promise().query(
      `SELECT 
        id,
        title_education education,
        university,
        major,
        year_complete yearComplete,
        ipk
        FROM education 
        WHERE biodata_id = ${bioDataId}`
    );

    const [dbCourse] = await db.promise().query(
      `SELECT
        id,
        course_name courseName,
        certificated,
        year
        FROM course 
        WHERE biodata_id = ${bioDataId}`
    );

    const [dbworkExp] = await db.promise().query(
      `SELECT
       id,
       company_name companyName,
       last_position lastPosition,
       last_salary lastSalary,
       year
       FROM work_exp 
       WHERE biodata_id = ${bioDataId}`
    );

    return res.status(200).send({
      message: "OK",
      bioData: dbBiodata,
      education: dbEdu,
      course: dbCourse,
      workExp: dbworkExp,
    });
  } catch (error) {
    console.log("err", error);
    return res.status(400).send(error);
  }
}

async function createBiodata(req, res) {
  try {
    console.log("req.body", req.body);
    const {
      positionApply,
      name,
      idKtp,
      placeOfBirth,
      gender,
      religion,
      bloadGroup,
      status,
      addressKtp,
      addressDomicilies,
      email,
      mobile,
      emergencyContact,
      lastEducation,
      skill,
      willingPlaced,
    } = req.body;

    const userId = parseInt(req.body.userId);
    const salaryExpected = parseInt(req.body.salaryExpected);

    const education = req.body.education;
    const course = req.body.course;
    const workExp = req.body.workExp;

    if (
      !positionApply ||
      !name ||
      !idKtp ||
      !placeOfBirth ||
      !gender ||
      !religion ||
      !bloadGroup ||
      !status ||
      !addressKtp ||
      !addressDomicilies ||
      !email ||
      !mobile ||
      !emergencyContact ||
      !lastEducation ||
      !skill ||
      !willingPlaced ||
      !salaryExpected
    )
      return res.status(400).send({ message: "Please Complete Your Data" });

    // Validasi education
    for (const edu of education) {
      for (const key in edu) {
        if (!edu[key] || !edu[key].trim()) {
          return res
            .status(400)
            .send({ message: "Education data cannot blank" });
        }
      }
    }

    // Validasi course
    for (const crs of course) {
      for (const key in crs) {
        if (!crs[key] || !crs[key].trim()) {
          return res.status(400).send({ message: "Course data cannot blank" });
        }
      }
    }

    // Validasi workExp
    for (const exp of workExp) {
      for (const key in exp) {
        if (!exp[key] || !exp[key].trim()) {
          return res
            .status(400)
            .send({ message: "Experience data cannot blank" });
        }
      }
    }

    const [existBiodata] = await db
      .promise()
      .query(`SELECT * FROM biodata where id_ktp = "${idKtp}"`);

    if (existBiodata.length > 0)
      return res.status(400).send({ message: "Data already exist" });

    const [InsertBio] = await db
      .promise()
      .query(
        `INSERT INTO biodata(user_id, position_apply, name, id_ktp, place_birth, gender, religion, bload_group, status_nikah, address_ktp, address_domicilies, email, mobile, emergency_contact, last_education, skill, willing_placed, salary_expected) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          userId,
          positionApply,
          name,
          idKtp,
          placeOfBirth,
          gender,
          religion,
          bloadGroup,
          status,
          addressKtp,
          addressDomicilies,
          email,
          mobile,
          emergencyContact,
          lastEducation,
          skill,
          willingPlaced,
          salaryExpected,
        ]
      );

    const biodataId = InsertBio.insertId;

    for (const edu of education) {
      await db
        .promise()
        .query(
          `INSERT INTO education(biodata_id, title_education, university, major, year_complete, ipk) VALUES(?, ?, ?, ?, ?, ?)`,
          [
            biodataId,
            edu.education,
            edu.university,
            edu.major,
            edu.yearComplete,
            edu.ipk,
          ]
        );
    }

    for (const crs of course) {
      await db
        .promise()
        .query(
          `INSERT INTO course(biodata_id, course_name, certificated, year) VALUES(?, ?, ?, ?)`,
          [biodataId, crs.courseName, crs.certificated, crs.year]
        );
    }

    for (const exp of workExp) {
      await db
        .promise()
        .query(
          `INSERT INTO work_exp(biodata_id, company_name, last_position, last_salary, year) VALUES(?, ?, ?, ?, ?)`,
          [
            biodataId,
            exp.companyName,
            exp.lastPosition,
            parseFloat(exp.lastSalary),
            exp.year,
          ]
        );
    }

    return res.status(200).send({ message: "Created biodata succefully" });
  } catch (error) {
    console.log("err", error);
    return res.status(400).send(error);
  }
}

async function updateBiodata(req, res) {
  try {
    console.log("req body update", req.body);
    const biodataId = parseInt(req.params.id);

    const {
      positionApply,
      name,
      idKtp,
      placeOfBirth,
      gender,
      religion,
      bloadGroup,
      status,
      addressKtp,
      addressDomicilies,
      email,
      mobile,
      emergencyContact,
      lastEducation,
      skill,
      willingPlaced,
    } = req.body;

    const userId = parseInt(req.body.userId);
    const salaryExpected = parseInt(req.body.salaryExpected);

    const education = req.body.education;
    const course = req.body.course;
    const workExp = req.body.workExp;

    if (
      !positionApply ||
      !name ||
      !idKtp ||
      !placeOfBirth ||
      !gender ||
      !religion ||
      !bloadGroup ||
      !status ||
      !addressKtp ||
      !addressDomicilies ||
      !email ||
      !mobile ||
      !emergencyContact ||
      !lastEducation ||
      !skill ||
      !willingPlaced ||
      !salaryExpected
    )
      return res.status(400).send({ message: "Please Complete Your Data" });

    // Validasi education
    for (const edu of education) {
      for (const key in edu) {
        if (typeof edu[key] === "string" && (!edu[key] || !edu[key].trim())) {
          return res
            .status(400)
            .send({ message: "Education data cannot be blank" });
        }
      }
    }

    // Validasi course
    for (const crs of course) {
      for (const key in crs) {
        if (typeof crs[key] === "string" && (!crs[key] || !crs[key].trim())) {
          return res
            .status(400)
            .send({ message: "Course data cannot be blank" });
        }
      }
    }

    // Validasi workExp
    for (const exp of workExp) {
      for (const key in exp) {
        if (typeof exp[key] === "string" && !exp[key].trim()) {
          return res
            .status(400)
            .send({ message: "Experience data cannot be blank" });
        }
      }
    }

    const [updatedBio] = await db.promise().query(
      `UPDATE biodata SET
      position_apply = ?,
      name = ?,
      id_ktp = ?,
      place_birth = ?,
      gender = ?,
      religion = ?,
      bload_group = ?,
      status_nikah = ?,
      address_ktp = ?,
      address_domicilies = ?,
      email = ?,
      mobile = ?,
      emergency_contact = ?,
      last_education = ?,
      skill = ?,
      willing_placed = ?,
      salary_expected = ?
      WHERE id = ${biodataId}`,
      [
        positionApply,
        name,
        idKtp,
        placeOfBirth,
        gender,
        religion,
        bloadGroup,
        status,
        addressKtp,
        addressDomicilies,
        email,
        mobile,
        emergencyContact,
        lastEducation,
        skill,
        willingPlaced,
        salaryExpected,
        // biodataId,
      ]
    );

    for (const edu of education) {
      if (edu.id) {
        await db.promise().query(
          `UPDATE education SET
           title_education = ?,
           university = ?,
           major = ?,
           year_complete = ?,
           ipk = ?
           WHERE id = ${edu.id}`,
          [edu.education, edu.university, edu.major, edu.yearComplete, edu.ipk]
        );
      } else {
        await db
          .promise()
          .query(
            `INSERT INTO education(biodata_id, title_education, university, major, year_complete, ipk) VALUES (?, ?, ?, ?, ?, ?)`,
            [
              biodataId,
              edu.education,
              edu.university,
              edu.major,
              edu.yearComplete,
              edu.ipk,
            ]
          );
      }
    }

    for (const crs of course) {
      if (crs.id) {
        await db.promise().query(
          `UPDATE course SET
           course_name = ?,
           certificated = ?,
           year = ?
           WHERE id = ${crs.id}`,
          [crs.courseName, crs.certificated, crs.year]
        );
      } else {
        await db
          .promise()
          .query(
            `INSERT INTO course(biodata_id, course_name, certificated, year) VALUES (?, ?, ?, ?)`,
            [biodataId, crs.courseName, crs.certificated, crs.year]
          );
      }
    }

    for (const exp of workExp) {
      if (exp.id) {
        await db.promise().query(
          `UPDATE work_exp SET
           company_name = ?,
           last_position = ?,
           last_salary = ?,
           year = ?
           WHERE id = ${exp.id}`,
          [
            exp.companyName,
            exp.lastPosition,
            parseFloat(exp.lastSalary),
            exp.year,
          ]
        );
      } else {
        await db
          .promise()
          .query(
            `INSERT INTO work_exp(biodata_id, company_name, last_position, last_salary, year) VALUES (?, ?, ?, ?, ?)`,
            [
              biodataId,
              exp.companyName,
              exp.lastPosition,
              parseFloat(exp.lastSalary),
              exp.year,
            ]
          );
      }
    }

    return res.status(200).send({ message: "Updated biodata succefully" });
  } catch (error) {
    console.log("err", error);
    return res.status(400).send(error);
  }
}

async function deleteBio(req, res) {
  try {
    console.log("params id delete", req.params.id);
    const bioId = parseInt(req.params.id);

    const [workDb] = await db
      .promise()
      .query(`SELECT * FROM work_exp where biodata_id = "${bioId}"`);

    const [courseDb] = await db
      .promise()
      .query(`SELECT * FROM course where biodata_id = "${bioId}"`);

    const [educationDb] = await db
      .promise()
      .query(`SELECT * FROM education where biodata_id = "${bioId}"`);

    for (const row of workDb) {
      const workExpId = row.id;
      await db
        .promise()
        .query(`DELETE FROM work_exp WHERE id = ?`, [workExpId]);
    }

    for (const row of courseDb) {
      const id = row.id;
      await db.promise().query(`DELETE FROM course WHERE id = ?`, [id]);
    }

    for (const row of educationDb) {
      const id = row.id;
      await db.promise().query(`DELETE FROM education WHERE id = ?`, [id]);
    }

    await db.promise().query(`DELETE FROM biodata WHERE id = ?`, [bioId]);

    return res.status(200).send({ message: "Delete bio succefully" });
  } catch (error) {
    console.log("err", error);
    return res.status(400).send(error);
  }
}

module.exports = {
  createBiodata,
  getBiodata,
  getDetailBio,
  updateBiodata,
  deleteBio,
};
