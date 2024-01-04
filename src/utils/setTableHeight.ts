export const setTableHeight = () => {
  setTimeout(() => {
    const tdElements =
      document.querySelectorAll<HTMLElement>("tbody tr td");
    const thElements =
      document.querySelectorAll<HTMLElement>("thead tr th");
    if (window.innerWidth <= 539) {
      tdElements.forEach((td, index) => {
        const tdHeight = td.getBoundingClientRect().height;
        thElements[index].style.height = `${tdHeight}px`;
      });
    } else {
      tdElements.forEach((_, index) => {
        thElements[index].style.height = `auto`;
      });
    }
  }, 500);
}