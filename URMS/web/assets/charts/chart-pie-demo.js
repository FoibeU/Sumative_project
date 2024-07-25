
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {

    // Toggle the side navigation
    const sidebarToggle = document.body.querySelector('#sidebarToggle');
    if (sidebarToggle) {
    
         if (localStorage.getItem('sb|sidebar-toggle') === 'true') {
         document.body.classList.toggle('sb-sidenav-toggled');
         }
        sidebarToggle.addEventListener('click', event => {
            event.preventDefault();
            document.body.classList.toggle('sb-sidenav-toggled');
            localStorage.setItem('sb|sidebar-toggle', document.body.classList.contains('sb-sidenav-toggled'));
        });
    }

});

    $(document).ready(function() {
        $('#roomManagementTable').DataTable({
            "paging": true,
            "searching": true,
            "ordering": true,
            "info": true,
            "columnDefs": [
                { "orderable": true, "targets": 0 },
                { "orderable": true, "targets": 1 },
                { "orderable": true, "targets": 2 },
                { "orderable": true, "targets": 3 },
                { "orderable": true, "targets": 4 },
                { "orderable": true, "targets": 5 }
            ]
        });
    });
    
    // Mock data for demonstration
const mockOccupancyData = {
    labels: ['Occupied', 'Vacant','under Mainteance'],
    datasets: [{
        label: 'Occupancy Rate',
        backgroundColor: ['#007bff', '#dc3545'],
        borderColor: '#ffffff',
        data: [60, 25,15], // Example data (percentages)
    }]
};

const mockRoomTypesData = {
    labels: ['Single', 'Double', 'Suite'],
    datasets: [{
        label: 'Room Types',
        backgroundColor: ['#007bff', '#28a745', '#ffc107'],
        borderColor: '#ffffff',
        data: [20, 50, 30], // Example data (percentages)
    }]
};

const mockMaintenanceData = {
    labels: ['Pending', 'Ongoing', 'Completed'],
    datasets: [{
        label: 'Maintenance Requests',
        backgroundColor: ['#ffc107', '#dc3545', '#28a745'],
        borderColor: '#ffffff',
        data: [15, 30, 55], // Example data (percentages)
    }]
};

// Function to create and update charts
function createCharts() {
    var ctxArea = document.getElementById('myAreaChart').getContext('2d');
    var myAreaChart = new Chart(ctxArea, {
        type: 'doughnut', // Can change to 'bar', 'line', etc. as needed
        data: mockOccupancyData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            legend: {
                position: 'right',
            },
        },
    });

    // Bar Chart (Room Types)
    var ctxBar = document.getElementById('myBarChart').getContext('2d');
    var myBarChart = new Chart(ctxBar, {
        type: 'bar',
        data: mockRoomTypesData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            legend: {
                position: 'top',
            },
            scales: {
                x: {
                    stacked: true,
                },
                y: {
                    stacked: true,
                },
            },
        },
    });

    // Pie Chart (Maintenance Requests)
    var ctxPie = document.getElementById('myPieChart').getContext('2d');
    var myPieChart = new Chart(ctxPie, {
        type: 'pie',
        data: mockMaintenanceData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            legend: {
                position: 'right',
            },
        },
    });
}

// Call the function to create charts
createCharts();
var ctxOccupancy = document.getElementById('occupancyChart').getContext('2d');
var occupancyChart = new Chart(ctxOccupancy, {
    type: 'pie',
    data: {
        labels: ['Single Room', 'Double Room', 'Suite'],
        datasets: [{
            label: 'Room Occupancy Rate',
            data: [60, 25, 15],
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
        }]
    },
    options: {
        responsive: true,
        title: {
            display: true,
            text: 'Room Occupancy Rate'
        }
    }
});


