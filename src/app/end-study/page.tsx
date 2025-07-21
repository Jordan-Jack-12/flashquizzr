import { redirect } from 'next/navigation'
import React from 'react'

const EndStudy = () => {
    redirect("/study")
    return (
        <div>EndStudy</div>
    )
}

export default EndStudy