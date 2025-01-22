// script.js

let chart; // Chart instance
let lineChart;
let rawData = []; // To store CSV data

// Function to load JSON data
function loadJSON() {
  fetch('data.json')  // Replace with the path to your JSON file
    .then(response => response.json())
    .then(data => {
      rawData = data.filter(row => Object.values(row).some(value => value.trim() !== "")); // Remove empty rows
      console.log("JSON Loaded:", rawData);
      updateChart(rawData);
    })
    .catch(error => console.error("Error loading JSON:", error));
}

// Function to filter data
function filterData(startDate, endDate, ageGroup, gender) {
  console.log("Filter Criteria:", { startDate, endDate, ageGroup, gender });

  // Ensure rawData is not empty and filter it
  const filteredData = rawData.filter((row) => {
    const rowDate = new Date(row.Date);
    const isDateInRange =
      (!startDate || rowDate >= new Date(startDate)) &&
      (!endDate || rowDate <= new Date(endDate));
    
    const isAgeGroupMatch = !ageGroup || row.Age?.trim() === ageGroup.trim();
    const isGenderMatch = !gender || row.Gender?.trim() === gender.trim();
    
    return isDateInRange && isAgeGroupMatch && isGenderMatch;
  });

  console.log("Filtered Data:", filteredData); // Debug filtered data
  return filteredData;
}


// Function to calculate totals for each category (A to F)
function calculateTotals(filteredData) {
  const categories = ["A", "B", "C", "D", "E", "F"];
  const totals = categories.map((category) => {
    return filteredData.reduce((sum, row) => sum + parseInt(row[category] || 0, 10), 0);
  });
  return { categories, totals };
}

// Function to update the chart
function updateChart(filteredData) {
  if (chart) {
    chart.destroy(); // Destroy existing chart
  }

  const { categories, totals } = calculateTotals(filteredData);

  if (filteredData.length === 0) {
    console.log("No matching data found.");
    alert("No matching data found. Please adjust your filter criteria.");
    return;
  }

  const ctx = document.getElementById("myChart").getContext("2d");
  chart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: categories,
      datasets: [
        {
          label: "Counts",
          data: totals,
          backgroundColor: ["#a1887f", "#81c784", "#90a4ae", "#ba68c8", "#4dd0e1", "#4db6ac"],
        },
      ],
    },
    options: {
      indexAxis: "y",
      responsive: true,
      plugins: {
        legend: { display: false },
        tooltip: { enabled: true },
      },
      scales: {
        x: {
          beginAtZero: true,
          title: { display: true, text: "Counts" },
        },
        y: {
          title: { display: true, text: "Categories" },
        },
      },
      onClick: (event, elements) => {
        if (elements.length > 0) {
          const clickedElementIndex = elements[0].index; // Index of clicked bar
          const clickedCategory = categories[clickedElementIndex]; // Corresponding category
          console.log("Clicked Category:", clickedCategory);

          // Filtered data for line chart
          updateLineChart(filteredData, clickedCategory);
        }
      },
    },
  });
}


function updateLineChart(filteredData, category) {
  if (lineChart) {
    lineChart.destroy(); // Destroy existing line chart
  }

  // Extract date and category-specific values
  const dates = filteredData.map((row) => row.Date);
  const values = filteredData.map((row) => parseInt(row[category] || 0, 10));

  const ctx = document.getElementById("lineChart").getContext("2d");
  lineChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: dates,
      datasets: [
        {
          label: `${category} Value Over Time`,
          data: values,
          borderColor: "#ff5722",
          backgroundColor: "rgba(255, 87, 34, 0.2)",
          fill: true,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: true },
        tooltip: { enabled: true },
      },
      scales: {
        x: {
          title: { display: true, text: "Dates" },
        },
        y: {
          beginAtZero: true,
          title: { display: true, text: "Values" },
        },
      },
    },
  });
}

// Event listener for the filter button
document.getElementById("filterBtn").addEventListener("click", () => {
  const startDate = document.getElementById("startDate").value;
  const endDate = document.getElementById("endDate").value;
  const ageGroup = document.getElementById("ageFilter").value;
  const gender = document.getElementById("genderFilter").value;

  const filteredData = filterData(startDate, endDate, ageGroup, gender);
  updateChart(filteredData);
});

// Load JSON when the page loads
window.onload = loadJSON;