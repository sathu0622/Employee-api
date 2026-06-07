const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    position: {
      type: String,
      trim: true,
    },
    salary: {
      type: Number,
      default: 0,
    },
    role: {
      type: String,
      enum: ["employee", "admin"],
      default: "employee",
    },
  },
  {
    timestamps: true,
  }
);

employeeSchema.set("toJSON", {
  transform: (doc, ret) => {
    delete ret.password;
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  },
});

module.exports = mongoose.model("Employee", employeeSchema);
