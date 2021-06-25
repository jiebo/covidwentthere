import React, {Component} from "react";
import fontawesome from '@fortawesome/fontawesome'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faVirus, faViruses} from "@fortawesome/free-solid-svg-icons"
import {Button} from "@material-ui/core";

fontawesome.library.add(faVirus, faViruses)

class CustomMarker extends Component {

    render() {
        const alpha = Math.min(((this.props.zoom > 12 ? this.props.zoom : 0) - 12) * 15, 75)
        const value = "rgba(255, 215, 215, " + alpha + "%)"

        if (this.props.data.visits.length >= 10) {
            return (
                <Button variant={"contained"} disableElevation style={{
                    height: "48px",
                    width: "48px",
                    borderRadius: 24,
                    marginLeft: "-10px",
                    marginTop: "-13px",
                    padding: "6px",
                    minWidth: "48px",
                    background: value
                }} onClick={(e) => {
                    e.stopPropagation()
                    this.props.info(this.props.data)
                    this.props.showCaa(false)
                }}>
                    <FontAwesomeIcon icon="viruses" flip={"both"} color={"#d32d26"} style={{fontSize: "1.5em"}}/>
                </Button>
            )
        }
        return (
            <Button variant={"contained"} disableElevation style={{
                height: "32px",
                width: "32px",
                borderRadius: 16,
                marginLeft: "-8px",
                marginTop: "-8px",
                padding: "6px",
                minWidth: "32px",
                background: value
            }} onClick={e => {
                e.stopPropagation()
                this.props.info(this.props.data)
                this.props.showCaa(false)
            }}>
                <FontAwesomeIcon icon="virus" size="1x"/>
            </Button>
        );
    }

}

export {
    CustomMarker
}
