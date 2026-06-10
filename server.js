const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(express.static(__dirname));
app.use(cors());

const PORT = 5000;
const MONGO_URI = "mongodb+srv://EugenioAaron:Clikashihp790@cluster0.wfdtpq5.mongodb.net/?appName=Cluster0";
const ADMIN_PASSWORD = "Admin_LM"; 

mongoose.connect(MONGO_URI)
    .then(() => console.log("✅ Conectado exitosamente a MongoDB"))
    .catch(err => console.error("❌ Error al conectar a MongoDB:", err));

// ============================================================
// =================== MODELOS DE BASE DE DATOS ===============
// ============================================================

// --- 1. PACIENTES ---
const Pacientes2Schema = new mongoose.Schema({
    id_paciente: String,
    nombre: String,
    apellido_paterno: String,
    apellido_materno: String,
    fecha_nac: String,
    genero: String,
    tipo_sangre: String,
    alergias: String,
    contacto_emergencia: String,
    documento_identidad: String,
    seguro_social: String,
    num_seguro_social: String,
    medico_assigned: String,
    motivo_cita: String,
    habitacion: String,
    medicamento_recetado: String
});
const Pacientes2 = mongoose.model("Pacientes2", Pacientes2Schema);

// --- 2. MÉDICOS (AQUÍ ESTÁ LA CORRECCIÓN DE TUS CAMPOS) ---
const Medicos2Schema = new mongoose.Schema({
    id_medico: String,
    nombre_medico: String,
    especialidad: String,
    rfc: String,
    cedula_profesional: String,
    turno: String,
    telefono: String,
    email: String
});
const Medicos2 = mongoose.model("Medicos2", Medicos2Schema);

// --- 3. CITAS MÉDICAS ---
const CitasMedicas2Schema = new mongoose.Schema({
    id_cita: String,
    nombre_paciente: String,
    nombre_medico: String,
    fecha_hora: String,
    consultorio: String,
    estado: String,
    costo: String
});
const CitasMedicas2 = mongoose.model("CitasMedicas2", CitasMedicas2Schema);

// --- 4. INVENTARIO ---
const Inventario2Schema = new mongoose.Schema({
    id_consumo: String,
    producto: String,
    categoria: String,
    stock: Number,
    unidad: String,
    precio: String,
    fecha_caducidad: String,
    proveedor: String
});
const Inventario2 = mongoose.model("Inventario2", Inventario2Schema);


// ============================================================
// ===================== RUTAS: PACIENTES =====================
// ============================================================
app.post("/pacientes2", async (req, res) => {
    try {
        await new Pacientes2(req.body).save();
        res.json({ mensaje: "Paciente registrado correctamente" });
    } catch (e) {
        res.status(500).json({ error: "Error al registrar paciente" });
    }
});

app.get("/pacientes2", async (req, res) => {
    try {
        res.json(await Pacientes2.find());
    } catch (e) {
        res.status(500).json({ error: "Error al obtener pacientes" });
    }
});

app.put("/pacientes2/:id", async (req, res) => {
    if (req.headers["admin-password"] !== ADMIN_PASSWORD) {
        return res.status(403).json({ error: "Contraseña incorrecta." });
    }
    try {
        const paciente = await Pacientes2.findOneAndUpdate({ id_paciente: req.params.id }, req.body, { new: true });
        if (!paciente) return res.status(404).json({ error: "Paciente no encontrado" });
        res.json({ mensaje: "Datos del paciente actualizados correctamente" });
    } catch (e) {
        res.status(500).json({ error: "Error al actualizar paciente" });
    }
});

app.delete("/pacientes2/:id", async (req, res) => {
    if (req.headers["admin-password"] !== ADMIN_PASSWORD) {
        return res.status(403).json({ error: "Contraseña incorrecta." });
    }
    try {
        const eliminado = await Pacientes2.findOneAndDelete({ id_paciente: req.params.id });
        if (!eliminado) return res.status(404).json({ error: "Paciente no encontrado" });
        res.json({ mensaje: "Paciente eliminado del sistema correctamente" });
    } catch (e) {
        res.status(500).json({ error: "Error al eliminar paciente" });
    }
});


// ============================================================
// ====================== RUTAS: MÉDICOS ======================
// ============================================================
app.post("/medicos2", async (req, res) => {
    try {
        await new Medicos2(req.body).save();
        res.json({ mensaje: "Médico registrado correctamente" });
    } catch (e) {
        res.status(500).json({ error: "Error al registrar médico" });
    }
});

app.get("/medicos2", async (req, res) => {
    try {
        res.json(await Medicos2.find());
    } catch (e) {
        res.status(500).json({ error: "Error al obtener la lista de médicos" });
    }
});

