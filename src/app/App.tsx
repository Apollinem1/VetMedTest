import { Navigate, Route, Routes } from 'react-router-dom'
import { AuthProvider } from './providers'
import { DevRoleSwitcher } from './ui/DevRoleSwitcher'
import { LandingPage, CabinetPage, PetDetailPage, PetCreatePage } from '@/pages'
import { LoginModal, RegisterModal } from '@/features/auth'
import { Toaster } from 'core-frontend'

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/cabinet" element={<CabinetPage />} />
        <Route path="/cabinet/pet/new" element={<PetCreatePage />} />
        <Route path="/cabinet/pet/:id" element={<PetDetailPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <LoginModal />
      <RegisterModal />
      <Toaster placement="bottom end" />
      <DevRoleSwitcher />
    </AuthProvider>
  )
}

export default App
