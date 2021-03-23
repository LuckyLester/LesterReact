/**
 * @Author lester
 * @Date 2021-01-22
 */

import React from "react";
import useModel from "flooks";
import state from "@/store";
// import BI, { BIType } from "src/utils/BI";
import style from './style.module.less';

const Index: React.FC = ({ children }) => {
  const { userInfo, memberInfo } = useModel(state, ['userInfo', 'memberInfo']);

  const getMemberDesc = () => {
    if (memberInfo.type === 2) {
      return `到期时间：${memberInfo.deadline}`
    }
    if (memberInfo.type === 3) {
      return '您的会员已过期'
    }
    return '您还未开通会员'
  };

  const getBtnText = () => {
    if (memberInfo.type === 2) {
      return '续费管理';
    }
    return '开通会员';
  };

  return (
    <div className={style.wrap}>
      <section className={style.userWrap}>
        <div className={style.infoWrap}>
          <img
            className={style.avatar}
            src={userInfo.headimgurl || require('src/assets/images/avatar.png')}
            alt=""
          />
          <div className={style.userInfo}>
            <div className={style.userName}>{userInfo.nickName}</div>
            <div className={style.memberDesc}>{getMemberDesc()}</div>
          </div>
        </div>
        {/*<div className={style.memberBtn} onClick={() => {
          BI.push({
            type: BIType.btnClick,
            pageName: document.title,
            btnName: getBtnText()
          });
        }}>{getBtnText()}</div>*/}
      </section>
      <section className={style.contentWrap}>
        <div className={style.content}>{children}</div>
      </section>
    </div>
  )
};

export default Index;
