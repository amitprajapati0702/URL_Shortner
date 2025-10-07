const { nanoid } = require("nanoid");
const URL = require("../model/url");

// ------------------- Short URL Handler -------------------
async function Handlesorturl(req, res) {
  try {
    const body = req.body;
    if (!body.url) {
      return res.status(400).json({ error: "redirecturl is required" });
    }

    const id = nanoid(8);

    await URL.create({
      sortid: id,               // ✅ consistent naming
      redirecturl: body.url,
      visithistory: [],
    });

    return res.render("home", { urlid: id });
  } catch (err) {
    console.error("Error in Handlesorturl:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

// ------------------- Get URL Data -------------------
async function handlegetdata(req, res) {
  try {
    const shortid = req.params.shortid;

    const result = await URL.findOne({ shortid });   // ✅ match field name

    if (!result) {
      return res.status(404).json({ error: "Short URL not found" });
    }

    return res.json({
      totalclicks: result.visithistory.length,
      data: result,   // optional: send full URL document
    });
  } catch (err) {
    console.error("Error in handlegetdata:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}



module.exports = { Handlesorturl, handlegetdata };
