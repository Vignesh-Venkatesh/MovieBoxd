// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import Landing from "./Landing";
import Footer from "./components/Footer";
import LoginSignup from "./components/LoginSignup";
import Profile from "./Profile";

function App() {
  return (
    <MantineProvider>
      <Profile></Profile>
      {/* <Landing></Landing> */}
      {/* <LoginSignup></LoginSignup> */}
      <Footer></Footer>
    </MantineProvider>
  );
}

export default App;
