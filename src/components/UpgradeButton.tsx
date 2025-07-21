import React from 'react'
import LinkButton from './ui/LinkButton'

const UpgradeButton = () => {
    return (
        <div className='flex flex-col rounded-t-lg bg-gray-100/50 min-h-16 text-center align-text-bottom'>
            <div>
                Upgrade to get the most out of it
            </div>
            <LinkButton
                href='/billing'
                bg={"#ffffff"}
                color='#000000'
                content={"Upgrade"}
            />
        </div>
    )
}

export default UpgradeButton