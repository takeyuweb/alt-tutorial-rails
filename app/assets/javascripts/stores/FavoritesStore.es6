var alt = require('../alt.es6');
var LocationActions = require('../actions/LocationActions.es6');

class FavoritesStore {
    constructor() {
        this.locations = [];

        this.bindListeners({
            addFavoriteLocation: LocationActions.FAVORITE_LOCATION
        });
    }

    addFavoriteLocation(location) {
        this.locations.push(location);
    }
}

module.exports = alt.createStore(FavoritesStore, 'FavoritesStore');
