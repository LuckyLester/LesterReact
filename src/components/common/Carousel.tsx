/**
 * @Author lester
 * @Date 2020-07-28
 */

import React, { useState, useRef, useEffect, MutableRefObject } from "react";
import classNames from "classnames";
import style from './style.module.less';

const Index: React.FC = ({ children }) => {
  const [isNeed, setIsNeed] = useState(false);
  const wrapRef: MutableRefObject<HTMLDivElement|any>  = useRef();
  const contentRef: MutableRefObject<HTMLDivElement|any>  = useRef();

  useEffect(() => {
    setIsNeed(contentRef.current.offsetWidth - wrapRef.current.offsetWidth > 0);
  }, []);

  return (
    <div className={style.carouselWrap} ref={wrapRef}>
      <div className={classNames(style.carouselContent, {
        [style.carouselScroll]: isNeed
      })}>
        <span className={style.contentText} ref={contentRef}>{children}</span>
        {
          isNeed && <span className={style.contentText}>{children}</span>
        }
      </div>
    </div>
  )
};

export default Index;
