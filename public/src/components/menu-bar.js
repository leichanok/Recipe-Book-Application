const template = document.createElement("template");

const css = /*css*/ `
div.menu {
    display: flex;
    list-style-type: none;
    background-color: white;

    flex-direction: row;
    align-items: center;
    justify-content: space-around;

    padding: 0;
    margin: 0;

    height: 3.5em;
    width: 100%;

    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.3);

    position: fixed;

    z-index: 100;
}

div.menu div.burger-menu {
    display: none;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
}

div.menu div.burger-menu:hover div {
    background-color: #ebb026;
}

div.menu div.burger-menu div {
    display: block;
    background-color: black;

    width: 2em;
    height: 0.25em;

    margin-top: 0.25em;
}

div.menu div.burger-menu div:first-child {
    margin: 0;
}

div.menu div.burger-menu-opened div:first-child {
   animation: down-rotate 0.6s ease-out both 
}

div.menu div.burger-menu-opened div:nth-child(2) {
    animation: hide 0.6s ease-out forwards;
}

div.menu div.burger-menu-opened div:last-child {
    animation: up-rotate 0.6s ease-out both 
}


@keyframes up-rotate {
	0% {
		transform: translateY(0px);
	}
	30% {
		transform-origin: center;
		transform: translateY(-0.5em);
	}
	100% {
		transform-origin: center;
		transform: translateY(-0.5em) rotate(45deg);
	}
}

@keyframes down-rotate {
	0% {
		transform: translateY(0em);
	}
	30% {
		transform-origin: center;
		transform: translateY(0.5em);
	}
	100% {
		transform-origin: center;
		transform: translateY(0.5em) rotate(-45deg);
	}
}

@keyframes hide {
	29% {
		opacity: 1;
	}
	30% {
		opacity: 0;
	}
	100% {
		opacity: 0;
	}
}

div.menu ul {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;

    padding: 0;
    margin: 0;

    list-style-type: none;

    width: 80%;
    height: 100%;
}

::slotted(li) {
    --menu-item-font-family: 'Bebas Note', sans-serif;
    --menu-item-font-size: large;
    --menu-item-text-decoration: none;
    --menu-item-color: black;
}

::slotted(li:hover) {
    --menu-item-hover-color: #ebb026;
}

@media screen and (max-width: 768px) {
    div.menu div.burger-menu {
        display: flex;
    }

    div.menu ul {
        display: none;
        flex-direction: column;

        position: fixed;
        top: 3.5em;
        left: 0;

        background-color: white;

        width: 100%;
        height: 0;
    }

    div.menu ul.open {
        display: flex;
        animation: grow 0.3s ease both;
    }

    @keyframes grow{
        30% {
            height: 30%;
        }
        60% {
            height: 60%;
        }
        100% {
            height: 100%;
        }
    } 
}
`;

template.innerHTML = /*html*/ `
       <style>${css}</style>
       <div class="menu">
            <div id="burger-menu" class="burger-menu">
                <div></div>
                <div></div>
                <div></div>
            </div>
            <ul id="menu-items">
                <slot name="menu-item">
                    <li><a href="#">Please specify menu items</a></li>
                </slot>
            </ul>
        </div>  
    `;

export class MenuBar extends HTMLElement {
  constructor() {
    super();

    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.appendChild(template.content.cloneNode(true));

    const burgerMenu = shadowRoot.getElementById("burger-menu");
    const menuItems = shadowRoot.getElementById("menu-items");

    menuItems.childNodes.forEach((node) => {
      node.addEventListener("click", () => {
        burgerMenu.classList.toggle("burger-menu-opened");
        menuItems.classList.toggle("open");
      });
    });

    burgerMenu.addEventListener("click", () => {
      burgerMenu.classList.toggle("burger-menu-opened");
      menuItems.classList.toggle("open");
    });
  }
}
