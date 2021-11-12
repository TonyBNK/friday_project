import React, {ReactNode} from 'react';
import {Modal} from "../Modal";
import c from "./ModalQuestion.module.scss";


type ModalQuestionType = {
    show: boolean;

    setTrue: () => void;
    setFalse: () => void;
    buttonTrue?: ReactNode;
    buttonFalse?: ReactNode;

    enableBackground?: boolean;
    backgroundOnClick?: () => void;

    width: number;
    height: number;
    modalOnClick?: () => void;
}

export const ModalQuestion: React.FC<ModalQuestionType> = (
    {
        setTrue,
        setFalse,
        buttonTrue = 'Yes',
        buttonFalse = 'No',

        enableBackground,
        backgroundOnClick = () => {
        },

        width,
        height,
        modalOnClick = () => {
        },

        show,
        children,
    }
) => {

    return (
        <Modal
            enableBackground={enableBackground}
            backgroundOnClick={backgroundOnClick}

            width={width}
            height={height}
            modalOnClick={modalOnClick}

            show={show}
        >
            {children ? children : 'question Modal'}
            <div className={c.modalQuestionContainer}>
                <button onClick={setFalse}>
                    {buttonFalse}
                </button>
                <button onClick={setTrue}>
                    {buttonTrue}
                </button>
            </div>
        </Modal>
    );
};
