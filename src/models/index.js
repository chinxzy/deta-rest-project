import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import Sequelize, { DataTypes } from 'sequelize';
import allConfig from '../config/config.js';

const basename = path.basename(import.meta.filename);
const env = process.env.NODE_ENV || 'development';
const config = allConfig[env];

let db = {};

const databases = Object.keys(config.databases);

for (let i = 0; i < databases.length; i++) {
  let database = databases[i];
  let dbPath = config.databases[database];
  db[database] = new Sequelize(
    dbPath.database,
    dbPath.username,
    dbPath.password,
    dbPath
  );
}

const modelFiles = fs.readdirSync(import.meta.dirname + '/rest')
  .filter((file) => {
    return (
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
    );
  });

for (const file of modelFiles) {
  const { default: modelFn } = await import(`./rest/${file}`);
  const model = modelFn(db.rest, DataTypes);
  db[model.name] = model;
}

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// Creates tables if they don't exist, leaves existing tables untouched
await db.rest.sync({ force: false });

export default db;
