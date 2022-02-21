var AdmZip = require("adm-zip");

var zip = new AdmZip();

zip.addLocalFolder("./chrome");
zip.writeZip("./dist/chrome.zip");