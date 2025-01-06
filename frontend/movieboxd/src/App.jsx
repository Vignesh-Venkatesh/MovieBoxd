// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import Landing from "./Landing";
import Footer from "./components/Footer";
import LoginSignup from "./components/LoginSignup";

function App() {
  return (
    <MantineProvider>
      <Landing></Landing>
      <Footer></Footer>
    </MantineProvider>
  );
}

export default App;
