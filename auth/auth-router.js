const router = require("express").Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); //<< install the npm pacakage 

const Users = require('../users/users-model.js');
const 