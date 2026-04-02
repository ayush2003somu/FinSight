import Dashboard from "./pages/Dashboard";
import { AppProvider } from "./context/AppProvider";

function App() {
  return (
    <AppProvider>
      <Dashboard />
    </AppProvider>
  );
}

export default App;