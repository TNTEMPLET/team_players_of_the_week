const url = "https://docs.google.com/spreadsheets/d/1egHCoZqAPm_B8WiWLo9dEHUQONMOFu38b487slOO_4s/gviz/tq?";

document.addEventListener('DOMContentLoaded', createTable('Major', '9', url));
document.addEventListener('DOMContentLoaded', createTable('Major', '10', url));
document.addEventListener('DOMContentLoaded', createTable('Major', '12', url));


function createTable(division,age,url) {
        const output = document.querySelector(`.output-${division}-${age}`);
        // Check if output element exists
        if (output) {
            const query = encodeURIComponent(`Select A,E,F,G,H,I WHERE E CONTAINS '${division}' AND E CONTAINS '${age}' ORDER BY A`);
            url = url + '&tq=' + query; 
            fetch(url)
                .then(res => res.text())
                .then(rep => {
                    const data = JSON.parse(rep.substr(47).slice(0, -2));
                    // const row = document.createElement('tr');
                    // header.append(row);
                    // data.table.cols.forEach((heading) => {
                    //     const cell = document.createElement('td');
                    //     cell.textContent = heading.label;
                    //     row.append(cell);
                    // });
                    data.table.rows.forEach((main) => {
                        const container = document.createElement('tr');
                        output.append(container);
                        main.c.forEach((ele, index) => {
                            const cell = document.createElement('td');
                            
                            if (index === 0) { // Check if it's the first column (column A)
                                const dateValue = ele.v;
                                cell.textContent = formatDate(dateValue);
                            } else {
                                cell.textContent = ele.v;
                                
                            }
                            container.append(cell);
                        });
                    });
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        } else {
            console.error('Element not found.');
        }
    };

function formatDate(date) {

const dateString = date;

// Extract year, month, and day values from the string
const matches = dateString.match(/\d+/g);
const year = parseInt(matches[0]);
const month = parseInt(matches[1]) + 1; // Months are zero-based, so add 1
const day = parseInt(matches[2]);

// Format the date as "MM/DD/YYYY"
const formattedDate = `${month.toString().padStart(2, '0')}/${day.toString().padStart(2, '0')}/${year}`;

return formattedDate; // Output: "03/11/2024"
}