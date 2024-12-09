import { Canvas } from "@react-three/fiber";
import Experience from "./components/Experience";
import "./style/App.css";
import { Stats } from "@react-three/drei";

function App() {
  return (
    <div className="canvas-container">
      <Canvas
        dpr={1}
        camera={{ position: [0, 0, 2], fov: 70, near: 0.001, far: 1000 }}
      >
        <Stats />
        <Experience />
      </Canvas>
    </div>
  );
}

export default App;
