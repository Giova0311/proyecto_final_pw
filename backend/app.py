from flask_jwt_extended import JWTManager, jwt_required, create_access_token, get_jwt_identity
from flask import Flask, request, jsonify
from flask_mysqldb import MySQL
from flask_cors import CORS
from config import Config
 
app = Flask(__name__)
app.config.from_object(Config)
CORS(app, resources={r"/*": {"origins": "*"}})
 
 
app.config["JWT_SECRET_KEY"] = "tu_clave_secreta_super_segura"
jwt = JWTManager(app)
 
 
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
        token = create_access_token(identity=str(user[0]))  # ✅ identity como string
        return jsonify({
            "message": "Inicio de sesión exitoso",
            "user": {
                "id": user[0],
                "nombre": user[1],
                "correo": user[2],
                "role": user[3]
            },
            "access_token": token
        }), 200
    else:
        return jsonify({"message": "Correo o contraseña incorrectos"}), 401
 
 
@app.route('/api/properties', methods=['GET', 'POST'])
def properties():
    if request.method == 'GET':
        cur = mysql.connection.cursor()
        cur.execute("SELECT id, titulo, precio, ubicacion, area, tipo, descripcion, owner_id FROM propiedades")
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
                "description": row[6],
                "owner_id": row[7]
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
        return jsonify({"message": "Property added successfully"}), 201
 
 
@app.route('/api/owner/properties/<int:owner_id>', methods=['GET'])
def get_owner_properties(owner_id):
    cur = mysql.connection.cursor()
    cur.execute("SELECT id, titulo, precio, ubicacion, area, tipo, descripcion, owner_id FROM propiedades WHERE owner_id = %s", (owner_id,))
    rows = cur.fetchall()
    cur.close()
 
    propiedades = []
    for row in rows:
        propiedades.append({
            "id": row[0],
            "title": row[1],
            "price": row[2],
            "location": row[3],
            "area": row[4],
            "type": row[5],
            "description": row[6],
            "owner_id": row[7]
        })
    return jsonify(propiedades), 200
 
 
@app.route('/api/properties/<int:id>', methods=['GET'])
def get_property(id):
    cur = mysql.connection.cursor()
    cur.execute("SELECT id, titulo, precio, ubicacion, area, tipo, descripcion, owner_id FROM propiedades WHERE id=%s", (id,))
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
            "description": row[6],
            "owner_id": row[7]
        }
        return jsonify(property), 200
    else:
        return jsonify({"message": "Property not found"}), 404
 
 
@app.route('/api/owner/properties/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_property(id):
    usuario_id = int(get_jwt_identity())  # ✅ convertir a int para comparar con la BD
    cur = mysql.connection.cursor()
    cur.execute("DELETE FROM propiedades WHERE id=%s AND owner_id=%s", (id, usuario_id))
    mysql.connection.commit()
    if cur.rowcount == 0:
        return jsonify({"message": "You do not have permission to delete this property"}), 403
    return jsonify({"message": "Property deleted successfully"}), 200
 
 
@app.route('/api/owner/properties/<int:id>', methods=['PUT'])
@jwt_required()
def update_property(id):
    usuario_id = int(get_jwt_identity())
    data = request.get_json()
    title = data.get("title")
    description = data.get("description")
    price = data.get("price")
    location = data.get("location")
    area = data.get("area")       # ✅
    tipo = data.get("type")       # ✅

    cur = mysql.connection.cursor()
    cur.execute("""
        UPDATE propiedades 
        SET titulo=%s, descripcion=%s, precio=%s, ubicacion=%s, area=%s, tipo=%s
        WHERE id=%s AND owner_id=%s
    """, (title, description, price, location, area, tipo, id, usuario_id))  # ✅
    mysql.connection.commit()
    if cur.rowcount == 0:
        return jsonify({"message": "You cannot edit this property because it does not belong to you"}), 403
    return jsonify({"message": "Property updated successfully"}), 200
 
 
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