import React from "react";
import {Button, Grid, Grow, Paper} from "@material-ui/core";
import fontawesome from '@fortawesome/fontawesome'
import {faVirus, faViruses, faCircle} from "@fortawesome/free-solid-svg-icons"

fontawesome.library.add({faVirus, faViruses, faCircle})

export default function Legend() {
    const [checked, setChecked] = React.useState(true);

    const handleChange = () => {
        setChecked((prev) => !prev);
    };

    return (
        <Grid className={"legend-container"} container direction={"row-reverse"} xs={12} justify={"center"}
              alignItems={"center"}
              style={{height: "120px", width: "200px"}}>
            <Grid item onClick={() => {
                handleChange(checked)
            }}>
                <Paper square className={"legend-toggle"}>
                    <Button disableRipple>Legend</Button>
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
                               }}/> <span style={{verticalAlign: "top"}}>More than five</span>
                        </Grid>
                        <Grid item>
                            <i className={"fas fa-virus"}
                               style={{
                                   width: "1.25em",
                                   height: "1.25em",
                                   marginLeft: "6px",
                                   marginRight: "6px"
                               }}/> <span style={{verticalAlign: "top"}}>Five or less</span>
                        </Grid>
                    </Grid>
                </Paper>
            </Grow>
        </Grid>
    )
}