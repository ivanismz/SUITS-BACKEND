### Configure the Environment 
1. config a conda environment following these two repo:https://github.com/ShishirPatil/gorilla and https://github.com/ShishirPatil/gorilla/tree/main/openfunctions
2. run command `pip install openai==0.28.1`
3. run command `pip install fastapi uvicorn transformers torch`
   - Note: if you run into errors related to tree-sitter: follow the instruction in https://github.com/ShishirPatil/gorilla/tree/main/openfunctions:
     `pip3 install tree_sitter`
     
     `git clone https://github.com/tree-sitter/tree-sitter-java.git`
     
      `git clone https://github.com/tree-sitter/tree-sitter-javascript.git`
     
4. install npm

LLM related code are located in the `openfunctions` directory, so do `cd openfunctions`
   
### To run LLM with rover control:
run `local_inference_backend.py`, input the user query and the function call will be printed out, type "quit" to exit 

make sure laptop running this script is connected to the rover wifi

### To run LLM with user query provided by backend server (full backend --> LLM --> backend workflow):
1. run `local_inference_backend_connected.py`, the LLM will start a server on  `localhost:8000`
2. go to the backend folder where `server.js` is located, start the backend server: `npm start`, the backend server will run on `localhost:3000`
3. follow this tutorial to start the backend server and LMCC webpage and connect them together: https://drive.google.com/file/d/1pICVM4tOIfz-_cUDTfMfguOOlML6EZ2V/view?usp=drive_link
4. the backend server will then send `{"user_input": "perform task 1c"}` to the LLM server, the LLM server will return a function call such as  `{'name': 'on_egress_menu_do_task_1c', 'arguments': {}}`
5. In backend, function call `{'name': 'on_egress_menu_do_task_1c', 'arguments': {}}` will call the backend function onEgressMenuDoTask1c(), with a return `{"function": "on_egress_menu_do_subtask_1c_HMD",
      "parameter": { "display_string": "Switch the DCU BATT to Umbilical, say next task to advance"}}`. (This should further be sent to the HMD/foxglove)
