import {Grid, Grow, IconButton, Paper} from "@material-ui/core";
import React from "react";
import CloseIcon from '@material-ui/icons/Close';
import PanelDateRow from "./PanelDateRow";

export default function InfoPanel(params) {

    const hide = () => {
        params.reset(null)
    };

    let info = params.data
    console.log(info)

    return (
        <Grid className={"panel-container"} container direction={"row-reverse"} xs={12} justify={"center"}
              alignItems={"center"}
              style={{width: "320px"}}>
            <Grow style={{transformOrigin: "right"}} in={info !== null}>
                <Paper square elevation={1} className={"panel-content"}>
                    <Grid container direction={"column"} style={{height: "100%", padding: "6px"}}
                          justify={"flex-start"}>
                        <Grid container direction={"row"}>
                            <Grid item xs={11}><h4
                                style={{marginTop: "8px", marginBottom: "8px"}}>{info?.location ?? ""}</h4></Grid>
                            <Grid item xs={1}>
                                {/*<FontAwesomeIcon onClick={() => hide()} pull={"right"} icon={"times"} size={"lg"}/>*/}
                                <IconButton onClick={() => hide()} style={{padding: "4px"}}><CloseIcon/></IconButton>
                            </Grid>
                        </Grid>
                        <p style={{marginTop: "0px"}}>{info?.address ?? ""}</p>
                        {info?.visits.map(visit => {
                            return (
                                <PanelDateRow data={visit}/>
                            )
                        })}
                    </Grid>
                </Paper>
            </Grow>
        </Grid>
    )
}