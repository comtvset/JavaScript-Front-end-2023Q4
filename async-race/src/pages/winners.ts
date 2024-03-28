import fetchData from '../services/apiService';

export default function openWinners() {
  fetchData('winners');
}
