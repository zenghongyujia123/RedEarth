/**
 * Created by zenghong on 16/1/20.
 */
module.exports = function (appDb) {
  require('./user')(appDb);
  require('./desk')(appDb);
  require('./area_order')(appDb);
  require('./area_sales')(appDb);
};