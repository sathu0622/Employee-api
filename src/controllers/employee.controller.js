const jwt = require("jsonwebtoken");
const employeeService = require("../services/employee.service");

const generateToken = (employee) => {
  return jwt.sign(
    {
      id: employee._id,
      email: employee.email,
      role: employee.role,
    },
    process.env.JWT_SECRET || "change_this_secret",
    {
      expiresIn: "1h",
    }
  );
};

exports.createEmployee = async (req, res, next) => {
  try {
    const { name, email, password, position, salary, role } = req.body || {};

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email, and password are required.",
      });
    }

    const employee = await employeeService.create({
      name,
      email,
      password,
      position,
      salary,
      role,
    });

    res.status(201).json({
      success: true,
      data: employee,
    });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Email already in use.",
      });
    }
    next(err);
  }
};

exports.getAllEmployees = async (req, res, next) => {
  try {
    const employees = await employeeService.getAll();
    res.json({ success: true, data: employees });
  } catch (err) {
    next(err);
  }
};

exports.getEmployeeById = async (req, res, next) => {
  try {
    const employee = await employeeService.getById(req.params.id);
    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found.",
      });
    }
    res.json({ success: true, data: employee });
  } catch (err) {
    next(err);
  }
};

exports.updateEmployee = async (req, res, next) => {
  try {
    const employee = await employeeService.update(req.params.id, req.body);
    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found.",
      });
    }
    res.json({ success: true, data: employee });
  } catch (err) {
    next(err);
  }
};

exports.deleteEmployee = async (req, res, next) => {
  try {
    const employee = await employeeService.delete(req.params.id);
    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found.",
      });
    }
    res.json({ success: true, message: "Employee deleted successfully." });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required.",
      });
    }

    const employee = await employeeService.login(email, password);
    const token = generateToken(employee);
    res.json({ success: true, data: { employee, token } });
  } catch (err) {
    if (err.message === "Invalid credentials") {
      return res.status(401).json({ success: false, message: err.message });
    }
    next(err);
  }
};
