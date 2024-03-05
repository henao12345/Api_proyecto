const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Conexión a MongoDB
mongoose.connect('mongodb://localhost:27017/gymDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Definir el esquema para usuarios
const userSchema = new mongoose.Schema({
    name: String,
    email: String
});
const User = mongoose.model('User', userSchema);

// Definir el esquema para entrenadores
const trainerSchema = new mongoose.Schema({
    name: String,
    specialty: String
});
const Trainer = mongoose.model('Trainer', trainerSchema);

// Definir el esquema para administradores
const adminSchema = new mongoose.Schema({
    name: String,
    role: String
});
const Admin = mongoose.model('Admin', adminSchema);

// Middleware para el manejo de datos JSON
app.use(bodyParser.json());

// Ruta de bienvenida
app.get('/', (req, res) => {
    res.send('Bienvenido a la API del gimnasio');
});

// Ruta para obtener todos los usuarios
app.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
});

// Ruta para crear un nuevo usuario
app.post('/users', async (req, res) => {
    try {
        const newUser = await User.create(req.body);
        res.json({ message: 'Usuario creado correctamente', user: newUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
});

// Ruta para eliminar un usuario por ID
app.delete('/users/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        // Aquí va el código para eliminar el usuario con el ID proporcionado
        await User.findByIdAndDelete(userId);
        res.json({ message: 'Usuario eliminado correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
});


// Ruta para obtener todos los entrenadores
app.get('/trainers', async (req, res) => {
    try {
        const trainers = await Trainer.find();
        res.json(trainers);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
});

// Ruta para crear un nuevo entrenador
app.post('/trainers', async (req, res) => {
    try {
        const newTrainer = await Trainer.create(req.body);
        res.json({ message: 'Entrenador creado correctamente', trainer: newTrainer });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
});

// Ruta para eliminar un entrenador por ID
app.delete('/trainers/:id', async (req, res) => {
    try {
        const trainerId = req.params.id;
        // Aquí va el código para eliminar el entrenador con el ID proporcionado
        await Trainer.findByIdAndDelete(trainerId);
        res.json({ message: 'Entrenador eliminado correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
});


// Ruta para obtener todos los administradores
app.get('/admins', async (req, res) => {
    try {
        const admins = await Admin.find();
        res.json(admins);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
});

// Ruta para crear un nuevo administrador
app.post('/admins', async (req, res) => {
    try {
        const newAdmin = await Admin.create(req.body);
        res.json({ message: 'Administrador creado correctamente', admin: newAdmin });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
});

// Ruta para eliminar un administrador por ID
app.delete('/admins/:id', async (req, res) => {
    try {
        const adminId = req.params.id;
        // Aquí va el código para eliminar el administrador con el ID proporcionado
        res.json({ message: 'Administrador eliminado correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
});
// Inicialización de datos de prueba
async function initializeData() {
    try {
        const usersCount = await User.countDocuments();
        const trainersCount = await Trainer.countDocuments();
        const adminsCount = await Admin.countDocuments();

        if (usersCount === 0) {
            await User.insertMany([
                { name: 'Pepito perez', email: 'usuario1@example.com' },
                { name: 'Juan alarcon ', email: 'usuario2@example.com' },
                { name: 'Mario alzola ', email: 'usuario3@example.com' }
            ]);
            console.log('Datos de usuarios de prueba inicializados correctamente.');
        }

        if (trainersCount === 0) {
            await Trainer.insertMany([
                { name: 'Roberto', specialty: 'CrossFit' },
                { name: 'Arnold', specialty: 'Yoga' },
                { name: 'Lucas', specialty: 'Pilates' }
            ]);
            console.log('Datos de entrenadores de prueba inicializados correctamente.');
        }

        if (adminsCount === 0) {
            await Admin.insertMany([
                { name: 'Juaquin', role: 'Admin' },
                { name: 'Jose', role: 'Supervisor' },
                { name: 'Argemiro', role: 'Manager' }
            ]);
            console.log('Datos de administradores de prueba inicializados correctamente.');
        }
    } catch (error) {
        console.error('Error al inicializar datos de prueba:', error);
    }
}

// Inicializar datos de prueba al iniciar la aplicación
initializeData();

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
