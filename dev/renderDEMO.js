const { createCanvas } = require('canvas');

const fs = require('fs');
const path = require('path');

let JapaneseTraditionalColors = fs.readFileSync('../JapaneseTraditionalColors.json');
JapaneseTraditionalColors = JSON.parse(JapaneseTraditionalColors);
console.log(JapaneseTraditionalColors);

JapaneseTraditionalColors.forEach(JapaneseTraditionalColor => {
    const out = fs.createWriteStream(path.join(__dirname, `../image/${JapaneseTraditionalColor.name.en}.png`))

    const canvas = createCanvas(50, 50);
    const ctx = canvas.getContext('2d');

    ctx.beginPath();
    ctx.arc(25, 25, 25, 0, 2 * Math.PI);
    ctx.fillStyle = JapaneseTraditionalColor.color;
    ctx.fill();

    // Draw cat with lime helmet
    const stream = canvas.createPNGStream()
    stream.pipe(out)
    out.on('finish', () => console.log('The PNG file was created.'))
})

