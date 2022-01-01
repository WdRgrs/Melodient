import LoginAuth from './LoginAuth'
import Home from './Home';

let sessionStorage = window.sessionStorage;

const accessToken = new URLSearchParams(window.location.search).get('access_token')

if (accessToken) {
  sessionStorage.setItem('access_token', accessToken)
}

const authenticated = sessionStorage.getItem('access_token')

if (authenticated && window.location.href.includes('?')) {
  window.history.pushState({}, null, '/')
}

function App() {
  return (
    accessToken || authenticated ? 
    <Home accessToken={authenticated} />
    : <LoginAuth />
  );
}

export default App;
