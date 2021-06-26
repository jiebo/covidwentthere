import React, {useState, useRef} from "react";
import GoogleMapReact from "google-map-react";
import useSupercluster from "use-supercluster";
import "../App.css";
import {CustomMarker} from "./CustomMarker";
import Legend from "./Legend";
import InfoPanel from "../infopanel/InfoPanel";
import CAA from "../caa/CAA";
import useWindowDimensions from "../hooks/WindowDimensions";
import DateCarousel from "../datecarousel/DateCarousel";
import {clusterSize} from "../Container";

const API_KEY = process.env.REACT_APP_MAPS_KEY

const Marker = ({children}) => children;

export default function Map(params) {
    const mapRef = useRef();
    const {height, width} = useWindowDimensions()
    const [bounds, setBounds] = useState(null);
    const [zoom, setZoom] = useState(getMinZoom);
    const [info, setInfo] = useState(null);
    const [showCaa, setShowCaa] = useState(true)

    const locations = params?.data ? params.data : []
    const daily = params?.daily ? params.daily : []
    const caa = params?.timestamp ? params.timestamp : 0

    const points = locations?.map(location => ({
        type: "Feature",
        properties: {cluster: false, id: location.id},
        geometry: {
            type: "Point",
            coordinates: [
                parseFloat(location.lng),
                parseFloat(location.lat)
            ]
        },
        data: location
    }));

    const {clusters, supercluster} = useSupercluster({
        points,
        bounds,
        zoom,
        options: {radius: 45, maxZoom: 15}
    });

    function getMinZoom() {
        return width >= 600 ? 12 : 11
    }

    function createMapOptions() {
        return {
            minZoom: getMinZoom(),
            clickableIcons: false,
            fullscreenControl: false,
            zoomControl: false
        };
    }

    function getCaseCountForCluster(cluster) {
        let queue = []
        let count = 0
        let hasHotspot = false
        queue.push(cluster)
        while (queue.length > 0) {
            let current = queue.shift()
            if (!current.properties.cluster) {
                if (typeof current.data !== "undefined") {
                    count += current.data.visits.length
                    if (current.data.visits.length >= clusterSize) {
                        hasHotspot = true
                    }
                }
            } else {
                let children = supercluster.getChildren(current.id)
                for (let index in children) {
                    queue.push(children[index])
                }
            }
        }
        return [count, hasHotspot];
    }

    return (
        <div className={"map"} style={{height: height - 98}}>
            <GoogleMapReact
                bootstrapURLKeys={{key: API_KEY}}
                defaultCenter={{lat: 1.352, lng: 103.820}}
                defaultZoom={getMinZoom()}
                yesIWantToUseGoogleMapApiInternals
                options={createMapOptions()}
                onGoogleApiLoaded={({map}) => {
                    mapRef.current = map;
                }}
                onClick={() => {
                    setInfo(null)
                }}
                onChange={({zoom, bounds}) => {
                    setZoom(zoom);
                    setBounds([
                        bounds.nw.lng,
                        bounds.se.lat,
                        bounds.se.lng,
                        bounds.nw.lat
                    ]);
                }}
            >
                {clusters.map(cluster => {
                    const [longitude, latitude] = cluster.geometry.coordinates;
                    const {
                        cluster: isCluster
                    } = cluster.properties;

                    if (isCluster) {
                        let clusterProp = getCaseCountForCluster(cluster)
                        return (
                            <Marker
                                key={`cluster-${cluster.id}`}
                                lat={latitude}
                                lng={longitude}
                            >
                                <div
                                    className="cluster-marker"
                                    style={{
                                        width: `${10 + (clusterProp[0] / points.length) * 20}px`,
                                        height: `${10 + (clusterProp[0] / points.length) * 20}px`,
                                        background: `${clusterProp[1] ? "#d32d26" : "#1978c8"}`
                                    }}
                                    onClick={() => {
                                        const expansionZoom = Math.min(
                                            supercluster.getClusterExpansionZoom(cluster.id),
                                            20
                                        );
                                        mapRef.current.setZoom(expansionZoom);
                                        mapRef.current.panTo({lat: latitude, lng: longitude});
                                    }}
                                >
                                    {clusterProp}
                                </div>
                            </Marker>
                        );
                    }

                    return (
                        <CustomMarker
                            key={`location-${cluster.properties.id}`}
                            lat={latitude}
                            lng={longitude}
                            data={cluster.data}
                            zoom={zoom}
                            info={setInfo}
                            showCaa={setShowCaa}
                        >
                        </CustomMarker>
                    );
                })}
            </GoogleMapReact>
            <Legend/>
            <DateCarousel data={daily} caa={caa} updateDisplay={params.updateDisplay} />
            <InfoPanel data={info} reset={setInfo}/>
            <CAA caa={caa} zoom={zoom} show={showCaa}/>
        </div>
    );
}