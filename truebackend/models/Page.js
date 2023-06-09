const mongoose = require('mongoose');

const PageSchema = new mongoose.Schema({
  title: String,
  slug: { type: String, unique: true },
  description: String,
  is_active: Boolean,
  created_at: Date
});

const Page = mongoose.model('Page', PageSchema);

module.exports = Page;
