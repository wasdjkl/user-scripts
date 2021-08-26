// ==UserScript==
// @name        需求管理平台-工时高亮
// @namespace   Work Scripts
// @match       http://10.68.66.140:8880/demand/app/declare/workload-declare-detail.html
// @grant       none
// @version     1.1
// @author      -
// @description 2021/8/26 上午9:43:09
// ==/UserScript==

(function () {
  "use strict";

  const undoneStatusColor = "#F9E2AE";
  const doneStatusColor = "#A8DEE0";

  const waitElementReady = async function (selector) {
    return new Promise((resolve) => {
      const animationName = btoa(String(Math.random())).replace(
        /[^a-z]/gi,
        "a"
      );
      const style = document.createElement("style");
      style.textContent = `
@keyframes ${animationName} {
    from {
        opacity: .9;
    }
    to {
        opacity: 1;
    }
}

${selector} {
    animation: ${animationName} 1ms;
}
            `;
      const animationstart = (e) => {
        console.log(e);
        if (e.animationName !== animationName) return;
        resolve();
      };
      addEventListener("animationstart", animationstart);
      document.head.appendChild(style);
    });
  };

  const autoFill = function (selector, value) {
    const input = document.querySelector(selector);
    input.value = value;
    input.dispatchEvent(new Event("input", { bubbles: true }));
  };

  window.addEventListener("load", function () {
    autoFill('[name="jobCont"]', "开发");
    let callback = (e) => {
      console.warn(e);
      // 场内未申报
      const needSubmitTime = document.querySelector(
        "#declareTable > tbody > tr:nth-child(7) > td:nth-child(2)"
      );
      if (
        needSubmitTime.textContent === "0.0h" ||
        needSubmitTime.textContent === "-0.0h"
      ) {
        needSubmitTime.style.background = doneStatusColor;
      } else {
        needSubmitTime.style.background = undoneStatusColor;
        autoFill("#hourreg", parseFloat(needSubmitTime.value));
      }
      // 场外已申报
      const needFillTime = document.querySelector(
        "#declareTable > tbody > tr:nth-child(8) > td:nth-child(2)"
      );
      if (needFillTime.textContent === "0.0h") {
        needFillTime.style.background = undoneStatusColor;
      } else {
        needFillTime.style.background = doneStatusColor;
      }
    };
    let observer = new MutationObserver(callback);
    waitElementReady("#declareTable > tbody").then(() => {
      let article = document.querySelector("#declareTable > tbody");
      let options = {
        childList: true,
      };
      observer.observe(article, options);
      callback();
    });
  });
})();
