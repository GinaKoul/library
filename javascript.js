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
    deleteB();
});

//Array to store the objects

let myLibrary = [];

//Add books from start and push them into Library

const book1 = new Book("Hygge","Mikke","247","yes");
const book2 = new Book("Hygge from Home","Mikke","292","yes");
const book3 = new Book("Lykke","Mikke","342","yes");
const book4 = new Book("The art of creating memories","Mikke","360","no");

myLibrary.push(book1,book2,book3,book4);

if(myLibrary.length>0){
    for(let i=0; i<=myLibrary.length-1;i++){
        let newBook = myLibrary[i];
        createCard(newBook);
        deleteB();
    }
}

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
    
    book.setAttribute('id',classes);
    book.classList.add("book");

    books.appendChild(book);

    const deleteBook = document.createElement("div");
    const info = document.createElement("div");
    const read = document.createElement("div");

    deleteBook.classList.add("delete");
    info.classList.add("info");
    read.classList.add("read");

    book.appendChild(deleteBook);
    book.appendChild(info);
    book.appendChild(read);

    const cross = document.createElement("i");
    const bookTitle = document.createElement("div");
    const bookAuthor = document.createElement("div");
    const bookPages = document.createElement("div");
    const bookRead = document.createElement("div");
  
    cross.classList.add("fa-solid");
    cross.classList.add("fa-xmark");
    bookTitle.classList.add("bookTitle");
    bookAuthor.classList.add("bookAuthor");
    bookPages.classList.add("bookPages");
    bookRead.classList.add("bookRead");

    cross.setAttribute(`onclick`,`deleteB(${cross})`);

    bookTitle.textContent = `Title: ${newBook.title}`;
    bookAuthor.textContent = `Author: ${newBook.author}`;
    bookPages.textContent = `Pages: ${newBook.pages}`;
    if(newBook.read==="yes"){
        bookRead.textContent = `read`;
    }else if(newBook.read==="no"){
        bookRead.textContent = `not read yet`;
    }

    deleteBook.appendChild(cross);
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

function deleteB(){

    const childs = document.querySelectorAll(".delete");

    childs.forEach(child =>{
        child.addEventListener('click',function(){

            let deleteId = this.parentElement.id;

            for(let i=0; i<=myLibrary.length-1;i++){

                const book = myLibrary[i].title.split(" ");
                
                for(let i=0; i<=book.length-1; i++){

                    let word;

                    if(i===0){
                        word = book[i].charAt(0).toLowerCase()+book[i].slice(1);
                    }else{
                        word = book[i].charAt(0).toUpperCase()+book[i].slice(1);
                    }

                    book[i]= word;
                }

                const title = book.join("");
                if(deleteId===title){

                    myLibrary.splice(i,1);

                    const removeBook = document.querySelector(`#${deleteId}`);

                    removeBook.remove();
                }
            }
        });
    });
}