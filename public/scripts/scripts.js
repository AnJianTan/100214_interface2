const API_BASE_URL = 'http://localhost:3000';

// Fetch the current status of the spacecraft
async function fetchStatus() {
    try {
        const response = await fetch(`${API_BASE_URL}/status`);
        const status = await response.json();
        if (status.power === "OFF") {
            document.getElementById('power').classList.remove('on');
            document.getElementById('power').classList.add('off');
        } else {
            document.getElementById('power').classList.remove('off');
            document.getElementById('power').classList.add('on');
        }
        document.getElementById('power').getElementsByTagName("span")[0].textContent = `${status.power}`;
        document.getElementById('speed').textContent = `Speed: ${status.speed}`;
        document.getElementById('fuel').textContent = `Fuel: ${status.fuel}`;
    } catch (error) {
        console.error('Error fetching status:', error);
    }
}

// Update the speed of the spacecraft
async function updateSpeed(newSpeed) {
    try {
        const response = await fetch(`${API_BASE_URL}/update-status`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ speed: newSpeed }),
        });
        const result = await response.json();
        console.log(result.message);
        fetchStatus(); // Refresh the status display
    } catch (error) {
        console.error('Error updating speed:', error);
    }
}

// Refuel the spacecraft to desired amount
async function refuel(newFuel) {
    try {
        const response = await fetch(`${API_BASE_URL}/update-status`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ fuel: newFuel }),
        });
        const result = await response.json();
        console.log(result.message);
        fetchStatus(); // Refresh the status display
    } catch (error) {
        console.error('Error refueling:', error);
    }
}

// Set the power state of the spacecraft
async function setPower(newPowerState) {
    try {
        const response = await fetch(`${API_BASE_URL}/update-status`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ power: newPowerState }),
        });
        const result = await response.json();
        console.log(result.message);
        fetchStatus(); // Refresh the status display
    } catch (error) {
        console.error('Error setting power state:', error);
    }
}

// Fetch initial status on page load
fetchStatus();