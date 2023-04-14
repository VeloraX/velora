const fs = require('fs');

// Read the current package.json file
const packageJson = JSON.parse(fs.readFileSync('./package.json').toString());

// Update the version number
const version = packageJson.version.split('.');
const maxSubVersion = 10;

version[2] = parseInt(version[2], 10) + 1;

if (version[2] >= maxSubVersion) {
  version[2] = 0;
  version[1] = parseInt(version[1], 10) + 1;

  if (version[1] >= maxSubVersion) {
    version[1] = 0;
    version[0] = parseInt(version[0], 10) + 1;
  }
}

packageJson.version = version.join('.');

// Write the updated package.json file
fs.writeFileSync('./package.json', JSON.stringify(packageJson, null, 2));

console.log(`Updated to the latest v.${packageJson.version}`);
