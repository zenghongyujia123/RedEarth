/**
 * Created by Wayne on 15/10/9.
 */

module.exports = {

//<editor-fold desc="user relative">
  user_account_not_exist: {type: 'user_account_not_exist', message: 'user account not exist', zh_message: '用户账户不存在'},
  user_account_not_activate: {
    type: 'user_account_not_activate',
    message: 'user account not activate',
    zh_message: '用户账户未激活'
  },
  user_account_password_error: {
    type: 'user_account_password_error',
    message: 'user account password error',
    zh_message: '密码错误'
  },
  user_token_empty: {type: 'user_token_empty', message: 'user token empty', zh_message: '用户凭证为空'},
  user_token_invalid: {type: 'user_token_invalid', message: 'user token invalid', zh_message: '用户凭证无效'},
  user_admin_authentication_failed: {
    type: 'user_admin_authentication_failed',
    message: 'user admin authentication failed',
    zh_message: '需要管理员权限'
  },
  user_id_empty: {type: 'user_id_empty', message: 'user id empty', zh_message: '该用户id为空'},
  user_id_invalid: {type: 'user_id_invalid', message: 'user id invalid', zh_message: '该用户id无效'},
  //<editor-fold>

  //<editor-fold desc="company relative">
  company_not_existed: {type: 'company_not_existed', message: 'company not existed', zh_message: '该公司不存在'},
  company_name_existed: {type: 'company_name_existed', message: 'company name existed', zh_message: '该公司名称已存在'},

  //<editor-fold>

  //<editor-fold desc="card template relative">
  card_template_not_existed: {type: 'card_template_not_existed', zh_message: '拜访卡不存在'},
  //<editor-fold>

  //<editor-fold desc="card template relative">
  customer_not_existed: {type: 'customer_not_existed', zh_message: '客户经销商不存在'},
  //<editor-fold>
  article_not_found: {type: 'article_not_found', message: 'article not found', zh_message: '文章未找到'},

  area_sale_not_found: {type: 'area_sale_not_found', message: 'area_sale_not_found', zh_message: '订单未找到'}
};

