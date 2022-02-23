
//Global Variable
var markersURLArray=[];
var markersNameArray=[];

const urlParams = new URLSearchParams(window.location.search);
const destinationID = urlParams.get('destination'); // use this at the end of the page to get the correct marker values

async function getData() {
    let r = fetch('/wolfsberg/data.json')
        .then(response => response.json())
        .catch((err) => {
          console.log(err.message);
        });
    return await r;
}

AFRAME.registerComponent('markers_start',{
  init: async function(){

    var sceneEl = document.querySelector('a-scene');

    var data = await getData();
    if(destinationID !== null){
      // create the markers for the given destination
      const destination = data.destinations[0][destinationID];
      const directions = data.destinationMarkers[0][destinationID];
      const markers = data.markers[0];
      let markerCount = Object.keys(markers).length;

      //list of the markers
      for(var i=1; i<=markerCount; i++)
      {
        //var url = markers[i][0].patt;
        var url="wolfsberg/markersPatt/pattern-Individual_Blocks-"+i+".patt";
        markersURLArray.push(url);
        markersNameArray.push('Marker_'+i);
      }

      console.log(markersNameArray);

     for(var k=0; k<=markerCount -1; k++)
      {
        /*
        var markerEl = document.createElement('a-marker');
        markerEl.setAttribute('type','pattern');
        markerEl.setAttribute('url',markersURLArray[k]);
        markerEl.setAttribute('id',markersNameArray[k]);

        markerEl.setAttribute('registerevents','');
        sceneEl.appendChild(markerEl);

        var textEl = document.createElement('a-entity');            
        textEl.setAttribute('id','text');
        textEl.setAttribute('text',{color: 'red', align: 'center', value:directions[0][k+1], width: '5.5'});
        textEl.object3D.position.set(0, 0.7, 0);
        textEl.object3D.rotation.set(-90, 0, 0);
        markerEl.appendChild(textEl);
        */

            var markerEl = document.createElement('a-marker');
            markerEl.setAttribute('type','pattern');
            markerEl.setAttribute('url',markersURLArray[k]);
            markerEl.setAttribute('id',markersNameArray[k]);

            markerEl.setAttribute('registerevents','');
            sceneEl.appendChild(markerEl);

            //Adding text to each marker
            var textEl = document.createElement('a-entity');
            
            textEl.setAttribute('id',markersNameArray[k]);
            textEl.setAttribute('text',{color: 'red', align: 'center', value:'xx', width: '5.5'});
            textEl.object3D.position.set(0, 0.7, 0);
            textEl.object3D.rotation.set(-90, 0, 0);

            markerEl.appendChild(textEl);

      }

    } else {
         var form = document.createElement("p");
         var text = document.createTextNode("Enter the Room Number");
         form.appendChild(text);
         var element = document.getElementById("destination_form");
         element.appendChild(form);
    }
 
  }
});


//Detect marker found and lost
AFRAME.registerComponent('registerevents', {
    init: function () {
      const marker = this.el;

      marker.addEventListener("markerFound", ()=> {
        var markerId = marker.id;
        console.log('Marker Found: ', markerId);
      });

      marker.addEventListener("markerLost",() =>{
        var markerId = marker.id;
        console.log('Marker Lost: ', markerId);
      });
    },
  });