document.getElementById("submit-btn").addEventListener("click", () => {
    const countryName = document.getElementById("country-input").value.trim();
    if (!countryName) {
        alert("You did not enter a country");
        return;
    }

    fetch(`https://restcountries.com/name/${countryName}`)
        .then(response => {
            if (!response.ok) {
                throw new Error("The country you entered was not found");
            }
            return response.json();
        })
        .then(data => {
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
                fetch(`https://restcountries.com/v3.1/alpha?codes=${country.borders.join(',')}`)
                    .then(response => response.json())
                    .then(borderData => {
                        borderingCountries.innerHTML = "<h2>Bordering Countries</h2>";
                        borderData.forEach(border => {
                            borderingCountries.innerHTML += `
                                <p>${border.name.common}</p>
                                <img src="${border.flags.svg}" alt="Flag of ${border.name.common}" width="100">
                            `;
                        });
                    })
                    .catch(() => borderingCountries.innerHTML = "<p>Error fetching bordering countries.</p>");
            } else {
                borderingCountries.innerHTML = "<p>No bordering countries.</p>";
            }
        })
        .catch(error => {
            document.getElementById("country-info").innerHTML = `<p style='color: red;'>${error.message}</p>`;
            document.getElementById("bordering-countries").innerHTML = "";
        });
});