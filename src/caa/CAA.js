import {Box, Grid, Grow, IconButton, Paper, Typography} from "@material-ui/core";
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
                    <Grid container direction={"row"} style={{height: "100%", padding: "8px"}}
                          justify={"center"} alignItems={"center"}>
                        <Grid item xs={9}>
                            <Box>
                                <Typography variant={"subtitle1"}>Where <em>covid</em> visited</Typography>
                                <Typography variant={"subtitle2"} style={{marginTop: "4px", marginBottom: "4px", lineHeight: "150%"}}>
                                    Updated as of {caa}
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={1}>
                            <IconButton onClick={() => setDisplay(false)}
                                        style={{padding: "4px"}}><CloseIcon/></IconButton>
                        </Grid>
                    </Grid>
                </Paper>
            </Grow>
        </Grid>
    )
}