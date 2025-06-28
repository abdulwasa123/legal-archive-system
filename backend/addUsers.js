require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const connectDB = require('./config/db');
const User = require('./models/userModel');

connectDB();

const users = [
  {
    name: 'Hon. Adebayo Ogundimu',
    email: 'chief.magistrate@sagamucourt.gov.ng',
    password: 'password123',
    role: 'chief_magistrate',
    department: 'Judicial',
    isActive: true,
  },
  {
    name: 'Hon. Folake Adeyemi',
    email: 'magistrate1@sagamucourt.gov.ng',
    password: 'password123',
    role: 'magistrate',
    department: 'Judicial',
    isActive: true,
  },
  {
    name: 'Mr. Tunde Olatunji',
    email: 'clerk@sagamucourt.gov.ng',
    password: 'password123',
    role: 'court_clerk',
    department: 'Registry',
    isActive: true,
  },
  {
    name: 'Mrs. Kemi Adesola',
    email: 'registry@sagamucourt.gov.ng',
    password: 'password123',
    role: 'registry_staff',
    department: 'Registry',
    isActive: true,
  },
  {
    name: 'Mr. Segun Okonkwo',
    email: 'admin@sagamucourt.gov.ng',
    password: 'password123',
    role: 'it_admin',
    department: 'IT',
    isActive: true,
  },
];

const addUsers = async () => {
  try {
    await User.deleteMany(); // Optional: Clear users first

    for (const userData of users) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(userData.password, salt);

      const user = new User({
        ...userData,
        password: hashedPassword,
      });

      await user.save();
    }

    console.log('Users added successfully with hashed passwords');
    process.exit();
  } catch (error) {
    console.error('Error adding users:', error.message);
    process.exit(1);
  }
};

addUsers();
