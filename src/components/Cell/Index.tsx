/**
 * @Author lester
 * @Date 2021-01-22
 */

import React, { ReactNode } from "react";
import classNames from "classnames";
import style from './style.module.less';

interface IndexProps {
  iconUrl?: any;
  label: ReactNode;
  onCellClick?: () => void;
  className?: string;
  hideArrow?: boolean;
  right?: ReactNode;
}

const Index: React.FC<IndexProps> = ({ iconUrl, label, hideArrow, right, onCellClick, className }) => {

  return (
    <div className={classNames(style.cellWrap, className)} onClick={() => onCellClick && onCellClick()}>
      <div className={style.cellLeft}>
        <div className={style.iconWrap}>
          {
            iconUrl && <img className={style.cellIcon} src={iconUrl} alt=""/>
          }
        </div>
        <span className={style.cellLabel}>{label}</span>
      </div>
      <div className={style.cellRight}>
        {
          right
        }
        {
          !hideArrow && <img className={style.rightIcon} src={require("src/assets/images/right-arrow.png")} alt=""/>
        }
      </div>
    </div>
  )
};

export default Index;
