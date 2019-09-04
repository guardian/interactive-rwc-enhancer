import templateHTML from "./src/templates/main.html!text"
import axios from 'axios'
import Mustache from "mustache"
import immersiveHTML from "./src/templates/immersive-scaffolding/main.html!text"
import immersiveHeaderHTML from "./src/templates/immersive-scaffolding/header.html!text"
import rp from "request-promise"

const clean = async(immersiveData) => {
    immersiveData.teamClass = getTeamClass(immersiveData.teamname);
    immersiveData.teamprofile = stringToPars( immersiveData.teamprofile );
    immersiveData.twitterLink = 'https://twitter.com/intent/tweet?text=' + encodeURI(immersiveData.header.shareText) + '&url=' + encodeURIComponent(immersiveData.header.url + '?CMP=share_btn_tw');
    immersiveData.facebookLink = 'https://www.facebook.com/dialog/share?app_id=180444840287&href=' + encodeURIComponent(immersiveData.header.url + '?CMP=share_btn_fb');
    immersiveData.emailLink = 'mailto:?subject=' + encodeURIComponent(immersiveData.header.shareText) + '&body=' + encodeURIComponent(immersiveData.header.url + '?CMP=share_btn_link');
    return immersiveData;
}

const team = process.argv.find(a => a.includes("--")).toString().replace("--","")

const dataurls = [
    {
    team : "aus",
    data: "https://interactive.guim.co.uk/docsdata-test/1HEkkUzrVloX1sPXYWkoz_8-L86rcH-WRJgh0EWnegFo.json"
},
{
    team : "eng",
    data: "https://interactive.guim.co.uk/docsdata-test/1kyqSBA0SaP6T2JC8WrpoCdNumKXUPvw2LxnF10OqgfE.json"
},
{
    team : "jpn",
    data: "https://interactive.guim.co.uk/docsdata-test/1HnX-EbWBcPlktmvFY7aWx2-c8SdlI9Z3_6ARq6XRRpo.json"
},
{
    team : "ire",
    data: "https://interactive.guim.co.uk/docsdata-test/1DlJtJH0dsin33XXndsoWnGk82mVnogqDB_7PBwqH-BQ.json"
},
]

// export async function render() {

//     var teamurl = dataurls.find(d => d.team == team).data;

//     var data = (await axios.get(teamurl)).data;

//     const data = await clean(await rp({uri: "https://interactive.guim.co.uk/docsdata-test/1hiZyqgeU6tuo8lAvYB4KDo3GbNt1ZvyD2-ifqlFRVx4.json", json: true}));

//     var output = Mustache.render(templateHTML,data, {"header": immersiveHeaderHTML})

//     // this function just has to return a string of HTML
//     // you can generate this using js, e.g. using Mustache.js

//     return output;
// }

export async function render() {
    var teamurl = dataurls.find(d => d.team == team).data;
    const data = await clean(await rp({uri: teamurl, json: true}));

    return Mustache.render(immersiveHTML, data, {"header": immersiveHeaderHTML});
}


function getTeamClass( str ) {
    str = str.replace(/\s+/g, '-').toLowerCase();
    return str;
}

function stringToPars( str ) {

const pars = str.split('\n')

const pTags = pars.map( str => `<p>${str}</p>` );

return pTags;

}
