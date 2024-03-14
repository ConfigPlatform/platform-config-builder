const dotenv = require('dotenv');
const fs = require('fs-extra');
const path = require('path');

dotenv.config();

const { CONFIG_PATH } = process.env;

const nodemonConfigPath = path.join(process.cwd(), 'nodemon.json');

// get file entries
const nodemonConfigStr = fs.readFileSync(nodemonConfigPath, { encoding: 'utf8' });

// package json object
const nodemonConfigObj = JSON.parse(nodemonConfigStr);

// root dir entries
const rootDirEntries = fs.readdirSync(process.cwd());

// ignored entries
const ignoredEntries = ['.env', '.git', '.husky', '.prettierrc', 'package-lock.json', 'script', '.eslintrc.js', '.gitignore', '.idea', 'generated', 'node_modules', 'package.json', 'README.md', 'tsconfig.json', '_config'];

const watchFilePaths = rootDirEntries.filter(el => !ignoredEntries.includes(el));

// update watcher paths
nodemonConfigObj.watch = [...watchFilePaths, CONFIG_PATH]

// update file
fs.writeFileSync(nodemonConfigPath, JSON.stringify(nodemonConfigObj, null, 2));