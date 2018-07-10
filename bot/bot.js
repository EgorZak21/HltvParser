const tf = require('telegraf');
const generator  = require('./generator.js');
const config = require('./config.json');

class Bot{
  constructor(parser){
    this.bot = new tf(config.token);
    this.stack = [];
    this.bot.on('message',(ctx)=>{
      if(ctx.message.text === undefined){
        ctx.message.text = '';
      }
      const stack = this.stack;
      let curr_gen = undefined;
      for(let gen of stack){
        if(gen.id === ctx.message.from.id)
          curr_gen = gen;
      }
      if(curr_gen === undefined){
        curr_gen = {
          id: ctx.message.from.id,
          gen: generator(parser)
        };
        stack.push(curr_gen);
        curr_gen.gen.next();
      }
      if(curr_gen.gen.next(ctx).done)
        stack.splice(stack.indexOf(curr_gen), 1);
    });
  }
  start(){
    this.bot.startPolling();
  }
}

module.exports = Bot;
