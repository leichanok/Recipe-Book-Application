const routes = [];

export class RouteBank {
  static registerRoute(routePath, { onEnter, onExit }) {
    routes.push({ regex: new RegExp(routePath), onEnter, onExit });
  }

  static triggerRoute(routePath) {
    for (const route of routes) {
      const matches = routePath.match(route.regex);
      if (matches) {
        console.log(`Current route: ${routePath}`);
        route.onEnter(matches[1]);
      } else {
        console.log(`Disabled route: ${routePath}`);
        route.onExit();
      }
    }
  }
}
