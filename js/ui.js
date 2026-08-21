// Shared interface behavior

const shopDropdown = document.querySelector(".shop-dropdown");
const shopDropdownButton = document.querySelector("#shop-dropdown-button");
const shopDropdownMenu = document.querySelector("#shop-dropdown-menu");

if (shopDropdown && shopDropdownButton && shopDropdownMenu) {
    shopDropdownButton.addEventListener("click", event => {
        event.stopPropagation();
        shopDropdownMenu.classList.toggle("show");
        shopDropdown.classList.toggle("open");
    });

    document.addEventListener("click", event => {
        if (!shopDropdown.contains(event.target)) {
            shopDropdownMenu.classList.remove("show");
            shopDropdown.classList.remove("open");
        }
    });
}
