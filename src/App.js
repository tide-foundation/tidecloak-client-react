import React from "react";
import "./styles.css";
import Keycloak from "keycloak-js";

export default function App() {
  // function initKeycloak() {
  var keycloak = new Keycloak({
    url: "https://staging.dauth.me",
    realm: "mytest",
    clientId: "myclient"
  });

  keycloak
    .init({
      checkLoginIframe : false
    })
    .then(function (authenticated) {
      alert(authenticated ? keycloak.token : "not authenticated");
    })
    .catch(function (ex) {
      console.log(ex);
      alert("failed to initialize");
    });

  const loginUrl = keycloak.createLoginUrl({
    scope: "openid",
    redirectUri: "http://localhost:6001/",
    locale: "en",
    checkLoginIframe: false
  });

  const registerUrl = keycloak.createRegisterUrl({
    scope: "openid email",
    redirectUri: "http://localhost:6001/code",
    locale: "en",
    action: "register",
    prompt: "login",
    checkLoginIframe: false
  });

  console.log('registerUrl', registerUrl)
  console.log('loginUrl', loginUrl)

  const handleRegisterClick = () => {
    keycloak
      .register({
        scope: "openid",
        redirectUri: "http://localhost:6001/code",
        locale: "en",
        action: "register",
        prompt: "login",
        checkLoginIframe: false
      })
      .then((result) => {
        console.log("result", result);
      });
  };

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <a href={loginUrl} rel="noreferrer" target="_blank">
        loginUrl
      </a>
      <h2>Start editing to see some magic happen!</h2>
      <a href={registerUrl} rel="noreferrer" target="_blank">
        registerUrl
      </a>
      <h2>Start editing to see some magic happen!</h2>
      <button onClick={handleRegisterClick}>registerButton</button>
    </div>
  );
}
