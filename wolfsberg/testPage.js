
async function getData() {
    let r = fetch('wolfsberg/data.json')
        .then(response => response.json())
        .catch((err) => {
          console.log(err.message);
        });
    return await r;
}

async function load() {

    var data = await getData();
    const markers = data.markers[0];
    let markerCount = Object.keys(markers).length;

    for(var i=1; i<=markerCount; i++)
    {
        var img = document.createElement("img");
        img.src="wolfsberg/markersPng/pattern-Individual_Blocks-"+i+".jpg";
        document.getElementById('block').appendChild(img);
    }

}

load();
