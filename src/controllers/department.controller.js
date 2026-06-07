const departmentService = require("../services/department.service");
const logger = require("../middleware/logger");

exports.createDepartment = async (req, res, next) => {
  try {
    const department = await departmentService.create(req.body);

    logger.info(`Department created: ${department.name}`);

    res.status(201).json({
      success: true,
      data: department,
    });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Department already exists.",
      });
    }

    next(err);
  }
};

exports.getAllDepartments = async (req, res, next) => {
  try {
    const departments = await departmentService.getAll();
    res.json({
      success: true,
      data: departments,
    });
  } catch (err) {
    next(err);
  }
};

exports.getDepartmentById = async (req, res, next) => {
  try {
    const department = await departmentService.getById(req.params.id);

    if (!department) {
      return res.status(404).json({
        success: false,
        message: "Department not found.",
      });
    }

    res.json({
      success: true,
      data: department,
    });
  } catch (err) {
    next(err);
  }
};

exports.updateDepartment = async (req, res, next) => {
  try {
    const department = await departmentService.update(
      req.params.id,
      req.body
    );

    if (!department) {
      return res.status(404).json({
        success: false,
        message: "Department not found.",
      });
    }

    logger.info(`Department updated: ${department.name}`);

    res.json({
      success: true,
      data: department,
    });
  } catch (err) {
    next(err);
  }
};

exports.deleteDepartment = async (req, res, next) => {
  try {
    const department = await departmentService.delete(req.params.id);

    if (!department) {
      return res.status(404).json({
        success: false,
        message: "Department not found.",
      });
    }

    logger.info(`Department deleted: ${department.name}`);

    res.json({
      success: true,
      message: "Department removed successfully.",
    });
  } catch (err) {
    next(err);
  }
};
