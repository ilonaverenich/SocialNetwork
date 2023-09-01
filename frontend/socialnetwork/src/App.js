import './App.css';
import { useRoutes } from './routs';
import { useSelector } from 'react-redux';
import i18n from './i18n';

function App() {
  const statusAuth = useSelector((store) => store.data.statusAuth);
  const routes = useRoutes(statusAuth);

  return (
    <div className="App">
       {routes} 
    </div>
  );
}

export default App;






