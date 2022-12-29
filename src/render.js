const ejs = require('ejs');
const fs = require('fs');

function renderColorCSS(name, colors) {
    var css = ':root{';
    colors.forEach(color => {
        css += `--${color.name.en}:${color.color};`;
    })
    css += '}';
    fs.writeFileSync(`./${name}.css`, css);
}

function renderColorHTML(color) {
    ejs.renderFile('./color.ejs', { nav, data: color }, {}, function (err, html) {
        fs.writeFileSync(`../${color.id}.html`, html, 'utf8');
    });
}

function renderIndexHTML() {
    ejs.renderFile('./get-started.ejs', { nav }, {}, function (err, html) {
        fs.writeFileSync(`../get-started.html`, html, 'utf8');
    });
}

function renderGetStartedHTML() {
    ejs.renderFile('./index.ejs', { nav }, {}, function (err, html) {
        fs.writeFileSync(`../index.html`, html, 'utf8');
    });
}

function renderREADME() {
    ejs.renderFile('./README.ejs', { data }, {}, function (err, html) {
        fs.writeFileSync(`../README.md`, html, 'utf8');
    });
}

const data = JSON.parse(fs.readFileSync('../data.json'));
const nav = data.map(c => ({ id: c.id, name: c.name }));
// console.log(data);
data.forEach(color => {
    try {
        renderColorCSS(color.id, color.data);
        renderColorHTML(color);
    } catch (e) {
        console.log(e);
    }
})

renderIndexHTML();
renderGetStartedHTML();
renderREADME();