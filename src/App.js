import DonorListTable from "./components/donorListTable/DonorListTable";
import Feature from "./components/feature/Feature";
import Navbar from "./components/header/Navbar";
import "./styles.css";

export default function App() {
  return (
    <div className="App">
      <Navbar />
      <Feature />
      <DonorListTable />
    </div>
  );
}
