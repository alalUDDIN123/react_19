import { useEffect, useState } from "react"


const DateTime = () => {
    const [dateTime, setdataTime] = useState(null)

    useEffect(() => {
        const clearIntervalId = setInterval(() => {
            const currentdata = new Date();
            const formatteddate = currentdata.toLocaleDateString()
            const formattedTime = currentdata.toLocaleTimeString()
            setdataTime(`${formatteddate} - ${formattedTime}`)
        }, 1000)

        return () => {
            clearInterval(clearIntervalId)
        }
    }, [])
    return (
        <>
          {dateTime}
        </>
    )
}

export default DateTime