import Header from "./Header";
import Map from "./map/CustomMap";
import React, {useEffect, useState} from "react";
import {Box} from "@material-ui/core";

export default function Container() {

    const URL_FULL = "https://storage.googleapis.com/covidwentthere_mock/query.json"
    const URL_DAILY = "http://localhost:3001/daily"
    const [allData, setAllData] = useState()
    const [dailyData, setDailyData] = useState()

    useEffect(() => {
        fetch(URL_FULL, {
            method: 'GET'
        }).then(res => res.json())
            .then(response => {
                setAllData(response)
                // fetchDailyCases()
            })
    }, [])

    function fetchDailyCases() {
        fetch(URL_DAILY, {
            method: 'GET'
        }).then(res => res.json())
            .then(response => {
                setDailyData(response)
                console.log(response)
            })
    }

    return (
        <Box display={"flex"} flexDirection={"column"} style={{position: "relative"}}>
            <Box>
                <Header/>
            </Box>
            <Box flexGrow={1}>
                <Map data={allData?.data ? allData.data : []} timestamp={allData?.timestamp}/>
            </Box>
        </Box>
    )
}