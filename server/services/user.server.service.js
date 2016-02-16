/**
 * Created by zenghong on 16/1/20.
 */
'use strict';

var appDb = require('./../../libraries/mongoose').appDb,
  error = require('./../../errors/all'),
  cryptoLib = require('./../../libraries/crypto'),
  async = require('async'),
  User = appDb.model('User'),
  Desk = appDb.model('Desk');

exports.signin = function (username, password, callback) {
  User.findOne({username: username}, function (err, user) {
    if (err) {
      return callback({err: error.system.db_error});
    }
    if (!user) {
      return callback({err: error.business.user_account_not_exist});
    }

    if (user.password !== cryptoLib.toMd5(password)) {
      return callback({err: error.business.user_account_password_error});
    }

    return callback(null, user);
  });
};

function initUser() {
  User.count({}, function (err, count) {
    if (count > 0) {
      return;
    }

    var password = cryptoLib.toMd5('123456');

    var users = [
      {
        area: '华东地区',
        department: '上海',
        username: 'SH1001',
        password: password,
        show_name: '上海运营部',
        principal_name: '王蕾',
        principal_emal: 'sherry.1.wang@sh.eternal.hk',
        roles: [],
        account_type:'地区分公司',
        remark: ''
      },
      {
        area: '华东地区',
        department: '上海',
        username: 'SH1002',
        password: password,
        show_name: '上海运营部',
        principal_name: '运营助理1',
        principal_emal: '',
        roles: [],
        account_type:'地区分公司',
        remark: ''
      },
      {
        area: '华东地区',
        department: '上海',
        username: 'SH1003',
        password: password,
        show_name: '上海运营部',
        principal_name: '运营助理2',
        principal_emal: '',
        roles: [],
        account_type:'地区分公司',
        remark: ''
      },
      {
        area: '华东地区',
        department: '上海',
        username: 'SH1004',
        password: password,
        show_name: '管理员',
        principal_name: '管理员',
        principal_emal: '',
        roles: [],
        account_type:'地区分公司',
        remark: ''
      },
      {
        area: '总部',
        department: '经销商',
        username: 'SH1005',
        password: password,
        show_name: '总部经销商部',
        principal_name: '袁慧珠',
        principal_emal: 'amy.hz.yuan@sh.eternal.hk',
        roles: [],
        account_type:'地区分公司',
        remark: ''
      },
      {
        area: '总部',
        department: '经销商',
        username: 'SH1006',
        password: password,
        show_name: '总部经销商部',
        principal_name: '经销商助理',
        principal_emal: '',
        roles: [],
        account_type:'地区分公司',
        remark: ''
      },
      {
        area: '总部',
        department: '电商',
        username: 'SH1007',
        password: password,
        show_name: '总部电商部',
        principal_name: '张丽颖',
        principal_emal: 'clara.ly.zhang@sh.eternal.hk',
        roles: [],
        account_type:'地区分公司',
        remark: ''
      },
      {
        area: '总部',
        department: '电商',
        username: 'SH1008',
        password: password,
        show_name: '总部电商部',
        principal_name: '电商部助理',
        principal_emal: '',
        roles: [],
        account_type:'地区分公司',
        remark: ''
      },
      {
        area: '华东地区',
        department: '南京',
        username: 'NJ1001',
        password: password,
        show_name: '南京运营部',
        principal_name: '王蕾',
        principal_emal: 'sherry.1.wang@sh.eternal.hk',
        roles: [],
        account_type:'地区分公司',
        remark: ''
      },
      {
        area: '华东地区',
        department: '南京',
        username: 'NJ1002',
        password: password,
        show_name: '南京运营部',
        principal_name: '运营助理1',
        principal_emal: '',
        roles: [],
        account_type:'地区分公司',
        remark: ''
      },
      {
        area: '华东地区',
        department: '南京',
        username: 'NJ1003',
        password: password,
        show_name: '南京运营部',
        principal_name: '运营助理2',
        principal_emal: '',
        roles: [],
        account_type:'地区分公司',
        remark: ''
      },
      {
        area: '华东地区',
        department: '南京',
        username: 'NJ1004',
        password: password,
        show_name: '管理员',
        principal_name: '管理员',
        principal_emal: '',
        roles: [],
        account_type:'地区分公司',
        remark: ''
      },
      {
        area: '华东地区',
        department: '杭州',
        username: 'HZ1001',
        password: password,
        show_name: '杭州运营部',
        principal_name: '王蕾',
        principal_emal: 'sherry.1.wang@sh.eternal.hk',
        roles: [],
        account_type:'地区分公司',
        remark: ''
      },
      {
        area: '华东地区',
        department: '杭州',
        username: 'HZ1002',
        password: password,
        show_name: '杭州运营部',
        principal_name: '王蕾',
        principal_emal: '',
        roles: [],
        account_type:'地区分公司',
        remark: ''
      },
      {
        area: '华东地区',
        department: '杭州',
        username: 'HZ1003',
        password: password,
        show_name: '杭州运营部',
        principal_name: '王蕾',
        principal_emal: '',
        roles: [],
        account_type:'地区分公司',
        remark: ''
      },
      {
        area: '华东地区',
        department: '杭州',
        username: 'HZ1004',
        password: password,
        show_name: '管理员',
        principal_name: '王蕾',
        principal_emal: '',
        roles: [],
        account_type:'地区分公司',
        remark: ''
      },
      {
        area: '华东地区',
        department: '北京',
        username: 'BJ2001',
        password: password,
        show_name: '北京运营部',
        principal_name: '张娇',
        principal_emal: 'jiao.j.zhang@bj.eternal.hk',
        roles: [],
        account_type:'地区分公司',
        remark: ''
      },
      {
        area: '华东地区',
        department: '北京',
        username: 'BJ2002',
        password: password,
        show_name: '北京运营部',
        principal_name: '运营助理1',
        principal_emal: 'jiao.j.zhang@bj.eternal.hk',
        roles: [],
        account_type:'地区分公司',
        remark: ''
      },
      {
        area: '华东地区',
        department: '北京',
        username: 'BJ2003',
        password: password,
        show_name: '北京运营部',
        principal_name: '运营助理2',
        principal_emal: 'jiao.j.zhang@bj.eternal.hk',
        roles: [],
        account_type:'地区分公司',
        remark: ''
      },
      {
        area: '华东地区',
        department: '北京',
        username: 'BJ2004',
        password: password,
        show_name: '管理员',
        principal_name: '管理员',
        principal_emal: 'jiao.j.zhang@bj.eternal.hk',
        roles: [],
        account_type:'地区分公司',
        remark: ''
      },
      {
        area: '华西地区',
        department: '成都',
        username: 'CD3001',
        password: password,
        show_name: '成都运营部',
        principal_name: '宋全生',
        principal_emal: 'cd_log_suv2@cd.eternal.hk',
        roles: [],
        account_type:'地区分公司',
        remark: ''
      },
      {
        area: '华西地区',
        department: '成都',
        username: 'CD3002',
        password: password,
        show_name: '成都运营部',
        principal_name: '运营助理1',
        principal_emal: '',
        roles: [],
        account_type:'地区分公司',
        remark: ''
      },
      {
        area: '华西地区',
        department: '成都',
        username: 'CD3003',
        password: password,
        show_name: '成都运营部',
        principal_name: '运营助理2',
        principal_emal: '',
        roles: [],
        account_type:'地区分公司',
        remark: ''
      },
      {
        area: '华西地区',
        department: '成都',
        username: 'CD3004',
        password: password,
        show_name: '管理员',
        principal_name: '管理员',
        principal_emal: '',
        roles: [],
        account_type:'地区分公司',
        remark: ''
      },
      {
        area: '总部',
        department: '运营',
        username: 'JY0001',
        password: password,
        show_name: '总部运营部',
        principal_name: 'Minkey Hua',
        principal_emal: 'minkey.mq.hua@sh.eternal.hk',
        roles: [],
        account_type:'地区总部',
        remark: ''
      },
      {
        area: '总部',
        department: '运营',
        username: 'JY0002',
        password: password,
        show_name: '总部运营部',
        principal_name: 'Rita Lee',
        principal_emal: 'rita.q.li@sh.eternal.hk',
        roles: [],
        account_type:'地区总部',
        remark: ''
      },
      {
        area: '总部',
        department: '运营',
        username: 'JY0003',
        password: password,
        show_name: '管理员',
        principal_name: '管理员',
        principal_emal: '',
        roles: [],
        account_type:'地区总部',
        remark: ''
      },
      {
        area: '总部',
        department: '品牌',
        username: 'JY0004',
        password: password,
        show_name: '总部品牌',
        principal_name: 'Leo Miao',
        principal_emal: 'leo.y.miao@sh.eternal.hk',
        roles: [],
        account_type:'地区总部',
        remark: ''
      },
      {
        area: '总部',
        department: '品牌',
        username: 'JY0005',
        password: password,
        show_name: '总部品牌',
        principal_name: 'Vivi Yao',
        principal_emal: 'vivi.ww.yao@sh.eternal.hk',
        roles: [],
        account_type:'地区总部',
        remark: ''
      },
      {
        area: '总部',
        department: '经销商',
        username: 'JY0006',
        password: password,
        show_name: '总部经销商部',
        principal_name: '袁慧珠',
        principal_emal: 'amy.hz.yuan@sh.eternal.hk',
        roles: [],
        account_type:'地区总部',
        remark: ''
      },
      {
        area: '总部',
        department: '经销商',
        username: 'JY0007',
        password: password,
        show_name: '总部经销商部',
        principal_name: '经销商部助理',
        principal_emal: '',
        roles: [],
        account_type:'地区总部',
        remark: ''
      },
      {
        area: '总部',
        department: '电商',
        username: 'JY0008',
        password: password,
        show_name: '总部电商部',
        principal_name: '张丽颖',
        principal_emal: 'clara.ly.zhang@sh.eternal.hk',
        roles: [],
        account_type:'地区总部',
        remark: ''
      },
      {
        area: '总部',
        department: '电商',
        username: 'JY0009',
        password: password,
        show_name: '总部电商部',
        principal_name: '电商部助理',
        principal_emal: '',
        roles: [],
        account_type:'地区总部',
        remark: ''
      },
      {
        area: '澳妆',
        department: '供应链',
        username: 'RE0001',
        password: password,
        show_name: '澳妆供应链',
        principal_name: 'Tingting Zhong',
        principal_emal: 'tingtingzhong@redearthtrading.com',
        roles: [],
        account_type:'澳妆供应链',
        remark: ''
      },
      {
        area: '澳妆',
        department: '供应链',
        username: 'RE0002',
        password: password,
        show_name: '澳妆供应链',
        principal_name: 'Kelvin Feng',
        principal_emal: 'kelvinfang@redearthtrading.com',
        roles: [],
        account_type:'澳妆供应链',
        remark: ''
      },
      {
        area: '澳妆',
        department: '供应链',
        username: 'RE0003',
        password: password,
        show_name: '澳妆供应链',
        principal_name: 'Kennis Wong',
        principal_emal: 'kenniswong@redearthtrading.com',
        roles: [],
        account_type:'澳妆供应链',
        remark: ''
      },
      {
        area: '澳妆',
        department: '供应链',
        username: 'RE0004',
        password: password,
        show_name: '澳妆供应链',
        principal_name: 'Stefan Cai',
        principal_emal: 'stefancai@redearthtrading.com',
        roles: [],
        account_type:'澳妆供应链',
        remark: ''
      },
      {
        area: '澳妆',
        department: '供应链',
        username: 'RE0005',
        password: password,
        show_name: '澳妆供应链',
        principal_name: 'Mira Liu',
        principal_emal: 'miraliu@redearthtrading.com',
        roles: [],
        account_type:'澳妆供应链',
        remark: ''
      },
      {
        area: '澳妆',
        department: '供应链',
        username: 'RE0006',
        password: password,
        show_name: '澳妆供应链',
        principal_name: '供应鏈助理',
        principal_emal: '',
        roles: [],
        account_type:'澳妆供应链',
        remark: ''
      },
      {
        area: '澳妆',
        department: '供应链',
        username: 'RE0007',
        password: password,
        show_name: '澳妆供应链',
        principal_name: '管理员',
        principal_emal: '',
        roles: [],
        account_type:'澳妆供应链',
        remark: ''
      }
    ];

    async.each(users, function (user, callback) {
      new User(user).save(function (err, newUser) {
        return callback();
      });
    }, function (err) {
      console.log('ok');
    });
  });
}

