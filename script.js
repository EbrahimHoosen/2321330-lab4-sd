async function getData() {
    const countryName = document.getElementById("country-input").value.trim();
    if (!countryName) {
        alert("Please enter a country name.");
        return;
    }
 
    try {
        const response = await fetch(`https://restcountries.com/v3.1/name/${countryName}`);
        if (!response.ok) {
            throw new Error("Country not found");
        }
 
        const data = await response.json();
        const country = data[0];
        const countryInfo = document.getElementById("country-info");
        const borderingCountries = document.getElementById("bordering-countries");
 
        countryInfo.innerHTML = `
            <h2>${country.name.common}</h2>
            <p><strong>Capital:</strong> ${country.capital ? country.capital[0] : "N/A"}</p>
            <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
            <p><strong>Region:</strong> ${country.region}</p>
            <img src="${country.flags.svg}" alt="Flag of ${country.name.common}" width="150">
        `;
 
        if (country.borders) {
            try {
                const borderResponse = await fetch(`https://restcountries.com/v3.1/alpha?codes=${country.borders.join(',')}`);
                const borderData = await borderResponse.json();
 
                borderingCountries.innerHTML = "<h2>Bordering Countries</h2>";
                borderData.forEach(border => {
                    borderingCountries.innerHTML += `
                        <p>${border.name.common}</p>
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