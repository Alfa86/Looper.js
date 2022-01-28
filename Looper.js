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
      const response = await Looper.getApiResponse(dataLink);
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
      return console.log(e.isSuccess, e.message);
    }
  };

  // GET and POST methods for Gateway
  var reqHeaders = { "Content-Type": "application/json" };

  var checkAndThrowError = (response) => {
    response = response || {};
    if (!response.ok)
      throw new Error("An error has occured: " + response.status);
  };
  // GET method
  this.getApiResponse = async (dataLink) => {
    const response = await fetch(dataLink, {
      method: "GET",
      headers: reqHeaders,
    });

    checkAndThrowError(response);
    return response;
  };
  // POST method WIP usecase
  this.postApiResponse = async (data, dataLink) => {
    const response = await fetch(dataLink, {
      method: "POST",
      headers: reqHeaders,
      body: JSON.stringify(data),
    });

    checkAndThrowError(response);
    return response;
  };
})();
Looper.Operations.init();
