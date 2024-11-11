import University from "../universityThreeD/university";
import "./threeD.css";
import { Canvas } from "@react-three/fiber";

const ThreeD = () => {
  return (
    <Canvas camera={{ position: [3, 1.8, 8.6] }}>
      <University />
    </Canvas>
  );
};

export default ThreeD;
