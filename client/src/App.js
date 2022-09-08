import "./App.css";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import SignIn from "./components/SignIn/index";
import Profile from "./Pages/Profile";
import ResponsiveAppBar from "./components/navbar";
import Landing from "./Pages/Landing";
import EventPage from "./Pages/EventPage";
import { Container } from "@mui/system";
import Footer from "./components/Footer";
import { useState } from "react";
import ReviewForm from "./components/ReviewForm/index";

const client = new ApolloClient({
  uri: "/graphql",
  cache: new InMemoryCache(),
});

let recentLocations = [
  "Birmingham",
  "London",
  "Derby",
  "Brighton",
  "Manchester",
  "Leeds",
];

function App() {
  const [recentSearches, setRecentSearches] = useState(recentLocations);
  const [signInOpen, setSignInOpen] = useState(false)

  function openSignIn(){
    setSignInOpen((prev)=>!prev)
  }

  function closeSignIn(event){
    const isCloseBox = event.target.getAttribute("value")

    setSignInOpen((prev)=>{
      return isCloseBox? !prev:prev;
    })
  }

  function renderSingIn(){
    return signInOpen? <SignIn signInStateOpener={closeSignIn} />:'';
  }

  return (
    <ApolloProvider client={client}>
    {renderSingIn()}
    <Router>
    {renderSingIn}
        <Container maxWidth="xl">
          <ResponsiveAppBar signInStateOpener={openSignIn} />
          <Routes>
            <Route
              path="/"
              element={<Landing recentSearches={recentSearches} />}
            />
            <Route>
              <Route path="/user/:usedId" element={<Profile />} />
            </Route>
            <Route>
              <Route path="/test" element={<ReviewForm />} />
            </Route>
          </Routes>
          <Footer />
        </Container>
      </Router>
    </ApolloProvider>
  );
}

export default App;
