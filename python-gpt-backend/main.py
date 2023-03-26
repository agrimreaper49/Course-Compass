import openai

major = "Computer Science"
courses = "CS 1110, DSA 2100, CS 2130"

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
