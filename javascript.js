const submit = document.querySelector(".submit");
const books = document.querySelector(".books");
const add = document.querySelector(".add");
const bookInfo = document.querySelector(".book-info");
const bookDisplay = document.querySelector(".books");
const closeInfo = document.querySelector(".close");

closeInfo.addEventListener('click',()=>{
    bookDisplay.style.display = "grid";
    bookInfo.style.display = "none";
});

add.addEventListener('click',()=>{
    bookDisplay.style.display = "none";
    bookInfo.style.display = "flex";
});

submit.addEventListener('click',(event)=>{
    event.preventDefault();
    addBookToLibrary();
});

//Array to store the objects

let myLibrary = [];

/*Takes book info from user,calls the constructor
and pushes the object into the array*/

function addBookToLibrary() {

    bookDisplay.style.display = "grid";

    let title = document.querySelector("#title").value;
    let author = document.querySelector("#author").value;
    let pages = document.querySelector("#pages").value;
    let read = document.querySelector('input[name="read"]:checked').value;

    //Create new book object
    const newBook = new Book(title,author,pages,read);

    //Create book card
    createCard(newBook);

    myLibrary.push(newBook);

    console.log(myLibrary);

    clearForm();

}

//Object constructor

function Book(title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function(){
        return (title+" by "+author+", "+pages+" pages, "+read);
    };
};

function createCard(newBook){
    const book = document.createElement("div");
    const classArray = newBook.title.split(" ");
    for(let i=0; i<=classArray.length-1; i++){

        let word;

        if(i===0){
            word = classArray[i].charAt(0).toLowerCase()+classArray[i].slice(1);
        }else{
            word = classArray[i].charAt(0).toUpperCase()+classArray[i].slice(1);
        }

        classArray[i]= word;
    }

    const classes = classArray.join("");
    
    book.classList.add(classes);
    book.classList.add("book");

    books.appendChild(book);

    const info = document.createElement("div");
    const read = document.createElement("div");
    info.classList.add("info");
    read.classList.add("read");
    book.appendChild(info);
    book.appendChild(read);

    const bookTitle = document.createElement("div");
    const bookAuthor = document.createElement("div");
    const bookPages = document.createElement("div");
    const bookRead = document.createElement("div");
  
    bookTitle.classList.add("bookTitle");
    bookAuthor.classList.add("bookAuthor");
    bookPages.classList.add("bookPages");
    bookRead.classList.add("bookRead");

    bookTitle.textContent = `Title: ${newBook.title}`;
    bookAuthor.textContent = `Author: ${newBook.author}`;
    bookPages.textContent = `Pages: ${newBook.pages}`;
    if(newBook.read==="yes"){
        bookRead.textContent = `read`;
    }else if(newBook.read==="no"){
        bookRead.textContent = `not read yet`;
    }

    info.appendChild(bookTitle);
    info.appendChild(bookAuthor);
    info.appendChild(bookPages);
    read.appendChild(bookRead);
}

function clearForm(){
    document.querySelector("#title").value = "";
    document.querySelector("#author").value = "";
    document.querySelector("#pages").value = "";
    document.querySelector('input[name="read"]:checked').value = "no";
}