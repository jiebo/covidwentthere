import React, {Component} from "react";
import fontawesome from '@fortawesome/fontawesome'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faViruses} from "@fortawesome/free-solid-svg-icons"

fontawesome.library.add(faViruses)

class ClusterMarker extends Component {

    render() {
        return (
            <FontAwesomeIcon icon="viruses" size="4x" color="#F00"/>
        );
    }
}

export {ClusterMarker}
