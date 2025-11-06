import GitHubStyleHeatmap from '@/components/statsPage/GridHeatMap'
import React from 'react'


const StatsPage = () => {
    return (
        <main>
            <div className='flex gap-1 items-center py-2 text-stone-400 font-bold'><span>Stats</span></div>
            <GitHubStyleHeatmap />
            <div className='flex justify-around'>
                <h2>Longest Streak: 4</h2>
                <h2>Current Streak: 4</h2>
            </div>
            <div>
                <h2>Total Card Learned: 100</h2>
            </div>
            <div className='grid grid-cols-2'>
                <div>
                    study session graph
                </div>
                <div>
                    quiz session graph
                </div>
            </div>
        </main>
    )
}

export default StatsPage