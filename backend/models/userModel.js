const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
    {
      email: {
        type: String,
        required: true,
        unique: true,
      },
      name: {
        type: String,
        required: true,
      },
      role: {
        type: String,
        enum: ["chief_magistrate", "magistrate", "court_clerk", "registry_staff", "it_admin"],
        required: true,
      },
      department: {
        type: String,
        required: true,
      },
      password: {
        type: String,
        required: true,
      },
      isActive: {
        type: Boolean,
        default: true,
      },
      lastLogin: {
        type: Date,
        default: null,
      },
    },
    { timestamps: true }
  );

module.exports = mongoose.model("User", userSchema);


// Hash the user's password before saving to the database
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;