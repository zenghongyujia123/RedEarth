/**
 * Created by zenghong on 16/1/20.
 */
'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  timestamps = require('mongoose-timestamp');

module.exports = function (appDb) {
  var Productchema = new Schema({
    object: {
      type: String,
      default: 'product'
    },
    //产品编码
    product_number: {
      type: String,
      unique: true
    },
    //产品条码
    product_barcode: {
      type: String
    },
    //SAP CODE
    sap_code: {
      type: String
    },
    //产品名称
    product_name: {
      type: String
    },
    //规格
    specification: {
      type: String
    },
    //品类
    category: {
      type: String
    },
    //系列名称
    series_name: {
      type: String
    },
    //中分类名称
    mid_classify: {
      type: String
    },
    //小分类名称
    small_classify: {
      type: String
    },
    //销售价格
    sales_price: {
      type: Number,
      default:0
    },
    //晋yi成本
    jinyi_cost: {
      type: Number,
      default:0
    },
    //开始销售日期
    start_sales_date: {
      type: String
    },
    //停止销售日期
    end_sales_date: {
      type: String
    },
    //保质期
    expiration_date: {
      type: String
    },
    //销售单位
    sales_unit: {
      type: String
    },
    //工厂名称
    factory_name: {
      type: String
    },
    //工厂MOQ
    factory_moq: {
      type: Number
    },
    //MOQ备注
    moq_remark: {
      type: String
    },
    //工厂交货周期
    factory_delivery_cycle: {
      type: String
    },
    //是否明星产品
    is_star_product: {
      type: String
    },
    //TOP SKU排名
    top_sku_ranking: {
      type: String
    },
    //ABC分类
    abc_classify: {
      type: String
    },
    //ABC类说明
    abc_classify_explain: {
      type: String
    },
    //ABC类别%
    abc_category: {
      type: String
    },
    //柜台销售参考(月)
    desk_sales_reference: {
      type: String
    },
    //柜台最少订量(月)
    desk_minimum_order_count: {
      type: String
    },
    //柜台安全库存(月)
    desk_safe_stock: {
      type: String
    },
    //地区销售参考(月)
    area_sales_reference: {
      type: String
    },
    //地区安全库存(月)
    area_safe_stock: {
      type: String
    },
    //地区修改订单超出%(需颜色提醒)
    area_modify_exceed: {
      type: String
    },
    //地区修改订单超出%(需备注及确认)
    area_modify_exceed_remark: {
      type: String
    },
    //总部销售参考(月)
    hq_sales_reference: {
      type: String
    },
    //总部安全库存(月)
    hq_safe_stock: {
      type: String
    },
    //审批订单修改订单超出%(需颜色提醒)
    approval_modify_exceed: {
      type: String
    },
    //审批订单修改订单超出%(需上级确认提醒)
    approval_modify_exceed_remark: {
      type: String
    },
    //订量达MOQ之%必采购
    order_count_exceed_moq: {
      type: String
    },
    //是否有地区特性
    is_area_speciality: {
      type: String
    },
    //地区特性加20%
    area_speciality_more: {
      type: String
    },
    //是否有季节性
    is_season_speciality: {
      type: String
    },
    //季节性加20%
    season_speciality_more: {
      type: String
    },
    //柜台促销活动月份
    desk_promotion_month: {
      type: String
    },
    //柜台促销活动比率
    desk_promotion_rate: {
      type: String
    },
    //字段1
    field_1: {
      type: String
    },
    //字段2
    field_2: {
      type: String
    },
    //字段3
    field_3: {
      type: String
    },
    //字段4
    field_4: {
      type: String
    },
    //字段5
    field_5: {
      type: String
    },
    plan_delivery_count: {
      type: Number,
      default: 0
    },
    plan_delivery_date: {
      type: String
    },
    real_delivery_count: {
      type: Number,
      default: 0
    },
    real_delivery_date: {
      type: String
    },
    onway_count: {
      type: Number,
      default: 0
    }
  });

  Productchema.plugin(timestamps, {
    createdAt: 'created',
    updatedAt: 'updated'
  });

  Productchema.pre('save', function (next) {
    this.onway_count = this.plan_delivery_count - this.real_delivery_count;
    next();
  });

  appDb.model('Product', Productchema);
};
