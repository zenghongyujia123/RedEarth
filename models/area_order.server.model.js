/**
 * Created by zenghong on 16/2/17.
 */
'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  timestamps = require('mongoose-timestamp');

module.exports = function (appDb) {
  var AreaOrderSchema = new Schema({
    object: {
      type: String,
      default: 'areaOrder'
    },
    //SKU编码
    product_number: {
      type: String
    },
    //产品名称
    product_name: {
      type: String
    },
    //产品条码
    product_barcode: {
      type: String
    },
    //品类
    category: {
      type: String
    },
    //中分类名称
    mid_classify: {
      type: String
    },
    //销售价格
    sales_price: {
      type: Number
    },
    //订单号码,年月+用户编号+订单类别
    order_number: {
      type: String
    },
    //订单数量
    order_count: {
      type: Number,
      default: 0
    },
    //订单类别(D01:正品,D02:批发，D03:试用装，D04:陈列)
    order_type: {
      type: String,
      default: 'DO1'
    },
    //总销售价格
    total_price: {
      type: Number,
      default: 0
    },
    department: {
      type: String
    },
    month: {
      type: String
    },
    //是否审批
    is_approval: {
      type: Boolean,
      default: false
    }
  });

  AreaOrderSchema.plugin(timestamps, {
    createdAt: 'created',
    updatedAt: 'updated'
  });

  appDb.model('AreaOrder', AreaOrderSchema);


  var AreaHistoryOrderSchema = new Schema({
    object: {
      type: String,
      default: 'areaHistoryOrder'
    },
    //sku编码
    product_number: {
      type: String
    },
    product_name: {
      type: String
    },
    //城市
    department: {
      type: String
    },
    //年月
    month: {
      type: String
    },
    //销售量
    sale_count:{
      type:Number
    },
    //库存量
    stock_count:{
      type:Number
    },
    //在途量
    onway_count:{
      type:Number
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: 'Product'
    }
  });

  AreaHistoryOrderSchema.plugin(timestamps, {
    createdAt: 'created',
    updatedAt: 'updated'
  });

  appDb.model('AreaHistoryOrder', AreaHistoryOrderSchema);



  var HqHistoryOrderSchema = new Schema({
    object: {
      type: String,
      default: 'areaHistoryOrder'
    },
    //sku编码
    product_number: {
      type: String
    },
    product_name: {
      type: String
    },
    //城市
    department: {
      type: String,
      default:'地区总部'
    },
    //年月
    month: {
      type: String
    },
    //销售量
    zhengpin:{
      type:Number
    },
    //库存量
    zaitu:{
      type:Number
    },
    //在途量
    jinxiaoqi:{
      type:Number
    },
    cipin: {
      type:Number
    },
    product:{
      type: Schema.Types.ObjectId,
      ref: 'Product'
    }
  });

  HqHistoryOrderSchema.plugin(timestamps, {
    createdAt: 'created',
    updatedAt: 'updated'
  });

  appDb.model('HqHistoryOrder', HqHistoryOrderSchema);
};
