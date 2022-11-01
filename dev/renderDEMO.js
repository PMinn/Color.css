const { createCanvas } = require('canvas');
const fs = require('fs');
const path = require('path');

const inputJSONFile = '../MorandiColor.json';
const outputPath = '../image2';

var colors = fs.readFileSync(path.join(__dirname, inputJSONFile));
colors = JSON.parse(colors);

colors.forEach(color => {
    const out = fs.createWriteStream(path.join(__dirname, `${outputPath}/${color.name.en}.png`))

    const canvas = createCanvas(50, 50);
    const ctx = canvas.getContext('2d');

    ctx.beginPath();
    ctx.arc(25, 25, 25, 0, 2 * Math.PI);
    ctx.fillStyle = color.color;
    ctx.fill();

    // Draw cat with lime helmet
    const stream = canvas.createPNGStream();
    stream.pipe(out);
    out.on('finish', () => console.log('The PNG file was created.'))
})

