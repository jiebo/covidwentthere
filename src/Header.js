import React from "react";
import fontawesome from '@fortawesome/fontawesome'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faViruses, faMap, faSquare} from "@fortawesome/free-solid-svg-icons"
import {Grid} from "@material-ui/core";

fontawesome.library.add(faViruses)
fontawesome.library.add(faMap)
fontawesome.library.add(faSquare)

export default function Header() {
    return (
        <Grid className={"center-container"} container justify={"center"} alignItems={"center"}
              style={{height: "96px"}}>
            <Grid item xs={12} sm={6}>
                <Grid container direction={"row"} justify={"center"} alignItems={"center"}>
                    <FontAwesomeIcon
                        icon="viruses" color={"#333333"} mask={["fas", "map"]} size={"3x"} transform={"shrink-6"}
                        flip={"both"}
                        onClick={() => {
                            window.location.reload()
                        }}/>
                    <h3 style={{margin: "8px 0px", paddingLeft: "4px"}} onClick={() => {
                        window.location.reload()
                    }}>covidwentthere</h3>
                </Grid>
            </Grid>
            <Grid item xs={12} sm={6}>
                <Grid container justify={"center"} alignItems={"center"}>
                    <h3 style={{margin: "0px"}} onClick={() => {
                        window.location.assign("https://www.moh.gov.sg/news-highlights")
                    }}>Data obtained from MOH
                    </h3>
                </Grid>
            </Grid>
        </Grid>
    )
}