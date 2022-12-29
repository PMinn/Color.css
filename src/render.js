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

function renderColorHTML(nav, color) {
    ejs.renderFile('./color.ejs', { nav, data: color }, {}, function (err, html) {
        fs.writeFileSync(`../${color.id}.html`, html, 'utf8');
    });
}

function renderIndexHTML(nav, data) {
    var now = new Date();
    var mm = now.getMonth() + 1; // getMonth() is zero-based
    var dd = now.getDate();

    ejs.renderFile('./docs.ejs', {
        nav,
        dateString: [now.getFullYear(), (mm > 9 ? '' : '0') + mm, (dd > 9 ? '' : '0') + dd].join('-'),
        data
    }, {}, function (err, html) {
        fs.writeFileSync(`../docs.html`, html, 'utf8');
    });
}

function renderGetStartedHTML(nav) {
    ejs.renderFile('./get-started.ejs', { nav }, {}, function (err, html) {
        fs.writeFileSync(`../get-started.html`, html, 'utf8');
    });
}

function renderREADME(data) {
    ejs.renderFile('./README.ejs', { data }, {}, function (err, html) {
        fs.writeFileSync(`../README.md`, html, 'utf8');
    });
}

const data = JSON.parse(fs.readFileSync('../data.json'));
const nav = data.map(c => ({ id: c.id, name: c.name }));
// console.log(data);

// data.forEach(color => {
//     try {
//         renderColorCSS(color.id, color.data);
//         renderColorHTML(nav, color);
//     } catch (e) {
//         console.log(e);
//     }
// })

renderIndexHTML(nav, data);
// renderGetStartedHTML(nav);
// renderREADME(data);