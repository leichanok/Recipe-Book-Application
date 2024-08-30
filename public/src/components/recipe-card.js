import { RouteBank } from "../helpers/route-bank.js";

const css = /*css*/ `

div.image-container {
  width: 100%;
  height: 80%;

  overflow: hidden;

  border-radius: 0.5em;
}

div.image-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

div.description-container {
  overflow: hidden;
  text-overflow: ellipsis;

  width: 100%;
  height: calc(20% + 0.5em);

  margin: 0;
  padding: 0;

  padding-top: 0.5em;
}

div.description-container p {
  font-family: "Open Sans", sans-serif;

  padding: 0;
  margin: 0;
}
`;

export class RecipeCard extends HTMLElement {
  static get observedAttributes() {
    return ["image-src", "description", "title", "href"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    this.imageSrc = "nothing";
    this.description = "nothing";
    this.title = "nothing";
    this.href = null;
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = /*html*/ `
        <style>${css}</style>
        <div class="image-container">
          <img src="${this.imageSrc}" alt="Loading...">
        </div>
        <div class="description-container">
          <p>
            ${this.description} 
          </p>
        </div>
      `;

    this.onclick = (event) => {
      if (this.href === null) {
        return;
      }

      event.preventDefault();
      RouteBank.triggerRoute(this.getAttribute("href"));
    };
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "image-src") {
      this.imageSrc = newValue;
    }

    if (name === "description") {
      this.description = newValue;
    }

    if (name === "href") {
      this.href = newValue;
    }
  }
}
