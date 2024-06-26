import openai
import json

openai.api_key = "EMPTY"
openai.api_base = "http://luigi.millennium.berkeley.edu:8000/v1"

# Example dummy function hard coded to return the same weather
# In production, this could be your backend API or an external API
def get_current_weather(location, unit="fahrenheit"):
    """Get the current weather in a given location"""
    weather_info = {
        "location": location,
        "temperature": "72",
        "unit": unit,
        "forecast": ["sunny", "windy"],
    }
    return json.dumps(weather_info)


def run_conversation_rover(message):
    # Step 1: send the conversation and available functions to GPT
    messages = [{"role": "user", "content": message}]
    functions_rover = [
        {
        "name": "on_rover_return_from_egress",
        "description": "return the rover from egress to base",
        "parameters": {
                "required": [],
        }
        },
        {
        "name": "on_rover_start_gps_nav",
        "description": "starts rover GPS drive command",
        "parameters": {
                "required": [],
        }
        },
        {
        "name": "on_rover_leo_bringup",
        "description": "runs compiled start launch script, preps rover for lmcc control or other commands",
        "parameters": {
                "required": [],
        }
        },
        {
        "name": "on_rover_gps_stop",
        "description": "if rover GPS nav is ongoing, stops GPS nav, otherwise does nothing",
        "parameters": {
                "required": [],
        }
        }
    ]   

    completion = openai.ChatCompletion.create(
        model='gorilla-openfunctions-v2',
        messages=messages,
        functions=functions_rover,
        function_call="auto",  # auto is default, but we'll be explicit
    )
    print("--------------------")
    print(f"User input is {message}")
    print(f"Function call strings 1(s): {completion.choices[0].message.content}")
    print(f"OpenAI compatible `function_call`: {completion.choices[0].message.function_call}")
    print("--------------------")

# run_conversation()
while True:
    input_query = input("Please input your command to the rover: (enter quit to exit)")
    if input_query == "quit":
        print("Exit")
        break
    run_conversation_rover(input_query)






# def run_conversation():
#     # Step 1: send the conversation and available functions to GPT
#     messages = [{"role": "user", "content": "What's the weather like in the two cities of Boston and San Francisco?"}]
#     functions = [
#         {
#             "name": "get_current_weather",
#             "description": "Get the current weather in a given location",
#             "parameters": {
#                 "type": "object",
#                 "properties": {
#                     "location": {
#                         "type": "string",
#                         "description": "The city and state, e.g. San Francisco, CA",
#                     },
#                     "unit": {"type": "string", "enum": ["celsius", "fahrenheit"]},
#                 },
#                 "required": ["location"],
#             },
#         }
#     ]
#     completion = openai.ChatCompletion.create(
#         model='gorilla-openfunctions-v2',
#         messages=messages,
#         functions=functions,
#         function_call="auto",  # auto is default, but we'll be explicit
#     )
    
#     print("--------------------")
#     print(f"Function call strings(s): {completion.choices[0].message.content}")
#     print("--------------------")
#     print(f"OpenAI compatible `function_call`: {completion.choices[0].message.function_call}")
