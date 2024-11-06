function collection() {
   fetch("/tourists.json")
   .then(response => response.json())
   .then(res => {
       // Assuming the response is a direct array of tourist data
       res.tourists.forEach(element => {
           // Correctly declare latitude, longitude, and color
           let latitude = element.latitude;  
           let longitude = element.longitude;

           let cases = element.tourists_millions;
           let place = element.country;
           let color;

           // Correct color assignment logic
           if (cases > 1000000) {
               color = "rgb(153, 0, 0)";
           } else if (cases > 750000) {
               color = "rgb(204, 0, 0)";
           } else if (cases > 500000) {
               color = "rgb(255, 0, 0)";
           } else if (cases > 250000) {
               color = "rgb(255, 51, 51)";
           } else {
               color = "rgb(255, 102, 102)";
           }

           // Add marker to the map
           const marker = new mapboxgl.Marker({
               draggable: false,
               color: color
           })
           .setLngLat([longitude, latitude])
           .addTo(map);

           const popup = new mapboxgl.Popup({
            closeButton: false,
            closeOnClick: false
        }).setHTML(`Tourists: ${cases} <br> Country: ${place}`);

        
        marker.getElement().addEventListener('mouseenter', () => {
            
            popup.addTo(map);
            popup.setLngLat([longitude, latitude]);

        });

        marker.getElement().addEventListener('mouseleave', () => {
           
            popup.remove();
            
          });
       });
   });
}

collection();
