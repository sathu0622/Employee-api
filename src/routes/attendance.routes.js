const express = require("express");
const router = express.Router();
const attendanceController = require("../controllers/attendance.controller");

router.get("/", attendanceController.getAllAttendances);
router.get(
  "/employee/:employeeId",
  attendanceController.getAttendanceByEmployee
);
router.get("/:id", attendanceController.getAttendanceById);
router.post("/", attendanceController.createAttendance);
router.put("/:id", attendanceController.updateAttendance);
router.delete("/:id", attendanceController.deleteAttendance);

module.exports = router;
