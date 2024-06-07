import "./App.css";
import { ProductsList } from "./modules/ProductsList";
import { OrdersList } from "./modules/OrdersList";

const App = () => {
  return (
    <div className="content">
      <h1>Systemy gridowe</h1>
      <ProductsList />
      <OrdersList />
    </div>
  );
};

export default App;
