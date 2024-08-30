import { RouteBank } from "../helpers/route-bank.js";

const template = document.createElement("template");

const css = /*css*/ `
div.view {
    display: none;
}
`;

template.innerHTML = /*html*/ `
       <style>${css}</style>
       <div class="view">
            <slot name="menu-item">
                <div class="content">No content found</div>
            </slot>
        </div>  
    `;

export class RouteView extends HTMLElement {
  static get observedAttributes() {
    return ["route-path"];
  }

  constructor() {
    super();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "route-path") {
      RouteBank.registerRoute(newValue, {
        onEnter: (id) => {
          const views = this.childNodes;

          this.style.display = "block";

          for (const view of views) {
            if ("setAttribute" in view) {
              view.setAttribute("data-id", id);
            }
          }
        },

        onExit: () => {
          this.style.display = "none";
        },
      });
    }
  }
}
