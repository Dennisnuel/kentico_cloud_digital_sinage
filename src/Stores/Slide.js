import Client from "../Client.js";

let changeListeners = [];
let initialized = false;
let slides = [];

let notifyChange = () => {
    changeListeners.forEach((listener) => {
        listener();
    });
}

let fetchSlides = () => {
    if (initialized) {
        return;
    }

    Client.getItems({
        "system.type": "slide",
        "order": "elements.weight"
    }).then((response) => {
        slides = response.items;
        notifyChange();
    }).catch((err) => { console.log(err) });

    initialized = true;
}

class SlideStore {
    //Actions


    provideSlides() {
        fetchSlides();
    }

    //Methods

    getSlides() {
        return slides;
    }
    // Listenders 

    addChangeListener(listener) {
        changeListeners.push(listener);
    }

    removeChangeListener(listener) {
        changeListeners = changeListeners.filter((element) => {
            return element !== listener;
        });
    }
}

export default new SlideStore();