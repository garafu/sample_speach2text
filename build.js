const { compile } = require("nexe")

compile({
  input: "./src/index.js",
  output: "./dist/app",
  build: true, //required to use patches
  // ico: './favicon.ico',
  verbose: true
}).then(() => {
  console.log("success");
});