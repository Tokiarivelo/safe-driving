import { createElementObject, createLayerComponent, LayerProps } from '@react-leaflet/core';
import L from 'leaflet';
import 'leaflet.markercluster';

// We need to import the CSS for marker cluster
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';

// Extend Leaflet types to include MarkerClusterGroup
declare module 'leaflet' {
  interface MarkerClusterGroup extends L.FeatureGroup {
    addLayer(layer: L.Layer): this;
    removeLayer(layer: L.Layer): this;
  }

  interface MarkerClusterGroupOptions {
    showCoverageOnHover?: boolean;
    zoomToBoundsOnClick?: boolean;
    spiderfyOnMaxZoom?: boolean;
    removeOutsideVisibleBounds?: boolean;
    animate?: boolean;
    animateAddingMarkers?: boolean;
    disableClusteringAtZoom?: number;
    maxClusterRadius?: number | ((zoom: number) => number);
    polygonOptions?: L.PolylineOptions;
    singleMarkerMode?: boolean;
    spiderLegPolylineOptions?: L.PolylineOptions;
    spiderfyDistanceMultiplier?: number;
    iconCreateFunction?: (cluster: L.MarkerCluster) => L.Icon | L.DivIcon;
    chunkedLoading?: boolean;
    chunkInterval?: number;
    chunkDelay?: number;
    chunkProgress?: (processed: number, total: number, elapsed: number) => void;
  }

  function markerClusterGroup(options?: MarkerClusterGroupOptions): MarkerClusterGroup;

  interface MarkerCluster extends L.Marker {
    getAllChildMarkers(): L.Marker[];
    getChildCount(): number;
  }
}

interface MarkerClusterGroupProps extends LayerProps {
  children?: React.ReactNode;
  chunkedLoading?: boolean;
  maxClusterRadius?: number;
  spiderfyOnMaxZoom?: boolean;
  showCoverageOnHover?: boolean;
  zoomToBoundsOnClick?: boolean;
  disableClusteringAtZoom?: number;
  removeOutsideVisibleBounds?: boolean;
}

const MarkerClusterGroup = createLayerComponent<L.MarkerClusterGroup, MarkerClusterGroupProps>(
  (props, ctx) => {
    const clusterProps: Record<string, unknown> = {};

    // Split props and events (filter out event handlers and children)
    Object.entries(props).forEach(([propName, prop]) => {
      if (!propName.startsWith('on') && propName !== 'children') {
        clusterProps[propName] = prop;
      }
    });

    // Create the MarkerClusterGroup instance
    const instance = L.markerClusterGroup(clusterProps as L.MarkerClusterGroupOptions);

    return createElementObject(instance, {
      ...ctx,
      layerContainer: instance,
    });
  },
);

export default MarkerClusterGroup;
