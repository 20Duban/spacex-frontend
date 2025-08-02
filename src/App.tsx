import { useEffect, useState } from "react"; 
import {Container} from "react-bootstrap";

import { getLaunches } from "./services/launchService";
import { Launch } from "./domains/launch";


function LaunchCard(
  {
    launchName, 
    flightNumber, 
    description, 
    urlImage,
    webcastUrl
  }: Launch
) {

  const [hover, setHover] = useState(false);

  return (
    <a
      href={webcastUrl}
      target="_blank"
      rel="noopener noreferrer"
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <Container
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{
          backgroundColor: hover ? '#75E8FA' : 'white',
          boxShadow: hover ? '0 0 10px rgba(0,0,0,0.2)' : 'none',
          transition: 'all 0.4s ease-in-out',
          cursor: 'pointer',
          transform: hover ? "scale(1.02)": "scale(1)"
        }} 
        className="d-flex flex-column border rounded shadow p-4 mt-4 "
      >
        <Container className="d-flex flex-row justify-content-between">
          <h1 className="">{launchName}</h1>
          <h2>{flightNumber}</h2>
        </Container>
        <hr/>
        <Container className="d-flex flex-row">
          <img 
            style={{ width: '100px', height: '100px', borderRadius: '10px' }}
            src={urlImage} alt="image"
          />
          <p className="m-2">
            {description}
          </p>
        </Container>
      </Container>
    </a>
  );
}


function App() {

  const [launches, setLaunches] = useState<Launch[] | null>(null);

  useEffect(() => {

    getLaunches()
      .then(data => {
        setLaunches(data);
      });

    return ()=>{};

  }, []);

  return (
    <Container className="mt-4">
      <h1 className="text-center text-dark display-2 fw-bold">SpaceX</h1>

      <Container style={{ maxHeight: "100vh", overflowY: "auto" }} className="p-3">
        {launches?.map((launch) => (
          <div key={launch.flightNumber}>
            <LaunchCard {...launch} />
          </div>
        ))}
      </Container>

    </Container>
  );
}

export default App;
