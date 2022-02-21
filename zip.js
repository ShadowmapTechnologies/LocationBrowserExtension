const AdmZip = require("adm-zip");

const chromeZip = new AdmZip();

chromeZip.addLocalFolder("./chrome");
chromeZip.writeZip("./dist/chrome.zip");

const firefoxZip = new AdmZip();

firefoxZip.addLocalFolder("./firefox");
firefoxZip.writeZip("./dist/firefox.zip");
