var alt = require('../alt.es6');
var LocationActions = require('../actions/LocationActions.es6');
var LocationSource = require('../sources/LocationSource.es6');
var FavoritesStore = require('./FavoritesStore.es6');

class LocationStore {
    constructor() {
        this.locations = [];
        this.errorMessage = null;

        this.bindListeners({
            handleUpdateLocations: LocationActions.UPDATE_LOCATIONS,
            handleFetchLocations: LocationActions.FETCH_LOCATIONS,
            handleLocationsFailed: LocationActions.LOCATIONS_FAILED,
            setFavorites: LocationActions.FAVORITE_LOCATION
        });

        this.exportPublicMethods({
            getLocation: this.getLocation
        });

        this.exportAsync(LocationSource);
    }

    handleUpdateLocations(locations) {
        this.locations = locations;
        this.errorMessage = null;
    }

    handleFetchLocations() {
        this.locations = [];
    }

    handleLocationsFailed(errorMessage) {
        this.errorMessage = errorMessage;
    }

    resetAllFavorites() {
        this.locations = this.locations.map((location) => {
            return {
                id: location.id,
                name: location.name,
                has_favorite: false
            };
        });
    }

    setFavorites(location) {
        this.waitFor(FavoritesStore);

        var favoritedLocations = FavoritesStore.getState().locations;

        this.resetAllFavorites();

        favoritedLocations.forEach((location) => {
            // find each location in the array
            for (var i = 0; i < this.locations.length; i += 1) {

                // set has_favorite to true
                if (this.locations[i].id === location.id) {
                    this.locations[i].has_favorite = true;
                    break;
                }
            }
        });
    }

    getLocation(id) {
        var { locations } = this.getState();
        for (var i = 0; i < locations.length; i += 1) {
            if (locations[i].id === id) {
                return locations[i];
            }
        }

        return null;
    }
}

module.exports = alt.createStore(LocationStore, 'LocationStore');
