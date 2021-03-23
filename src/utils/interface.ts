/**
 * @Author lester
 * @Date 2021-01-27
 */

export interface WxPayParams {
  appId: string;
  timeStamp: string;
  nonceStr: string;
  package: string;
  signType: string;
  paySign: string;
}

export interface Product {
  productCode: string;
  productName: string;
  price: number;
  originPrice: number;
  type: number; // 商品类型  1年卡 2季卡
}

export interface MemberType {
  productCode?: string;
  productName?: string;
  memberCategory?: string; // 商品会员类型 svip是超级影视vip youku是酷喵 mgtv是芒果tv
  depositType?: number; // 充值类型 1-卡密激活方式 2-第三方直冲方式。
}

export interface MemberInfo {
  type: number; // 权益类型。1 未开通会员，2 已开通会员，未过期；3 已经过期了
  deadline?: string; // 会员到期时间，type==2才有数值。如 2021-12-15
  orderId?: string; // 购买联合会员的订单id，type==2才有数值
}

export interface Record {
  id: number;
  memberCategory: string;
  productName: string;
  startTime: string;
  remainingDays: number,
  extContent: string;
}
