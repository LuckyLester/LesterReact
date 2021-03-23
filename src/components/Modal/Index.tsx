/**
 * @Author lester
 * @Date 2021-01-25
 */

import React from "react";
import { Modal, } from 'antd-mobile';
import style from './style.module.less';

interface IndexProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  showCloseIcon?: boolean;
}

const Index: React.FC<IndexProps> = ({ children, onClose, title, showCloseIcon,...props }) => {

  return (
    <Modal transparent maskClosable={false} onClose={onClose} {...props} className={style.modalWrap}>
      <div onTouchMove={event => {
        event.preventDefault();
      }}>
        <div className={style.title}>{title}</div>
        {children}
      </div>
      {
        showCloseIcon && <img className={style.closeIcon} src={require('src/assets/images/pop_ic_close2.png')} alt="" onClick={() =>  onClose()}/>
      }
    </Modal>
  )
};

export default Index;
