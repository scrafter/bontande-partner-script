const getButtonHtml = (link, buttonText, seoText, marginBottom = 0) => `
  <html>
    <head>
      <meta charset="utf-8">
      <style>
        @import url("https://fonts.googleapis.com/css2?family=Lato&display=swap");
        
        .bontande-script * {
            font-family: "Lato", sans-serif !important;
            line-height: 1rem !important;
        }
  
        #bontande-button {
          position: fixed;
          right: 0;
          bottom: ${marginBottom + 50}px;
          border: 0;
          background-color: #e85f1a;
          color: white;
          font-family: "Lato", sans-serif;
          padding: 10px 15px;
          padding-left: 30px;
          text-decoration: none;
          transition: all 0.3s ease-out;
          font-size: 18px;
          z-index: 999999999;
          border-radius: 10px 0 0 10px;
          box-shadow: 0 0 10px 0 rgba(146, 62, 18, 1);
        }
  
        #bontande-button:hover {
          background-color: #dc561c;
        }
  
        #bontande-close-button {
          font-size: 16px;
          position: fixed;
          right: 10px;
          bottom: ${marginBottom + 96}px;
          background-color: white;
          border-radius: 50%;
          border: 0;
          color: #e85f1a;
          cursor: pointer;
          text-shadow: 0 0 5px #FFFFFF;
          z-index: 9999999999;
        }
        
        #bontande-promo {
            opacity: 0;
            position: fixed;
            top: -100px;
            z-index: -1000;
        }
        
        .bontande-wrapper {
            z-index: 999999999;
        }
        
        .content {
          width: 160px;
          overflow-wrap: break-word;
          margin: 0;
        }
        
        .logo {
          position: fixed;
          bottom: ${marginBottom + 55}px;
          right: 185px;
          z-index: 9999999999;
          height: 54px;
          width: 40px;
        }
      </style>
    </head>
    <body>
      <span class="bontande-script">
          <div id="bontande-promo">${seoText}</div>
        
          <div class="bontande-wrapper">
            <img src="https://bontande-production.s3.eu-central-1.amazonaws.com/logo.svg" class="logo" />
            <button id="bontande-close-button">x</button>
            <a id="bontande-button" href="${link}" target="_blank">
              <p class="content">
                Kup naszą kartę podarunkową
              </p>
            </a>
          </div>
      </span>
    </body>
  </html>
`;

const attachHtml = (website, buttonText, seoText, marginBottom) => {
    const element = document.createElement('div');
    element.innerHTML = getButtonHtml(website, buttonText, seoText, marginBottom);
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
    const marginBottom = document.currentScript.getAttribute('data-padding');

    const intervalId = setInterval(() => {
        if (document.body) {
            attachHtml(website, buttonText, seoText, marginBottom);
            clearInterval(intervalId);
        }
    }, 1000);
})();
