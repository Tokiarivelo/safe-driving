import logging
import os
import requests
from flask import Flask, render_template, request, jsonify

from cars import init_cars, move_cars
from roads import geometries_to_latlon, load_roads, build_road_graph, clip_roads_to_bbox

os.environ.setdefault("SHAPE_RESTORE_SHX", "YES")


def create_app() -> Flask:
    app = Flask(__name__)

    roads_gdf = load_roads("static/hotosm_mdg_roads_lines_shp.shp")

    app.config["road_edges"] = []
    app.config["road_graph"] = None
    app.config["cars"] = []

    @app.route("/")
    def index():
        return render_template("map.html")

    @app.route("/load_bbox", methods=["POST"])
    def load_bbox():
        data = request.json
        bbox = data["bbox"]
        n_cars = data.get("n", 100)  # default to 100 cars if not provided

        roads_in_bbox = clip_roads_to_bbox(roads_gdf, bbox)
        road_edges = geometries_to_latlon(roads_in_bbox.geometry)

        app.config["road_edges"] = road_edges
        app.config["road_graph"] = build_road_graph(road_edges)
        app.config["cars"] = init_cars(app.config["road_graph"], n=n_cars)

        return jsonify({
            "status": "ok",
            "num_edges": len(road_edges),
            "num_cars": len(app.config["cars"])
        })

    @app.route("/get_roads")
    def get_roads():
        return jsonify(app.config.get("road_edges", []))

    @app.route("/get_cars")
    def get_cars():
        cars_positions = move_cars(app.config["road_graph"], app.config["cars"])
        payload = {
            "query": """
                mutation CreateDrivers($input: DriversInput!) {
                    createDrivers(input: $input) {
                        message
                        cars {
                            id
                            coords
                        }
                    }
                }
            """,
            "variables": {
                "input": {
                    "cars": cars_positions
                }
            }
        }

        try:
            resp = requests.post(
                "http://localhost:4000/graphql",
                json=payload,
                timeout=3
            )
            print("Driver service mutation status=%s" % resp.status_code)
            print("Driver service mutation response=%s" % resp.json())
        except requests.RequestException as e:
            print("Failed to notify driver service: %s" % e)

        return jsonify(cars_positions)

    @app.route("/clear_cars", methods=["POST"])
    def clear_cars():
        app.config["cars"] = []
        return jsonify({"status": "ok"})

    @app.route("/monitoring")
    def monitoring():
        return render_template("monitoring.html")

    return app

app = create_app()

if __name__ == "__main__":
    app.run(debug=True)
