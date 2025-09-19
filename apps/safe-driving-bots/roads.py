import geopandas as gpd
from shapely.geometry import box
from shapely.geometry.base import BaseGeometry
from typing import List
import networkx as nx

def load_roads(shapefile_path: str) -> gpd.GeoDataFrame:
    """Load shapefile and ensure it's in EPSG:4326."""
    gdf = gpd.read_file(shapefile_path)
    if gdf.crs is None:
        gdf = gdf.set_crs("EPSG:4326")
    else:
        gdf = gdf.to_crs("EPSG:4326")
    return gdf


def clip_roads_to_bbox(roads_gdf: gpd.GeoDataFrame, bbox: List[float]):
    """Clip roads GeoDataFrame to the provided bounding box [west, south, east, north]."""
    west, south, east, north = bbox
    bbox_poly = box(west, south, east, north)
    return gpd.clip(roads_gdf, bbox_poly)


def geometries_to_latlon(geoms: List[BaseGeometry]) -> List[List[List[float]]]:
    """Convert LineString or MultiLineString geometries to Leaflet-friendly [lat, lon] lists."""
    edges = []
    for geom in geoms:
        if geom is None:
            continue
        if geom.geom_type == "LineString":
            edges.append([[lat, lon] for lon, lat in geom.coords])
        elif geom.geom_type == "MultiLineString":
            for line in geom.geoms:
                edges.append([[lat, lon] for lon, lat in line.coords])
    return edges


def build_road_graph(road_edges):
    """Build networkx graph from road edges."""
    G = nx.DiGraph()
    for line in road_edges:
        for i in range(len(line) - 1):
            start = tuple(line[i])
            end = tuple(line[i + 1])
            G.add_edge(start, end)
            G.add_edge(end, start)
    return G
