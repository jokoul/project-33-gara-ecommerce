import { useParams } from "react-router-dom";

function ProductScreen() {
  const params = useParams(); //We use useParams Hooks puuled from react-router-dom library
  const { slug } = params; //This hooks allow to get route parameters like slug in this case

  return (
    <div>
      <h1>{slug}</h1>
    </div>
  );
}

export default ProductScreen;
