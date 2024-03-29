const getButtonHtml = (link, buttonText, seoText, marginBottom = 0, displayOnLeft = false) => `
  <html>
    <head>
      <meta charset="utf-8">
      <style>
        @import url("https://fonts.googleapis.com/css2?family=Lato&display=swap");
        
        .bontande-script * {
            font-family: "Lato", sans-serif !important;
            line-height: 1 !important;
            padding: 0;
        }
  
        .bontande-script #bontande-button {
          position: fixed;
          left: ${displayOnLeft ? 0 : 'auto'};
          right: ${displayOnLeft ? 'auto' : 0};
          bottom: ${Number(marginBottom) + 50}px;
          border: 0;
          background-color: #e85f1a;
          color: white;
          font-family: "Lato", sans-serif;
          padding: 10px 0 15px 30px;
          text-decoration: none;
          transition: all 0.3s ease-out;
          font-size: 18px;
          z-index: 999999999;
          border-radius: ${displayOnLeft ? '0 10px 10px 0' : '10px 0 0 10px'};
          box-shadow: 0 0 10px 0 rgba(146, 62, 18, 1);
          line-height: 1.1rem;
        }
  
        .bontande-script #bontande-button:hover {
          background-color: #dc561c;
        }
  
        .bontande-script #bontande-close-button {
          font-size: 16px;
          position: fixed;
          left: ${displayOnLeft ? '5px' : 'auto'};
          right: ${displayOnLeft ? 'auto' : '10px'};
          bottom: ${Number(marginBottom) + 100}px;
          background-color: white !important;
          border-radius: 50%;
          border: 0;
          color: #e85f1a;
          cursor: pointer;
          text-shadow: 0 0 5px #FFFFFF;
          z-index: 9999999999;
          padding: 0 6px 3px 6px;
          margin: 0;
          font-weight: 400;
          text-transform: lowercase;
          background: white !important;
        }
        
        .bontande-script #bontande-promo {
            opacity: 0;
            position: fixed;
            top: -100px;
            z-index: -1000;
        }
        
        .bontande-script .bontande-wrapper {
            z-index: 999999999;
        }
        
        .bontande-script .bontande-content {
          width: 160px;
          overflow-wrap: break-word;
          margin: 0;
        }
        
        .bontande-script .bontande-logo {
          position: fixed;
          bottom: ${Number(marginBottom) + 55}px;
          left: ${displayOnLeft ? '160px' : 'auto'};
          right: ${displayOnLeft ? 'auto' : '170px'};
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
            <img src="https://bontande-production.s3.eu-central-1.amazonaws.com/logo.svg" class="bontande-logo" />
            <button id="bontande-close-button">x</button>
            <a id="bontande-button" href="${link}" target="_blank">
              <p class="bontande-content">
                Kup naszą kartę podarunkową
              </p>
            </a>
          </div>
      </span>
    </body>
  </html>
`;

const attachHtml = (website, buttonText, seoText, marginBottom, displayOnLeft) => {
    const element = document.createElement('div');
    element.innerHTML = getButtonHtml(website, buttonText, seoText, marginBottom, displayOnLeft);
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
    const onlyAfterRedirect = document.currentScript.getAttribute('data-display-after-redirect');
    const fromBontande = new URLSearchParams(window.location.search).get('from-bontande');
    const displayButton = onlyAfterRedirect ? !!fromBontande : true;
    const displayOnLeft = document.currentScript.getAttribute('data-on-left');

    const intervalId = setInterval(() => {
        if (document.body && displayButton) {
            attachHtml(website, buttonText, seoText, marginBottom, displayOnLeft);
            clearInterval(intervalId);
        }
    }, 1000);
})();
