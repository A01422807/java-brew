var { buildSchema } = require('graphql');

module.exports = buildSchema(`
	type Query {
		getFavorites(userId: String): [FavoriteCoffee]
    }
    type Mutation {
        addFavorite(Aroma: Float,
            aromaN: Float,
            Flavor: Float,
            flavorN: Float,
            Aftertaste: Float,
            aftertasteN: Float,
            Acidity: Int,
            acidityN: Float,
            Body: Float,
            bodyN: Float,
            Balance: Float,
            balanceN: Float,
            Moisture: Float,
            moistureN: Float,
            altitude_mean_meters: Int,
            altitudeN: Float,
            userId: String,
            Region: String): FavoriteCoffee
    }
	type FavoriteCoffee {
		id: ID!
		Aroma: Float
        aromaN: Float
        Flavor: Float
        flavorN: Float
        Aftertaste: Float
        aftertasteN: Float
        Acidity: Int
        acidityN: Float
        Body: Float
        bodyN: Float
        Balance: Float
        balanceN: Float
        Moisture: Float
        moistureN: Float
        altitude_mean_meters: Int
        altitudeN: Float
        userId: String
        Region: String
	}
`)