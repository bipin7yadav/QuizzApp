
import './App.css';
import { Header,Footer } from './components';
import {Error} from "./pages/404/error"
import { Routes,Route } from 'react-router-dom';
import { LandingPage,Category } from './pages';

function App() {
  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route path="/" element={<LandingPage/>} />
        <Route path='/category' element={<Category/>}/>
        <Route path="*" element={<Error/>}/>
      </Routes>
      <Footer/>
      
    </div>
  );
}

export default App;
