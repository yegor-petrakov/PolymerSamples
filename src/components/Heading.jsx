import React from 'react'

const Heading = ({ level, headingText }) => {

    if (level === 1) {
        return (
            <h1 className="scroll-m-20 text-xl font-semibold tracking-tight">
                {headingText}
            </h1>
        )
    }
}

export default Heading