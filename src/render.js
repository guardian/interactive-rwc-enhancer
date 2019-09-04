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
    team : "arg",
    data: "https://interactive.guim.co.uk/docsdata-test/1-ZCUbLU7asijvC0owMSCf3v_ZMgDde9IDVevHWlJCKc.json"
},
{
    team : "can",
    data: "https://interactive.guim.co.uk/docsdata-test/1ts0VyaolYQGJ2zrkrMmzZ-4NMsYlNLCM5AQc4eAvVQQ.json"
},
{
    team : "eng",
    data: "https://interactive.guim.co.uk/docsdata-test/1kyqSBA0SaP6T2JC8WrpoCdNumKXUPvw2LxnF10OqgfE.json"
},
{
    team : "fij",
    data: "https://interactive.guim.co.uk/docsdata-test/17-rTShx8y2Tm0PkBot6foxfU5LnPDRJSUHnjhectP2g.json"
},
{
    team : "fra",
    data: "https://interactive.guim.co.uk/docsdata-test/1y6jmPZWUoJp8iSZKhEJKvJenh17PxFuLaUqplUUlYbA.json"
},
{
    team : "geo",
    data: "https://interactive.guim.co.uk/docsdata-test/1dmqUGpuzhHyS2owgY-h3xghLBqBC42d_Sd4NWvTpFBU.json"
},
{
    team : "ire",
    data: "https://interactive.guim.co.uk/docsdata-test/1DlJtJH0dsin33XXndsoWnGk82mVnogqDB_7PBwqH-BQ.json"
},
{
    team : "jpn",
    data: "https://interactive.guim.co.uk/docsdata-test/1HnX-EbWBcPlktmvFY7aWx2-c8SdlI9Z3_6ARq6XRRpo.json"
},
{
    team : "nam",
    data: "https://interactive.guim.co.uk/docsdata-test/1RJC9DcNL7fYE72GWnkWO9DgsLAwbcQRwmvALTwMxPnE.json"
},
{
    team : "nz",
    data: "https://interactive.guim.co.uk/docsdata-test/1tuu6c5av30Q8oJpTsGZEBPPlnwUDFSGLpxCqxneg6EA.json"
},
{
    team : "rsa",
    data: "https://interactive.guim.co.uk/docsdata-test/1GJThABbQa2YC0esRcBS8QyKta_h4_HNGwfOD9wcRCl4.json"
},
{
    team : "rus",
    data: "https://interactive.guim.co.uk/docsdata-test/1m-PAcQ1HeseVwDM9AcpAdJyFZWmTa7DVzwFh3F5ESrs.json"
},
{
    team : "sam",
    data: "https://interactive.guim.co.uk/docsdata-test/141bVav0hJ2ql3XrwEWQqBLpXgtOaWMdfnEH9N6qihTM.json"
},
{
    team : "sco",
    data: "https://interactive.guim.co.uk/docsdata-test/19i_4V-5tixNxZQLx1FJcA9F7BFH-5ieIT9CmcVJsMXg.json"
},
{
    team : "ton",
    data: "https://interactive.guim.co.uk/docsdata-test/1nu05g_4iWZ8x0RjmYM5WyZvnLmRSspIfbgMbdOOP8u4.json"
},
{
    team : "uru",
    data: "https://interactive.guim.co.uk/docsdata-test/1rAVNxQ36dSuYYgrnrH_uynGWGpMa7tMK5A2xonelHTU.json"
},
{
    team : "usa",
    data: "https://interactive.guim.co.uk/docsdata-test/19fDLPSZXVdMlhJdruyO-KeCtsNEMU3_JyV_sCq3BzG4.json"
},
{
    team : "wal",
    data: "https://interactive.guim.co.uk/docsdata-test/1Y3zJuyAy22LWOWyYKy2dIp5KSEmqph4kPZIQWDxnOOs.json"
}
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
