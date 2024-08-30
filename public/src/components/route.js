import { RouteBank } from "../helpers/route-bank.js";

export class Route extends HTMLAnchorElement {
  constructor() {
    super();

    this.onclick = (event) => {
      event.preventDefault();
      RouteBank.triggerRoute(this.getAttribute("href"));
    };
  }
}
