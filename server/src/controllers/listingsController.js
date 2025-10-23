const Listing = require('@src/models/Listing');

function httpError(status, message) {
  const err = new Error(message);
  err.status = status;
  return err;
}

function pickListingUpdate(body) {
  const allowed = ['title', 'description', 'price', 'images', 'category', 'city', 'isActive'];
  const out = {};
  allowed.forEach((k) => {
    if (Object.prototype.hasOwnProperty.call(body, k)) {
      out[k] = body[k];
    }
  });
  return out;
}

exports.createListing = async (req, res) => {
  const userId = req.userId;
  const { title, description, price, images, category, city } = req.body || {};

  if (!userId) throw httpError(401, 'Unauthorized');
  if (!title || !description || price === undefined || price === null || !category) {
    throw httpError(400, 'title, description, price, category are required');
  }
  if (typeof title !== 'string' || typeof description !== 'string' || typeof category !== 'string') {
    throw httpError(400, 'Invalid types for title/description/category');
  }
  const priceNum = Number(price);
  if (Number.isNaN(priceNum) || priceNum < 0) {
    throw httpError(400, 'price must be a non-negative number');
  }
  let imagesArr = [];
  if (Array.isArray(images)) {
    imagesArr = images.filter((v) => typeof v === 'string');
  }

  const listing = await Listing.create({
    title: title.trim(),
    description: description.trim(),
    price: priceNum,
    images: imagesArr,
    category: category.trim(),
    city: city ? String(city).trim() : undefined,
    owner: userId,
    isActive: true
  });

  return res.status(201).json(listing);
};

exports.getListings = async (req, res) => {
  const listings = await Listing.find({ isActive: true }).sort({ createdAt: -1 });
  return res.json(listings);
};

exports.getListingById = async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing) throw httpError(404, 'Listing not found');
  return res.json(listing);
};

exports.getMyListings = async (req, res) => {
  const userId = req.userId;
  if (!userId) throw httpError(401, 'Unauthorized');
  const listings = await Listing.find({ owner: userId }).sort({ createdAt: -1 });
  return res.json(listings);
};

exports.updateListing = async (req, res) => {
  const userId = req.userId;
  const { id } = req.params;
  if (!userId) throw httpError(401, 'Unauthorized');

  const listing = await Listing.findById(id);
  if (!listing) throw httpError(404, 'Listing not found');
  if (listing.owner.toString() !== String(userId)) {
    throw httpError(403, 'You are not the owner of this listing');
  }

  const patch = pickListingUpdate(req.body || {});

  if (Object.prototype.hasOwnProperty.call(patch, 'price')) {
    const priceNum = Number(patch.price);
    if (Number.isNaN(priceNum) || priceNum < 0) {
      throw httpError(400, 'price must be a non-negative number');
    }
    patch.price = priceNum;
  }

  Object.assign(listing, patch);
  await listing.save();

  return res.json(listing);
};

exports.deleteListing = async (req, res) => {
  const userId = req.userId;
  const { id } = req.params;
  if (!userId) throw httpError(401, 'Unauthorized');

  const listing = await Listing.findById(id);
  if (!listing) throw httpError(404, 'Listing not found');
  if (listing.owner.toString() !== String(userId)) {
    throw httpError(403, 'You are not the owner of this listing');
  }

  await listing.deleteOne();
  return res.json({ success: true });
};
