class Artifact extends HTMLElement {
  constructor() {
     // Initiate the shadow DOM
     super();
     this.attachShadow({ mode: 'open'});
  }
  connectedCallback () {
    // Props
    this.artifact = JSON.parse(this.getAttribute('artifact'));
    this.type = this.getAttribute('type');
    this.render();
  }

  render () {
    // Create base container
    const container = document.createElement('div');
    container.classList.add('acnh-artifact');
    this.shadowRoot.appendChild(container);
    switch (this.type) {
      case "sea":
        this.renderSeaArtifact(container);
        break;
      case "fish":
        this.renderFishArtifact(container);
        break;
      case "bugs":
        this.renderBugArtifact(container);
        break;
      default:
        container.innerHTML = `<pre>${JSON.stringify(this.artifact, null, 2)}</pre>`;
    }
    this.addStyling();
  }

  renderBugArtifact (wrapper) {
    wrapper.innerHTML = `
      <div class="header">
        <p class="name">${this.artifact?.name["name-EUen"]}</p>
      </div>
      <div class="image"><img src="${this.artifact?.icon_uri}" alt="${this.artifact['file-name']}" /></div>
      <div class="details">
        <p><b>Rarity:</b> ${this.artifact?.availability?.rarity}</p>
        <p><b>Price:</b> ${this.artifact?.price} bells</p>
        <p><b>Flick Price:</b> ${this.artifact["price-flick"]} bells</p>
        <p><b>Time:</b> ${this.artifact?.availability?.time
          ? this.artifact?.availability?.time : "Available all hours."}</p>
      </div>
      <div class="months">
        <p><b>Months (north):</b> ${this.artifact?.availability["month-northern"]
          ? this.artifact?.availability["month-northern"] : "Available all year." }</p>
        <p><b>Months (south):</b> ${this.artifact?.availability["month-southern"]
          ? this.artifact?.availability["month-southern"] : "Available all year." }</p>
      </div>
    `;
  }

  renderFishArtifact (wrapper) {
    wrapper.innerHTML = `
      <div class="header">
        <p class="name">${this.artifact?.name["name-EUen"]}</p>
      </div>
      <div class="image"><img src="${this.artifact?.icon_uri}" alt="${this.artifact['file-name']}" /></div>
      <div class="details">
        <p><b>Rarity:</b> ${this.artifact?.availability?.rarity}</p>
        <p><b>Price:</b> ${this.artifact?.price} bells</p>
        <p><b>CJ Price:</b> ${this.artifact["price-cj"]} bells</p>
        <p><b>Time:</b> ${this.artifact?.availability?.time
          ? this.artifact?.availability?.time : "Available all hours."}</p>
      </div>
      <div class="months">
        <p><b>Months (north):</b> ${this.artifact?.availability["month-northern"]
          ? this.artifact?.availability["month-northern"] : "Available all year." }</p>
        <p><b>Months (south):</b> ${this.artifact?.availability["month-southern"]
          ? this.artifact?.availability["month-southern"] : "Available all year." }</p>
      </div>
    `;
  }

  renderSeaArtifact (wrapper) {
    wrapper.innerHTML = `
      <div class="header">
        <p class="name">${this.artifact?.name["name-EUen"]}</p>
      </div>
      <div class="image"><img src="${this.artifact?.icon_uri}" alt="${this.artifact['file-name']}" /></div>
      <div class="details">
        <p><b>Price:</b> ${this.artifact?.price} bells</p>
        <p><b>Shadow:</b> ${this.artifact?.shadow}</p>
        <p><b>Speed:</b> ${this.artifact?.speed}</p>
        <p><b>Time:</b> ${this.artifact?.availability?.time
          ? this.artifact?.availability?.time : "Available all hours."}</p>
      </div>
      <div class="months">
        <p><b>Months (north):</b> ${this.artifact?.availability["month-northern"]
          ? this.artifact?.availability["month-northern"] : "Available all year." }</p>
        <p><b>Months (south):</b> ${this.artifact?.availability["month-southern"]
          ? this.artifact?.availability["month-southern"] : "Available all year." }</p>
      </div>
    `;
  }

  addStyling () {
    const style = document.createElement('style');
    style.textContent = `
      :host, :host * {
        box-sizing: border-box;
        padding: 0;
        margin: 0 auto;
        font-family: arial;
        text-align: left;
      }

      hr {
        background: #ddd;
        height: 1px;
        display: block;
        margin: 0 auto;
        border: none;
      }

      .acnh-artifact {
        border-radius: 6px;
        width: 350px;
        margin: 0 auto;
        padding: 1rem;
        border: 1px solid #ddd;
        background: #fafafa;
      }

      .image {
        text-align: center;
        display: inline-block;
        margin: 0 1rem 1rem 0;
        background: #fff;
      }

      .image img {
        max-height: 75px;
        max-width: 75px;
        box-shadow: rgba(0,0,0,0.25) 3px 3px 5px 1px;
        display: block;
        margin: 0 auto;
        padding: 15px;
        border-radius: 19px;
      }

      .header {
        margin-bottom: 1rem;
      }

      .name {
        text-transform: capitalize;
        font-weight: bold;
      }

      .details {
        display: inline-block;
        vertical-align: top;
        max-width: calc(350px - 2rem - 100px);
      }
    `;
    this.shadowRoot.appendChild(style);
  }
}

customElements.define('artifact-card', Artifact);
