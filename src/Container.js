import Header from "./Header";
import Map from "./map/CustomMap";
import React, {useEffect, useState} from "react";
import {Box} from "@material-ui/core";

export default function Container() {

    const URL_FULL = "https://storage.googleapis.com/covidwentthere_mock/query.json"
    const URL_DAILY = "https://storage.googleapis.com/covidwentthere_mock/daily.json"
    const [allData, setAllData] = useState()
    const [dailyData, setDailyData] = useState()
    const [displayData, setDisplayData] = useState()

    useEffect(() => {
        fetch(URL_FULL, {
            method: 'GET'
        }).then(res => res.json())
            .then(response => {
                setAllData(response)
                setDisplayData(response.data)
                fetchDailyCases()
            })
    }, [])

    function fetchDailyCases() {
        fetch(URL_DAILY, {
            method: 'GET'
        }).then(res => res.json())
            .then(response => {
                setDailyData(response)
            })
    }

    function updateDisplay(index) {
        if (index === 14) {
            setDisplayData(allData.data)
        } else {
            setDisplayData(dailyData[index])
        }
    }

    return (
        <Box display={"flex"} flexDirection={"column"} style={{position: "relative"}}>
            <Box>
                <Header/>
            </Box>
            <Box flexGrow={1}>
                <Map
                    data={displayData ? displayData : []}
                    timestamp={allData?.timestamp}
                    daily={dailyData ? dailyData : []}
                    updateDisplay={updateDisplay}/>
            </Box>
        </Box>
    )
}

export const clusterSize = 5
export const CAPS = true
export const NO_CAPS = false
export const clusterSizeInWords = (cap) => {
    if (clusterSize === 10) {
        if (cap === CAPS) {
            return "Ten"
        }
        return "ten"
    } else {
        if (cap === CAPS) {
            return "Five"
        }
        return "five"
    }
}