const request = require('request-promise-native');
const log = require('../log/log');
module.exports = async function(url){
  try{
    let res = await request.get(url);
    return res;
  }catch(e){
    log.log('error with reuquet to '+url);
    log.error(e);
    throw e;
  }
};