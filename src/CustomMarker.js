import React, {Component} from "react";
import fontawesome from '@fortawesome/fontawesome'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faVirus, faViruses} from "@fortawesome/free-solid-svg-icons"

fontawesome.library.add(faVirus, faViruses)

class CustomMarker extends Component {

    render() {
        if (this.props.data.visits.length >= 5) {
            return (
                <FontAwesomeIcon icon="viruses" flip={"both"} color={"#d32d26"} size="2x" onClick={() => {
                    this.props.info(this.props.data)
                    this.props.showCaa(false)
                }}/>
            )
        }
        return (
            <FontAwesomeIcon icon="virus" size="lg" onClick={() => {
                this.props.info(this.props.data)
                this.props.showCaa(false)
            }}/>
        );
    }
}

export {CustomMarker}
