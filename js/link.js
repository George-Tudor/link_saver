let links = window.localStorage.links ? JSON.parse(window.localStorage.links) : [];
const params = new URLSearchParams(document.location.search);
const linkId = Number(params.get('id'));

let getNextId = () => {
    let maxId = 0;
    links.forEach(link => {
       if(link.id > maxId) {
           maxId = link.id;
       }
    });
    return maxId + 1;
}

let linksUpdated = () => {
    window.localStorage.links = JSON.stringify(links);
}

let getById = (id) => {
    return links.find(link => link.id === id);
}
console.log(getById(linkId));

let fillLinkData = () => {
    $('#save-link-address').attr("value", getById(linkId).url);
    $('#save-link-title').attr("value", getById(linkId).name);

}
fillLinkData();


$(() => {
    const index = links.map(link => link.id).indexOf(linkId);
    // links[index] = updatedLink;
    $(document).on('click', '.save-link-button', function (e) {

        let linkItem = $('#save-link-address').val();
        let linkName = $('#save-link-title').val();
        let linkObj = {id: linkId, url: linkItem, name: linkName};
        console.log(linkObj);
        links[index] = linkObj;
        linksUpdated();
        console.log(links);
    });
});

