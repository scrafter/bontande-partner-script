const getButtonHtml = (link, buttonText, seoText) => `
  <html>
    <head>
      <meta charset="utf-8">
      <style>
        @import url("https://fonts.googleapis.com/css2?family=Lato&display=swap");
  
        #bontande-button {
          position: fixed;
          right: 10px;
          bottom: 10px;
          border: 0;
          background-color: #e85f1a;
          color: white;
          font-family: "Lato", sans-serif;
          padding: 8px 12px;
          text-decoration: none;
          transition: all 0.3s ease-out;
          font-size: 18px;
        }
  
        #bontande-button:hover {
          background-color: #dc561c;
        }
  
        #bontande-close-button {
          font-size: 16px;
          position: fixed;
          right: 10px;
          bottom: 50px;
          background-color: transparent;
          border: 0;
          color: #e85f1a;
          cursor: pointer;
          text-shadow: 0 0 5px #FFFFFF;
        }
        
        #bontande-promo {
            opacity: 0;
            position: fixed;
            top: -100px;
            z-index: -1000;
        }
      </style>
    </head>
    <body>
      <div id="bontande-promo">${seoText}</div>
        
      <div class="bontande-wrapper">
        <button id="bontande-close-button">x</button>
        <a id="bontande-button" href="${link}" target="_blank">
          ${buttonText}
        </a>
      </div>
    </body>
  </html>
`;

const attachHtml = (website, buttonText, seoText) => {
    const element = document.createElement('div');
    element.innerHTML = getButtonHtml(website, buttonText, seoText);
    document.body.appendChild(element);

    const closeButton = document.querySelector("#bontande-close-button");
    closeButton.addEventListener("click", () => {
        const bontandeWrapper = document.querySelector(".bontande-wrapper");
        bontandeWrapper.remove();
    });
};

(() => {
    const website = document.currentScript.getAttribute('data-website');
    const buttonText = document.currentScript.getAttribute('data-button-text');
    const seoText = document.currentScript.getAttribute('data-seo-text');

    const intervalId = setInterval(() => {
        if (document.body) {
            attachHtml(website, buttonText, seoText);
            clearInterval(intervalId);
        }
    }, 1000);
})();
