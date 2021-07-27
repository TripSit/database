'use strict';

require('dotenv').config();

exports.NODE_ENV = process.env.NODE_ENV;

exports.POSTGRES_HOST = process.env.POSTGRES_HOST;
exports.POSTGRES_PORT = process.env.POSTGRES_PORT && parseInt(process.env.POSTGRES_PORT, 10);
exports.POSTGRES_USER = process.env.POSTGRES_USER;
exports.POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD;
