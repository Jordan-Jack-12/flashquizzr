"use client";

import React from 'react';

type ButtonType = {
    content: string | React.ReactNode,
    bg: string
    onClick: () => void,
}

const Button = (props : ButtonType) => {
    return (
        <button
        className={`px-4 py-2 rounded-lg text-orange-950 text-base font-semibold cursor-pointer button_gradient`}
        onClick={props.onClick}
        >
            {props.content}
        </button>
    )
}

export default Button