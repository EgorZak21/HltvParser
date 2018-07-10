module.exports = function(opt){
  let html = `
  <!DOCTYPE html>
<html lang="en">
<head>
    <link rel="stylesheet" href="src/style.css">
</head>
<body>
<style>
    .t1{
        top: ${(opt.sponsor !==true)?('490'):('130')}px;
    }
    .t2{
        top: ${(opt.sponsor !==true)?('490'):('130')}px;
    }
</style>
<div class="event">
    <img src="https://static.hltv.org/images/eventLogos/${opt.event_logo}.png" alt="" class="i">
</div>
<div class="team1">
    <img class="i" src="https://static.hltv.org/images/team/logo/${opt.teams[0].logo}">
</div>
<div class="team2">
    <img class="i" src="https://static.hltv.org/images/team/logo/${opt.teams[1].logo}" >
</div>
<img class="bg" src="src/can${(opt.pre)?'vs':''}.png" alt="" width="1280" height="720"/>
<h4 class="t1">${opt.teams[0].name}</h4>
<h4 class="t2">${opt.teams[1].name}</h4>
    `;
  if(opt.pre){
    html = html+`
    <h5><span class="tm1">${opt.time.getUTCHours()}:${(opt.time.getUTCMinutes()<10)?'0':''}${(opt.time.getUTCMinutes())} CET </span>|<span class="tm2"> ${(opt.time.getUTCDate()<10)?'0':''}${opt.time.getUTCDate()}.${(opt.time.getUTCMonth()<10)?'0':''}${opt.time.getUTCMonth()}.${opt.time.getUTCFullYear()-2000} </span></h5>
    `;
    if(opt.sponsor === true){
      html = html+`
<h4 class="k1">${opt.kf1}</h4>
<h4 class="k2">${opt.kf2}</h4>
<div class="sponsor">
    <img src="${opt.surl}" alt="" class="i">
</div>
`;
    }
  }else{
    html = html+ `
<h1><span class="team">${opt.teams[0].score}</span>:<span class="team">${opt.teams[1].score}</span></h1>`;
    if(opt.games.length===1){
      html = html+`
<h4 class="mh">${opt.games[0].name}</h4>`;
    }else{
      html = html+`<div class="maps">
    <div class="map">
        <h2>
            <span class="smap">${opt.games[0].score1}</span>:<span class="smap">${opt.games[0].score2}</span>
        </h2>
        <h3>${opt.games[0].name}</h3>
    </div>`;
      for(let i = 1;i<opt.games.length;i++){
        if(!opt.games[i].played) break;
        html = html+ `
    <span class="r"></span>
    <div class="map">
        <h2>
            <span class="smap">${opt.games[i].score1}</span>:<span class="smap">${opt.games[i].score2}</span>
        </h2>
        <h3>${opt.games[i].name}</h3>
    </div>`;
      }
      html = html+ `</div>`;
    }
  }
  html = html+'\n</body>';
  return html;
};