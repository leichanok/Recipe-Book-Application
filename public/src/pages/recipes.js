const css = /*css*/ `
div.recipes {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;

    width: 100%; 
    height: 100%;
}

recipe-card {
    flex: 1 1 10em;
    max-width: 15em;
    min-width: 10em;

    max-height: 10em;


    margin: 1em;

    cursor: pointer;

    transition: transform 0.3s ease;
}

recipe-card:hover {
    transform: scale(1.05);
}

input {
    width: 90%;
    margin: 1em 5%;
}
`;

export class RecipesPage extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.fetchRecipes().then((recipes) => {
      recipes.forEach((r) => console.log(r));
      const recipesCards = recipes
        .map(
          (r) => /*html*/ `
                <recipe-card 
                    title="${r.title}" 
                    description="${r.description}" 
                    image-src="data:image/jpeg;base64,${r.imageBuffer}"
                    href="/recipes/${r.id}"
                >
                </recipe-card>
            `
        )
        .join("");

      this.shadowRoot.innerHTML = /*html*/ `
        <style>${css}</style>
        <input type="text" id="search-recipes" placeholder="Search">
        <div class="recipes">
            ${recipesCards}
        </div>
      `;
    });
  }

  fetchRecipes() {
    return fetch("http://localhost:3000/recipes").then((response) =>
      response.json()
    );
  }
}
