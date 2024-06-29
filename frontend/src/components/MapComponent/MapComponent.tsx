import { useEffect } from 'react';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import 'ol/ol.css';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import { fromLonLat } from 'ol/proj';

interface Marker {
    id: string;
    x: number;
    y: number
    name: string;
}


interface MapComponentProps {
    markers: Marker[]
}

function MapComponent({ markers }: MapComponentProps) {
    useEffect(() => {

        const features = markers.map(marker => {
            const feature = new Feature({
                geometry: new Point(fromLonLat([marker.x, marker.y])),
                name: marker.name
            })
            feature.setId(marker.id)

            return feature;
        });

        const vectorSource = new VectorSource({
            features,
        });

        const vectorLayer = new VectorLayer({
            source: vectorSource,
        });

        const osmLayer = new TileLayer({
            preload: Infinity,
            source: new OSM(),
        })

        const map = new Map({
            target: "map",
            layers: [osmLayer, vectorLayer],
            view: new View({
                center: [0, 0],
                zoom: 0,
            }),
        });
        return () => map.setTarget(undefined)
    });

    return (
        <div style={{ height: '600px', width: '100%' }} id="map" className="map-container" />
    );
}

export default MapComponent;