### Configure the Environment 
1. config a conda environment following these two repo:https://github.com/ShishirPatil/gorilla and https://github.com/ShishirPatil/gorilla/tree/main/openfunctions
2. install npm

### To run LLM with quick command line input:
run `local_inference_{task_name}.py`, input the user query and the function call will be printed out, type "quit" to exit


### To run LLM with user query provided by backend server (full backend --> LLM --> backend workflow):
1. run `local_inference_{task_name}_connected.py`, the LLM will start a server on  `localhost:8000`
2. go to the backend folder where `server.js` is located, start the backend server: `npm start`, the backend server will run on `localhost:3000`
3. user Postman to connect to `localhost:3000` and send message in the format of `{"user_input": "perform task 1c"}`
4. the backend server will then send `{"user_input": "perform task 1c"}` to the LLM server, the LLM server will return a function call such as  `{'name': 'on_egress_menu_do_task_1c', 'arguments': {}}`
5. In backend, function call `{'name': 'on_egress_menu_do_task_1c', 'arguments': {}}` will call the backend function onEgressMenuDoTask1c(), with a return `{"function": "on_egress_menu_do_subtask_1c_HMD",
      "parameter": { "display_string": "Switch the DCU BATT to Umbilical, say next task to advance"}}`. (This should further be sent to the HMD/foxglove)
