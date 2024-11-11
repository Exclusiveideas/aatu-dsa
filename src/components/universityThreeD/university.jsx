import { OrbitControls } from "@react-three/drei";
import { Campus } from "../models/Campus";

const University = () => {
  return (
    <>
      <ambientLight intensity={5} />
      <OrbitControls
        makeDefault
        minPolarAngle={Math.PI / 2.3}
        maxPolarAngle={Math.PI / 2.3}
        enableZoom={false}
        target={[3, 2, 9.0625]}
      />
      <Campus position={[3, 2, 9.0625]} />
    </>
  );
};

export default University;
