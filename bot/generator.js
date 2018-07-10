module.exports = function* (parser){
  let ctx = yield;
  if(ctx.message.text.search(/http.*\/\/www\.hltv\.org\/matches\/.*\/.[^\s]*/i) !==-1){
    let link  = ctx.message.text.match(/http.*\/\/www\.hltv\.org\/matches\/.*\/.[^\s]*/i)[0];
    ctx.reply('Есть ли спонсор?');
    ctx = yield;
    if(ctx.message.text.search(/да/i)===-1){
      ctx.reply('Создаю и загружаю изображение....');
      parser({link:link, sponsor:false},ctx);
    }else{
      ctx.reply('Отправьте коэффициенты для обоих команд через пробел');
      while (true) {
        ctx = yield ;
        if(ctx.message.text.search(/отмена/i)!==-1) return;
        if(ctx.message.text.search(/\d\d*([\.,]\d\d*)?\s\d\d*([\.,]\d\d*)?/)!==-1) {
          break;
        }else{
          ctx.reply('Не могу распознать коэффициенты');
        }
      }
      let msg = ctx.message.text.replace(',','.');
      let k1 =msg.match(/\d\d*([\.,]\d\d*)?/ig)[0];
      let k2 = msg.match(/\d\d*([\.,]\d\d*)?/ig)[1];
      ctx.reply('Отправьте логотип спонсора');
      while (true) {
        ctx = yield ;
        if(ctx.message.text.search(/отмена/i)!==-1) return;
        if(ctx.message.document!==undefined) {
          if(ctx.message.document.mime_type=== 'image/png'){
            break;
          }else{
            ctx.reply('Отправьте файл формата png');
          }
        }else{
          ctx.reply('Отправьте файл формата png');
        }
      }
      ctx.tg.getFileLink(ctx.message.document.file_id).then((args)=>{
        let match = {
          link: link,
          sponsor:true,
          logo: args,
          k1: k1,
          k2: k2
        };
        ctx.reply('Создаю и загружаю изображение....');
        parser(match,ctx);
      });
    }
  }else{
    ctx.reply('Не вижу ссылки\nПопробуйте еще раз отправить ссылку')
  }
};