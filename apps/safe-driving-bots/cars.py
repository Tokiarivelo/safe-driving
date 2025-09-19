import random


def init_cars(G, n=3):
    """Initialize cars on random edges of the road graph."""
    cars = []
    nodes = list(G.nodes)
    for i in range(n):
        start_node = random.choice(nodes)
        neighbors = list(G.neighbors(start_node))
        if neighbors:
            next_node = random.choice(neighbors)
            cars.append({
                "id": i,
                "current": start_node,
                "next": next_node,
                "direction": 1
            })
    return cars


def move_cars(G, cars):
    """Move cars along the road graph, bounce at dead-ends."""
    car_positions = []
    for car in cars:
        current = car["current"]
        next_node = car["next"]
        neighbors = list(G.neighbors(next_node))

        if not neighbors or next_node == current:
            # Bounce back
            car["current"], car["next"] = next_node, current
            car["direction"] *= -1
        else:
            # Pick a connected neighbor that is not previous node
            choices = [n for n in neighbors if n != current]
            if choices:
                car["current"], car["next"] = next_node, random.choice(choices)
            else:
                # Dead-end, reverse
                car["current"], car["next"] = next_node, current
                car["direction"] *= -1

        car_positions.append({"id": car["id"], "coords": car["current"]})

    return car_positions
