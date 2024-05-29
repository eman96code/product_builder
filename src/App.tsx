import "./App.css";
import ProductCardList from "./components/ProductCardList";
import { Toaster } from "@/components/ui/toaster";

function App() {
  return (
    <div className="container mx-auto my-10">
      <ProductCardList />
      <Toaster />
    </div>
  );
}

export default App;
