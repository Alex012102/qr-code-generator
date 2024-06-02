/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/

import inquirer from "inquirer";
import qr from "qr-image";
import fs from "fs";

const fileTypes = ["svg", "png", "pdf"];

inquirer
  .prompt([
    {
      name: "URL",
      type: "input",
      message: "What URL would you like to use?",
    },
    {
      name: "file_name",
      type: "input",
      message: "What would you like to name the file?",
      default: "qr_code",
    },
    {
      name: "file_type",
      type: "list",
      message: "What type of file?",
      choices: fileTypes,
      default: "png",
    },
  ])

  /* NEED TO MAKE ADJUSTMENTS BELOW TO MATCH UPDATES ABOVE */

  .then((answers) => {
    console.log(`Making ${answers.URL} a QR Code.`);
    const url = answers.URL;
    // Generate QR Code Image
    const qr_image = qr.image(url, { type: answers.file_type });
    // Save QR Code Image
    qr_image.pipe(
      fs.createWriteStream(`${answers.file_name}.${answers.file_type}`)
    );
    // Save User Input as Text File
    fs.writeFile(`${answers.file_name}.txt`, url, (err) => {
      if (err) throw err;
      console.log("The file has been saved!");
    });
  })
  .catch((error) => {
    console.error("An error occured:", error);
  });
