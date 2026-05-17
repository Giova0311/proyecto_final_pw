from flask import Flask, request, jsonify
from flask_mysqldb import MySQL
from flask_cors import CORS
from config import Config

app = Flask(__name__)
app.config.from_object(Config)
CORS(app)

mysql = MySQL(app)

@app.route('/api/auth/register', methods=['POST'])
def register():
    data = request.get_json()
    nombre = data.get('name')
    correo = data.get('email')
    password = data.get('password')
    tipo_usuario = data.get('role')

    cur = mysql.connection.cursor()
    cur.execute("INSERT INTO usuarios (nombre, correo, password, tipo_usuario) VALUES (%s, %s, %s, %s)",
                (nombre, correo, password, tipo_usuario))
    mysql.connection.commit()
    cur.close()

    return jsonify({'message': 'Usuario registrado correctamente'}), 201

@app.route('/api/auth/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    cur = mysql.connection.cursor()
    cur.execute("SELECT id, nombre, correo, tipo_usuario FROM usuarios WHERE correo = %s AND password = %s", (email, password))
    user = cur.fetchone()
    cur.close()

    if user:
        return jsonify({
            "message": "Inicio de sesión exitoso",
            "user": {
                "id": user[0],
                "nombre": user[1],
                "correo": user[2],
                "role": user[3]
            }
        }), 200
    else:
        return jsonify({"message": "Correo o contraseña incorrectos"}), 401


@app.route('/api/properties', methods=['GET', 'POST'])
def properties():
    if request.method == 'GET':
        cur = mysql.connection.cursor()
        cur.execute("SELECT id, titulo, precio, ubicacion, area, tipo, descripcion FROM propiedades")
        data = cur.fetchall()
        cur.close()

        propiedades = []
        for row in data:
            propiedades.append({
                "id": row[0],
                "title": row[1],
                "price": row[2],
                "location": row[3],
                "area": row[4],
                "type": row[5],
                "description": row[6]
            })
        return jsonify(propiedades), 200

    elif request.method == 'POST':
        data = request.get_json()
        cur = mysql.connection.cursor()
        cur.execute("""INSERT INTO propiedades 
            (titulo, precio, ubicacion, area, tipo, descripcion, owner_id) 
            VALUES (%s, %s, %s, %s, %s, %s, %s)""",
            (data['title'], data['price'], data['location'], data['area'], data['type'], data['description'], data['owner_id']))
        mysql.connection.commit()
        cur.close()
        return jsonify({"message": "Propiedad agregada con éxito"}), 201


@app.route('/api/owner/properties/<int:owner_id>', methods=['GET'])
def get_owner_properties(owner_id):
    cur = mysql.connection.cursor()
    cur.execute("SELECT * FROM propiedades WHERE owner_id = %s", (owner_id,))
    data = cur.fetchall()
    cur.close()
    return jsonify(data), 200

@app.route('/api/owner/properties', methods=['POST'])
def add_property():
    data = request.get_json()
    cur = mysql.connection.cursor()
    cur.execute("""INSERT INTO propiedades 
        (titulo, precio, ubicacion, area, tipo, descripcion, owner_id) 
        VALUES (%s, %s, %s, %s, %s, %s, %s)""",
        (data['title'], data['price'], data['location'], data['area'], data['type'], data['description'], data['owner_id']))
    mysql.connection.commit()
    cur.close()
    return jsonify({"message": "Propiedad agregada con éxito"}), 201

@app.route('/api/owner/properties/<int:id>', methods=['PUT'])
def update_property(id):
    data = request.get_json()
    titulo = data.get('title')
    precio = data.get('price')
    ubicacion = data.get('location')
    area = data.get('area')
    tipo = data.get('type')
    descripcion = data.get('description')

    cur = mysql.connection.cursor()
    cur.execute("""
        UPDATE propiedades 
        SET titulo=%s, precio=%s, ubicacion=%s, area=%s, tipo=%s, descripcion=%s
        WHERE id=%s
    """, (titulo, precio, ubicacion, area, tipo, descripcion, id))
    mysql.connection.commit()
    cur.close()

    return jsonify({"message": "Propiedad actualizada con éxito"}), 200


@app.route('/api/owner/properties/<int:id>', methods=['DELETE'])
def delete_property(id):
    cur = mysql.connection.cursor()
    cur.execute("DELETE FROM propiedades WHERE id=%s", (id,))
    mysql.connection.commit()
    cur.close()

    return jsonify({"message": "Propiedad eliminada con éxito"}), 200

@app.route('/api/properties/<int:id>', methods=['GET'])
def get_property(id):
    cur = mysql.connection.cursor()
    cur.execute("SELECT id, titulo, precio, ubicacion, area, tipo, descripcion FROM propiedades WHERE id=%s", (id,))
    row = cur.fetchone()
    cur.close()

    if row:
        property = {
            "id": row[0],
            "title": row[1],
            "price": row[2],
            "location": row[3],
            "area": row[4],
            "type": row[5],
            "description": row[6]
        }
        return jsonify(property), 200
    else:
        return jsonify({"message": "Propiedad no encontrada"}), 404

@app.route('/api/contact', methods=['POST'])
def contact():
    data = request.get_json()
    nombre = data.get('nombre')
    correo = data.get('correo')
    mensaje = data.get('mensaje')

    cur = mysql.connection.cursor()
    cur.execute("INSERT INTO contactos (nombre, correo, mensaje) VALUES (%s, %s, %s)", 
                (nombre, correo, mensaje))
    mysql.connection.commit()
    cur.close()

    return jsonify({"message": "Mensaje guardado con éxito"}), 201

@app.route('/api/contact', methods=['GET'])
def get_contacts():
    cur = mysql.connection.cursor()
    cur.execute("SELECT id, nombre, correo, mensaje, fecha FROM contactos ORDER BY fecha DESC")
    rows = cur.fetchall()
    cur.close()

    contactos = []
    for row in rows:
        contactos.append({
            "id": row[0],
            "nombre": row[1],
            "correo": row[2],
            "mensaje": row[3],
            "fecha": row[4].strftime("%Y-%m-%d %H:%M:%S")
        })
    return jsonify(contactos), 200


if __name__ == '__main__':
    app.run(debug=True, port=5000)
    



