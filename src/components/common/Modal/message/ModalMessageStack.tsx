import React, {CSSProperties, ReactNode, useEffect, useState} from 'react';
import {ModalMessage} from "./ModalMessage";


export type StackModalType = {
    id?: number;
    showClose: {
        show: boolean;
        close: () => void;
    };

    startTop?: number;
    endTop?: number;
    time?: number;
    speed?: number;

    enableBackground?: boolean;
    backgroundStyle?: CSSProperties;
    backgroundOnClick?: () => void;

    width: number;
    height: number;
    modalStyle?: CSSProperties;
    modalOnClick?: () => void;
    children?: ReactNode;
}

type ModalMessageStackPropsType = {
    setAddNewModal: (addNewModal: { f: (modal: StackModalType) => void }) => void;

    defEndTop?: number;
    defMiddle?: number;
    defHeight?: number;
}

export const ModalMessageStack: React.FC<ModalMessageStackPropsType> = (
    {
        setAddNewModal,

        defEndTop = 30,
        defMiddle = 20,
        defHeight = 50,
    }
) => {
    const [modals, setModals] = useState<Array<StackModalType>>([]);

    const newId = () => {
        return modals.reduce((acc, m) => acc < (m.id || 0) ? (m.id || 0): acc, 0) + 1;
    };
    const addModal = (modal: StackModalType) => {
        const newModals = modals.filter(mf => mf.showClose.show);
        setModals([
            ...newModals.map((m, i, arr) =>
                ({...m, endTop: (m.endTop || defEndTop) + defMiddle + (i > 0 ? arr[i - 1].height : defHeight)})),
            {...modal, id: !modal.id ? newId() : modal.id}
        ]);
    };

    useEffect(() => {
        setAddNewModal({f: addModal});
    }, [setAddNewModal, modals]);

    return (
        <>
            {modals.map(m => {
                let show = m.showClose.show;
                const close = () => {
                    m.showClose.close();
                };
                return (
                    <ModalMessage
                        key={m.id}
                        {...m}
                        show={show}
                        close={close}
                    >
                        {m.children ? m.children : 'message'}
                    </ModalMessage>
                )
            })}
        </>
    );
};
