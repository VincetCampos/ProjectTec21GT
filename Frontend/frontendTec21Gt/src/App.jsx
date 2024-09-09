import {BrowserRouter, Routes, Route} from "react-router-dom"
import { Home } from "./componentes/home"
import { Catalogo } from "./componentes/Catalogo"
import { Productos } from "./componentes/productos"
import { Equipos } from "./componentes/equipos"
import { InfoProducto } from "./componentes/infoProducto"
import Narbar from "./componentes/Narbar"
import { MainEmpleado } from "./componentes/mainEmpleado"
import { CrearEmpleado } from "./componentes/crearEmpleado"
import { LoginPage } from "./pages/loginPage"
import { AuthProvider } from "./context/AuthContext"
import ProtectedRoute from "./ProtectedRoutes"

function App() {
  
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
            <Narbar/>
            <Routes>
            <Route path="/Login" element ={ <LoginPage/>}></Route>
              <Route element={<ProtectedRoute/>}>
                <Route path="/" element={ <Home/>}></Route>
                <Route path="/Catalogo" element = {<Catalogo/>}/>
                <Route path="/Producto" element = {<Productos/>}/>
                <Route path="/Equipos" element={ <Equipos/> }/>
                <Route path="/Producto/:noProducto" element={ <InfoProducto/>}></Route>
                <Route path="/Empleado" element={ <MainEmpleado/> }></Route>
                <Route path="/Empleado/CrearEmpleado" element={ <CrearEmpleado/> }></Route>
              </Route>
            </Routes>
          </BrowserRouter>
      </AuthProvider>
    </>
  )
}
export default App
