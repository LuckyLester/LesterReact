/**
 * @Author lester
 * @Date 2020-07-28
 */

import React, { ButtonHTMLAttributes } from "react";
import classNames from "classnames";
import style from './style.module.less';


const Index: React.FC<ButtonHTMLAttributes<any>> = ({ children, className, ...props }) => {

  return (
    <button {...props} className={classNames(style.commonBtn, className)}>{children}</button>
  )
};

export default Index;
