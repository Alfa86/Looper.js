var Looper = new (function () {
  this.Operations = {};
  this.Operations.init = () => {
    let linksSelector = document.querySelectorAll("[data-link]");
    linksSelector.forEach(function (element) {
      let URL = element.getAttribute("data-link");
      Looper.getAndLoopItems(URL, element);
    });
  };

  this.getAndLoopItems = async (dataLink, element) => {
    try {
      const response = await Gateway.getApiResponse(dataLink);
      const getItems = await response.json();
      if (getItems !== null && getItems !== undefined) {
        let templateContainer = element.innerHTML;
        let templateArray;
        templateArray = templateContainer.split(/\$\{(.+?)\}/g);

        function render(props) {
          return function (HTMLchunk, i) {
            return i % 2 ? props[HTMLchunk] : HTMLchunk;
          };
        }
        let innerItem = getItems.map(function (item) {
          return templateArray.map(render(item)).join("");
        });
        element.innerHTML = innerItem.join(" ");
      }
    } catch (e) {
      return Utils.showStatus(e.isSuccess, e.message);
    }
  };
})();
Looper.Operations.init();
