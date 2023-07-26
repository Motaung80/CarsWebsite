const newsType = document.getElementById("carsType");
const carsDetails = document.getElementById("carsdetails");
const brandsDetails = document.getElementById("brandsdetails");

var CarsDataArr = [];
var CarsDataArrImg = [];
 

var req = new XMLHttpRequest();

const parameter = {
        "studentnum":"u19345993",
        "type":"GetAllCars",
        "limit":50,
        "apikey":"a9198b68355f78830054c31a39916b7f",
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
  }

async function displayBrands() {
    carsDetails.innerHTML = "";
    for (const cars of CarsDataArr) {
      //const modell = cars.model.toLowerCase();
      const makee = cars.make.toLowerCase();
      const URL = `https://wheatley.cs.up.ac.za/api/getimage?brand=${makee}`;
      try {
        const URL_Img = await getImagee(URL);
        //console.log(makee + " " + modell + " " + URL_Img + " " + URL);
        if (URL_Img == "No Data") {
          console.log("No Data");
        } else {
  
          const element = document.createElement("div");
          element.className = "card";
          element.style.background = `url(${URL_Img}) center no-repeat`;
          element.style.backgroundRepeat = "no-repeat";
          element.style.backgroundSize = "60% 60%";
  
          const body = document.createElement("div");
          body.className = "card__body";
  
          const namP = document.createElement("h3");
          namP.className = "card__title";
          namP.innerHTML = cars.make;
  
          body.appendChild(namP);
          element.appendChild(body);
          brandsDetails.appendChild(element);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }