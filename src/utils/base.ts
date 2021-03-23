/**
 * @Author lester
 * @Date 2020-11-12
 */
import { placeOrder } from "src/api";
import { wxPay } from "./wx";

/**
 * 获取openId
 */
export const getOpenId = () => {
  const userInfo: any = window.localStorage.getItem('userInfo') || '{}';
  return JSON.parse(userInfo).openid
};

/**
 * 获取unionId
 */
export const getUnionId = () => {
  const userInfo: any = window.localStorage.getItem('userInfo') || '{}';
  return JSON.parse(userInfo).unionid
};

/**
 * 获取OrderId
 */
export const getOrderId = () => {
  return window.localStorage.getItem('orderId') || ''
};

/**
 * 微信下单并支付
 * @param param
 */
export const createOrderPayByWX = async (param: Object) => {
  const res: any = await placeOrder(param);
  return new Promise((resolve, reject) => {
    if(res?.wxdata){
      wxPay({
        ...res?.wxdata
      }, (wxRes: any) => {
        if( wxRes.err_msg === "get_brand_wcpay_request:ok" ) {
          const wxPaySuccess = new CustomEvent("wxPaySuccess", { detail: wxRes });
          window.dispatchEvent(wxPaySuccess);
          resolve();
        } else {
          // cancel
          reject('取消');
        }
      })
    } else {
      reject('支付参数错误');
    }
  })
};

/**
 * 获取屏幕高度
 */
export const getScreenHeight = () => {
  const { clientHeight, offsetHeight } = document.documentElement;
  const { clientHeight: bodyClientHeight, offsetHeight: bodyOffsetHeight } = document.body;
  const { height: screenHeight, availHeight } = window.screen;
  return clientHeight || offsetHeight  || bodyClientHeight || bodyOffsetHeight ||
    screenHeight || availHeight || 667;
};

/**
 * 获取会员状态 1|非会员，2|会员，3|已过期
 */
export const getMemberStatus = () => {
  return window.localStorage.getItem('memberStatus')
};
