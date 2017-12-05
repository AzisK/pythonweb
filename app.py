from flask import Flask, render_template
import os

JS = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'templates\js')

app = Flask(__name__, static_folder=JS)

@app.route("/")
def main():
    return render_template('index.html')

if __name__ == "__main__":
    app.run()

