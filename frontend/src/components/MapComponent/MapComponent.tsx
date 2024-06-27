import { useEffect } from 'react';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import 'ol/ol.css';

function MapComponent() {
    useEffect(() => {
        const osmLayer = new TileLayer({
            preload: Infinity,
            source: new OSM(),
        })

        const map = new Map({
            target: "map",
            layers: [osmLayer],
            view: new View({
                center: [0, 0],
                zoom: 0,
            }),
        });
        return () => map.setTarget(undefined)
    }, []);

    return (
        <div style={{ height: '600px', width: '100%' }} id="map" className="map-container" />
    );
}

export default MapComponent;