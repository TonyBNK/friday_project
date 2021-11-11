import React, {CSSProperties, useEffect, useMemo, useState} from 'react';

export type InputData = [string, (value: string) => void];

type InputMapType = {
    inputData?: InputData[];
    setSaveInputs: (fObject: {f: () => void}) => void

    inputStyles?: CSSProperties;
}

export const InputMap: React.FC<InputMapType> = (
    {
        inputData,
        setSaveInputs,

        inputStyles,
    }
) => {
    const defAnswersData = useMemo(() => {
        return inputData ? inputData.map((iD, i) => ({id: i, value: iD[0], setValue: iD[1]})) : [];
    }, []);
    const [modalInputData, setModalInputData] = useState(defAnswersData);

    const setInputData = (id: number, value: string) => {
        setModalInputData(modalInputData.map(iD => iD.id === id ? {...iD, value} : iD));
    };
    useEffect(() => {
        setSaveInputs({f: successCloseModal});
    }, [modalInputData]);

    const successCloseModal = () => {
        for (const iD of modalInputData) iD.setValue(iD.value);
    };

    return (
        <>
            {modalInputData.map(iD => (
                <input
                    key={iD.id}
                    value={iD.value}
                    style={{...inputStyles}}
                    onChange={e => setInputData(iD.id, e.currentTarget.value)}
                />
            ))}
        </>
    );
};
