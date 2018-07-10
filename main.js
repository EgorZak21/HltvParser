const parser  = require('./parser/parser');
const bot =require('./bot/bot.js');
const image = require('./image/gen.js');

function start(){
  const Bot = new bot(async function(opt,ctx) {
    parser(opt.link).then((res)=>{
      if(opt.sponsor){
        res.sponsor = true;
        res.kf1 = opt.k1;
        res.kf2 = opt.k2;
        res.surl = opt.logo;
      }
      res.dat =Date.now();
      image(res).then(()=>{
        ctx.replyWithDocument({source: `${__dirname}/cash/${res.dat}.jpg`});
      });
    });
  });
  Bot.start();
}

start();