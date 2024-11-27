
const cargoList = [
    {
        id: "CARGO001",
        name: "Строительные материалы",
        status: "В пути",
        origin: "Москва",
        destination: "Казань",
        departureDate: "2024-11-24"
    },
    {
        id: "CARGO002",
        name: "Хрупкий груз",
        status: "Ожидает отправки",
        origin: "Санкт-Петербург",
        destination: "Екатеринбург",
        departureDate: "2024-11-26"
    }
];

function renderTable(data) {
    const tableBody = $("#cargo-table-body");
    tableBody.empty();

    data.forEach((cargo) => {
        let statusClass = "";
        switch (cargo.status) {
            case "Ожидает отправки":
                statusClass = "text-warning";
                break;
            case "В пути":
                statusClass = "text-primary";
                break;
            case "Доставлен":
                statusClass = "text-success";
                break;
        }

        const row = `
            <tr>
                <td>${cargo.id}</td>
                <td>${cargo.name}</td>
                <td>
                    <select class="form-select status-select ${statusClass}" data-id="${cargo.id}">
                        <option value="Ожидает отправки" ${cargo.status === "Ожидает отправки" ? "selected" : ""}>Ожидает отправки</option>
                        <option value="В пути" ${cargo.status === "В пути" ? "selected" : ""}>В пути</option>
                        <option value="Доставлен" ${cargo.status === "Доставлен" ? "selected" : ""}>Доставлен</option>
                    </select>
                </td>
                <td>${cargo.origin}</td>
                <td>${cargo.destination}</td>
                <td>${cargo.departureDate}</td>
                <td><button class="btn btn-danger btn-sm delete-btn" data-id="${cargo.id}">Удалить</button></td>
            </tr>`;
        tableBody.append(row);
    });
}

renderTable(cargoList);


$("#add-cargo-form").on("submit", function (e) {
    e.preventDefault();
    const name = $("#cargo-name").val();
    const origin = $("#cargo-origin").val();
    const destination = $("#cargo-destination").val();
    const departureDate = $("#cargo-date").val();

    if (!name || !origin || !destination || !departureDate) {
        alert("Все поля должны быть заполнены!");
        return;
    }

    const newCargo = {
        id: `CARGO${String(cargoList.length + 1).padStart(3, "0")}`,
        name,
        status: "Ожидает отправки",
        origin,
        destination,
        departureDate
    };

    cargoList.push(newCargo);
    renderTable(cargoList);
    this.reset();
});


$(document).on("change", ".status-select", function () {
    const id = $(this).data("id");
    const newStatus = $(this).val();
    const cargo = cargoList.find((item) => item.id === id);

    if (newStatus === "Доставлен" && new Date(cargo.departureDate) > new Date()) {
        alert("Нельзя доставить груз, если дата отправления в будущем!");
        $(this).val(cargo.status);
        return;
    }

    cargo.status = newStatus;
    renderTable(cargoList);
});

$("#filter-status").on("change", function () {
    const filter = $(this).val();
    const filteredData = filter === "all" ? cargoList : cargoList.filter((item) => item.status === filter);
    renderTable(filteredData);
});

$(document).on("click", ".delete-btn", function () {
    const id = $(this).data("id");
    const index = cargoList.findIndex((item) => item.id === id);
    if (index > -1) {
        cargoList.splice(index, 1);
        renderTable(cargoList);
    }
});







