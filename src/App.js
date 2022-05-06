
import './App.css';
import { Header, Footer } from './components';
import { Error } from "./pages/404/error"
import { Routes, Route } from 'react-router-dom';
import { LandingPage, Category, Login, SignUp, Rules } from './pages';
import RequireAuth from "./Authentication/requireAuth"
import { MathsQuiz } from "./quizPage/mathsquiz"
import { Result } from "./pages/result/result"
import  {useQuest} from "./context/context"


function App() {
  const {arrayState:{mode}}=useQuest()
  return (
    <div className="App" style={{backgroundColor:mode ? "white":"dodgerBlue"}}>
      <Header  />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/rules" element={
          <RequireAuth>
            <Rules />
          </RequireAuth>} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/category' element={
          <RequireAuth>
            <Category />
          </RequireAuth>
        } />
        <Route path="*" element={<Error />} />
        <Route path="/quiz" element={
          <RequireAuth>
            <MathsQuiz />
          </RequireAuth>
        } />
        <Route path="/result" element={
          <RequireAuth>
            <Result />
          </RequireAuth>
        } />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
