import json
import torch
from transformers import AutoTokenizer, AutoModelForCausalLM, pipeline
from openfunctions_utils import strip_function_calls, parse_function_call
import os


def get_prompt(user_query: str, functions: list = []) -> str:
    """
    Generates a conversation prompt based on the user's query and a list of functions.

    Parameters:
    - user_query (str): The user's query.
    - functions (list): A list of functions to include in the prompt.

    Returns:
    - str: The formatted conversation prompt.
    """
    system = "You are an AI programming assistant, utilizing the Gorilla LLM model, developed by Gorilla LLM, and you only answer questions related to computer science. For politically sensitive questions, security and privacy issues, and other non-computer science questions, you will refuse to answer."
    if len(functions) == 0:
        return f"{system}\n### Instruction: <<question>> {user_query}\n### Response: "
    functions_string = json.dumps(functions)
    return f"{system}\n### Instruction: <<function>>{functions_string}\n<<question>>{user_query}\n### Response: "


def format_response(response: str):
    """
    Formats the response from the OpenFunctions model.

    Parameters:
    - response (str): The response generated by the LLM.

    Returns:
    - str: The formatted response.
    - dict: The function call(s) extracted from the response.

    """
    function_call_dicts = None
    try:
        response = strip_function_calls(response)
        # Parallel function calls returned as a str, list[dict]
        if len(response) > 1: 
            function_call_dicts = []
            for function_call in response:
                function_call_dicts.append(parse_function_call(function_call))
            response = ", ".join(response)
        # Single function call returned as a str, dict
        else:
            function_call_dicts = parse_function_call(response[0])
            response = response[0]
    except Exception as e:
        # Just faithfully return the generated response str to the user
        pass
    return response, function_call_dicts

# Device setup
device : str = "cuda:0" if torch.cuda.is_available() else "cpu"
torch_dtype = torch.float16 if torch.cuda.is_available() else torch.float32
print("torch_dtype", torch_dtype)
# Model and tokenizer setup
model_id : str = "gorilla-llm/gorilla-openfunctions-v2"
tokenizer = AutoTokenizer.from_pretrained(model_id)
model = AutoModelForCausalLM.from_pretrained(model_id, torch_dtype=torch_dtype, low_cpu_mem_usage=True)

# Move model to device
model.to(device)

# Pipeline setup
pipe = pipeline(
    "text-generation",
    model=model,
    tokenizer=tokenizer,
    max_new_tokens=128,
    batch_size=16,
    torch_dtype=torch_dtype,
    device=device,
)

functions_rover = [
    {
    "name": "on_rover_start",
    "description": "start the rover, call the bring up functions",
     "parameters": {
            "required": [],
     }
    },
    {
    "name": "on_rover_return_to_base",
    "description": "return the rover base (airlock)",
     "parameters": {
            "required": [],
     }
    },
    {
    "name": "on_rover_stop",
    "description": "end all running scripts, completely stop rover function",
     "parameters": {
            "required": [],
     }
    },
    {
    "name": "on_rover_forward_drive",
    "description": "Rover forward drive the given amount of distance in meters",
    "parameters": { 
        "distance": 
            {"type": "integer", 
             "description": "number meter the rover should drive forward"
             },
        "required": ["distance"],
        },
    },
    {
    "name": "on_rover_reverse_drive",
    "description": "Rover reverse drive the given amount of distance in meters",
    "parameters": { 
        "distance": 
            {"type": "integer", 
             "description": "number meter the rover should drive backward or in reverse direction"
             },
        "required": ["distance"],
        },
    },
    {
    "name": "on_rover_left_turn",
    "description": "Rover left turn for the given amount of angle in degrees",
    "parameters": { 
        "angle": 
            {"type": "integer", 
             "description": "Degree of angle the rover should left turn in"
             },
        "required": ["angle"],
        },
    },
    {
    "name": "on_rover_right_turn",
    "description": "Rover right turn for the given amount of angle in degrees",
    "parameters": { 
        "angle": 
            {"type": "integer", 
             "description": "Degree of angle the rover should right turn in"
             },
        "required": ["angle"],
        },
    }
    ]

def convert_function_call_dict_to_os_commands(function_call_dict):
    function_name =  function_call_dict['name']
    arguments_str = ""
    for parameter, value in function_call_dict['arguments'].items():
        arguments_str += f"--{parameter} {value} "
    cmd = f"python ../rover_functions/{function_name}.py {arguments_str}"
    print("cmd is", cmd)

    # returns output as byte string
    returned_output = os.system(cmd)

    # using decode() function to convert byte string to string
    print('returned_output is:', returned_output)

while True:
    input_query = input("Please input your command to the rover: (enter quit to exit)")
    if input_query == "quit":
        print("Exit")
        break
    prompt_1 = get_prompt(input_query, functions=functions_rover)
    output_1 = pipe(prompt_1)
    fn_call_string, function_call_dict = format_response(output_1[0]['generated_text'])
    convert_function_call_dict_to_os_commands(function_call_dict)
    print("--------------------")
    print(f"User input is {input_query}")
    print(f"Function call strings 1(s): {fn_call_string}")
    print(f"OpenAI compatible `function_call`: {function_call_dict}")
    print("--------------------")