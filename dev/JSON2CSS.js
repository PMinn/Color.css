const fs = require('fs');
const path = require('path');

const inputJSONFile = '../MorandiColor.json'
const outputCSSFile = '../src/MorandiColor.min.css';

var css = ':root{';

try {
    let colors = fs.readFileSync(path.join(__dirname, inputJSONFile));
    colors = JSON.parse(colors);
    console.log(colors);
    colors.forEach(color => {
        css += `--${color.name.en}:${color.color};`;
    })
    css += '}';
    fs.writeFileSync(path.join(__dirname, outputCSSFile), css);
} catch (err) {
    console.error(err);
}