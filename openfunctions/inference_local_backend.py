import json
import torch
from transformers import AutoTokenizer, AutoModelForCausalLM, pipeline
from openfunctions_utils import strip_function_calls, parse_function_call


def get_prompt(system, user_query: str, functions: list = []) -> str:
    """
    Generates a conversation prompt based on the user's query and a list of functions.

    Parameters:
    - user_query (str): The user's query.
    - functions (list): A list of functions to include in the prompt.

    Returns:
    - str: The formatted conversation prompt.
    """
    # system = "You are an AI programming assistant, utilizing the Gorilla LLM model, developed by Gorilla LLM, and you only answer questions related to computer science. For politically sensitive questions, security and privacy issues, and other non-computer science questions, you will refuse to answer."
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

def initialize_pipe():
    # Device setup
    device : str = "cuda:0" if torch.cuda.is_available() else "cpu"
    torch_dtype = torch.float16 if torch.cuda.is_available() else torch.float32
    print("is cuda available? ", torch.cuda.is_available())
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
        device=device
    )
    return pipe

def create_prompt_and_function_descriptions(user_input_prompt, current_menu, current_task=None):
    # prefix_prompt = ""
    # if current_menu == "egress":
    #     if not current_task:
    #         print("missing current task")
        # egree_task_order = "1a, 1b, 1c, 2, 3a, 3b, 3c, 4a1, 4a2, 4a3, 4a4, 4b1, 4b2, 4b3, 4b4, 4c, 5a, 5b1, 5b2, 5b3, 5c1, 5c2, 5c3, 5d, 6a, 6b, 7a, 7b, 7c, 7d, 7e, 7f, 8a, 8b, 9"
        # prefix_prompt = "Currently I am on egress menu, perform "
    	# full_prompt = prefix_prompt + user_input_prompt
    full_prompt = user_input_prompt
    functions_backend = [
    {
  	"name": "on_egress_menu_do_next_task",
  	"description": "perform the next egress task",
  	"parameters": {
    	"required": []
  	    }
	},
	{
  	"name": "on_egress_menu_do_subtask_1a",
  	"description": "perform on egress subtask 1a, this is also the start of egress task",
  	"parameters": {
    	"required": []
  	    }
	},
	{
  	"name": "on_egress_menu_do_subtask_1b",
  	"description": "perform on egress subtask 1b",
  	"parameters": {
    	"required": []
  	    }
	},
	{
  	"name": "on_egress_menu_do_subtask_1c",
  	"description": "perform on egress subtask 1c",
  	"parameters": {
    	"required": []
  	    }
	},
	{
  	"name": "on_egress_menu_do_subtask_2",
  	"description": "perform on egress subtask 2",
  	"parameters": {
    	"required": []
  	    }
	},
	{
  	"name": "on_egress_menu_do_subtask_3a",
  	"description": "perform on egress subtask 3a",
  	"parameters": {
    	"required": []
  	    }
	},
	{
  	"name": "on_egress_menu_do_subtask_3b",
  	"description": "perform on egress subtask 3b",
  	"parameters": {
    	"required": []
  	    }
	},
	{
  	"name": "on_egress_menu_do_subtask_3c",
  	"description": "perform on egress subtask 3c",
  	"parameters": {
    	"required": []
  	    }
	},
	{
  	"name": "on_egress_menu_do_subtask_4a1",
  	"description": "perform on egress subtask 4a1",
  	"parameters": {
    	"required": []
  	    }
	},
	{
  	"name": "on_egress_menu_do_subtask_4a2",
  	"description": "perform on egress subtask 4a2",
  	"parameters": {
    	"required": []
  	    }
	},
	{
  	"name": "on_egress_menu_do_subtask_4a3",
  	"description": "perform on egress subtask 4a3",
  	"parameters": {
    	"required": []
  	    }
	},
	{
  	"name": "on_egress_menu_do_subtask_4a4",
  	"description": "perform on egress subtask 4a4",
  	"parameters": {
    	"required": []
  	    }
	},
	{
  	"name": "on_egress_menu_do_subtask_4b1",
  	"description": "perform on egress subtask 4b1",
  	"parameters": {
    	"required": []
  	    }
	},
	{
  	"name": "on_egress_menu_do_subtask_4b2",
  	"description": "perform on egress subtask 4b2",
  	"parameters": {
    	"required": []
  	    }
	},
	{
  	"name": "on_egress_menu_do_subtask_4b3",
  	"description": "perform on egress subtask 4b3",
  	"parameters": {
    	"required": []
  	    }
	},
	{
  	"name": "on_egress_menu_do_subtask_4b4",
  	"description": "perform on egress subtask 4b4",
  	"parameters": {
    	"required": []
  	    }
	},
	{
  	"name": "on_egress_menu_do_subtask_4c",
  	"description": "perform on egress subtask 4c",
  	"parameters": {
    	"required": []
  	    }
	},
	{
  	"name": "on_egress_menu_do_subtask_5a",
  	"description": "perform on egress subtask 5a",
  	"parameters": {
    	"required": []
  	    }
	},
	{
  	"name": "on_egress_menu_do_subtask_5b1",
  	"description": "perform on egress subtask 5b1",
  	"parameters": {
    	"required": []
  	    }
	},
	{
  	"name": "on_egress_menu_do_subtask_5b2",
  	"description": "perform on egress subtask 5b2",
  	"parameters": {
    	"required": []
  	    }
	},
	{
  	"name": "on_egress_menu_do_subtask_5b3",
  	"description": "perform on egress subtask 5b3",
  	"parameters": {
    	"required": []
  	    }
	},
	{
  	"name": "on_egress_menu_do_subtask_5c1",
  	"description": "perform on egress subtask 5c1",
  	"parameters": {
    	"required": []
  	    }
	},
	{
  	"name": "on_egress_menu_do_subtask_5c2",
  	"description": "perform on egress subtask 5c2",
  	"parameters": {
    	"required": []
  	    }
	},
	{
  	"name": "on_egress_menu_do_subtask_5c3",
  	"description": "perform on egress subtask 5c3",
  	"parameters": {
    	"required": []
  	    }
	},
	{
  	"name": "on_egress_menu_do_subtask_5d",
  	"description": "perform on egress subtask 5d",
  	"parameters": {
    	"required": []
  	    }
	},
	{
  	"name": "on_egress_menu_do_subtask_6a",
  	"description": "perform on egress subtask 6a",
  	"parameters": {
    	"required": []
  	    }
	},
	{
  	"name": "on_egress_menu_do_subtask_6b",
  	"description": "perform on egress subtask 6b",
  	"parameters": {
    	"required": []
  	    }
	},
	{
  	"name": "on_egress_menu_do_subtask_7a",
  	"description": "perform on egress subtask 7a",
  	"parameters": {
    	"required": []
  	    }
	},
	{
  	"name": "on_egress_menu_do_subtask_7b",
  	"description": "perform on egress subtask 7b",
  	"parameters": {
    	"required": []
  	    }
	},
	{
  	"name": "on_egress_menu_do_subtask_7c",
  	"description": "perform on egress subtask 7c",
  	"parameters": {
    	"required": []
  	    }
	},
	{
  	"name": "on_egress_menu_do_subtask_7d",
  	"description": "perform on egress subtask 7d",
  	"parameters": {
    	"required": []
  	    }   
	},
	{
  	"name": "on_egress_menu_do_subtask_7e",
  	"description": "perform on egress subtask 7e",
  	"parameters": {
    	"required": []
  	    }
	},
	{
  	"name": "on_egress_menu_do_subtask_7f",
  	"description": "perform on egress subtask 7f",
  	"parameters": {
    	"required": []
  	    }
	},
	{
  	"name": "on_egress_menu_do_subtask_8a",
  	"description": "perform on egress subtask 8a",
  	"parameters": {
    	"required": []
  	    }
	},
	{
  	"name": "on_egress_menu_do_subtask_8b",
  	"description": "perform on egress subtask 8b",
  	"parameters": {
    	"required": []
  	    }
	},
	{
  	"name": "on_egress_menu_do_subtask_9",
  	"description": "perform on egress subtask 9",
  	"parameters": {
    	"required": []
  	    }
	}
    ]
    return full_prompt, functions_backend

pipe = initialize_pipe()
# try to move this on server
current_task = "1a"
current_menu = "egress"

# def on_egress_menu_do_next_task():
#     curr_task = "1a"
    

while True:
    input_query = input("Please input your command to the rover: (enter quit to exit)")
    if input_query == "quit":
        print("Exit")
        break
    if current_menu == "egress":
        full_prompt, functions_backend = create_prompt_and_function_descriptions(input_query, current_menu, current_task)
        system_prompt = "You are an AI programming assistant, you are on menu {}".format(current_menu)
        prompt_1 = get_prompt(system_prompt, input_query, functions=functions_backend)
        output_1 = pipe(prompt_1)
        fn_call_string, function_call_dict = format_response(output_1[0]['generated_text'])
        current_task = function_call_dict['name'].split('_')[-1]
        print("new current task is", current_task)
    print("--------------------")
    print(f"User input is {input_query}")
    print(f"Full prompt is input is {full_prompt}")
    print(f"Function call strings 1(s): {fn_call_string}")
    print(f"OpenAI compatible `function_call`: {function_call_dict}")
    print("--------------------")