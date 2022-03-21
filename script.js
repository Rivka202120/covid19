let countries = [];
const inp = document.querySelector("input");

const UpdateGlobalData = ({ TotalConfirmed, TotalDeaths, NewDeaths, NewConfirmed }) => {
    document.querySelector("#globalCasesTotal").textContent = TotalConfirmed;
    document.querySelector("#globalCasesDaily").textContent = NewConfirmed;
    document.querySelector("#globalDeathsTotal").textContent = TotalDeaths;
    document.querySelector("#globalDeathsDaily").textContent = NewDeaths;

}

const displayCountriesTable = () => {
    const table = document.querySelector("table");

    table.innerHTML = `
    <thead>
        <tr>
        <th>Country</th>
        <th>Daily Cases</th>
        <th>Total Cases</th>
        <th>Daily Death</th> 
        <th>Total Death</th>
         </tr>
    </thead>`

    const filterCountries = countries.filter(country =>
        country.Country.toLowerCase().includes(inp.value.toLowerCase())
    );
    
    if(!filterCountries){
        table.innerHTML += `
        <tr>
            <td>Coudn't find your country 😢</td>
        </tr>`
    }
    
    for (const country of filterCountries) {
        table.innerHTML += `
        <tr>
            <td>${country.Country}</td>
            <td>${country.NewConfirmed.toLocaleString('en-IL')}</td>
            <td>${country.TotalConfirmed.toLocaleString('en-IL')}</td>
            <td>${country.NewDeaths.toLocaleString('en-IL')}</td>
            <td>${country.TotalDeaths.toLocaleString('en-IL')}</td>
        </tr>
    `
    }
}

const getData = async () => {
    const res = await fetch('https://api.covid19api.com/summary');
    const data = await res.json();
    countries = data.Countries;

    UpdateGlobalData(data.Global);
    displayCountriesTable();
}

getData();

inp.addEventListener("keyup", displayCountriesTable);


