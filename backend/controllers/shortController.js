import { Url } from "../models/modelUrl.js";
import { nanoid } from "nanoid";

// Create short URL
export const shortenUrl = async (req, res) => {
  try {
    const { longUrl } = req.body;

    if (!longUrl) {
      return res.status(400).json({ error: "Long URL is required" });
    }
    // Prevent duplicates for the same user
    let existing = await Url.findOne({ longUrl, owner: req.user.userId });
    if (existing) {
      return res.json({ shortUrl: `http://localhost:5000/r/${existing.shortCode}` });
    }

    const shortCode = nanoid(6);
    const newUrl = new Url({
      longUrl,
      shortCode,
      owner: req.user.userId,
    });

    await newUrl.save();

    res.status(201).json({ shortUrl: `http://localhost:5000/r/${shortCode}` });
  } catch (error) {
    console.error("Error in shortenUrl:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// Redirect short URL
export const redirectUrl = async (req, res) => {
  try {
    const { shortcode } = req.params;
    const url = await Url.findOne({ shortCode: shortcode });

    if (!url) return res.status(404).send("URL not found");

    url.visits += 1;
    await url.save();

    res.redirect(url.longUrl);
  } catch (error) {
    console.error("Error in redirectUrl:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// Get all URLs
export const getAllUrls = async (req, res) => {
  try {
    let urls;

    if (req.user.role === "admin") {
      // Admin sees all URLs
      urls = await Url.find().populate("owner", "email").sort({ visits: -1 });
    } else {
      // Normal user sees only their URLs
      urls = await Url.find({ owner: req.user.userId })
        .populate("owner", "email")
        .sort({ visits: -1 });
    }

    res.json(urls);
  } catch (error) {
    console.error("Error in getAllUrls:", error);
    res.status(500).json({ error: "Server error" });
  }
};


export const visitedByUser = async(req, res) =>{
  try {
    const userId = req.user.userId;
    const visitedUrl = await Url.find({ owner: userId });
    res.json(visitedUrl);
  } catch (error) {
    console.log("Error in visitedByUser controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}