import fetchData from '../services/apiService';

export default function removeCar() {
  let carID: number;

  async function test() {
    try {
      await fetchData(`garage/${carID}`, 'DELETE');
    } catch (error) {
      console.error('show error: ', error);
    }
  }

  setTimeout(() => {
    const removeButtons = document.querySelectorAll('.remove');
    removeButtons.forEach((item) => {
      item.addEventListener('click', function () {
        const parentElement = item.parentElement;
        if (parentElement) {
          const grandParentElement = parentElement.parentElement;
          if (grandParentElement) {
            const greatGrandParentElement = grandParentElement.parentElement;
            if (greatGrandParentElement) {
              greatGrandParentElement.nextSibling?.remove();
              greatGrandParentElement.remove();
              const curID =
                greatGrandParentElement.children[0].children[1].children[1].children[0].children[0].children[1].id.slice(
                  3,
                );
              carID = Number(curID);

              test();
            }
          }
        }
      });
    });
  }, 1000);
}
