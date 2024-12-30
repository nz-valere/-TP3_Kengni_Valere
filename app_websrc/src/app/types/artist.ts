export interface artist{
    artistId: String,
    image: String,
    name: String,
    stageName: String,
    albums: Number,
    rating: Number,
    ratings:[
        {
            userId:{type: String},
            value: {type: Number}
        }
    ],
    socialMedia: [String],
    label: String,
    publishingHouse: String,
    startDate: Date,
}