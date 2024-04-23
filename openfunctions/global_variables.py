import threading
import queue

def server_communication_init():
    global llm_response_queue
    global server_input_queue
    llm_response_queue = queue.Queue()
    server_input_queue = queue.Queue()

def put_llm_response(response_msg):
    llm_response_queue.put(response_msg)

def put_server_input(input_msg):
    server_input_queue.put(input_msg)

def get_server_input():
    if server_input_queue.empty():
        return None
    input_msg = server_input_queue.get()
    return input_msg

def get_llm_response():
    if llm_response_queue.empty():
        return None
    response_msg = llm_response_queue.get()
    return response_msg
