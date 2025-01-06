from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import os
import requests
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

print("Initializing Flask App...")

# Initialize Flask app
app = Flask(__name__, static_folder='build', template_folder='build')
CORS(app, origins=["*"])

# Cohere API configuration
COHERE_API_KEY = os.getenv("COHERE_API_KEY")
headers = {
    'Authorization': f'Bearer {COHERE_API_KEY}',
    'Content-Type': 'application/json'
}

@app.route('/api/decision', methods=['POST'])
def get_decision():
    try:
        data = request.get_json()  # This ensures that Flask expects JSON data
        user_message = data.get('message', '')

        if not user_message:
            return jsonify({'bot_response': "Please provide a scenario or question you'd like help with."})

        # If a message is provided, interact with Cohere API to get response
        url = "https://api.cohere.ai/generate"
        body = {
            'model': 'command-r-plus',
            'prompt': f"Give the best options to solve this scenario under 150 characters: {user_message}",
            'max_tokens': 150
        }

        response = requests.post(url, headers=headers, json=body)

        if response.status_code == 200:
            bot_response = response.json()['text']
            return jsonify({'bot_response': bot_response})
        else:
            return jsonify({'bot_response': f"Error from Cohere API: {response.text}"})
    except Exception as e:
        return jsonify({'bot_response': f"An error occurred: {str(e)}"})

@app.route('/')
def index():
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/<path:path>')
def serve(path):
    if path != "" and os.path.exists(f"build/{path}"):
        return send_from_directory('build', path)
    else:
        return send_from_directory('build', 'index.html')

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8080))
    app.run(host='0.0.0.0', port=port)
