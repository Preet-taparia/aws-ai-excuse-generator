import json
import requests

GEMINI_API_KEY = ""
GEMINI_API_URL = ""

def lambda_handler(event, context):
    try:
        body = json.loads(event.get("body", "{}"))
        context_input = body.get("context", "")

        response = requests.post(
            GEMINI_API_URL,
            headers={"Authorization": f"Bearer {GEMINI_API_KEY}"},
            json={"prompt": context_input}
        )
        excuse = response.json().get("excuse", "Sorry, no excuse could be generated.")

        return {
            "statusCode": 200,
            "body": json.dumps({"excuse": excuse}),
            "headers": {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            }
        }

    except Exception as e:
        return {
            "statusCode": 500,
            "body": json.dumps({"error": str(e)}),
            "headers": {
                "Content-Type": "application/json"
            }
        }
