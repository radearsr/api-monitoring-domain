const express = require("express");
const { getInformationDomain, getSSLStatus } = require("./checkerServices");

const app = express();

app.use(express.json());

app.get("/api/check/domain", async (req, res) => {
  try {
    const { domain } = req.query;
    if (!domain) throw new Error("DOMAIN_IS_REQUIRED");
    const result = await getInformationDomain(domain);
    res.send(result);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

app.get("/api/check/ssl", async (req, res) => {
  try {
    const { domain, port = 443 } = req.query;
    if (!domain) throw new Error("DOMAIN_IS_REQUIRED");
    const result = await getSSLStatus(domain, port);
    res.send(result);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

app.get("/", (req, res) => {
  res.send("Hello I'm Is Domain Monitoring Service!");
});

const port = process.env.PORT || 3002;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
