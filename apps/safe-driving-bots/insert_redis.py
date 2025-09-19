import socket
import random
from typing import List, Union, Optional

# Minimal RESP encoding/decoding Redis client using only the standard library.
class RedisClient:
    def __init__(self, host: str = "localhost", port: int = 6379, password: Optional[str] = None, timeout: float = 5.0):
        self.host = host
        self.port = port
        self.password = password
        self.timeout = timeout
        self._sock: Optional[socket.socket] = None
        self._buffer = b""

    def connect(self):
        if self._sock is not None:
            return
        s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        s.settimeout(self.timeout)
        s.connect((self.host, self.port))
        self._sock = s
        if self.password:
            # AUTH <password>
            resp = self.command("AUTH", self.password)
            # Successful AUTH is usually "+OK"
            if not (isinstance(resp, str) and resp.upper() == "OK"):
                raise RuntimeError(f"AUTH failed: {resp}")

    def close(self):
        if self._sock:
            try:
                self._sock.close()
            finally:
                self._sock = None

    def __enter__(self):
        self.connect()
        return self

    def __exit__(self, exc_type, exc, tb):
        self.close()

    def command(self, *parts: Union[str, bytes, int, float]) -> Union[str, int, bytes, None, List]:
        if self._sock is None:
            self.connect()
        # Encode and send
        payload = self._encode_resp_array(parts)
        self._sendall(payload)
        # Read single reply
        return self._read_reply()

    def hset(self, key: str, mapping: dict) -> int:
        # HSET key field value [field value ...]
        parts: List[Union[str, int, float]] = ["HSET", key]
        for field, value in mapping.items():
            parts.append(str(field))
            parts.append(str(value))
        resp = self.command(*parts)
        if isinstance(resp, int):
            return resp
        raise RuntimeError(f"Unexpected HSET reply: {resp}")

    def expire(self, key: str, seconds: int) -> int:
        resp = self.command("EXPIRE", key, int(seconds))
        if isinstance(resp, int):
            return resp
        raise RuntimeError(f"Unexpected EXPIRE reply: {resp}")

    # RESP utilities

    def _encode_bulk(self, item: Union[str, bytes, int, float]) -> bytes:
        if isinstance(item, bytes):
            data = item
        else:
            data = str(item).encode("utf-8")
        return b"$" + str(len(data)).encode() + b"\r\n" + data + b"\r\n"

    def _encode_resp_array(self, parts: List[Union[str, bytes, int, float]]) -> bytes:
        out = [b"*", str(len(parts)).encode(), b"\r\n"]
        for p in parts:
            out.append(self._encode_bulk(p))
        return b"".join(out)

    def _sendall(self, data: bytes):
        assert self._sock is not None
        self._sock.sendall(data)

    def _readline(self) -> bytes:
        # Read until CRLF
        while True:
            idx = self._buffer.find(b"\r\n")
            if idx != -1:
                line = self._buffer[:idx]
                self._buffer = self._buffer[idx + 2 :]
                return line
            chunk = self._sock.recv(4096)  # type: ignore[union-attr]
            if not chunk:
                raise ConnectionError("Socket closed by server")
            self._buffer += chunk

    def _readn(self, n: int) -> bytes:
        while len(self._buffer) < n:
            chunk = self._sock.recv(4096)  # type: ignore[union-attr]
            if not chunk:
                raise ConnectionError("Socket closed by server")
            self._buffer += chunk
        data = self._buffer[:n]
        self._buffer = self._buffer[n:]
        return data

    def _read_reply(self):
        # RESP types: Simple Strings (+), Errors (-), Integers (:), Bulk Strings ($), Arrays (*)
        line = self._readline()
        if not line:
            raise ConnectionError("Empty reply from server")

        prefix = line[:1]
        rest = line[1:]

        if prefix == b"+":
            # Simple String
            return rest.decode("utf-8")
        elif prefix == b"-":
            # Error
            msg = rest.decode("utf-8")
            raise RuntimeError(f"Redis error: {msg}")
        elif prefix == b":":
            # Integer
            return int(rest)
        elif prefix == b"$":
            # Bulk String
            length = int(rest)
            if length == -1:
                return None
            data = self._readn(length)
            # Discard trailing CRLF
            _ = self._readline()
            return data
        elif prefix == b"*":
            # Array
            count = int(rest)
            if count == -1:
                return None
            arr = []
            for _ in range(count):
                arr.append(self._read_reply())
            return arr
        else:
            raise RuntimeError(f"Unknown RESP prefix: {prefix!r} in line {line!r}")


def main():
    # Configuration
    host = "localhost"
    port = 6379
    password = "safe-driving-redis-password"  # Set to None if no auth
    center_lat = -18.911
    center_lon = 47.543
    num_users = 30
    max_offset = 0.02  # ~2 km

    try:
        with RedisClient(host=host, port=port, password=password, timeout=5.0) as r:
            for i in range(1, num_users + 1):
                # Random offset from center
                lat_offset = random.uniform(-max_offset, max_offset)
                lon_offset = random.uniform(-max_offset, max_offset)

                user_key = f"driver:{i}"

                r.hset(user_key, {
                    "lat": center_lat + lat_offset,
                    "lon": center_lon + lon_offset
                })

                # Optional: set expiry of 60 seconds to simulate active users
                # r.expire(user_key, 60)

        print(f"{num_users} test users inserted into Redis.")
    except (ConnectionError, TimeoutError, RuntimeError, OSError) as e:
        # Provide a clear, actionable error message
        print(f"Failed to insert users into Redis: {e}")
        print("Check that Redis is running, host/port are correct, and the password (if any) is valid.")


if __name__ == "__main__":
    main()
