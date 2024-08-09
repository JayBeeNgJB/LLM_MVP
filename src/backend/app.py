from flask import Flask, request, jsonify
from transformers import pipeline
# import transformers
from transformers import AutoTokenizer, AutoModelForCausalLM
from flask_cors import CORS
import torch
from huggingface_hub import login

login(token = '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')


app = Flask(_name_)
CORS(app)

# Load the model
# model = pipeline("text-generation", model="gpt2")
# response = model('what is a cat', max_length=150, pad_token_id=50256, num_return_sequences=1, truncation=True)
# print(response)


tokenizer = AutoTokenizer.from_pretrained("internlm/internlm2_5-20b-chat", trust_remote_code=True)
model = AutoModelForCausalLM.from_pretrained("internlm/internlm2_5-20b-chat", torch_dtype=torch.float16, trust_remote_code=True).cuda()
model = model.eval()
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