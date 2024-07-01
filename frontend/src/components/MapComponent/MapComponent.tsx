import { useEffect, useState } from 'react';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import 'ol/ol.css';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import { toLonLat } from 'ol/proj';
import { toStringHDMS } from 'ol/coordinate';
import PopupMarker from '../PopupMarker/PopupMarker';
import PopupNewMarker from '../PopupNewMarker/PopupNewMarker';

interface Marker {
    id: string;
    longitude: number;
    latitude: number
    name: string;
    description: string;
}


interface MapComponentProps {
    markers: Marker[],
    isAuthorized: boolean
}

function MapComponent({ markers, isAuthorized }: MapComponentProps) {
    const [showPopupMarker, setShowPopupMarker] = useState(false);
    const [showPopupNewMarker, setShowPopupNewMarker] = useState(false);
    const [newCoordinates, setNewCoordinates] = useState<number[]>([]);
    const [popupTitle, setPopupTitle] = useState<string>('');
    const [popupContent, setPopupContent] = useState<string>('');


    useEffect(() => {

        const features = markers.map(marker => {
            const feature = new Feature({
                geometry: new Point([marker.longitude, marker.latitude]),
                name: marker.name,
                description: marker.description
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

        let coordinatesNewMarker = []

        map.on('click', (event) => {
            const feature = map.forEachFeatureAtPixel(event.pixel, (feature) => feature);
            if (feature) {
                const coordinates = (feature.getGeometry() as Point).getCoordinates();
                const hdms = toStringHDMS(toLonLat(coordinates));
                const name = feature.get('name');
                const description = feature.get('description');
                setPopupTitle(name);
                setPopupContent(`<p>${description}</p><code>${hdms}</code>`);
                setShowPopupMarker(true);
            } else {
                coordinatesNewMarker = map.getCoordinateFromPixel(event.pixel);      
                if (isAuthorized) {
                    setNewCoordinates(coordinatesNewMarker);
                    setShowPopupNewMarker(true);
                }
            }
        });


        return () => map.setTarget(undefined)
    });

    return (
        <div style={{ height: '600px', width: '100%' }} id="map" className="map-container">
            <PopupMarker
                show={showPopupMarker}
                title={popupTitle}
                content={popupContent}
                onClose={() => setShowPopupMarker(false)}
            />
            <PopupNewMarker
                show={showPopupNewMarker}
                coordinates={newCoordinates}
                onClose={() => setShowPopupNewMarker(false)}
            />
        </div>
    );
}

export default MapComponent;