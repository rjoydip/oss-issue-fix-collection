export default class LumeShield extends HTMLElement {
  async connectedCallback() {
    if (this.dataset.skipNudd !== "") {
      const data = await getData(this.dataset.name, this.dataset.skipNudd);

      if (data) {
        const name = this.dataset.visibleName || data.name;
        this.innerHTML = `
      <a href="${data.url}">
        ${name}<span>${data.version.replace(/^v/, "")}</span>
      </a>`;
      }
    } else {
      const { name, url, color, version } = this.dataset;
      this.innerHTML = `
    <a href="${url}">
      ${name}<span style="background-color: ${color}"; color: 'white'>${
        version.replace(/^v/, "")
      }</span>
    </a>`;
    }
  }
}

async function getData(name) {
  const url = `https://nudd.deno.dev/${name}`;
  const response = await fetch(url);
  if (response.ok) {
    return await response.json();
  }
}
