import './App.css';
import routes from "./routing/Routes"
import { SocietyRegistrationPaths, SocietyRegistrationRoutes } from './interfaces/SocietyRegistrationInterfaces';
import { SocietyRegistrationRoute } from './routing/SocietyRegistrationRoute';
import { BrowserRouter as Router, Link } from "react-router-dom";
import { Container } from 'react-bootstrap';

function App() {
  return (
    <div className="App">
      <Router>
        <Container className="mb-5">
          <div className="d-flex justify-content-between">
            {
              Object.values(SocietyRegistrationPaths).map((path: string, index: number) => {
                return (
                  <div className={``} key={index}>
                    <Link to={path} >
                      <div style={{ color: "black" }}>
                        {path}
                      </div>
                    </Link>

                  </div>
                );
              })
            }
          </div>
        </Container>
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
