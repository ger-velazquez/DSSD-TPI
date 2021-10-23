import './App.css';
import routes from "./routing/Routes"
import { SocietyRegistrationRoutes } from './interfaces/SocietyRegistrationInterfaces';
import { SocietyRegistrationRoute } from './routing/SocietyRegistrationRoute';
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        {
          routes.map((route: SocietyRegistrationRoutes) => (
            <SocietyRegistrationRoute
              key={route.path}
              aRoute={route}
            />
          ))
        }
      </Router>
    </div>
  );
}

export default App;
