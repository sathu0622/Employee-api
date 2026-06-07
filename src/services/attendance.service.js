const Attendance = require("../models/Attendance");

class AttendanceService {
  async create(data) {
    return Attendance.create(data);
  }

  async getAll(filter = {}) {
    return Attendance.find(filter).populate(
      "employee",
      "name email position"
    );
  }

  async getById(id) {
    return Attendance.findById(id).populate(
      "employee",
      "name email position"
    );
  }

  async getByEmployee(employeeId) {
    return this.getAll({ employee: employeeId });
  }

  async update(id, data) {
    return Attendance.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    }).populate("employee", "name email position");
  }

  async delete(id) {
    return Attendance.findByIdAndDelete(id);
  }
}

module.exports = new AttendanceService();
