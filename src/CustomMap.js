import React, {useState, useRef} from "react";
import useSwr from "swr";
import GoogleMapReact from "google-map-react";
import useSupercluster from "use-supercluster";
import "./App.css";
import {CustomMarker} from "./CustomMarker";
import Legend from "./Legend";
import InfoPanel from "./infopanel/InfoPanel";

const fetcher = (...args) => fetch(...args).then(response => response.json());

const API_KEY = process.env.REACT_APP_MAPS_KEY

const Marker = ({children}) => children;

export default function Map() {
    const mapRef = useRef();
    const [bounds, setBounds] = useState(null);
    const [zoom, setZoom] = useState(12);
    const [info, setInfo] = useState(null);

    const url = "https://storage.googleapis.com/covidwentthere_mock/query.json";
    const {data, error} = useSwr(url, {fetcher});
    const locations = data && !error ? data : [];
    const points = locations.map(location => ({
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

    function createMapOptions() {
        return {
            minZoom: 12,
            clickableIcons: false,
            fullscreenControl: false
        };
    }

    function getCaseCountForCluster(cluster) {
        let queue = []
        let count = 0
        queue.push(cluster)
        while (queue.length > 0) {
            let current = queue.shift()
            if (!current.properties.cluster) {
                if (typeof current.data !== "undefined") {
                    count += current.data.visits.length
                }
            } else {
                let children = supercluster.getChildren(current.id)
                for (let index in children) {
                    queue.push(children[index])
                }
            }
        }
        return count;
    }

    return (
        <div className={"map"}>
            <GoogleMapReact
                bootstrapURLKeys={{key: API_KEY}}
                defaultCenter={{lat: 1.352, lng: 103.820}}
                defaultZoom={12}
                yesIWantToUseGoogleMapApiInternals
                options={createMapOptions()}
                onGoogleApiLoaded={({map}) => {
                    mapRef.current = map;
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
                        let count = getCaseCountForCluster(cluster)
                        return (
                            <Marker
                                key={`cluster-${cluster.id}`}
                                lat={latitude}
                                lng={longitude}
                            >
                                <div
                                    className="cluster-marker"
                                    style={{
                                        width: `${10 + (count / points.length) * 20}px`,
                                        height: `${10 + (count / points.length) * 20}px`,
                                        background: `${count >= 20 ? "#d32d26" : "#1978c8"}`
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
                                    {count}
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
                            info={setInfo}
                        >
                        </CustomMarker>
                    );
                })}
            </GoogleMapReact>
            <Legend/>
            <InfoPanel data={info} reset={setInfo}/>
        </div>
    );
}