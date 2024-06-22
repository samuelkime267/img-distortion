import { Canvas } from "@react-three/fiber";
import Experience from "./components/Experience";
import "./style/App.css";

function App() {
  return (
    <div className="canvas-container">
      <Canvas camera={{ position: [0, 0, 2], fov: 70, near: 0.001, far: 1000 }}>
        <Experience />
      </Canvas>
    </div>
  );
}

export default App;
