const attendanceService = require("../services/attendance.service");
const logger = require("../middleware/logger");

exports.createAttendance = async (req, res, next) => {
  try {
    const attendance = await attendanceService.create(req.body);

    logger.info(`Attendance created for employee ${attendance.employee}`);

    res.status(201).json({
      success: true,
      data: attendance,
    });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Attendance entry already exists for this employee and date.",
      });
    }

    next(err);
  }
};

exports.getAllAttendances = async (req, res, next) => {
  try {
    const filter = {};

    if (req.query.employee) {
      filter.employee = req.query.employee;
    }

    const attendances = await attendanceService.getAll(filter);
    res.json({
      success: true,
      data: attendances,
    });
  } catch (err) {
    next(err);
  }
};

exports.getAttendanceById = async (req, res, next) => {
  try {
    const attendance = await attendanceService.getById(req.params.id);

    if (!attendance) {
      return res.status(404).json({
        success: false,
        message: "Attendance record not found.",
      });
    }

    res.json({
      success: true,
      data: attendance,
    });
  } catch (err) {
    next(err);
  }
};

exports.getAttendanceByEmployee = async (req, res, next) => {
  try {
    const attendance = await attendanceService.getByEmployee(
      req.params.employeeId
    );

    res.json({
      success: true,
      data: attendance,
    });
  } catch (err) {
    next(err);
  }
};

exports.updateAttendance = async (req, res, next) => {
  try {
    const attendance = await attendanceService.update(
      req.params.id,
      req.body
    );

    if (!attendance) {
      return res.status(404).json({
        success: false,
        message: "Attendance record not found.",
      });
    }

    logger.info(`Attendance updated: ${attendance._id}`);

    res.json({
      success: true,
      data: attendance,
    });
  } catch (err) {
    next(err);
  }
};

exports.deleteAttendance = async (req, res, next) => {
  try {
    const attendance = await attendanceService.delete(req.params.id);

    if (!attendance) {
      return res.status(404).json({
        success: false,
        message: "Attendance record not found.",
      });
    }

    logger.info(`Attendance deleted: ${attendance._id}`);

    res.json({
      success: true,
      message: "Attendance record removed successfully.",
    });
  } catch (err) {
    next(err);
  }
};
