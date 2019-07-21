from flask import Flask, render_template, request
from configparser import ConfigParser
import psycopg2
import os

# JS = os.path.join(os.path.dirname(os.path.abspath(__file__)), "templates\js")

# app = Flask(__name__, static_folder=JS)

app = Flask(__name__)

def config(filename="database.ini", section="postgresql"):
    # create a parser
    parser = ConfigParser()
    # read config file
    parser.read(filename)
 
    # get section, default to postgresql
    db = {}
    if parser.has_section(section):
        params = parser.items(section)
        for param in params:
            db[param[0]] = param[1]
    else:
        raise Exception("Section {0} not found in the {1} file".format(section, filename))
 
    return db

params = config()

@app.route("/")
def main():
    return render_template("index.html")

@app.route("/adddeal", methods = ["POST"])
def adddeal():
    try:
        deal = request.json
        conn = psycopg2.connect(**params)
        cur = conn.cursor()
        q = ("INSERT into deals (dates, invoice, company, amount, pvm) "
            "SELECT '{0}', '{1}', '{2}', '{3}', '{4}' "
            "WHERE NOT EXISTS (SELECT dates, invoice, company, amount, pvm FROM deals "
            "WHERE dates='{0}' AND invoice='{1}' AND company='{2}' AND amount='{3}' AND pvm='{4}');")
        sql = q.format(deal['date'], deal['invoice'], deal['company'], deal['sum'], deal['pvm'])
        print(sql)
        cur.execute(sql)
        conn.commit()
        print(deal, "saved to database!")
    except (Exception, psycopg2.DatabaseError) as error: 
        print(error)
    finally:
        if conn is not None:
            conn.close()
    return ",,!,,"

if __name__ == "__main__":
    app.run()

