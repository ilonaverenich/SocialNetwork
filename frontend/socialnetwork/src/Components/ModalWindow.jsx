import React,{useState} from 'react'
import { Input, Button, Modal } from 'antd';
import {useSelector, useDispatch} from 'react-redux';
import { setVisibleModal } from '../redux/mainReducer';



function ModalWindow({data}) {
const dispatch = useDispatch()
const isVisibleModal = useSelector((store) => store.data.isVisibleModal);

 /*    const showModal = () => {
      dispatch(setVisibleModal(true))
      }; */
    
      const handleCancel = () => {
      dispatch(setVisibleModal(false))
      };
         
  return (
    <Modal
        className='ant-modal'
        visible={isVisibleModal}
        closable={true}
        onCancel={handleCancel}
        footer={null} >
        <img width='70%' src={`http://localhost:1000/${data && data.image}`}  alt="" />
  </Modal>
  )
}

export default ModalWindow