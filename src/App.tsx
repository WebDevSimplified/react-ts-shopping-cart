import { Routes, Route } from "react-router-dom"
import { Container } from "react-bootstrap"
import { Store } from "./pages/Store"
import { About } from "./pages/About"
import { Navbar } from "./components/Navbar"
import { ShoppingCartProvider } from "./context/ShoppingCartContext"
import Home from "./pages/Home"
import Footer from "./components/Footer"
import Orders from "./components/Orders"
import CheckoutSuccess from "./components/CheckoutSuccess"

function App() {
  return (
    <ShoppingCartProvider>
      <Navbar />
      <div style={{ minHeight: "100vh", margin: "0", padding: "0" }} className="app-container">
      <Container className="mb-4" style={{paddingTop: "1rem", paddingBottom: "1rem" }}>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/store" element={<Store />} />
          <Route path="/about" element={<About />} />
          <Route path="/Orders/:id" element={<Orders/>} />
          <Route path="checkout-success" element={<CheckoutSuccess/>} />
          {/* <Route path="*" element={<404/>} /> */}
        </Routes>
      </Container>
      </div>
      <Footer/>
    </ShoppingCartProvider>
  )
}

export default App
