import React from "react";
import {ModalContainer} from "../../common/Modal/ModalContainer";
import {ModalInputContainer} from "../../common/Modal/input/ModalInputContainer";
import {ModalMessageContainer} from "../../common/Modal/message/ModalMessageContainer";
import {ModalMessageStackContainer} from "../../common/Modal/message/ModalMessageStackContainer";
import {ModalQuestionContainer} from "../../common/Modal/question/ModalQuestionContainer";
import {ModalUp} from "../../common/Modal/up/ModalUp";


export const ModalsPage = () => {
  return(
      <div
          style={{
              display: 'flex',
              flexFlow: 'column',
              alignItems: 'center',
              justifyContent: 'center',
          }}
      >
          <div style={{height: '40vh'}}/>

          <ModalContainer/>
          <ModalQuestionContainer/>
          <ModalInputContainer/>
          <ModalMessageContainer/>
          <ModalMessageStackContainer/>
          <ModalUp/>

          <div style={{height: '300vh'}}/>
      </div>
  )
}