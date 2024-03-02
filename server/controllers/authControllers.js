const db = require("../config/db.js");
const bcrypt = require("bcrypt");
const { nanoid } = require("nanoid");

async function register(req, res) {
  try {
    console.log("reqbody regis", req.body);
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).send({ message: "Data cannot blank" });

    const [userExist] = await db
      .promise()
      .query(`SELECT * FROM users where email = "${email}"`);

    console.log("userexist", userExist);
    if (userExist.length > 0)
      return res.status(400).send({ message: "Email already exist" });

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    await db
      .promise()
      .query(`INSERT INTO users(email, password, role) VALUES(?, ?, ?)`, [
        email,
        hashPassword,
        "user",
      ]);

    return res.status(200).send({ message: "Register succefully" });
  } catch (error) {
    console.log("err", error);
    return res.status(400).send(error);
  }
}

async function login(req, res) {
  try {
    console.log("req body login", req.body);
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).send({ message: "Data cannot blank" });

    const [userExist] = await db
      .promise()
      .query(`SELECT * FROM users where email = "${email}"`);

    if (!userExist.length)
      return res.status(400).send({ message: "User not found" });

    const isValid = await bcrypt.compare(password, userExist[0].password);

    if (!isValid)
      return res.status(400).send({ message: "Email or password wrong" });

    const generateToken = nanoid();

    await db.promise().query(`
    UPDATE users 
    SET token = "${generateToken}" 
    WHERE email = "${email}"
  `);

    delete userExist[0].password;

    return res.status(200).send({
      message: "Login succefully",
      user: userExist[0],
      token: generateToken,
    });
  } catch (error) {
    console.log("err", error);
    return res.status(400).send(error);
  }
}

async function getUserByToken(req, res) {
  try {
    const Token = req.query.token;

    const [findUser] = await db
      .promise()
      .query(`SELECT * FROM users where token = "${Token}"`);

    if (!findUser.length)
      return res.status(404).send({ message: "Unauthorized" });

    delete findUser[0].password;

    return res.status(200).send({
      message: "Success get User",
      user: findUser,
    });
  } catch (error) {
    console.log("err get userbytoken", error);
    return res.status(400).json({ error: error.message });
  }
}

module.exports = { register, login, getUserByToken };
