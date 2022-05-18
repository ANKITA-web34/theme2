import { render } from "react-dom";
import "./Sass file/index.scss";
import { App } from "./App";
import {
  KcApp as KcAppBase,
  defaultKcProps,
  getKcContext,
  kcMessages,
  useDownloadTerms
} from "keycloakify";
import { useCssAndCx } from "tss-react";
import tos_en_url from "./tos_en.md";
import "./kcMessagesExtension"

const { kcContext } = getKcContext({
  /* Uncomment to test th<e login page for development */
  "mockPageId": "login-idp-link-confirm.ftl",
  "mockData": [
    {
      "pageId": "login-idp-link-confirm.ftl",
      "locale": {
        "currentLanguageTag": "en" //When we test the login page we do it in french
      }
    }
  ]
});

if (kcContext !== undefined) {
  console.log(kcContext);
}

render(
  kcContext === undefined ?
    <App /> :
    <KcApp />,
  document.getElementById("root")
);

function KcApp() {

  if (kcContext === undefined) {
    throw new Error();
  }

  useDownloadTerms({
    kcContext,
    "downloadTermMarkdown": async ({ currentKcLanguageTag }) => {

      kcMessages[currentKcLanguageTag].termsTitle = "";

      const markdownString = await fetch((() => {
        switch (currentKcLanguageTag) {
          default: return tos_en_url;
        }
      })())
        .then(response => response.text());

      return markdownString;

    }
  });

  const { css } = useCssAndCx();

  return (
    <KcAppBase
      kcContext={kcContext}
      {...{
        ...defaultKcProps,
        "kcHeaderWrapperClass": css({ "color": "red", "fontFamily": '"Work Sans"' })
      }}
    />
  );
}
