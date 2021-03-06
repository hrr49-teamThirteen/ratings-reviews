// Schemas:
const usersSchema = new mongoose.Schema({
  user_id: {type: Number, index: {unique: true}},
  name:    String
});
const userModel = mongoose.model('Users', usersSchema);

const productsSchema = new mongoose.Schema({
    product_id:     {type: Number, index: {unique: true}},
    product_name:   String,
    reviews:        [{review_id: {type: Number, index{unique: true}}, title: String, date: String, date: String, body: String, star_rating: Number, user_id: Number,
    images:         [{image_id: {type: Number, index{unique: true}}, loc: String}]
});