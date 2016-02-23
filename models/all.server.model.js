/**
 * Created by zenghong on 16/1/20.
 */
module.exports = function (appDb) {
  require('./user')(appDb);
  require('./desk')(appDb);
  require('./product')(appDb);
  require('./area_order')(appDb);
  require('./area_submit_order')(appDb);
  require('./area_sales')(appDb);
  require('./hq_sales')(appDb);
  require('./hq_order')(appDb);
  require('./hq_submit_order')(appDb);
  require('./re_log')(appDb);
};