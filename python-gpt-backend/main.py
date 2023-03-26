import openai
import os
from flask import Flask, jsonify

major = ""
courses = ""

response = openai.ChatCompletion.create(
    model="gpt-3.5-turbo",
    messages=[
            {"role": "system", "content": "You are a chatbot"},
            {"role": "user", "content": f"I'm a {major} major at UVA and I've taken these courses: {courses}. Recomend classes I should take next"},
        ]
)
result = ''
for choice in response.choices:
    result += choice.message.content

app = Flask(__name__)
@app.route('/string')
def get_string():
    my_string = result
    print(my_string)
    return jsonify({'string': my_string})

if __name__ == '__main__':
    app.run()

