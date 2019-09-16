var groupDropDown = document.getElementById("group-dropdown");
var groupDropDownBtn = document.getElementById("group-dropdown-btn");
var groupDropDownMore = document.getElementById("group-dropdown-more");

function toggleGroup() {
    if (groupDropDown.style.display === "none") {
        groupDropDown.style.display = "block";
        groupDropDownMore.style.display = "none";
    } else {
        groupDropDown.style.display = "none";
        groupDropDownMore.style.display = "block";
    }
}

groupDropDownBtn.addEventListener('click', toggleGroup);