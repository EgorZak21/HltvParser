const puppeteer = require('puppeteer');
const fs = require('fs');
const html = require('./pre.js');
const  path = require('path');

module.exports =async function (opt) {
  fs.writeFileSync(`cash/${opt.dat}.html`,html(opt),);
  const browser = await puppeteer.launch({executablePath: '/usr/bin/chromium'});
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 720});
  await page.goto(`file://${path.dirname(__dirname)}/cash/${opt.dat}.html`, {
    waitUntil: 'networkidle2' // ensures images are loaded
  });
  await page.screenshot({ path: `cash/${opt.dat}.jpg` ,type:'jpeg',quality:100});
  await browser.close();
};