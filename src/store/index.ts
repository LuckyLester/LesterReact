/**
 * @Author lester
 * @Date 2021-01-15
 */

import { Model } from "flooks";
import { queryActivityDetail, queryMemberInfo, queryCheckOut, queryAccount } from "src/api";
import { getQueryParam } from "lester-tools";
import { wxConfig } from "src/utils/wx";

const state: Model = (now) => ({
  userInfo: {},
  memberInfo: {},
  activityDetail: {},
  canCheckOut: false,
  accountInfo: {},
  setUserInfo: (data: any) => {
    now({
      userInfo: data
    })
  },
  getMemberInfo: async () => {
    const res: any = await queryMemberInfo();
    if (res) {
      now({
        memberInfo: res
      });
      window.localStorage.setItem('memberStatus', res.type);
      if (res.type === 2) {
        window.localStorage.setItem('orderId', res.orderId);
        now().getCheckout();
      }
    }
  },
  getCheckout: async () => {
    const res: any = await queryCheckOut();
    if (res === true) {
      now({
        canCheckOut: true
      });
    }
  },
  getAccountInfo: async () => {
    const res: any = await queryAccount();
    if (res) {
      now({
        accountInfo: res
      });
    }
  },
  getActivityDetail: async () => {
    const res: any = await queryActivityDetail();
    if (res) {
      now({
        activityDetail: res
      });
      const { origin, pathname, hash } = window.location;
      const href: string = origin + pathname + hash.split('?')[0] + `?isShare=1&channel=${getQueryParam('channel')}`;
      wxConfig.init({
        title: res.shareTitle,
        desc: res.shareDesc,
        link: href,
        imgUrl: res.shareImgUrl
      });
    }
  }
});

export default state;
