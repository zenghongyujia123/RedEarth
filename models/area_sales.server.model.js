/**
 * Created by zenghong on 16/2/17.
 */
'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  timestamps = require('mongoose-timestamp');

module.exports = function (appDb) {
  var AreaSalesSchema = new Schema({
    object: {
      type: String,
      default: 'areaSales'
    },
    area: {
      type: String
    },
    department: {
      type: String
    },
    //上月月份
    month: {
      type: String
    },
    //产品编码
    product_number: {
      type: String
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: 'Product'
    },
    //上月销量
    last_month_sales_count: {
      type: Number,
      default: 0
    },
    //上月月结库存
    last_month_stock_count: {
      type: Number,
      default: 0
    },
    //上月月结在途量
    last_month_onway_count: {
      type: Number,
      default: 0
    },
    username: {
      type: String
    },
    //安全库存
    safe_stock: {
      type: Number,
      default: 0
    },
    //订单号,年月+用户编号+订单类別
    order_number: {
      type:String
    },
    //系统建议订单
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
    //备注
    remark: {
      type: String,
      defualt: ''
    },
    status: {
      type: String,
      enum: ['未提交', '未审核', '已审核'],
      default: '未提交'
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
      type: Number
    },
    last_month_sales_count_2: {
      type: Number
    },
    last_month_sales_count_3: {
      type: Number
    },
    last_month_stock_count_1: {
      type: Number
    },
    last_month_stock_count_2: {
      type: Number
    },
    last_month_stock_count_3: {
      type: Number
    }
  });

  AreaSalesSchema.pre('save', function (next) {
    if (this.last_month_sales_count_3 !== 0 || this.last_month_sales_count_2 !== 0 || this.last_month_sales_count_1 !== 0) {
      this.next_month_sales_forecast_0 = parseInt((this.last_month_sales_count_3 + this.last_month_sales_count_2 + this.last_month_sales_count_1) / 3);
      this.next_month_sales_forecast_1 = parseInt((this.last_month_sales_count_2 + this.last_month_sales_count_1 + this.next_month_sales_forecast_0 ) / 3);
      this.next_month_sales_forecast_2 = parseInt((this.last_month_sales_count_1 + this.next_month_sales_forecast_0 + this.next_month_sales_forecast_1 ) / 3);
      this.next_month_sales_forecast_3 = parseInt((this.next_month_sales_forecast_0 + this.next_month_sales_forecast_1 + this.next_month_sales_forecast_2 ) / 3);
      this.next_month_sales_forecast_4 = parseInt((this.next_month_sales_forecast_1 + this.next_month_sales_forecast_2 + this.next_month_sales_forecast_3) / 3);
      this.next_month_sales_forecast_5 = parseInt((this.next_month_sales_forecast_2 + this.next_month_sales_forecast_3 + this.next_month_sales_forecast_4 ) / 3);
      this.next_month_sales_forecast_6 = parseInt((this.next_month_sales_forecast_3 + this.next_month_sales_forecast_4 + this.next_month_sales_forecast_5 ) / 3);
    }

    if (this.last_month_stock_count_1 !== 0 || this.last_month_stock_count_2 !== 0 || this.last_month_stock_count_3 !== 0) {
      this.safe_stock = parseInt(( this.last_month_stock_count_1 + this.last_month_stock_count_2 + this.last_month_stock_count_3) / 3) * 2
    }

    if (this.system_suggest_count !== 0 && this.system_suggest_count_modify === 0) {
      this.system_suggest_count_modify = this.system_suggest_count;
    }
    next();
  });

  AreaSalesSchema.plugin(timestamps, {
    createdAt: 'created',
    updatedAt: 'updated'
  });
  appDb.model('AreaSales', AreaSalesSchema);
};
