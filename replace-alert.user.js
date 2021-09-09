// ==UserScript==
// @name        可忽略的alert
// @namespace   Debug Scripts
// @match       *://*/*
// @grant       none
// @version     1.0
// @author      -
// @description 2021/9/2 下午5:49:53
// ==/UserScript==

const alertFunction = function (message) {
  console.warn("alert: ", message);
  let alertWrap = document.createElement("div");
  alertWrap.style.position = "fixed";
  alertWrap.style.top = "0";
  alertWrap.style.left = "50%";
  alertWrap.style.transform = "translate(-50%,0)";
  alertWrap.style.background = "bisque";
  alertWrap.style.padding = "1% 2%";
  alertWrap.style.zIndex = "9999";
  alertWrap.innerHTML = message;
  alertWrap.onclick = function () {
    alertWrap.style.display = "none";
  };
  document.body.appendChild(alertWrap);
};

Object.defineProperty(window, "alert", {
  value: alertFunction,
  writable: false,
});
