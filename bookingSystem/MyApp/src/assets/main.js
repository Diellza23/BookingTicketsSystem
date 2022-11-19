const accordionItems = document.querySelectorAll(".value__accordion-item");

accordionItems.forEach((item) => {
  const accordionHeader = item.querySelector(".value__accordion-header");
  accordionHeader.addEventListener("click", () => {
    toggleItem(item);
  });
});
const toggleItem = (item) => {
  const accordionContent = item.querySelector(".value__accordion-content");

  accordionContent.style.height = accordionContent.scrollHeight + "px";
  item.classList.add("accordion-open");
};
