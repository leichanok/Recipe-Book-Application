import { MenuBar } from "./src/components/menu-bar.js";
import { Route } from "./src/components/route.js";
import { RouteView } from "./src/components/view.js";
import { RecipeCard } from "./src/components/recipe-card.js";
import { RecipesPage } from "./src/pages/recipes.js";
import { RecipesDetails } from "./src/pages/recipes-details.js";

customElements.define("menu-bar", MenuBar);
customElements.define("route-anchor", Route, { extends: "a" });
customElements.define("route-view", RouteView);
customElements.define("recipe-card", RecipeCard);
customElements.define("recipes-page", RecipesPage);
customElements.define("recipes-details", RecipesDetails);
