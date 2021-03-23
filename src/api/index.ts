/**
 * @Author lester
 * @Date 2021-01-15
 */
import { http } from "lester-tools";
import { getOpenId, getOrderId } from "src/utils/base";

/**
 * 获取用户信息
 * @param param
 */
export function queryUserInfo(param: Object) {
  return http.get('/memberCard/api/card/getUserInfo', {
    ...param,
  })
}

/**
 * 获取微信配置信息
 */
export function getWxConfigInfo() {
  return http.get('/distributor/api/resellers/appConfig', {
    url: window.location.href
  })
}

/**
 * 下单
 * @param param
 */
export function createOrder(param: Object) {
  return http.post('/memberCard/api/groupBuy/createOrder', {
    ...param
  })
}


/**
 * 获取活动详情
 */
export function queryActivityDetail() {
  return http.get('/memberCard/union/activity-info', {
    from: 'unite'
  })
}

/**
 * 查询商品列表
 */
export function queryProductList() {
  return http.get('/memberCard/union/produceList', {
    from: 'unite'
  })
}

/**
 * 查询会员类型
 */
export function queryMemberTypes() {
  return http.get('/memberCard/union/sub/produceList');
}

/**
 * 查询用户会员信息
 */
export function queryMemberInfo() {
  return http.get('/memberCard/union/user/right', {
    openId: getOpenId()
  });
}

/**
 * 查询会员开通记录
 */
export function queryOpenRecord() {
  return http.get('/memberCard/union/vip/record', {
    openId: getOpenId(),
    orderId: getOrderId()
  })
}

/**
 * 查询是否能够切换会员
 */
export function queryCheckOut() {
  return http.get('/memberCard/union/user-vip/check', {
    openId: getOpenId(),
    orderId: getOrderId()
  })
}

/**
 * 查询用户充值账号信息
 */
export function queryAccount() {
  return http.get('/memberCard/union/user-info', {
    openId: getOpenId()
  });
}

/**
 * 保存用户充值账号信息
 * @param param
 */
export function saveAccount(param: Object) {
  return http.post('/memberCard/union/user-info/update', {
    openId: getOpenId(),
    ...param
  });
}

/**
 * 商品权益充值
 * @param param
 */
export function productRecharge(param: Object) {
  return http.post('/memberCard/union/vip/vocation', {
    openId: getOpenId(),
    orderId: getOrderId(),
    ...param
  });
}


/**
 * 下单
 * @param param
 */
export function placeOrder(param: Object) {
  return http.post('/memberCard/union/createOrder', {
    openId: getOpenId(),
    ...param
  });
}

/**
 * 支付成功后修改会员状态信息
 */
export function changeMemberStatus() {
  return http.post('/memberCard/union/vip/callback', {
    openId: getOpenId(),
    orderId: getOrderId()
  });
}
