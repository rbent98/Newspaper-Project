const sources = document.querySelectorAll(".empty");
for (const empty of sources) {
  empty.addEventListener("mouseover", hover);
  empty.addEventListener("click", expandModal);
}

// Get the modal
var modal = document.getElementById("myModal");

// Get the image and insert it inside the modal - use its "alt" text as a caption
var modalImg = document.getElementById("img01");
var captionText = document.getElementById("caption");
var captionText2 = document.getElementById("caption2");

function hover() {
  console.log("hovering");
  modalImg.src = this.getElementsByTagName("img")[0].getAttribute("src");
  captionText.innerHTML = this.getElementsByTagName("h5")[0].textContent;
  captionText2.innerHTML = this.getElementsByTagName("p")[0].textContent;
}

function expandModal() {
  modal.style.display = "block";
}

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}