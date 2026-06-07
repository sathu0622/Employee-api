const bcrypt = require("bcryptjs");
const Employee = require("../models/Employee");

class EmployeeService {
  async create(data) {
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }

    return Employee.create(data);
  }

  async login(email, password) {
    const employee = await Employee.findOne({ email });

    if (!employee) {
      throw new Error("Invalid credentials");
    }

    const isMatch = await bcrypt.compare(password, employee.password);

    if (!isMatch) {
      throw new Error("Invalid credentials");
    }

    return employee;
  }

  async getAll() {
    return Employee.find();
  }

  async getById(id) {
    return Employee.findById(id);
  }

  async update(id, data) {
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }

    return Employee.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
  }

  async delete(id) {
    return Employee.findByIdAndDelete(id);
  }
}

module.exports = new EmployeeService();