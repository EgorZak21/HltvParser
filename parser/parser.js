const request = require('./request.js');
const log = require('../log/log');
const DomParser = require('dom-parser');
const parser = new DomParser();
const minify = require('html-minifier').minify;
module.exports = async function(url){
  try{
    const html =minify( await request(url),{collapseWhitespace:true});
    const dom = parser.parseFromString(html);
    let response = {};
    if (html.search('Match over')===-1){
      response.pre = true;
      response.teams  = [];
    response.teams[0]={
      logo: dom.getElementsByClassName('team1-gradient')[0].firstChild.getAttribute('href').match(/\/\d\d*/)[0].slice(1),
      name: dom.getElementsByClassName('team1-gradient')[0].lastChild.textContent
    };
      response.teams[1]={
        logo: dom.getElementsByClassName('team2-gradient')[0].firstChild.getAttribute('href').match(/\/\d\d*/)[0].slice(1),
        name: dom.getElementsByClassName('team2-gradient')[0].lastChild.textContent
      };
      response.time = new Date(+dom.getElementsByClassName('timeAndEvent')[0].firstChild.getAttribute('data-unix')+1000*60*60);
      response.event = dom.getElementsByClassName('text-ellipsis')[0].firstChild.textContent;
      response.event_logo= dom.getElementsByClassName('text-ellipsis')[0].firstChild.getAttribute('href').match(/\/\d\d*/)[0].slice(1);
    }else{
      response.pre = false;
      response.teams= [];
      response.teams[0]={
        logo: dom.getElementsByClassName('team1-gradient')[0].firstChild.getAttribute('href').match(/\/\d\d*/)[0].slice(1),
        name: dom.getElementsByClassName('team1-gradient')[0].firstChild.textContent,
        score: dom.getElementsByClassName('team1-gradient')[0].lastChild.textContent
      };
      response.teams[1]={
        logo: dom.getElementsByClassName('team2-gradient')[0].firstChild.getAttribute('href').match(/\/\d\d*/)[0].slice(1),
        name: dom.getElementsByClassName('team2-gradient')[0].firstChild.textContent,
        score: dom.getElementsByClassName('team2-gradient')[0].lastChild.textContent
      };
      response.time = new Date(+dom.getElementsByClassName('timeAndEvent')[0].firstChild.getAttribute('data-unix')+1000*60*60);
      response.event = dom.getElementsByClassName('text-ellipsis')[0].firstChild.textContent;
      response.event_logo= dom.getElementsByClassName('text-ellipsis')[0].firstChild.getAttribute('href').match(/\/\d\d*/)[0].slice(1);
      response.games = [];
      for(let map of dom.getElementsByClassName('mapholder')){
        if(map.firstChild.getAttribute('class')==='played'){
          if(map.firstChild.firstChild.lastChild.textContent.toUpperCase()!== undefined){
            response.games.push({
              name: map.firstChild.firstChild.lastChild.textContent.toUpperCase(),
              played: true,
              score1:parseInt(map.lastChild.childNodes[0].textContent),
              score2:parseInt(map.lastChild.childNodes[2].textContent)
            });
          }
        }else{
        }
      }
    };
    return(response);
  }catch(e){
    throw e;
  }
}
