from flask import Flask, render_template, url_for

backend = Flask(__name__)

@backend.route('/')
def paginaPrincipal():
    return render_template('paginaPrincipal.html')

@backend.route('/contato')
def contato():
    return render_template('contato.html')

if __name__ == '__main__':
    backend.run(debug=True)