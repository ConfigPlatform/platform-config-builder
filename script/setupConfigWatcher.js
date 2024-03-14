const dotenv = require('dotenv');
const fs = require('fs-extra');
const path = require('path');

dotenv.config();

const { CONFIG_PATH } = process.env;

const packageJsonPath = path.join(process.cwd(), 'package.json');

// get file entries
const packageJsonStr = fs.readFileSync(packageJsonPath, { encoding: 'utf8' });

// package json object
const packageJsonObj = JSON.parse(packageJsonStr);

// root dir entries
const rootDirEntries = fs.readdirSync(process.cwd());

// ignored entries
const ignoredEntries = ['.env', '.git', '.husky', '.prettierrc', 'package-lock.json', 'script', '.eslintrc.js', '.gitignore', '.idea', 'generated', 'node_modules', 'package.json', 'README.md', 'tsconfig.json', '_config'];

const watchFilePaths = rootDirEntries.filter(el => !ignoredEntries.includes(el));

// update watcher paths
packageJsonObj.nodemonConfig.watch = [...watchFilePaths, CONFIG_PATH]

// update file
fs.writeFileSync(packageJsonPath, JSON.stringify(packageJsonObj, null, 2));