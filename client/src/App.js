import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './Login'
import Dashboard from './Dashboard'

const code = new URLSearchParams(window.location.search).get('code'); // gets access code value from code key after ? in url

function App() {
  return code ? <Dashboard code = {code}/> : <Login /> // returns one component or the other
}

export default App;
