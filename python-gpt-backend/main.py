import openai

major = ""
courses = ""

response = openai.ChatCompletion.create(
    model="gpt-3.5-turbo",
    messages=[
            {"role": "system", "content": "You are a chatbot"},
            {"role": "user", "content": "I'm a {major} major and I've taken these courses: {courses}. What classes do you recomend I take next"},
        ]
)
result = ''
for choice in response.choices:
    result += choice.message.content

print(result)