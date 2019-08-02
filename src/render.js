import templateHTML from "./src/templates/main.html!text"

const team = process.argv.find(a => a.includes("--")).toString().replace("--","")

const dataurls = [
    {
    team : "aus",
    data: "https://interactive.guim.co.uk/docsdata-test/1HEkkUzrVloX1sPXYWkoz_8-L86rcH-WRJgh0EWnegFo.json"
},
{
    team : "eng",
    data: "https://interactive.guim.co.uk/docsdata-test/1HEkkUzrVloX1sPXYWkoz_8-L86rcH-WRJgh0EWnegFo.json"
}
]

export async function render() {

    console.log(team)

    // this function just has to return a string of HTML
    // you can generate this using js, e.g. using Mustache.js

    return templateHTML;
}