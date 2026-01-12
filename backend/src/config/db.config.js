import mongoose from 'mongoose';

const MONGODB_URI = 'mongodb+srv://caligo_user:Caligo2025@caligo.efwmkj8.mongodb.net/caligo?retryWrites=true&w=majority';

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Conectado a MongoDB Atlas exitosamente');
    console.log('📊 Base de datos:', mongoose.connection.name);
  } catch (error) {
    console.error('❌ Error al conectar con MongoDB:', error.message);
    process.exit(1);
  }
};

mongoose.connection.on('disconnected', () => {
  console.log('⚠️ MongoDB desconectado');
});

mongoose.connection.on('error', (error) => {
  console.error('❌ Error en MongoDB:', error);
});

export default connectDB;