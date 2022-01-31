var Gateway = new (function () {
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