app.put("/medicos2/:id", async (req, res) => {
    if (req.headers["admin-password"] !== ADMIN_PASSWORD) {
        return res.status(403).json({ error: "Contraseña incorrecta." });
    }
    try {
        const medico = await Medicos2.findOneAndUpdate({ id_medico: req.params.id }, req.body, { new: true });
        if (!medico) return res.status(404).json({ error: "Médico no encontrado" });
        res.json({ mensaje: "Información del médico actualizada correctamente" });
    } catch (e) {
        res.status(500).json({ error: "Error al actualizar médico" });
    }
});

app.delete("/medicos2/:id", async (req, res) => {
    if (req.headers["admin-password"] !== ADMIN_PASSWORD) {
        return res.status(403).json({ error: "Contraseña incorrecta." });
    }
    try {
        const eliminado = await Medicos2.findOneAndDelete({ id_medico: req.params.id });
        if (!eliminado) return res.status(404).json({ error: "Médico no encontrado" });
        res.json({ mensaje: "Médico eliminado del sistema correctamente" });
    } catch (e) {
        res.status(500).json({ error: "Error al eliminar médico" });
    }
});


// ============================================================
// ==================== RUTAS: CITAS MÉDICAS ==================
// ============================================================
app.post("/citasmedicas2", async (req, res) => {
    try {
        await new CitasMedicas2(req.body).save();
        res.json({ mensaje: "Cita programada correctamente" });
    } catch (e) {
        res.status(500).json({ error: "Error al programar cita" });
    }
});

app.get("/citasmedicas2", async (req, res) => {
    try {
        res.json(await CitasMedicas2.find());
    } catch (e) {
        res.status(500).json({ error: "Error al obtener citas" });
    }
});

app.put("/citasmedicas2/:id", async (req, res) => {
    if (req.headers["admin-password"] !== ADMIN_PASSWORD) {
        return res.status(403).json({ error: "Contraseña incorrecta." });
    }
    try {
        const actualizada = await CitasMedicas2.findOneAndUpdate({ id_cita: req.params.id }, req.body, { new: true });
        if (!actualizada) return res.status(404).json({ error: "Cita no encontrada" });
        res.json({ mensaje: "Cita actualizada correctamente" });
    } catch (e) {
        res.status(500).json({ error: "Error al actualizar cita" });
    }
});

app.delete("/citasmedicas2/:id", async (req, res) => {
    if (req.headers["admin-password"] !== ADMIN_PASSWORD) {
        return res.status(403).json({ error: "Contraseña incorrecta." });
    }
    try {
        const eliminada = await CitasMedicas2.findOneAndDelete({ id_cita: req.params.id });
        if (!eliminada) return res.status(404).json({ error: "Cita no encontrada" });
        res.json({ mensaje: "Cita deleted correctamente" });
    } catch (e) {
        res.status(500).json({ error: "Error al eliminar cita" });
    }
});


// ============================================================
// ===================== RUTAS: INVENTARIO ====================
// ============================================================
app.post("/inventario2", async (req, res) => {
    try {
        await new Inventario2(req.body).save();
        res.json({ mensaje: "Producto registrado correctamente" });
    } catch (e) {
        res.status(500).json({ error: "Error al registrar producto" });
    }
});

app.get("/inventario2", async (req, res) => {
    try {
        res.json(await Inventario2.find());
    } catch (e) {
        res.status(500).json({ error: "Error al obtener el inventario" });
    }
});

app.put("/inventario2/:id", async (req, res) => {
    if (req.headers["admin-password"] !== ADMIN_PASSWORD) {
        return res.status(403).json({ error: "Contraseña incorrecta." });
    }
    try {
        const prod = await Inventario2.findOneAndUpdate({ id_consumo: req.params.id }, req.body, { new: true });
        if (!prod) return res.status(404).json({ error: "Insumo no encontrado" });
        res.json({ mensaje: "Inventario actualizado correctamente" });
    } catch (e) {
        res.status(500).json({ error: "Error al actualizar inventario" });
    }
});

app.delete("/inventario2/:id", async (req, res) => {
    if (req.headers["admin-password"] !== ADMIN_PASSWORD) {
        return res.status(403).json({ error: "Contraseña incorrecta." });
    }
    try {
        const prod = await Inventario2.findOneAndDelete({ id_consumo: req.params.id });
        if (!prod) return res.status(404).json({ error: "Insumo no encontrado" });
        res.json({ mensaje: "Insumo eliminado correctamente" });
    } catch (e) {
        res.status(500).json({ error: "Error al eliminar producto" });
    }
});

// Lanzamiento del servidor (Disparado usando la variable PORT declarada al inicio)
app.listen(PORT, () => console.log(`Servidor Backend corriendo en http://localhost:${PORT}`));
