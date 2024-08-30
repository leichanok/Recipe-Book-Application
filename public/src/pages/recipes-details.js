const css = /*css*/ `
div.image-container {
    width: 30em;
    height: 30em;

    overflow: hidden;

    border-radius: 0.5em;
}

div.image-container img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}
`;

export class RecipesDetails extends HTMLElement {
  static get observedAttributes() {
    return ["data-id"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.fetchRecipe().then((r) => {
      console.log(r);

      this.shadowRoot.innerHTML = /*html*/ `
        <style>${css}</style>
        <div class="about">
            <div class="image-container">
                <img src="data:image/jpeg;base64,${r.imageBuffer}" alt="Loading...">
            </div>
            <div class="description-container">
                <h3>${r.title}</h3>
                <p>${r.description}</p>
            </div>
        </div>
        <div class="ingredients"></div>
        <div class="instructions"></div>
      `;
    });
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "data-id") {
      this.recipeId = newValue;
      console.log(this.recipeId);
      this.connectedCallback();
    }
  }

  fetchRecipe() {
    console.log(this.recipeId);
    return fetch(`http://localhost:3000/recipes/${this.recipeId}`).then(
      (response) => response.json()
    );
  }
}
