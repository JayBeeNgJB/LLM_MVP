from flask import Flask, request, jsonify
from transformers import pipeline
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Load the model
model = pipeline("text-generation", model="gpt2")
# response = model('what is a cat', max_length=150, pad_token_id=50256, num_return_sequences=1, truncation=True)
# print(response)


@app.route('/api/query', methods=['POST'])
def query_llm():
    data = request.json
    print('received data', data)
    user_input = data.get('input')
    
    if not user_input:
        return jsonify({'error': 'No input provided'}), 400
    
    try:
        response = model(user_input, max_length=150, pad_token_id=50256, num_return_sequences=1, truncation=True)
        print("llm response", response)
        return jsonify({'response': response[0]['generated_text']})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)