import os
from parser.jobsdb import parser
from flask import Flask, render_template, request


app = Flask(
    __name__,
    static_folder=os.path.abspath("./dist/static"),
    template_folder=os.path.abspath("./dist/templates"),
)


@app.route("/")
def home():
    return render_template("home.html")


@app.route("/search")
def search():
    keyword = request.args.get("keyword")

    jobs_jobsdb = parser(keyword)
    jobs = jobs_jobsdb

    return render_template("search.html", keyword=keyword, jobs=jobs)


if __name__ == "__main__":
    app.run(debug=True)
