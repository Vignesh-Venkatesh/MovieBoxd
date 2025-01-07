// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import Landing from "./Landing";
import LoginSignup from "./components/LoginSignup";
import Profile from "./Profile";
import Movie from "./Movie";
import Footer from "./components/Footer";

function App() {
  return (
    <MantineProvider>
      {/* <Profile></Profile> */}
      {/* <Landing></Landing> */}
      {/* <LoginSignup></LoginSignup> */}
      <Movie></Movie>
      <Footer></Footer>
    </MantineProvider>
  );
}

export default App;
