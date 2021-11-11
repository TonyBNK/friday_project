import React, {useEffect, useState} from 'react';
import {Modal} from "../Modal";


type ModalUpType = {
    speed?: number
}

export const ModalUp: React.FC<ModalUpType> = ({speed = 10}) => {
    const [show, setShow] = useState(false);

    const handleScroll = () => {
        if (window.scrollY > 300) setShow(true);
        else setShow(false);
    };

    const scroll = () => {
        const step = window.scrollY / speed;
        let lastState = window.scrollY;

        const innerTimer = setInterval(() => {
            if (lastState < window.scrollY) clearInterval(innerTimer);
            lastState = window.scrollY;

            window.scroll(0, lastState - step);
            if (window.scrollY === 0) clearInterval(innerTimer);
        }, 50);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <Modal
                enableBackground={false}

                width={70}
                height={50}
                modalOnClick={scroll}
                modalStyle={{
                    top: '80vh',
                    left: '20px'
                }}

                show={show}
            >
                Up
            </Modal>
        </>
    );
};
