import LumeCode from "./components/lume_code.js";
import LumeCarouselControls from "./components/lume_carousel_controls.js";
import LumeFilter from "./components/lume_filter.js";
import LumeDevices from "./components/lume_devices.js";
import LumeShield from "./components/lume_shield.js";
import LumeCopy from "./components/lume_copy.js";

customElements.define("lume-code", LumeCode);
customElements.define("lume-carousel-controls", LumeCarouselControls);
customElements.define("lume-filter", LumeFilter);
customElements.define("lume-devices", LumeDevices);
customElements.define("lume-shield", LumeShield);
customElements.define("lume-copy", LumeCopy);

// For testing purpose of CSP middleware
const userAgentString = navigator.userAgent;
const chromeAgent = userAgentString.indexOf("Chrome") > -1;

if (chromeAgent) {
  const observer = new ReportingObserver((reports) => {
    for (const report of reports) {
      console.log(report.type, report.url, report.body);
    }
  }, { buffered: true });

  observer.observe();
}
