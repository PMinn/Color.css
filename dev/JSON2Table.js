const fs = require('fs');
const path = require('path');

const inputJSONFile = '../MorandiColor.json'
const outputHTMLFile = './t.html';

var html = '<table><thead><tr> <th>Color</th><th>Hex</th><th>ColorName</th> </tr></thead>';

try {
    let colors = fs.readFileSync(path.join(__dirname, inputJSONFile));
    colors = JSON.parse(colors);

    colors.forEach(color => {
        html += `<tr><td><img src="https://github.com/PMinn/Color/raw/main/image/${color.name.en}.png"></td><td>${color.color}</td><td>${color.name.en}</td></tr>`;
    })
    html += '</table>';
    fs.writeFileSync(path.join(__dirname, outputHTMLFile), html);
} catch (err) {
    console.error(err);
}