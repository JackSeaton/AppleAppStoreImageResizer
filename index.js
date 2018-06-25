const sharp  = require('sharp');
const fs     = require('fs');
const _      = require('underscore');
const moment = require('moment');


var resizeImage = function(resizeTo, saveAs) {

    return new Promise(function(resolve, reject) {

        sharp('resize.png')
            .resize(resizeTo)
            .toBuffer()
            .then(function(data) {
                fs.writeFileSync(saveAs, data)
                resolve()
            })
            .catch(reject);
    });
}

// Key is pixels, values array are the multipliers
// Ex: "20" : [1,2,3] will create 20x20, 40x40, 60x60
var sizes = {
    "20"   : [1,2,3],
    "29"   : [1,2,3],
    "40"   : [1,2,3],
    "60"   : [2,3],
    "76"   : [1,2],
    "83.5" : [2],
    "1024" : [1]
}

// Create the two pathes that we'll need to create
let appIconPath = __dirname + "/AppIcons"
let appIconDir  = appIconPath + "/" + moment.utc().format('YYYY-MM-DD_HH.mm.ss.S')

// We'll want to create the AppIcons dir if it hasn't been created yet
if (!fs.existsSync(appIconPath)){
    fs.mkdirSync(appIconPath);
}

// Create the dir that will house this specific set of image
fs.mkdirSync(appIconDir)

// Will house the
var listOfPromises = []

_.each(sizes, function(multiplierArray, baseSize) {

    for (var i = 0; i < multiplierArray.length; i++) {
        listOfPromises.push(
            resizeImage(multiplierArray[i]*baseSize,
                appIconDir + "/AppIcon-" + baseSize + "px@" + multiplierArray[i] + "x.png")
        )
    }

})

Promise.all(listOfPromises)
    .then(function() {
        console.log("Your images should all be visible at:\n  " + appIconDir);
        console.log("Done");
        process.exit()
    })
    .catch(function(err) {
        console.error(err);
        process.exit(1)
    })
