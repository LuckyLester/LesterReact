/**
 * @Author lester
 * @Date 2020-12-17
 */

import React, { useState, useEffect, useRef, MutableRefObject } from "react";
import { RouteComponentProps } from "react-router-dom";
import classNames from "classnames";
import useModel from "flooks";
import state from "src/store";
import { Carousel, Modal } from "src/components"
import { txPrivilege, ykPrivilege, mgPrivilege, Image } from "src/assets/data";
import { Product } from "src/utils/interface";
import { queryProductList, changeMemberStatus } from "src/api";
import { createOrderPayByWX, getScreenHeight } from "src/utils/base";
import { getQueryParam } from "lester-tools";
import style from './style.module.less';

const Index: React.FC<RouteComponentProps> = ( { history } ) => {
  const { userInfo, memberInfo, canCheckOut, activityDetail: { adsList = [], qrUrl, bannerImgUrl, bgColor },
    getActivityDetail, getMemberInfo } = useModel(state, ['userInfo', 'memberInfo', 'canCheckOut', 'activityDetail']);
  const [productList, setProductList] = useState<any []>([]);
  const [cardIndex, setCardIndex] = useState<number>(0);
  const [startX, setStartX] = useState<number>(0);
  const [showFooter, setShowFooter] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);

  const btnRef: MutableRefObject<HTMLDivElement|any> = useRef();
  const productInfo: Product = productList[cardIndex] || {};
  const footerVisible = showFooter && memberInfo.type !== 2;

  console.log(memberInfo.type, footerVisible,showFooter)

  const openMember = async () => {
    await createOrderPayByWX({ productId: productInfo.productCode });
    await changeMemberStatus();
    getMemberInfo();
    history.push('/memberInfo?fromPage=会员联合购主页');
  };

  const getProductList = async () => {
    const res: any = await queryProductList();
    if (res && res.length > 0) {
      setProductList(res);
    }
  };

  const getMemberDesc = () => {
    if (memberInfo.type === 2) {
      return `到期时间：${memberInfo.deadline}`
    }
    if (memberInfo.type === 3) {
      return '您的会员已过期'
    }
    return '您还未开通会员'
  };

  /**
   * 触摸开始
   * @param e
   */
  const touchStartHandler = (e: any) => {
    setStartX(e.targetTouches[0].clientX);
  };

  /**
   * 触摸结束
   * @param e
   */
  const touchEndHandler = (e: any) => {
    const endX: number = e.changedTouches[0].clientX;
    const difference: number = endX - startX;
    if (Math.abs(difference) > 50) {
      if (difference > 0) {
        if ( cardIndex > 0 ) {
          setCardIndex(state => state - 1);
        } else {
          setCardIndex(productList.length - 1);
        }
      } else {
        if ( cardIndex < productList.length - 1 ) {
          setCardIndex(state => state + 1);
        } else {
          setCardIndex(0);
        }
      }
    }
  };

  const getHandleScroll = () => {
    let flag: boolean = true;

    return () => {
      if (flag) {
        flag = false;
        setTimeout(() => {
          flag = true;
          if (btnRef && btnRef.current) {
            const { top, bottom } = btnRef.current.getBoundingClientRect();
            // 安全完全露出 且要处在屏幕后1/3部分才隐藏底部支付按钮
            if (top > getScreenHeight() * 2 / 3 && bottom < getScreenHeight()) {
              setShowFooter(false);
            } else {

              setShowFooter(true);
            }
          }
        }, 200)
      }
    }
  };

  useEffect(() => {
    if (canCheckOut) {
      setVisible(true);
    }
  }, [canCheckOut]);

  useEffect(() => {
    getActivityDetail();
    getProductList();
  }, []);

  return (
    <div className={style.wrap}>
      <div className={style.scrollWrap} onScroll={getHandleScroll()}>
        <div
          style={{ backgroundImage: `url('${bannerImgUrl}')`, backgroundColor: bgColor }}
          className={style.scrollContent}
        >
          <header className={style.header}>
            <div className={style.userWrap}>
              <img
                className={style.avatar}
                src={userInfo.headimgurl || require('src/assets/images/avatar.png')}
                alt=""
                onClick={() => {
                  history.push('/userCenter');
                }}
              />
              <div className={style.userInfo}>
                <div className={style.userName}>{userInfo.nickName}</div>
                <div className={style.memberDesc}>{getMemberDesc()}</div>
              </div>
            </div>
            <div className={style.ruleBtn} onClick={() => {
              history.push('/rule');
            }}>活动规则</div>
            <div className={classNames(style.ruleBtn, style.userCenter)} onClick={() => {
              history.push('/userCenter');
            }}>个人中心</div>
            {
              canCheckOut && (
                <div className={classNames(style.ruleBtn, style.switchMember)} onClick={() => {
                  history.push("/chooseMember?fromPage=会员联合购主页");
                }}>切换会员</div>
              )
            }
          </header>
          <p className={style.switchDesc}>
            *开通后每月可在三种会员中任选一种，若当月无选，
            <br/>
            不可补领且默认选择与上月相同会员
          </p>
          <ul
            ref={btnRef}
            className={style.productWrap}
            onTouchStart={touchStartHandler}
            onTouchEnd={touchEndHandler}
          >
            {
              productList.map((item: Product, index: number) => (
                <li key={item.productCode} className={classNames(style.productItem, {
                  [style.currentCard]: index === cardIndex,
                  [style.leftCard]: index === cardIndex - 1 || cardIndex === 0 && productList.length > 2 && index === productList.length - 1,
                  [style.rightCard]: index === cardIndex + 1 || cardIndex === productList.length - 1 && index === 0 && productList.length > 2,
                  [style.hideCard]: index !== cardIndex,
                  [style.monthCard]: +item.type === 3,
                  [style.seasonCard]: +item.type === 2,
                  [style.yearCard]: +item.type === 1,
                })}>
                  <div className={style.discount}>限时{Number.parseFloat((item.price * 10 / item.originPrice).toFixed(1))}折</div>
                  <div className={style.productName}>{item.productName}</div>
                  <div className={style.price}>
                    <span className={style.unit}>￥</span>
                    {item.price / 100}
                  </div>
                  <div className={style.originPrice}>原价￥{item.originPrice / 100}</div>
                  <button
                    disabled={memberInfo.type === 2}
                    className={style.buyBtn}
                    ref={btnRef}
                    onClick={() => {
                      openMember();
                    }}
                  >立即开通</button>
                </li>
              ))
            }
          </ul>
          <section className={style.moduleWrap}>
            <div className={style.moduleTitle}>
              <img className={style.leftLogo} src={require('src/assets/images/leftLogo.png')} alt=""/>
              这些好剧，会员抢先看
              <img className={style.rightLogo} src={require('src/assets/images/rightLogo.png')} alt=""/>
            </div>
            <div className={classNames(style.contentWrap, style.movieContent)}>
              <div className={style.movieWrap}>
                <ul className={style.movieList}>
                  {
                    adsList.map((item: any) => (
                      <li className={style.movieItem} key={item.id}>
                        <div className={style.coverWrap}>
                          <img className={style.titleImg} src={item.adImgUrl} alt=""/>
                        </div>
                        <div className={style.nameWrap}>
                          <Carousel>
                            <div className={style.movieName}>{item.adName}</div>
                          </Carousel>
                        </div>
                      </li>
                    ))
                  }
                </ul>
              </div>
            </div>
          </section>
          <section className={style.moduleWrap}>
            <div className={style.moduleTitle}>
              <img className={style.leftLogo} src={require('src/assets/images/leftLogo.png')} alt=""/>
              会员特权
              <img className={style.rightLogo} src={require('src/assets/images/rightLogo.png')} alt=""/>
            </div>
            <div className={classNames(style.contentWrap, style.privilegeTxContent)}>
              <ul className={style.privilegeList}>
                {
                  txPrivilege.map((item: Image) => (
                    <li className={style.privilegeItem} key={item.id}>
                      <img className={style.privilegeImg} src={item.img} alt=""/>
                      <div className={style.privilegeName}>{item.name}</div>
                    </li>
                  ))
                }
              </ul>
            </div>
          </section>
          <section className={classNames(style.moduleWrap, style.seriesModule)}>
            <div className={classNames(style.contentWrap, style.privilegeYkContent)}>
              <ul className={style.privilegeList}>
                {
                  ykPrivilege.map((item: Image) => (
                    <li className={style.privilegeItem} key={item.id}>
                      <img className={style.privilegeImg} src={item.img} alt=""/>
                      <div className={style.privilegeName}>{item.name}</div>
                    </li>
                  ))
                }
              </ul>
            </div>
          </section>
          <section className={classNames(style.moduleWrap, style.seriesModule)}>
            <div className={classNames(style.contentWrap, style.privilegeMgContent)}>
              <ul className={style.privilegeList}>
                {
                  mgPrivilege.map((item: Image) => (
                    <li className={style.privilegeItem} key={item.id}>
                      <img className={style.privilegeImg} src={item.img} alt=""/>
                      <div className={style.privilegeName}>{item.name}</div>
                    </li>
                  ))
                }
              </ul>
            </div>
          </section>
          <section className={style.moduleWrap}>
            <div className={style.moduleTitle}>
              <img className={style.leftLogo} src={require('src/assets/images/leftLogo.png')} alt=""/>
              操作步骤
              <img className={style.rightLogo} src={require('src/assets/images/rightLogo.png')} alt=""/>
            </div>
            <div className={classNames(style.contentWrap, style.stepContent)}>
              <img className={style.stepImg} src={require('src/assets/images/step.png')} alt=""/>
              <ul className={style.stepList}>
                <li className={style.stepItem}>支付购买年包</li>
                <li className={style.stepItem}>填写充值账号</li>
                <li className={style.stepItem}>选择首月<br/>开通会员</li>
                <li className={style.stepItem}>每月选择<br/>切换会员</li>
              </ul>
            </div>
          </section>
          <section className={style.moduleWrap}>
            <div className={style.moduleTitle}>
              <img className={style.leftLogo} src={require('src/assets/images/leftLogo.png')} alt=""/>
              扫码入群
              <img className={style.rightLogo} src={require('src/assets/images/rightLogo.png')} alt=""/>
            </div>
            <div className={classNames(style.contentWrap, style.groupContent)}>
              <p className={style.groupDesc}>
                入群福利1：使用问题在线及时解决
                <br/>
                入群福利2：优惠福利活动群内首发
                <br/>
              </p>
              <img className={style.qrImg} src={qrUrl} alt=""/>
            </div>
          </section>
          <img className={style.cloudBg} src={require("src/assets/images/cloud_bg.png")} alt=""/>
        </div>
      </div>
      {
        <div className={style.payFooter} style={{ display: showFooter && memberInfo.type !== 2 ? 'flex' : 'none' }}>
          <div className={style.payLeft}>
            合计
            <span className={style.price}>￥{productInfo.price / 100}</span>
            <span className={style.originPrice}>￥{productInfo.originPrice / 100}</span>
          </div>
          <div className={style.payRight} onClick={() => {
            openMember();
          }}>确认支付</div>
        </div>
      }
      <Modal
        visible={visible}
        onClose={() => setVisible(false)}
      >
        <div className={style.chooseDesc}>本月还有一次会员选择机会未使用</div>
        <div className={style.btnWrap}>
          <span className={style.cancelBtn} onClick={() => {
            setVisible(false);
          }}>返回</span>
          <span className={style.okBtn} onClick={() => {
            setVisible(false);
            history.push("/chooseMember");
          }}>去使用</span>
        </div>
      </Modal>
    </div>
  )
};

export default Index;
