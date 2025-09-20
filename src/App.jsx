import './styles/style.css'
import VisitanteLayout from './pages/visitante/VisitanteLayout.jsx'
import Login from './Login.jsx'
import SignupForm from './SignupForm.jsx'
import HomePaciente from './pages/paciente/HomePaciente.jsx'
import CitasPaciente from './pages/paciente/CitasPaciente.jsx'
import MiPerfilPaciente from './pages/paciente/MiPerfilPaciente.jsx'
import CitasProximasPaciente from './pages/paciente/CitasProximasPaciente.jsx'
import CitasPasadasPaciente from './pages/paciente/CitasPasadasPaciente.jsx'
import Calendar from './pages/paciente/Calendar.jsx'
import PedirCita from './pages/paciente/PedirCita.jsx'
import { Prueba } from './Prueba.jsx'
import ProtectedRoute from './ProtectedRoute.jsx'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        {/* Rutas públicas */}
        <Route path="/" element={<VisitanteLayout />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/prueba" element={<Prueba />} />

        {/* Rutas privadas de paciente */}
        <Route path="/paciente" element={
          <ProtectedRoute>
            <HomePaciente />
          </ProtectedRoute>
        } />
        <Route path="/paciente/citas" element={
          <ProtectedRoute>
            <CitasPaciente />
          </ProtectedRoute>
        } />
        <Route path="/paciente/citas/proximas" element={
          <ProtectedRoute>
            <CitasProximasPaciente />
          </ProtectedRoute>
        } />
        <Route path="/paciente/citas/pasadas" element={
          <ProtectedRoute>
            <CitasPasadasPaciente />
          </ProtectedRoute>
        } />
        <Route path="/paciente/miperfil" element={
          <ProtectedRoute>
            <MiPerfilPaciente />
          </ProtectedRoute>
        } />
        <Route path="/paciente/calendario" element={
          <ProtectedRoute>
            <Calendar />
          </ProtectedRoute>
        } />
        <Route path="/paciente/citas/pedirCita" element={
          <ProtectedRoute>
            <PedirCita />
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  )
}

export default App
