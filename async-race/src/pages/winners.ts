import fetchData from '../services/apiService';

export default async function openWinners() {
  try {
    const winners = await fetchData('winners', 'GET');
    const garage = await fetchData('garage', 'GET');

    const tableContainer = document.getElementById('table-container');
    const table = document.createElement('table');
    if (tableContainer) {
      tableContainer.appendChild(table);
    }

    const headerRow = document.createElement('tr');
    const headers = ['ID', 'Car Name', 'Wins', 'Color', 'Time'];
    headers.forEach((headerText) => {
      const header = document.createElement('th');
      header.textContent = headerText;
      headerRow.appendChild(header);
    });
    table.appendChild(headerRow);

    winners.forEach((winner: { id?: number; wins?: number; time?: string; }) => {
      const row = document.createElement('tr');
      const carId = winner.id;
      const carInGarage = garage.find((car: { id: number; }) => car.id === carId);
      if (carInGarage) {
        const { id, name, color } = carInGarage;
        const { wins, time } = winner;

        const colorCell = document.createElement('td');
        colorCell.style.backgroundColor = color;
        colorCell.classList.add('szie-color');

        const cellValues = [id, `${name}`, wins, time];
        cellValues.forEach((value) => {
          const cell = document.createElement('td');
          row.appendChild(colorCell);
          cell.textContent = String(value);
          row.appendChild(cell);
        });
        table.appendChild(row);
      }
    });
  } catch (error) {
    console.error('error');
  }
}
