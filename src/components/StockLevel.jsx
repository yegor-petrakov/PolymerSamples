import React from 'react'

const StockLevel = ({ stockLevel }) => {

    if (stockLevel === 'empty') {
        return (
            <small className="bg-slate-100 px-2 py-1 rounded-full border border-slate-300 text-xs text-slate-400 font-medium leading-none">
                Пусто
            </small>
        )
    } else if (stockLevel === 'low') {
        return (
            <small className="bg-red-100 px-2 py-1 rounded-full border border-red-300 text-xs text-red-400 font-medium leading-none">
                Заканчивается
            </small>
        )
    } else if (stockLevel === 'enough') {
        return (
            <small className="bg-emerald-100 px-2 py-1 rounded-full border border-emerald-300 text-xs text-emerald-400 font-medium leading-none">
                Достаточно
            </small>
        )
    }
}

export default StockLevel