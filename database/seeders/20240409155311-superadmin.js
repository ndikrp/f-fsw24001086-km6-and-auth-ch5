'use strict';

const bcrypt = require('bcrypt');
const superadmin = require('../config/superadmin');
const encryptPass = require('../config/encryption');

function hashPassword(encPassword) {
  return new Promise((resolve, reject) => {
    bcrypt.hash(encPassword, encryptPass.SALT, (err, password) => {
      if (!!err) {
        reject(err)
        return
      }
      resolve(password)
    })
  })
}


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const encryptedPassword = await hashPassword(superadmin.password);
    await queryInterface.bulkInsert('Users', [{
      name: superadmin.name,
      email: superadmin.email,
      password: encryptedPassword,
      role: 'superadmin'
    }], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', {
      role: "superadmin"
    }, {});
  }
};
