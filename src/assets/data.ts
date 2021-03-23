/**
 * @Author lester
 * @Date 2020-11-12
 */

export interface Image {
  id: number;
  name: string;
  img: any;
}

export interface Member {
  id: number;
  name: string;
  type: string;
  icon: any;
}

export const txPrivilege: Image[] = [{
  id: 1,
  name: '四屏通用',
  img: require("src/assets/images/privilege/tx/1.png")
}, {
  id: 2,
  name: '抢先看剧',
  img: require("src/assets/images/privilege/tx/2.png")
}, {
  id: 3,
  name: '免广告特权',
  img: require("src/assets/images/privilege/tx/3.png")
}, {
  id: 4,
  name: '院线新片',
  img: require("src/assets/images/privilege/tx/4.png")
}, {
  id: 5,
  name: '极清画质',
  img: require("src/assets/images/privilege/tx/5.png")
}, {
  id: 6,
  name: '观影券',
  img: require("src/assets/images/privilege/tx/6.png")
}, {
  id: 7,
  name: '极速缓存',
  img: require("src/assets/images/privilege/tx/7.png")
}, {
  id: 8,
  name: '尊贵身份',
  img: require("src/assets/images/privilege/tx/8.png")
}];

export const ykPrivilege: Image[] = [{
  id: 1,
  name: '四屏通用',
  img: require("src/assets/images/privilege/yk/1.png")
}, {
  id: 2,
  name: '抢先看剧',
  img: require("src/assets/images/privilege/yk/2.png")
}, {
  id: 3,
  name: '免广告特权',
  img: require("src/assets/images/privilege/yk/3.png")
}, {
  id: 4,
  name: '院线新片',
  img: require("src/assets/images/privilege/yk/4.png")
}, {
  id: 5,
  name: '极清画质',
  img: require("src/assets/images/privilege/yk/5.png")
}, {
  id: 6,
  name: '观影券',
  img: require("src/assets/images/privilege/yk/6.png")
}, {
  id: 7,
  name: '极速缓存',
  img: require("src/assets/images/privilege/yk/7.png")
}, {
  id: 8,
  name: '尊贵身份',
  img: require("src/assets/images/privilege/yk/8.png")
}];

export const mgPrivilege: Image[] = [{
  id: 1,
  name: '四屏通用',
  img: require("src/assets/images/privilege/mg/1.png")
}, {
  id: 2,
  name: '抢先看剧',
  img: require("src/assets/images/privilege/mg/2.png")
}, {
  id: 3,
  name: '免广告特权',
  img: require("src/assets/images/privilege/mg/3.png")
}, {
  id: 4,
  name: '综艺直播',
  img: require("src/assets/images/privilege/mg/4.png")
}, {
  id: 5,
  name: '会员片库',
  img: require("src/assets/images/privilege/mg/5.png")
}, {
  id: 6,
  name: '极清画质',
  img: require("src/assets/images/privilege/mg/6.png")
}, {
  id: 7,
  name: '专享缓存',
  img: require("src/assets/images/privilege/mg/7.png")
}, {
  id: 8,
  name: '节目周边',
  img: require("src/assets/images/privilege/mg/8.png")
}];

export const memberList: Member[] = [{
  id: 1,
  name: '超级影视 VIP',
  type: 'tx',
  icon: require("src/assets/images/svip_active.png")
}, {
  id: 2,
  name: '酷喵VIP',
  type: 'yk',
  icon: require("src/assets/images/youku_active.png")
}, {
  id: 3,
  name: '芒果TV VIP',
  type: 'mg',
  icon: require("src/assets/images/mgtv_active.png")
}];
