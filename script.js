async function getData() {
    const countryName = document.getElementById("country-input").value.trim();//getting input data
    if (!countryName) {
        alert("Please enter a country name.");//if its empty
        return;
    }
 
    try {
        const response = await fetch(`https://restcountries.com/v3.1/name/${countryName}`);//fetch api which requests data
        if (!response.ok) {
            throw new Error("Country not found");//if the country typed doesnt exist
        }
 
        const data = await response.json();//convert response to json format
        const country = data[0];//multiple responses can happen so uu take the first one
        const countryInfo = document.getElementById("country-info");//Gets references to the HTML sections where the country information and bordering countries will be displayed
        const borderingCountries = document.getElementById("bordering-countries");
 
        countryInfo.innerHTML = `
            
            
            <ul>
            <li>Capital: ${country.capital ? country.capital[0] : "N/A"}</li>
            <li>Population: ${country.population.toLocaleString()}</li>
            <li>Region: ${country.region}</li>
            <li>Flag:</li>
            </ul>
            <img src="${country.flags.svg}" alt="Flag of ${country.name.common}" width="150">
            
        `;
 
        if (country.borders) {
            try {
                const borderResponse = await fetch(`https://restcountries.com/v3.1/alpha?codes=${country.borders.join(',')}`);
                const borderData = await borderResponse.json();
 
                borderingCountries.innerHTML = "<h2>Bordering Countries</h2>";
                borderData.forEach(border => {
                    borderingCountries.innerHTML += `
                    <ul>
                        <li>${border.name.common}</li>
                    </ul>
                        <img src="${border.flags.svg}" alt="Flag of ${border.name.common}" width="100">
                    `;
                });
            } catch {
                borderingCountries.innerHTML = "<p>Error fetching bordering countries.</p>";
            }
        } else {
            borderingCountries.innerHTML = "<p>No bordering countries.</p>";
        }
    } catch (error) {
        document.getElementById("country-info").innerHTML = `<p style='color: red;'>${error.message}</p>`;
        document.getElementById("bordering-countries").innerHTML = "";
    }
 }
 
 document.getElementById("submit-btn").addEventListener("click", getData);