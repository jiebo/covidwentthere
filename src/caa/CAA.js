import {Grid, Grow, IconButton, Paper} from "@material-ui/core";
import React, {useState} from "react";
import CloseIcon from "@material-ui/icons/Close";

var dateFormat = require("dateformat");

export default function CAA(params) {
    const caa = dateFormat(Date(params.caa), "dd mmm yy")

    const [display, setDisplay] = useState(true)

    return (
        <Grid className={"caa-container"} container direction={"row-reverse"} xs={12} justify={"center"}
              alignItems={"center"}
              style={{width: "240px"}}>
            <Grow in={display && params.show && params.caa}>
                <Paper square elevation={1} className={"caa-content"}>
                    <Grid container direction={"row"} style={{height: "100%", padding: "6px"}}
                          justify={"center"} alignItems={"center"}>
                        <Grid item xs={10}>
                            <h4 style={{marginTop: "8px", marginBottom: "8px"}}>
                                Updated as of {caa}
                            </h4>
                        </Grid>
                        <Grid item xs={1}>
                            <IconButton onClick={() => setDisplay(false)} style={{padding: "4px"}}><CloseIcon/></IconButton>
                        </Grid>
                    </Grid>
                </Paper>
            </Grow>
        </Grid>
    )
}