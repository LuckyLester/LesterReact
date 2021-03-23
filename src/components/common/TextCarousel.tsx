/**
 * @Author lester
 * @Date 2020-07-20
 */

import React from "react";
import style from './style.module.less';

interface IndexProps {

}

interface IndexState {
  animateDistance: number;
}

export default class extends React.Component<IndexProps, IndexState> {

  state = {
    animateDistance: 0,
  };

  wrapRef: any;
  textRef: any;
  private timer: number | undefined;

  /**
   * 开始移动
   * @param distance
   * @private
   */
  _startAnimation(distance: number) {

    /**
     * 计算-累加移动距离
     */
    const calcDistance = () => {
      const animateDistance = this.state.animateDistance + 1;
      if (animateDistance > distance) {
        this.setState({
          animateDistance: 0,
        });
      } else {
        this.setState({
          animateDistance
        });
      }
      this.timer = window.setTimeout(calcDistance, animateDistance >= distance ? 1000 : 20);
    };
    this.timer = window.setTimeout(calcDistance, 20);
  }

  componentDidMount(): void {
    if ( this.timer ) {
      window.clearTimeout(this.timer);
    }
    // 超出移动
    const distance: number = this.textRef.clientWidth - this.wrapRef.clientWidth;
    if (distance > 0) {
      this._startAnimation(distance)
    }
  }

  componentWillUnmount(): void {
    if ( this.timer ) {
      window.clearTimeout(this.timer);
    }
  }

  render() {
    const { children } = this.props;
    const { animateDistance } = this.state;

    return (
      <div className={style.carouselWrap} ref={(ele) => this.wrapRef = ele}>
        <div
          style={{
            transform: `translateX(-${animateDistance}px)`
          }}
          className={style.carouselText}
          ref={(ele) => this.textRef = ele}
        >
          {children}
        </div>
      </div>
    )
  }
}
