from http.server import HTTPServer, BaseHTTPRequestHandler
import json
import threading
import time
from global_variables import get_llm_response, put_server_input


class RequestHandler(BaseHTTPRequestHandler):
   def __init__(self, request, client_address, server) -> None:
       super().__init__(request, client_address, server)

   def do_OPTIONS(self):
        self.send_response(200)
        # self.send_header('Content-Type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header("Access-Control-Allow-Headers", "*")
        self.end_headers()
        # self.wfile.write(json.dumps(output).encode())
   def do_POST(self):
        content_length = int(self.headers['Content-Length'])
        post_data = self.rfile.read(content_length)
        post_data = json.loads(post_data.decode())

        # post data
        # {"user_input": "do next task on egress"}
        # if not post_data.get("user_input"):
        #     self.send_response(503)
        #     self.send_header('content-type', 'application/json')
        #     self.end_headers()
        #     self.wfile.write(json.dumps({}).encode())
        #     return
        print("post data is in server.py", post_data)
        user_input = post_data["user_input"]
        put_server_input(user_input)
        response_msg = get_llm_response()
        while not response_msg:
            time.sleep(0.25)
            response_msg = get_llm_response()

        output = {
            "llm_response": response_msg
        }
        print("sending output", output)
        self.send_response(200)
        self.send_header('content-type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()
        self.wfile.write(json.dumps(output).encode())
        

def run_server_thread():
   PORT = 8000
   server_address = ('localhost', PORT)
   server = HTTPServer(server_address, RequestHandler)
   print('Server running on port %s' % PORT)
   server.serve_forever()


def run_server():
    server_thread = threading.Thread(target=run_server_thread)
    server_thread.setDaemon(True)
    server_thread.start()