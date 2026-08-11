const { nanoid } = require("nanoid");
const Url = require("../models/Url");

const createShortUrl = async (req, res) => {
  try {
    const { longUrl } = req.body;

    const shortCode = nanoid(7);

    const newUrl = new Url({
      longUrl,
      shortCode,
    });

    const savedUrl = await newUrl.save();
    res.json(savedUrl);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = { createShortUrl };
