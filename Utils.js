var Utils = (function () {
  function showStatus(isSuccess, message) {
    if (
      message !== null &&
      typeof message !== "undefined" &&
      message.length > 0
    ) {
      isSuccess ? vt.success(message) : vt.error(message);
    }
  }
  return {
    showStatus: showStatus,
  };
})();
