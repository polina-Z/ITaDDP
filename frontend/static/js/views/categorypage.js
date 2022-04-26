import AbstractView from "./abstractview.js";

function capitalizeFirstLetter(string) {
    return string.charAt(1).toUpperCase() + string.slice(2);
}

export default class CategoryPage extends AbstractView {
    constructor(params) {
        super(params);
        this.category = capitalizeFirstLetter(params);
        this.state = {};
    };

    async addHandlers() {
        const add_buttons = document.getElementById("collection-page");
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
            <div id="collection-page" class='collection-page'>
            <h2 class='title'>${this.category.toUpperCase()}</h2>
                <div class='items'>
        `;

        this.state = JSON.parse(localStorage.getItem("collections"));
        if (this.category in this.state) {
            for (let element of this.state[this.category].items) {
                innerHTML += `
                    <div class='collection-items'>
                        <figure class='collection-item'>
                            <img class="image" src="${element.imageUrl}" alt="${element.name}">
                            <figcaption class='collection-footer'>
                                <span class='name'>${element.name}</span>
                                <span class='price'>${element.price}</span>
                            </figcaption>
                        </figure>
                        <button id="${element.id}" class="custom-button inverted">ADD TO CART</button>
                    </div>
                `;
            };

            innerHTML += `
                </div>
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