var jsf = require("json-schema-faker");
var fs = require("fs");

var schema = require("./mockSchema");

jsf.extend("faker", () => require("faker"));

var json = JSON.stringify(jsf.generate(schema));

fs.writeFile("./data/db.json", json, function(error) {
  if (error) {
    return console.log(error);
  } else {
    console.log("Generated mock data");
  }
});
