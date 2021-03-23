/**
 * @Author lester
 * @Date 2020-07-31
 */

import wx from 'weixin-js-sdk';
import { getWxConfigInfo } from 'src/api';
import { WxPayParams } from "src/utils/interface";

export const wxConfig = {
  init: async function (info: any) {
    if (!wx) {
      return console.error('Import zepto or wx sdk file before init');
    }
    // 获取微信公众号配置信息
    const res: any = await getWxConfigInfo();
    if (res) {
      wx.config({
        debug: false,
        ...res,
        jsApiList: ['onMenuShareAppMessage', 'onMenuShareTimeline', 'onMenuShareQQ']
      });

      wx.ready(() => {
        this.share(info);
      });

      wx.error((err: any) => {
        // console.error(err);
      })
    }
  },

  share: (info: any) => {
    wx.onMenuShareAppMessage(info);
    wx.onMenuShareTimeline(info);
    wx.onMenuShareQQ(info);
  }
};

/**
 * 微信支付
 * @param param
 * @param cb
 */
export const wxPay: any = ( param: WxPayParams, cb: (res: any) => void ) => {
  function onBridgeReady(){
    window.WeixinJSBridge.invoke(
        'getBrandWCPayRequest', {
          ...param
        },
      (res: Object) => cb(res),
    );
  }
  if (typeof window.WeixinJSBridge === "undefined"){
    if ( document.addEventListener ){
      document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
    } else if (document.attachEvent){
      document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
      document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
    }
  } else {
    onBridgeReady();
  }
};
