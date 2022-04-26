import AbstractView from "./abstractview.js";
import { fetchCollection } from "../firebase/firebase.utils.js";

export default class ShopPage extends AbstractView {
    constructor(params) {
        super(params);
        this.state = {};
    };

    async addHandlers() {
        const add_buttons = document.getElementById("collections-overview");
        if (add_buttons) {
            add_buttons.addEventListener("click", async e => {
                e.preventDefault();
                if (!isNaN(parseInt(e.target.id))) {
                    addToCart(parseInt(e.target.id));
                };
            });
        };
    };

    async getHtml() {
        if (localStorage.getItem("collections") === null || localStorage.getItem("collections") === "null")
        {
            await fetchCollection("collections");
        };

        let innerHTML = `
            <div id="collections-overview" class='collections-overview'>
        `;

        this.state = JSON.parse(localStorage.getItem("collections"));
        if (Object.keys(this.state).length != 0) {
            for (let value of Object.values(this.state)) {
                innerHTML += `
                    <div class='collection-preview'>
                        <a class='clothes-title' href="/${value.title.toLowerCase()}" data-link>${value.title.toUpperCase()}</a>
                        <div class='preview'>
                `;
                let i = 0;
                while(i < 4) {
                    innerHTML += `
                        <div class='collection-items'>
                            <figure class='collection-item'>
                                <img class="image" src="${value.items[i].imageUrl}" alt="${value.items[i].name}">
                                <figcaption class='collection-footer'>
                                    <span class='name'>${value.items[i].name}</span>
                                    <span class='price'>${value.items[i].price}</span>
                                </figcaption>
                            </figure>
                            <button  id="${value.items[i].id}" class="custom-button inverted">ADD TO CART</button>
                        </div>
                    `;
                    i++;
                };

                innerHTML += `
                        </div>
                    </div>
                `;
            };

            innerHTML += `
                </div>
            `;
            
            return innerHTML;
        };
        
        return `
            <div class="loadding-block">
                <h2 class="section-loading">
                    Loading...
                </h2>
            </div>
        `;
    };
};