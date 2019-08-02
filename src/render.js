import templateHTML from "./src/templates/main.html!text"
import mustache from 'mustache'
import axios from 'axios'

const team = process.argv.find(a => a.includes("--")).toString().replace("--","")

const dataurls = [
    {
    team : "aus",
    data: "https://interactive.guim.co.uk/docsdata-test/1HEkkUzrVloX1sPXYWkoz_8-L86rcH-WRJgh0EWnegFo.json"
},
{
    team : "eng",
    data: "https://interactive.guim.co.uk/docsdata-test/1kyqSBA0SaP6T2JC8WrpoCdNumKXUPvw2LxnF10OqgfE.json"
}
]

export async function render() {

    var teamurl = dataurls.find(d => d.team == team).data;

    var data = (await axios.get(teamurl)).data;

    var output = mustache.render(templateHTML,data)

    // this function just has to return a string of HTML
    // you can generate this using js, e.g. using Mustache.js

    return output;
}