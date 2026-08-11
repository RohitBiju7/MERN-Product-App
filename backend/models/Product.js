const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price cannot be negative'],
  },
  image: {
    type: String,
    required: [true, 'Image URL is required'],
    validate: {
      validator: function (v) {
        return URL.canParse(v);
      },
      message: (props) => `${props.value} is not a valid URL!`,
    },
  },
  rating: {
    type: Number,
    default: 0,
    min: [0, 'Rating must be at least 0'],
    max: [5, 'Rating cannot exceed 5'],
  },
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);