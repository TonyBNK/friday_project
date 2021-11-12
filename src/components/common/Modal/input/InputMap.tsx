import React, {useEffect, useMemo, useState} from 'react';
import {ConfirmFunctionType} from "./ModalInput";


export type InputData = [string, (value: string) => void];

type InputMapType = {
    inputData?: InputData[];
    setSaveInputs: (fObject: { f: () => void }) => void
    confirm: ConfirmFunctionType
}

export const InputMap: React.FC<InputMapType> = (
    {
        inputData,
        setSaveInputs,
        confirm
    }
) => {
    const defAnswersData = useMemo(() => {
        return inputData
            ? inputData.map((iD, i) => ({
                id: i,
                value: iD[0],
                setValue: iD[1]
            }))
            : [];
    }, []);
    const [modalInputData, setModalInputData] = useState(defAnswersData);

    const setInputData = (id: number, value: string) => {
        setModalInputData(modalInputData.map(iD => iD.id === id ? {
            ...iD,
            value
        } : iD));
    };
    useEffect(() => {
        setSaveInputs({f: successCloseModal});
    }, [modalInputData]);

    const successCloseModal = () => {
        for (const iD of modalInputData) {
            iD.setValue(iD.value)
        }
        if (modalInputData.length > 1) {
            confirm.card
            && confirm.card(modalInputData[0].value, modalInputData[1].value);
        } else {
            confirm.pack
            && confirm.pack(modalInputData[0].value);
        }
    };

    return (
        <>
            {
                modalInputData.map(iD => (
                    <input
                        key={iD.id}
                        value={iD.value}
                        onChange={e => setInputData(iD.id, e.currentTarget.value)}
                    />
                ))
            }
        </>
    );
};
