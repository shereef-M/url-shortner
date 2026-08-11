const { nanoid } = require("nanoid");
const Url = require("../models/Url");

const createShortUrl = async (req, res) => {
  try {
    const { longUrl } = req.body;

    if (!longUrl) {
      return res.status(400).json({
        message: "A longUrl is required",
      });
    }

    if (!longUrl.startsWith("http://") && !longUrl.startsWith("https://")) {
      return res.status(400).json({
        message: "longUrl must start with http:// or https://",
      });
    }

    const shortCode = nanoid(7);

    const newUrl = new Url({
      longUrl,
      shortCode,
    });

    const savedUrl = await newUrl.save();

    res.json(savedUrl);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error.message,
    });
  }
};

const redirectToLongUrl = async (req, res) => {
  try {
    const { shortCode } = req.params;

    const url = await Url.findOne({ shortCode });

    if (!url) {
      return res.status(404).json({
        message: "Url was not found",
      });
    }

    url.clicks += 1;
    await url.save();

    res.redirect(url.longUrl);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
// Takes shortCode from the URL params (req.params)
// Finds the matching Url document in the database
// If found: increments its clicks by 1, saves it, then redirects (res.redirect(...)) to the longUrl
// If not found: returns a 404 with an error message

// Looking up by a field (not by _id) uses Url.findOne({ shortCode })
// To increment and save, you can do document.clicks += 1; then await document.save();
// res.redirect(url) sends the browser to a different URL

// Give it a try — write the function, then we'll wire up the route (GET /api/urls/:shortCode) together once you've got a version down.
module.exports = { createShortUrl, redirectToLongUrl };
