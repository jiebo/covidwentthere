import Carousel from "react-material-ui-carousel";
import React from "react";
import HistoryIcon from '@material-ui/icons/History';
import {Grid, IconButton, Paper, Typography} from "@material-ui/core";
import {ChevronLeft, ChevronRight} from "@material-ui/icons";
import useWindowDimensions from "../hooks/WindowDimensions";

let dateFormat = require("dateformat");

export default function DateCarousel(params) {
    const [index, setIndex] = React.useState(params.data.length - 1)
    const {width} = useWindowDimensions()

    let bottom = "140px"
    if (width < 600) {
        bottom = "20px"
    }

    const reset = () => {
        setIndex(14)
    };

    const data = params.data ? params.data : []
    const caa = new Date(params.caa)
    const items = []
    for (let index in data) {
        let date = new Date().setDate(caa.getDate() - index)
        items.push(dateFormat(date, "d mmm"))
    }
    items.reverse()
    if (items.length >= 15) {
        items[14] = items[14] ? "Past 2 weeks" : null
    }

    return (
        <Grid className={"slider-container"} container direction={"row-reverse"} justify={"center"}
              alignItems={"center"}
              style={{height: "40px", width: "220px", bottom: bottom}}>
            <Grid item onClick={() => {
                reset()
            }}>
                <Paper square className={"slider-toggle"}>
                    <IconButton style={{margin: "4px", padding: "4px"}} disableRipple>
                        <HistoryIcon/>
                    </IconButton>
                </Paper>
            </Grid>
                <Paper square elevation={1} className={"slider-content"}>
                    <Grid container direction={"row"} style={{height: "100%"}}
                          justify={"center"} alignItems={"center"}>
                        <Grid item xs={12}>
                            <Carousel
                                className={"slider-content"}
                                autoPlay={false}
                                animation={"slide"}
                                indicators={false}
                                index={index >= 0 ? index : 14}
                                navButtonsAlwaysVisible={true}
                                onChange={(index, active) => {
                                    params?.updateDisplay(index)
                                    setIndex(index)
                                }}
                                navButtonsProps={{
                                    style: {
                                        padding: "4px",
                                        margin: "4px 0px",
                                        color: "#333",
                                        background: "transparent"
                                    }
                                }}
                                navButtonsWrapperProps={{
                                    style: {}
                                }}
                                NextIcon={<ChevronRight/>}
                                PrevIcon={<ChevronLeft/>}>
                                {items.map((item, i) => <Item key={i} date={item}/>)}
                            </Carousel>
                        </Grid>
                    </Grid>
                </Paper>
        </Grid>
    )
}

function Item(props) {
    return (
        <Typography align={"center"} style={{fontSize: "15px", height: "40px", lineHeight: "40px"}}
                    noWrap>{props.date}</Typography>
    )
}