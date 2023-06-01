const Particles = require("particlesjs");

const key = process.env.AUTH_TOKEN
let city = 'london';

const particles = () => {
    Particles.init({
      selector: '.background',
      color: '#8f8f8f'
    });
  };

window.onload = () => {
    particles();
}


const search = () => {
    const input = document.getElementById('input');
    const submit = document.getElementById('submit');
    submit.addEventListener('click', (e) => {
        e.preventDefault();
        if (input.value) {
            city = input.value.toLowerCase();
            console.log(city);
            deleteData();
            fetchData();
            time();
            

        };

    })
    

}


console.log(document.querySelector('background'))

const time = (is_day) => {
    console.log(is_day)
    if (is_day == 1) {
        document.body.style.backgroundColor = "darkblue";
        

    } else document.body.style.backgroundColor = "#111";
           

}


const fetchData = () => {
    fetch('https://api.weatherapi.com/v1/current.json?key=' + key + '&q=' + city)
    .then(function(response) {
        return response.json();
    })
    .then(function(response) {
        let locationName = response.location.name;
        let currentCondition = response.current.condition.text;
        let conditionIcon = response.current.condition.icon;
        let temp_c = response.current.temp_c;
        let temp_f = response.current.temp_f;
        let region = response.location.region;
        let is_day = response.current.is_day;
        console.log(response)
        renderData(locationName, currentCondition, conditionIcon, temp_c, temp_f, region);
        time(is_day);
        search();
        

    })
    .catch(function(err) {
        console.log('Error');
    });

}




const renderData = (locationName, currentCondition, conditionIcon, temp_c, temp_f, region) => {
    let innerwrapper = `
                        <div class="container-fluid">
                           <div class="row">
                           <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                           <h1>${locationName}</h1>
                           <p>${region}</p>
                           <div class="input-group">
                           <input  id="input" type="search" class="form-control rounded" placeholder="Search for a city ..." aria-label="Search" aria-describedby="search-addon" />
                           <button id="submit" type="button" class="btn btn-outline-primary">Submit</button>
                            </div>
                            </div>
                            <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                            <h4><img src="https:${conditionIcon}" alt="icon">${currentCondition}</h4>
                            </div>
                            <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                            <h1>${temp_c}°C</h1>
                            <hr>
                            <h1>${temp_f}°F</h1>
                            </div>
                           </div>
                         </div>


                        
                        `;
    const body = document.querySelector('body')
    const content = document.createElement('div');
    content.classList.add('wrapper');
    body.appendChild(content);
    content.innerHTML = innerwrapper;
                        

}


deleteData = () => {
    document.querySelector('body').innerHTML = ``;
}



fetchData();