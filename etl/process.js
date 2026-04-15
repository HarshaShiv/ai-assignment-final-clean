const fs = require("fs")

const raw = JSON.parse(
 fs.readFileSync("./data/bronze/docs.json")
)

const cleaned = raw.map(d => ({
 title: d.title,
 text: d.content
}))

fs.writeFileSync(
 "./data/gold/docs_clean.json",
 JSON.stringify(cleaned, null, 2)
)

console.log("ETL completed")