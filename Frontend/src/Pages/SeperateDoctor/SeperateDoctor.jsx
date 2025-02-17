import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'  // Import useParams

export const SeperateDoctor = () => {
    const { word2 } = useParams()  // Get the dynamic URL parameter
    console.log("Extracted word2:", word2)

    const fetchData = async () => {
        try {
            if (!word2) {
                console.warn("word2 is empty or undefined")
                return
            }

            const response = await fetch(`http://127.0.0.1:8000/doctor/${word2}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`)
            }

            const text = await response.text()
            if (!text) {
                console.warn("Empty response received")
                return
            }

            const data = JSON.parse(text)
            console.log("Fetched data:", data)
            console.log("Fetched data:", data.Name)
        } catch (error) {
            console.error("Fetch error:", error)
        }
    }

    useEffect(() => {
        fetchData()
    }, [word2])

    return <div>SeperateDoctor - {word2}</div>
}
