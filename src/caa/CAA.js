import {Grid, Grow, IconButton, Paper} from "@material-ui/core";
import React, {useState} from "react";
import CloseIcon from "@material-ui/icons/Close";

var dateFormat = require("dateformat");

export default function CAA(params) {
    const caa = dateFormat(new Date(params.caa), "dd mmm yy")

    const [display, setDisplay] = useState(true)

    return (
        <Grid className={"caa-container"} container direction={"row-reverse"} justify={"center"}
              alignItems={"center"}
              style={{width: "240px"}}>
            <Grow in={display && params.show && params.caa !== 0 && params.zoom <= 12}>
                <Paper square elevation={1} className={"caa-content"}>
                    <Grid container direction={"row"} style={{height: "100%", padding: "6px"}}
                          justify={"center"} alignItems={"center"}>
                        <Grid item xs={9}>
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