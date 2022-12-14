import logo from './logo.svg';
import './App.css';
import Home from './Home';

//for development
const CLIENT_URL = 'http://localhost:3000'
const SERVER_URL = 'http://localhost:5005'


//for deployment
// const CLIENT_URL = 'https://trapmap.herokuapp.com'
// const SERVER_URL = 'https://trapmap.herokuapp.com'





function App() {
  return (
    <Home />
  );
}



export default App;
