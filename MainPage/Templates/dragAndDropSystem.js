const fill = document.querySelectorAll(".fill");
const empties = document.querySelectorAll(".empty");
var name, original, temp, butDel;

// Fill listeners
for(const draggedFill of fill){
draggedFill.addEventListener("dragstart", dragStart);
draggedFill.addEventListener("dragend", dragEnd);
}

// Loop through empty boxes and add listeners
for (const empty of empties) {
  empty.addEventListener("mouseover", hover);
  empty.addEventListener("mouseout", leaveHover);
  empty.addEventListener("dragstart", emptyStart);
  empty.addEventListener("dragover", dragOver);
  empty.addEventListener("dragenter", dragEnter);
  empty.addEventListener("dragleave", dragLeave);
  empty.addEventListener("drop", dragDrop);
}

// Drag Functions

function hover() {
  console.log("Large fat men");
  butDel = this.getElementsByTagName("button");
  console.log(butDel);
  console.log(butDel[0].className);

  if(butDel[0].className.includes(" invisible"))
    butDel[0].className = butDel[0].className.substr(0, butDel[0].className.length - 10);
}

function leaveHover() {
  console.log("it works");
  butDel = this.getElementsByTagName("button");

  if(!butDel[0].className.includes(" invisible"))
    butDel[0].className += " invisible";
}

function dragStart() {
    console.log('start');
    originalCard = this;
    name = this.className;
  this.className += " hold";
  setTimeout(() => (this.className = "invisible"), 0);
}

function emptyStart(){
    console.log("empty start");
    originalPlace = this;
}

function dragEnd() {
    console.log('end');
  this.className = name;
}

function dragOver(e) {
    console.log("over");
  e.preventDefault();
}

function dragEnter(e) {
    console.log("enter " + this.id);
  e.preventDefault();
  this.className += " hovered";
}

function dragLeave() {
    console.log("leave");
  this.className = this.className.substr(0, this.className.length - 8);
}

function dragDrop() {
    console.log("drop ");
    this.className = this.className.substr(0, this.className.length - 8);
    if(this != originalPlace){
        temp = this.querySelector(".card");
        console.log(temp);
        console.log("just checking");
        this.append(originalCard);
        originalPlace.append(temp);
    }
}