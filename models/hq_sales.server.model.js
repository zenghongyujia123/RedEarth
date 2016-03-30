/**
 * Created by zenghong on 16/2/21.
 */
'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  timestamps = require('mongoose-timestamp');

module.exports = function (appDb) {
  var HqSalesSchema = new Schema({
    object: {
      type: String,
      default: 'hqSales'
    },
    product_number: {
      type: String
    },
    mid_classify: {
      type: String
    },
    //正品
    genuine_goods: {
      type: Number,
      default: 0
    },
    onway_goods: {
      type: Number,
      default: 0
    },
    hq_safe_stock: {
      type: String,
    },
    is_sure: {
      type: String
    },
    month: {
      type: String
    },
    //近效期
    validity: {
      type: String,
    },
    //次品
    ungenuine_goods: {
      type: Number,
      default: 0
    },
    safe_stock: {
      type: Number,
      default: 0
    },
    Y01: {
      type: Number,
      default: 0
    },
    Y02: {
      type: Number,
      default: 0
    },
    Y03: {
      type: Number,
      default: 0
    },
    Y04: {
      type: Number,
      default: 0
    },
    Y05: {
      type: Number,
      default: 0
    },
    Y06: {
      type: Number,
      default: 0
    },
    Y07: {
      type: Number,
      default: 0
    },
    D01: {
      type: Number,
      default: 0
    },
    D02: {
      type: Number,
      default: 0
    },
    D03: {
      type: Number,
      default: 0
    },
    D04: {
      type: Number,
      default: 0
    },
    D01_approve: {
      type: Number,
      default: 0
    },
    D02_approve: {
      type: Number,
      default: 0
    },
    D03_approve: {
      type: Number,
      default: 0
    },
    D04_approve: {
      type: Number,
      default: 0
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: 'Product'
    },
    system_suggest_count: {
      type: Number,
      default: 0
    },
    //修改后的系统建议订单
    system_suggest_count_modify: {
      type: Number,
      default: 0
    },
    //修改后的系统建议订单%
    system_suggest_count_modify_percent: {
      type: Number,
      default: 0
    },
    final_system_suggest_count: {
      type: Number,
      default: 0
    },
    //备注
    remark: {
      type: String,
      defualt: ''
    },
    order_number: {
      type: String
    },
    status: {
      type: String,
      enum: ['未提交', '未审核', '已审核'],
      default: '未提交'
    },
    next_month_sales_forecast_0: {
      type: Number,
      default: 0
    },
    next_month_sales_forecast_1: {
      type: Number,
      default: 0
    },
    next_month_sales_forecast_2: {
      type: Number,
      default: 0
    },
    next_month_sales_forecast_3: {
      type: Number,
      default: 0
    },
    next_month_sales_forecast_4: {
      type: Number,
      default: 0
    },
    next_month_sales_forecast_5: {
      type: Number,
      default: 0
    },
    next_month_sales_forecast_6: {
      type: Number,
      default: 0
    },
    last_month_sales_count_1: {
      type: Number,
      default: 0
    },
    last_month_sales_count_2: {
      type: Number,
      default: 0
    },
    last_month_sales_count_3: {
      type: Number,
      default: 0
    },
    last_month_stock_count_1: {
      type: Number,
      default: 0
    },
    last_month_stock_count_2: {
      type: Number,
      default: 0
    },
    last_month_stock_count_3: {
      type: Number,
      default: 0
    },
    final_purchased_count: {
      type: Number,
      default: 0
    },
    final_purchased_price: {
      type: Number,
      default: 0
    },
    plan_delivery_time: {
      type: Date
    },
    plan_delivery_count: {
      type: Number
    },
    final_play_delivery_time: {
      type: Date
    },
    real_delivery_time: {
      type: Date
    },
    real_delivery_count: {
      type: Number
    },
    onway_count: {
      type: Number
    }
  });

  HqSalesSchema.plugin(timestamps, {
    createdAt: 'created',
    updatedAt: 'updated'
  });

  HqSalesSchema.pre('save', function (next) {
    if (this.last_month_sales_count_3 !== 0 || this.last_month_sales_count_2 !== 0 || this.last_month_sales_count_1 !== 0) {
      this.next_month_sales_forecast_0 = parseInt((this.last_month_sales_count_3 + this.last_month_sales_count_2 + this.last_month_sales_count_1) / 3);
      this.next_month_sales_forecast_1 = parseInt((this.last_month_sales_count_2 + this.last_month_sales_count_1 + this.next_month_sales_forecast_0 ) / 3);
      this.next_month_sales_forecast_2 = parseInt((this.last_month_sales_count_1 + this.next_month_sales_forecast_0 + this.next_month_sales_forecast_1 ) / 3);
      this.next_month_sales_forecast_3 = parseInt((this.next_month_sales_forecast_0 + this.next_month_sales_forecast_1 + this.next_month_sales_forecast_2 ) / 3);
      this.next_month_sales_forecast_4 = parseInt((this.next_month_sales_forecast_1 + this.next_month_sales_forecast_2 + this.next_month_sales_forecast_3) / 3);
      this.next_month_sales_forecast_5 = parseInt((this.next_month_sales_forecast_2 + this.next_month_sales_forecast_3 + this.next_month_sales_forecast_4 ) / 3);
      this.next_month_sales_forecast_6 = parseInt((this.next_month_sales_forecast_3 + this.next_month_sales_forecast_4 + this.next_month_sales_forecast_5 ) / 3);
      var hq_safe_stock = isNaN(parseFloat(this.hq_safe_stock)) ? 0 : parseFloat(this.hq_safe_stock);
      this.safe_stock = parseInt(( this.last_month_sales_count_3 + this.last_month_sales_count_2 + this.last_month_sales_count_1) / 3 * hq_safe_stock);
    }

    if (this.system_suggest_count !== 0 && this.system_suggest_count_modify === 0) {
      this.system_suggest_count_modify = this.system_suggest_count;
    }

    next();
  });
  appDb.model('HqSales', HqSalesSchema);
};
