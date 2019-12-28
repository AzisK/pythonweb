from flask import Flask, flash, render_template, redirect
from flask_cors import CORS
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


@app.route("/")
def main():
    return render_template("index.html")


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


if __name__ == "__main__":
    app.run()
