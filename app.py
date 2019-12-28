from flask import Flask, flash, render_template, request, redirect
from configparser import ConfigParser
from flask_cors import CORS
# import psycopg2
import os
from flask_wtf import FlaskForm
from wtforms import StringField, FloatField, SubmitField, DateField
from wtforms.validators import DataRequired
from flask_sqlalchemy import SQLAlchemy
from config import Config
from flask_migrate import Migrate
from datetime import date

# JS = os.path.join(os.path.dirname(os.path.abspath(__file__)), "templates\js")

# app = Flask(__name__, static_folder=JS)

app = Flask(__name__)
app.config.from_object(Config)
CORS(app)
db = SQLAlchemy(app)
migrate = Migrate(app, db)


class Invoice(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.Date())
    invoice = db.Column(db.String(64))
    company = db.Column(db.String(120))
    suma = db.Column(db.Float())
    pvm = db.Column(db.Float())

    def __repr__(self):
        return '<Invoice {}>'.format(self.invoice)


class InvoiceForm(FlaskForm):
    date = DateField('date', validators=[DataRequired()])
    invoice = StringField('invoice', validators=[DataRequired()])
    company = StringField('company', validators=[DataRequired()])
    suma = FloatField('suma', validators=[DataRequired()])
    pvm = FloatField('pvm', validators=[DataRequired()])
    submit = SubmitField('Pridėk')

    def __repr__(self):
        return '<Invoice nr: {}>'.format(self.invoice)

# def config(filename="database.ini", section="postgresql"):
#     # create a parser
#     parser = ConfigParser()
#     # read config file
#     parser.read(filename)
 
#     # get section, default to postgresql
#     db = {}
#     if parser.has_section(section):
#         params = parser.items(section)
#         for param in params:
#             db[param[0]] = param[1]
#     else:
#         raise Exception("Section {0} not found in the {1} file".format(section, filename))
 
#     return db

# params = config()

@app.route("/")
def main():
    form = InvoiceForm()
    return render_template("index.html", form=form)

@app.route("/invoices/")
def invoices():
    return render_template("invoices.html")

@app.route("/invoices/add/", methods=['POST'])
def invoice_add():
    form = InvoiceForm()
    
    invoice = Invoice(
        date=date.today(),
        invoice=form.invoice.data,
        company=form.company.data,
        suma=form.suma.data,
        pvm=form.pvm.data,
    )

    try:
        db.session.add(invoice)
        db.session.commit()
        flash('You have successfully added a new invoice')
    except Exception as error:
        flash(error)

    return redirect("/")


# @app.route("/adddeal", methods = ["POST"])
# def adddeal():
#     try:
#         deal = request.json
#         conn = psycopg2.connect(**params)
#         cur = conn.cursor()
#         q = ("INSERT into deals (dates, invoice, company, amount, pvm) "
#             "SELECT '{0}', '{1}', '{2}', '{3}', '{4}' "
#             "WHERE NOT EXISTS (SELECT dates, invoice, company, amount, pvm FROM deals "
#             "WHERE dates='{0}' AND invoice='{1}' AND company='{2}' AND amount='{3}' AND pvm='{4}');")
#         sql = q.format(deal['date'], deal['invoice'], deal['company'], deal['sum'], deal['pvm'])
#         print(sql)
#         cur.execute(sql)
#         conn.commit()
#         print(deal, "saved to database!")
#     except (Exception, psycopg2.DatabaseError) as error: 
#         print(error)
#     finally:
#         if conn is not None:
#             conn.close()
#     return ",,!,,"

if __name__ == "__main__":
    app.run()

