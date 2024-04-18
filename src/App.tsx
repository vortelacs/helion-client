import "./App.css";
import { useState } from "react";
import Header from "./components/common/Header";
import ProcessForm from "./pages/ProcessForm";
import ProcessTable from "./pages/ProcessTable";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  const [showForm, setShowForm] = useState(true);

  const handleNavigateToForm = () => {
    setShowForm(true);
  };

  const handleNavigateToTable = () => {
    setShowForm(false);
  };

  return (
    <div>
      <ToastContainer />
      <Header
        onNavigateToForm={handleNavigateToForm}
        onNavigateToTable={handleNavigateToTable}
      />
      <div className="min-h-screen flex items-center justify-center relative group">
        {showForm ? <ProcessForm /> : <ProcessTable />}
      </div>
    </div>
  );
}

export default App;