function initDesk() {
  Desk.count({}, function (err, count) {
    if (count > 0) {
      return;
    }

    var desks = [
      {
        area: '华东',
        child_area: '上海',
        desk_number: 'REDSH001',
        desk_name: '上海黄浦区香港名店街红地球彩妆 '
      },
      {
        area: '华东',
        child_area: '上海',
        desk_number: 'REDSH002',
        desk_name: '上海黄浦区置地广场红地球彩妆 '
      },
      {
        area: '华东',
        child_area: '上海',
        desk_number: 'REDSH003',
        desk_name: '上海虹口区龙之梦红地球彩妆 '
      },
      {
        area: '华东',
        child_area: '上海',
        desk_number: 'REDSH004',
        desk_name: '上海闸北区协信星光广场红地球彩妆 '
      },
      {
        area: '华东',
        child_area: '杭州',
        desk_number: 'REDHZ001',
        desk_name: '杭州江干区庆春银泰红地球彩妆 '
      },
      {
        area: '华北',
        child_area: '北京',
        desk_number: 'REDBJ001',
        desk_name: '北京通州区国泰商场红地球彩妆'
      },
      {
        area: '华北',
        child_area: '北京',
        desk_number: 'REDBJ002',
        desk_name: '北京昌平区国泰商场红地球彩妆'
      },
      {
        area: '华北',
        child_area: '北京',
        desk_number: 'REDBJ003',
        desk_name: '北京西城区汉光百货红地球彩妆'
      },
      {
        area: '华北',
        child_area: '天津',
        desk_number: 'REDBJ004',
        desk_name: '天津滨海新区金元宝滨海国际购物中心红地球彩妆'
      },
      {
        area: '华西',
        child_area: '成都',
        desk_number: 'REDCD001',
        desk_name: '成都成华区万象城Redearth彩妆'
      },
      {
        area: '华西',
        child_area: '成都',
        desk_number: 'REDCD002',
        desk_name: '成都市锦江区王府井春熙redearth彩妆'
      },
      {
        area: '华西',
        child_area: '成都',
        desk_number: 'REDCD003',
        desk_name: '成都市高新区伊藤redearth彩妆'
      },
      {
        area: '华西',
        child_area: '成都',
        desk_number: 'REDCD004',
        desk_name: '成都青羊区天府摩尔红色地球彩妆'
      },
      {
        area: '华西',
        child_area: '成都',
        desk_number: 'REDCD005',
        desk_name: '成都锦江区伊藤锦华红色地球彩妆'
      },
      {
        area: '华西',
        child_area: '重庆',
        desk_number: 'REDCQ001',
        desk_name: '重庆江北区大融城红色地球彩妆'
      },
      {
        area: '华西',
        child_area: '重庆',
        desk_number: 'REDCQ002',
        desk_name: '重庆江北区世纪新红地球彩妆'
      }
    ];
    async.each(desks, function (desk, callback) {
      new Desk(desk).save(function (err, saveDesk) {
        return callback();
      }, function () {
        return;
      });
    });
  })
}

initUser();
initDesk();



