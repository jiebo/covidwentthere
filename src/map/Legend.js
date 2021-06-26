import React from "react";
import {Button, Grid, Grow, Paper, Tooltip} from "@material-ui/core";
import fontawesome from '@fortawesome/fontawesome'
import {faVirus, faViruses, faCircle} from "@fortawesome/free-solid-svg-icons"
import useWindowDimensions from "../hooks/WindowDimensions";
import {CAPS, clusterSizeInWords, NO_CAPS} from "../Container";

fontawesome.library.add({faVirus, faViruses, faCircle})

export default function Legend() {
    const {width} = useWindowDimensions()
    const [checked, setChecked] = React.useState(true);
    const [tooltip, setTooltip] = React.useState(width < 600)

    let bottom = "20px"
    if (width < 600) {
        bottom = "60px"
    }

    const handleChange = () => {
        setChecked((prev) => !prev || width >= 600);
        setTooltip(false)
    };

    return (
        <Grid className={"legend-container"} container direction={"row-reverse"} justify={"center"}
              alignItems={"center"}
              style={{height: "120px", width: "220px", bottom: bottom}}>
            <Grid item onClick={() => {
                handleChange(checked)
            }}>
                <Paper square className={"legend-toggle"}>
                    <Tooltip title={"Click to hide"} placement={"top"} arrow open={tooltip}>
                        <Button disableRipple>Legend</Button>
                    </Tooltip>
                </Paper>
            </Grid>
            <Grow style={{transformOrigin: "right"}} in={checked}>
                <Paper square elevation={1} className={"legend-content"}>
                    <Grid container direction={"column"} style={{height: "100%", padding: "6px"}}
                          justify={"space-around"}>
                        <Grid item>
                            <i className={"fas fa-adjust"}
                               style={{
                                   width: "1.5em",
                                   height: "1.5em",
                                   marginLeft: "4px",
                                   marginRight: "4px"
                               }}/> <span style={{verticalAlign: "top"}}>Visits in vicinity</span>

                        </Grid>
                        <Grid item>
                            <i className={"fas fa-viruses fa-rotate-180"}
                               style={{
                                   width: "1.5em",
                                   height: "1.5em",
                                   marginLeft: "4px",
                                   marginRight: "4px", color: "#d32d26"
                               }}/> <span style={{verticalAlign: "top"}}>More than {clusterSizeInWords(NO_CAPS)} visits</span>
                        </Grid>
                        <Grid item>
                            <i className={"fas fa-virus"}
                               style={{
                                   width: "1.25em",
                                   height: "1.25em",
                                   marginLeft: "6px",
                                   marginRight: "6px"
                               }}/> <span style={{verticalAlign: "top"}}>{clusterSizeInWords(CAPS)} or less visits</span>
                        </Grid>
                    </Grid>
                </Paper>
            </Grow>
        </Grid>
    )
}