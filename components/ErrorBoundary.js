'use client'

import { useEffect } from 'react'

export default function ErrorBoundary({
    error,
    reset,
}) {
    useEffect(() => {
        console.error(error)
    }, [error])

    return (
        <div>
            <h2>Something went wrong!</h2>
            <button onClick={() => reset()}>Try again</button>
        </div>
    )
}