
import { useEffect } from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  Polyline,
  useMap
} from 'react-leaflet';
import L from 'leaflet';

import type { Coordinate } from '../services/trackingStorage';
import 'leaflet/dist/leaflet.css';
import './MapComponent.css';

const locationIcon = L.divIcon({
  className: 'geo-pin',
  html: '<span></span>',
  iconSize: [22, 22],
  iconAnchor: [11, 11]
});

// Corrige el tamaño del mapa cuando Ionic cambia el layout.
function FixMapSize() {
  const map = useMap();

  useEffect(() => {
    const container = map.getContainer();

    const updateSize = () => {
      map.invalidateSize({
        pan: false,
        animate: false
      });
    };

    const observer = new ResizeObserver(updateSize);
    observer.observe(container);

    // Recalcular después de que Ionic muestre la pantalla.
    const first = window.setTimeout(updateSize, 150);
    const second = window.setTimeout(updateSize, 500);

    window.addEventListener('resize', updateSize);

    return () => {
      observer.disconnect();
      window.clearTimeout(first);
      window.clearTimeout(second);
      window.removeEventListener('resize', updateSize);
    };
  }, [map]);

  return null;
}

// Centra el mapa cuando cambia la ubicación.
function Recenter({ pos }: { pos: Coordinate | null }) {
  const map = useMap();

  useEffect(() => {
    if (!pos) return;

    map.setView(
      [pos.lat, pos.lng],
      Math.max(map.getZoom(), 16)
    );

    map.invalidateSize();
  }, [pos?.lat, pos?.lng, map]);

  return null;
}

interface MapComponentProps {
  position: Coordinate | null;
  path?: Coordinate[];
}

export default function MapComponent({
  position,
  path = []
}: MapComponentProps) {
  const center: [number, number] = position
    ? [position.lat, position.lng]
    : [3.4516, -76.5320];

  return (
    <div className="map-container" aria-label="Mapa interactivo">
      <MapContainer
        center={center}
        zoom={position ? 16 : 12}
        scrollWheelZoom
        className="map-canvas"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <FixMapSize />

        <Recenter pos={position} />

        {position && (
          <Marker
            position={[position.lat, position.lng]}
            icon={locationIcon}
          />
        )}

        {path.length > 1 && (
          <Polyline
            positions={path.map(
              p => [p.lat, p.lng] as [number, number]
            )}
            color="#5b57d9"
            weight={5}
          />
        )}
      </MapContainer>
    </div>
  );
}
