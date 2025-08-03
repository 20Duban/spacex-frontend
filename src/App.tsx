import { useEffect, useState } from "react"; 
import {Container} from "react-bootstrap";

import { getLaunches } from "./services/launchService";
import { Launch } from "./domains/launch";
import LaunchCard from "./components/launchCard";

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
      <h1 className="text-center text-dark display-2 fw-bold">SpaceX
      </h1>
      <Container style={{ maxHeight: "100vh", overflowY: "auto" }} className="p-3">
        {launches?.map((launch) => (
          <div key={launch.id}>
            <LaunchCard {...launch} />
          </div>
        ))}
      </Container>

    </Container>
  );
}

export default App;
