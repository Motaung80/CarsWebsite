const newsType = document.getElementById("carsType");
const carsDetails = document.getElementById("carsdetails");
const brandsDetails = document.getElementById("brandsdetails");

var CarsDataArr = [];
var CarsDataArrImg = [];

 

var req = new XMLHttpRequest();

const parameter = {
        "studentnum":"",
        "type":"GetAllCars",
        "limit":12,
        "apikey":"",
        "return":"*"
    };
const paramsStr = JSON.stringify(parameter);
const link = "https://wheatley.cs.up.ac.za/api/";


req.open("POST", link, true);

console.log(req);

req.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      // handle the response here
    }
};

req.send(paramsStr);

req.onreadystatechange = function() {
    CarsDataArr = [];

    if (this.readyState == 4 && this.status == 200) {
        const myJson = JSON.parse(req.responseText);
        CarsDataArr = myJson.data;
        console.log(CarsDataArr);
    }
    else {
        console.log(req.status, req.statusText);
        carsDetails.innerHTML = "<h5>No data found.</h5>"
        return;
    }
    displayCars();
    displayBrands();
};

var link_to_image = "";
var req_img = new XMLHttpRequest();

window.onload = function() {
    req.onreadystatechange();
};

async function displayCars() {
    carsDetails.innerHTML = "";
    for (const cars of CarsDataArr) {
      const modell = cars.model.toLowerCase();
      const makee = cars.make.toLowerCase();
      const URL = `https://wheatley.cs.up.ac.za/api/getimage?brand=${makee}&model=${modell}`;
      try {
        const URL_Img = await getImagee(URL);
        console.log(makee + " " + modell + " " + URL_Img + " " + URL);
        if (URL_Img == "No Data") {
          console.log("No Data");
        } else {
          const image = document.createElement("img");
          image.setAttribute("height", "matchparent");
          image.setAttribute("width", "100%");
          image.src = URL_Img;

          const pro = document.createElement("div");
          pro.className = "product";

          const namePrice = document.createElement("div");
          namePrice.className = "namePrice";

          const namP = document.createElement("h3");
          namP.className = "card-title";
          namP.innerHTML = cars.make;

          const namM = document.createElement("h3");
          namM.className = "card-title";
          namM.innerHTML = cars.model;

          const fit = document.createElement("div");
          fit.className = "fit";


          const discription1 = document.createElement("p");
          discription1.className = "text-1";
          
          discription1.innerHTML = `<img src="img/car_img/gasoline-pump.png" width="10%">${cars.engine_type}`;
          const discription2 = document.createElement("p");
          discription2.className = "text-2";
          discription2.innerHTML = `<img src="img/car_img/gear-shift.png" width="10%">${cars.transmission}`;
          const discription3 = document.createElement("p");
          discription3.className = "text-3";
          discription3.innerHTML = `<img src="img/car_img/car-engine.png" width="10%">${cars.number_of_cylinders}`;
          const discription4 = document.createElement("p");
          discription4.className = "text-4";
          discription4.innerHTML = `<img src="img/car_img/calendar.png" width="10%">${cars.year_from}`;
          const discription5 = document.createElement("p");
          discription5.className = "text-5";
          discription5.innerHTML = `<img src="img/car_img/wheel.png" width="10%">${cars.drive_wheels}`;


          namePrice.appendChild(namP);
          namePrice.appendChild(namM);

          fit.appendChild(discription1);
          fit.appendChild(discription2);
          fit.appendChild(discription3);
          fit.appendChild(discription4);
          fit.appendChild(discription5);
          pro.appendChild(image);
          pro.appendChild(namePrice);
          pro.appendChild(fit);
          carsDetails.appendChild(pro);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  function getImagee(URL) {
    return new Promise((resolve, reject) => {
      const req_img = new XMLHttpRequest();
      req_img.open("GET", URL, true);
      req_img.onreadystatechange = function() {
        if (this.readyState == 4) {
          if (this.status == 200) {
            const link_to_image = this.responseText;
            console.log(link_to_image);
            resolve(link_to_image); // Resolve the Promise with the image data
          } else {
            reject("Failed to retrieve image data"); // Reject the Promise with an error message
          }
        }
      };
      req_img.send();
    });
  };