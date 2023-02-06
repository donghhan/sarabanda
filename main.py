from flask import Flask, render_template, request

app = Flask(__name__, static_url_path="/dist", template_folder="/dist/templates")


@app.route("/")
def home():
    keyword = request.args.get("keyword")
    return render_template("home.html", keyword=keyword)


@app.route("/search")
def search():
    return render_template("search.html")


if __name__ == "__main__":
    app.run(debug=True)
