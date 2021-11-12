import React, {ReactNode, useState} from 'react';
import {InputData, InputMap} from "./InputMap";
import {Modal} from "../Modal";
import c from "./ModalInput.module.scss";


export type ConfirmFunctionType = {
    card?: (question: string, answer: string) => void
    pack?: (packName: string) => void
    none?: () => void
}
type ModalInputType = {
    show: boolean;
    close: () => void;

    inputData?: Array<InputData>;
    answer?: string;
    setAnswer?: (answer: string) => void;
    button?: ReactNode;

    enableBackground?: boolean;
    backgroundOnClick?: () => void;

    width: number;
    height: number;
    modalOnClick?: () => void;

    confirm: ConfirmFunctionType
    // confirm: (question?: string, answer?: string) => void
}

export const ModalInput: React.FC<ModalInputType> = (
    {
        inputData,
        answer,
        setAnswer = (answer: string) => {
        },

        button = 'OK',

        enableBackground,
        backgroundOnClick = () => {
        },

        width,
        height,
        modalOnClick = () => {
        },

        show,
        close,
        children,

        confirm
    }
) => {
    const [answerData, setAnswerData] = useState(answer);
    const [saveInputs, setSaveInputs] = useState({
        f: () => {
        }
    });

    const successCloseModal = () => {
        saveInputs.f();
        setAnswer(answerData || '');
        setSaveInputs({
            f: () => {
            }
        });
        close();
    };

    return (
        <Modal
            enableBackground={enableBackground}
            backgroundOnClick={() => {
                setAnswerData(answer);
                backgroundOnClick()
            }}

            width={width}
            height={height}
            modalOnClick={modalOnClick}

            show={show}
        >
            {children ? children : 'question Modal'}
            <div className={c.modalInputContainer}>
                {answer !== undefined && (
                    <input
                        value={answerData}
                        onChange={e => setAnswerData(e.currentTarget.value)}
                    />
                )}
                <InputMap
                    inputData={inputData}
                    setSaveInputs={setSaveInputs}
                    confirm={confirm}
                />
            </div>
            <button onClick={successCloseModal}>{button}</button>
        </Modal>
    );
};
