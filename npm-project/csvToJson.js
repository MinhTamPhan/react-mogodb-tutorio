const csvFilePath = "./customer-data.csv";
const fs = require('fs');
const csv = require('csvtojson');
let arr = [];
csv().fromFile(csvFilePath)
      .on('json', (jsonObj) => {
        arr.push(jsonObj);
      }).on('done', (error) => {
        if(error){
          return process.exit(1);
        }
        console.log(arr);
        fs.writeFile(
          "customer-data.json",
          JSON.stringify(arr,null,2),
          "utf8",
          err => {
            if (err) {
              return console.log(err);
            }
            console.log("File converted successfully");
          }
        );
      })