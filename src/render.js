const ejs = require('ejs');
const fs = require('fs');
const { createCanvas } = require('canvas');
const path = require('path');

function renderColorCSS(data) {
    data.forEach(color => {
        try {
            var css = ':root{';
            color.data.forEach(color => {
                css += `--${color.name.en}:${color.color};`;
            })
            css += '}';
            fs.writeFileSync(`./${color.id}.css`, css);
        } catch (e) {
            console.log(e);
        }
    })
}

function renderIndexHTML(nav, data) {
    var now = new Date();
    var mm = now.getMonth() + 1; // getMonth() is zero-based
    var dd = now.getDate();

    ejs.renderFile('./index.ejs', {
        nav,
        dateString: [now.getFullYear(), (mm > 9 ? '' : '0') + mm, (dd > 9 ? '' : '0') + dd].join('-'),
        data
    }, {}, function (err, html) {
        if (err) console.error(err);
        else fs.writeFileSync(`../index.html`, html, 'utf8');
    });
}

function renderREADME(data) {
    ejs.renderFile('./README.ejs', { data }, {}, function (err, html) {
        if (err) console.error(err);
        else fs.writeFileSync(`../README.md`, html, 'utf8');
    });
}

function renderImage(data) {
    var count = 0;
    data.forEach(color => {
        if (!color.isImageRendered) {
            color.data.forEach(c => {
                const out = fs.createWriteStream(path.join(__dirname, `../image/${c.name.en}.png`))

                const canvas = createCanvas(50, 50);
                const ctx = canvas.getContext('2d');

                ctx.beginPath();
                ctx.arc(25, 25, 25, 0, 2 * Math.PI);
                ctx.fillStyle = c.color;
                ctx.fill();

                const stream = canvas.createPNGStream();
                stream.pipe(out);
                out.on('finish', () => {
                    count++;
                    console.log(`render image: ${count * 100 / color.data.length}%`);
                })
            })
        }
    })
}

const data = JSON.parse(fs.readFileSync('../data.json'));
const nav = data.map(c => ({ id: c.id, name: c.name }));
console.log(data);

renderImage(data);
renderColorCSS(data);
renderIndexHTML(nav, data);
renderREADME(data);