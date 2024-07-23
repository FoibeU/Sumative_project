$(document).ready(function() {
    function fetchRooms() {
        $.ajax({
            url: 'http://localhost:3000/rooms',
            method: 'GET',
            success: function(data) {
                renderTable(data);
            },
            error: function(error) {
                console.error('Error fetching data', error);
            }
        });
    }

    function renderTable(data) {
        const tableBody = $('#datatablesSimple tbody');
        tableBody.empty();
        data.forEach(row => {
            const tr = $('<tr></tr>');
            tr.html(`
                <td>${row.room}</td>
                <td>${row.type}</td>
                <td class="${row.status}">${row.status.charAt(0).toUpperCase() + row.status.slice(1)}</td>
                <td>${row.resident}</td>
                <td>${row.amenities}</td>
            `);
            tableBody.append(tr);
        });
    }

    function filterTable() {
        const roomQuery = $('#roomFilter').val().toLowerCase();
        const statusQuery = $('#statusFilter').val().toLowerCase();

        $.ajax({
            url: 'http://localhost:3000/rooms',
            method: 'GET',
            success: function(data) {
                const filteredData = data.filter(row => {
                    const matchesRoom = row.room.toLowerCase().includes(roomQuery);
                    const matchesStatus = statusQuery === '' || row.status.toLowerCase() === statusQuery;
                    return matchesRoom && matchesStatus;
                });
                renderTable(filteredData);
            },
            error: function(error) {
                console.error('Error fetching data', error);
            }
        });
    }

    function sortTable(columnIndex) {
        $.ajax({
            url: 'http://localhost:3000/rooms',
            method: 'GET',
            success: function(data) {
                const sortedData = [...data].sort((a, b) => {
                    const aValue = Object.values(a)[columnIndex].toLowerCase();
                    const bValue = Object.values(b)[columnIndex].toLowerCase();
                    return aValue.localeCompare(bValue);
                });
                renderTable(sortedData);
            },
            error: function(error) {
                console.error('Error fetching data', error);
            }
        });
    }

    $('#roomFilter').on('input', filterTable);
    $('#statusFilter').on('change', filterTable);

    $('#sortRoomName').on('click', function() { sortTable(0); });
    $('#sortRoomType').on('click', function() { sortTable(1); });
    $('#sortStatus').on('click', function() { sortTable(2); });

    fetchRooms();
});
