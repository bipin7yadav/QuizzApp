
import './App.css';
import { Header, Footer } from './components';
import { Error } from "./pages/404/error"
import { Routes, Route } from 'react-router-dom';
import { LandingPage, Category, Login, SignUp, Rules } from './pages';
import RequireAuth from "./Authentication/requireAuth"


function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path='/category' element={
          <RequireAuth>
            <Category />
          </RequireAuth>
        } />
        <Route path="*" element={<Error />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path="/rules" element={
          <RequireAuth>
            <Rules />
          </RequireAuth>
        } />
      </Routes>
      <Footer />

    </div>
  );
}

export default App;
