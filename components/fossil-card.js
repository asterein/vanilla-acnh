class Fossil extends HTMLElement {
  constructor() {
     // Initiate the shadow DOM
     super();
     this.attachShadow({ mode: 'open'});
  }
  connectedCallback () {
    // Props
    this.fossilFamily = JSON.parse(this.getAttribute('family'));
    this.render();
  }

  render () {
    // Create base container
    const container = document.createElement('div');
    container.classList.add('acnh-artifact');
    if (this.fossilFamily.length > 1) {
      container.classList.add('multi-fossil-artifact');
    }
    if (this.fossilFamily[0]['part-of'].toLowerCase() === 'diplodocus') {
      container.classList.add('diplo');
    }
    this.shadowRoot.appendChild(container);
    this.renderFossil(container);
    this.addStyling();
  }

  renderFossil (wrapper) {
    switch (this.fossilFamily.length) {
      case 1:
        wrapper.innerHTML = this.singleFossil();
        break;
      case 2:
      case 3:
        const pieces = this.fossilPieces();
        if (pieces.includes("skull") || pieces.includes("torso") || pieces.includes("tail")) {
          wrapper.innerHTML = this.triFossil();
          break;
        }
        wrapper.innerHTML = this.lrFossil();
        break;
      case 4:
        wrapper.innerHTML = this.brachioFossil();
        break;
      case 6:
        wrapper.innerHTML = this.diploFossil();
        break;
      default:
        wrapper.innerHTML = `
          <pre>${JSON.stringify(this.fossilFamily, null, 2)}</pre>
        `;
    }
  }

  fossilPieces () {
    const fossilPieces = [];
    const fossilTitle = `${this.fossilFamily[0]['file-name'].split("_")[0]}_`;
    for (let index in this.fossilFamily) {
      fossilPieces.push(this.fossilFamily[index]['file-name'].split(fossilTitle)[1]);
    }
    return fossilPieces;
  }

  generateFossilPiece (starter, label) {
    if (starter) {
      return `
        <div class="multi-fossil__piece">
          <div class="image"><img src="${starter['image_uri']}" alt="${starter['file-name']}" /></div>
          <div class="details">
            <p><b>Price:</b> ${starter?.price} bells</p><br />
          </div>
        </div>
      `;
    }
    return false;
  }

  multiFossil (embed) {
    return `
      <div class="header">
        <p class="name">${this.fossilFamily[0]["part-of"]}</p>
      </div>
      <div class="multi-fossil" style="grid-template-columns: repeat(${this.fossilFamily.length}, 1fr);">
        ${embed}
      </div>
      <p><i>${this.fossilFamily[0]['museum-phrase'].length > 256
        ? `${this.fossilFamily[0]['museum-phrase'].substr(0,253)}...` : this.fossilFamily[0]['museum-phrase']}</i></p>
    `;
  }

  lrFossil () {
    const left = this.fossilFamily.filter((fossil) => fossil['file-name'].includes("left"))[0] || false;
    const right = this.fossilFamily.filter((fossil) => fossil['file-name'].includes("right"))[0] || false;
    const other = this.fossilFamily.filter((fossil) =>
      !fossil['file-name'].includes("right") && !fossil['file-name'].includes("left"))[0] || false;

    return this.multiFossil(`
      ${this.generateFossilPiece(right, "right") || ""}
      ${this.generateFossilPiece(other, "") || ""}
      ${this.generateFossilPiece(left, "left") || ""}
    `);
  }

  brachioFossil () {
    const skull = this.fossilFamily.filter((fossil) => fossil['file-name'].includes("skull"))[0] || false;
    const chest = this.fossilFamily.filter((fossil) => fossil['file-name'].includes("chest"))[0] || false;
    const pelvis = this.fossilFamily.filter((fossil) => fossil['file-name'].includes("pelvis"))[0] || false;
    const tail = this.fossilFamily.filter((fossil) => fossil['file-name'].includes("tail"))[0] || false;

    return this.multiFossil(`
      ${this.generateFossilPiece(skull, "skull") || ""}
      ${this.generateFossilPiece(chest, "chest") || ""}
      ${this.generateFossilPiece(pelvis, "pelvis") || ""}
      ${this.generateFossilPiece(tail, "tail") || ""}
    `);
  }

  diploFossil () {
    const skull = this.fossilFamily.filter((fossil) => fossil['file-name'].includes("skull"))[0] || false;
    const neck = this.fossilFamily.filter((fossil) => fossil['file-name'].includes("neck"))[0] || false;
    const chest = this.fossilFamily.filter((fossil) => fossil['file-name'].includes("chest"))[0] || false;
    const pelvis = this.fossilFamily.filter((fossil) => fossil['file-name'].includes("pelvis"))[0] || false;
    const tail = this.fossilFamily.filter((fossil) => fossil['file-name'].includes("tail"))[0] || false;
    const tailTip = this.fossilFamily.filter((fossil) => fossil['file-name'].includes("tail_tip"))[0] || false;

    return this.multiFossil(`
      ${this.generateFossilPiece(skull, "skull") || ""}
      ${this.generateFossilPiece(neck, "neck") || ""}
      ${this.generateFossilPiece(chest, "chest") || ""}
      ${this.generateFossilPiece(pelvis, "pelvis") || ""}
      ${this.generateFossilPiece(tail, "tail") || ""}
      ${this.generateFossilPiece(tailTip, "tail_tip") || ""}
    `);
  }

  triFossil () {
    const skull = this.fossilFamily.filter((fossil) => fossil['file-name'].includes("skull"))[0] || false;
    const torso = this.fossilFamily.filter((fossil) => fossil['file-name'].includes("torso"))[0] || false;
    const tail = this.fossilFamily.filter((fossil) => fossil['file-name'].includes("tail"))[0] || false;

    return this.multiFossil(`
      ${this.generateFossilPiece(skull, "skull") || ""}
      ${this.generateFossilPiece(torso, "torso") || ""}
      ${this.generateFossilPiece(tail, "tail") || ""}
    `);
  }

  singleFossil () {
    const targetFossil = this.fossilFamily[0];
    return `
      <div class="header">
        <p class="name">${targetFossil["part-of"]}</p>
      </div>
      <div class="image"><img src="${targetFossil['image_uri']}" alt="${targetFossil['file-name']}" /></div>
      <div class="details">
        <p><b>Price:</b> ${targetFossil?.price} bells</p><br />
        <p><i>${targetFossil['museum-phrase'].length > 128
          ? `${targetFossil['museum-phrase'].substr(0,125)}...` : targetFossil['museum-phrase']}</i></p>
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

      .multi-fossil-artifact {
        width: 500px;
      }

      .diplo {
        width: 100%;
      }

      .multi-fossil {
        display: grid;
        align-items: center;
        justify-content: center;
      }

      .multi-fossil__piece {
        text-align: center;
      }

      .image {
        text-align: center;
        display: inline-block;
        margin: 0 1rem 1rem 0;
      }

      .image img {
        max-height: 75px;
        max-width: 75px;
        box-shadow: rgba(0,0,0,0.25) 3px 3px 5px 1px;
        display: block;
        margin: 0 auto;
        padding: 15px;
        border-radius: 19px;
        background :#fff;
      }

      .multi-fossil__piece .image {
        display: block;
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

customElements.define('fossil-card', Fossil);
