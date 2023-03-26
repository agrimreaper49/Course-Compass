import openai

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

print(result)
