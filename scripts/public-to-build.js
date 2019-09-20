let copy = require('copy');

copy("public/**", "build/routes/public", (err, files) => {
    if (err) throw err;
    console.log("copied public to build/routes");
});