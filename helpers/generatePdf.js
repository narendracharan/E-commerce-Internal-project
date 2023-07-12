const pdf=require("html-pdf")
const fs = require("fs");
const path = require("path");
const ejs = require("ejs");
const axios = require("axios");
const moment = require("moment");
const { success, error } = require("../controllers/response");



const generatePDF = (filename, filepath, data, res) => {
    const dirPath = path.join(
      __dirname.replace("helpers", "templates"),
      `/reports.html`
    );
    const template = fs.readFileSync(dirPath, "utf8");
    console.log(template);
    let createdDate = moment(data.createdAt).format("DD/MM/YYYY");
    // // data["orderDate"] = createdDate
    // data.createdDate = createdDate;
    // data.forEach(async (elem) => {
    //   await axios
    //     //.get(elem.flavour.flavourImage)
    //     .then((resp) => {
    //       let raw = Buffer.from(resp.data).toString("base64");
    //       elem.flavour.flavourImage =
    //         "data:" + resp.headers["content-type"] + ";base64," + raw;
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    // });
    const html = ejs.render(template, { data });
    const options = {
      format: "A4",
    };
    // return new Promise(function (resolve, reject) {
    pdf
      .create(html, options)
      .toFile(`./public/pdf/${filename}`, function (error, response) {
        if (error) {
          console.log(error);
          return error;
          // reject(error);
          // return res
          //   .status(201)
          //   .json(error("Error in export pdf", res.statusCode));
        } else {
          console.log(response);
          console.log(response.filename);
          // resolve(response);
          return response.filename;
          // return res.status(201).json(
          //   success(res.statusCode, "pdf exported", {
          //     file: `${process.env.BASE_URL}/pdfs/${filename}`,
          //   })
          // );
        }
      });
  };
  
  module.exports = generatePDF;