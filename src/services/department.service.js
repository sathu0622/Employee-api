const Department = require("../models/Department");

class DepartmentService {
  async create(data) {
    return Department.create(data);
  }

  async getAll() {
    return Department.find();
  }

  async getById(id) {
    return Department.findById(id);
  }

  async update(id, data) {
    return Department.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
  }

  async delete(id) {
    return Department.findByIdAndDelete(id);
  }
}

module.exports = new DepartmentService();
