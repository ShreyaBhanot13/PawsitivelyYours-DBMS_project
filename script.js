document.addEventListener("DOMContentLoaded", function () {
    const locationForm = document.getElementById("locationForm");
    const hospitalTableBody = document.querySelector("#hospitalTable tbody");

    locationForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const locationInput = document.getElementById("locationInput");
        const locationValue = locationInput.value.trim();

        // Make an API request to fetch hospital data based on the location
        fetch(`http://localhost:3000/paw/api/hospitals?location=${locationValue}`)
            .then((response) => response.json())
            .then((data) => {
                console.log('Data received from server:', data);

                // Clear previous results
                hospitalTableBody.innerHTML = "";

                // Iterate through the data and add rows to the table
                data.forEach((hospital) => {
                    const row = document.createElement("tr");
                    row.innerHTML = `
                        <td>${hospital.v_name}</td>
                        <td>${hospital.hosp_id}</td>
                        <td>${hospital.state}</td>
                        <td>${hospital.city}</td>
                        <td>${hospital.locality}</td>
                        <td>${hospital.pin}</td>
                        <td>${hospital.location.coordinates[1]}</td>
                        <td>${hospital.location.coordinates[0]}</td>
                    `;
                    hospitalTableBody.appendChild(row);
                });
            })
            .catch((error) => {
                console.error("Error fetching hospital data:", error);
            });
    });
});
