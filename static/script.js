let allData = [];

// 📍 LOCATION
navigator.geolocation.getCurrentPosition(pos => {
    let lat = pos.coords.latitude;
    let lon = pos.coords.longitude;

    document.getElementById("location").innerText =
        `📍 Your Location: ${lat.toFixed(2)}, ${lon.toFixed(2)}`;
});

// ✅ FIXED FETCH
fetch("/static/restaurants.json")
.then(res => res.json())
.then(data => {
    allData = data;

    console.log("Total restaurants:", data.length);

    display(data);

    document.getElementById("search").addEventListener("keyup", function() {
        let value = this.value.toLowerCase();

        let filtered = allData.filter(r =>
            r.name.toLowerCase().includes(value) ||
            r.category.toLowerCase().includes(value) ||
            r.location.toLowerCase().includes(value)
        );

        display(filtered);
    });
});

//DISPLAY
function display(data) {
    let container = document.getElementById("restaurants");
    container.innerHTML = "";

    data.forEach(r => {
        let card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
            <img src="${r.image}">
            <div class="card-content">
                <h3>${r.name}</h3>
                <p>⭐ ${r.rating} | ${r.category}</p>
                <p>📍 ${r.location}</p>

                <div class="buttons">
                    <a href="${r.map}" target="_blank" class="btn map">📍 Map</a>
                    <a href="${r.order}" target="_blank" class="btn order">🛒 Order</a>
                </div>
            </div>
        `;

        container.appendChild(card);
    });
}