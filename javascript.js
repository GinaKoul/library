// Access elements from the html file

const submit = document.querySelector(".submit");
const books = document.querySelector(".books");
const add = document.querySelector(".add");
const bookInfo = document.querySelector(".book-info");
const bookDisplay = document.querySelector(".books");
const closeInfo = document.querySelector(".close");

/* Add event listener to change the display
 of the form when the cross icon is clicked*/

closeInfo.addEventListener('click',()=>{
    bookDisplay.style.display = "grid";
    bookInfo.style.display = "none";
});

/* Add event lintener to change the display
of the library items when ADD NEW BOOK is
clicked */

add.addEventListener('click',()=>{
    bookDisplay.style.display = "none";
    bookInfo.style.display = "flex";
});

submit.addEventListener('click',(event)=>{
    event.preventDefault();
    addBookToLibrary();
    changeReadStatus();
    deleteB();
});

// Create array variable to store the objects

let myLibrary = [];

/* Add books from start by calling the object
constructor and push them into myLibrary array */

const book1 = new Book("Hygge","Mikke","247","yes");
const book2 = new Book("Hygge from Home","Mikke","292","yes");
const book3 = new Book("Lykke","Mikke","342","yes");
const book4 = new Book("The art of creating memories","Mikke","360","no");

myLibrary.push(book1,book2,book3,book4);

/* Create the html elements for each book inside
the myLibrary array */

if(myLibrary.length>0){
    for(let i=0; i<=myLibrary.length-1;i++){
        let newBook = myLibrary[i];
        createCard(newBook);
    }
}

/* Add event linteners for the delete icons and
bookmark icons of every book */

changeReadStatus();
deleteB();

/* Take book info from user,call the constructor
and push the new object into the myLibrary array*/

function addBookToLibrary() {

    // Set display of the book section back to grid

    bookDisplay.style.display = "grid";

    let title = document.querySelector("#title").value;
    let author = document.querySelector("#author").value;
    let pages = document.querySelector("#pages").value;
    let read = document.querySelector('input[name="read"]:checked').value;

    // Create new book object
    const newBook = new Book(title,author,pages,read);

    // Create book card
    createCard(newBook);

    myLibrary.push(newBook);

    clearForm();

}

// Object constructor

function Book(title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function(){
        return (title+" by "+author+", "+pages+" pages, "+read);
    };
};

/* Create all the elements needed to display the
book information and icons */

function createCard(newBook){

    /* Create new div inside the div of class books
     and add class of book and id of book title
     which is created by calling the title of the
     book and turning it to camel style*/

    const book = document.createElement("div");
    const idArray = newBook.title.split(" ");
    for(let i=0; i<=idArray.length-1; i++){

        let word;

        if(i===0){
            word = idArray[i].charAt(0).toLowerCase()+idArray[i].slice(1);
        }else{
            word = idArray[i].charAt(0).toUpperCase()+idArray[i].slice(1);
        }

        idArray[i]= word;
    }

    const ids = idArray.join("");
    
    book.setAttribute('id',ids);
    book.classList.add("book");

    books.appendChild(book);

    /* Create new div inside the div of class book
    to hold the icons */

    const icons = document.createElement("div");
    icons.classList.add("book-icons");
    book.appendChild(icons);

    /* Create 4 new divs, 2 inside the icon holder 
    and 2 inside the book element. Add classes to them */

    const readStatus = document.createElement("div");
    const deleteBook = document.createElement("div");
    const info = document.createElement("div");
    const read = document.createElement("div");

    readStatus.classList.add("read-status");
    deleteBook.classList.add("delete");
    info.classList.add("info");
    read.classList.add("read");

    icons.appendChild(readStatus);
    icons.appendChild(deleteBook);
    book.appendChild(info);
    book.appendChild(read);

    /* Create 2 i elements in order to add their
    icons and 4 divs to contain the book information
    and add classes to them */

    const bookmark = document.createElement("i");
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

    /* Add text content to each div containing book
    information */

    bookTitle.textContent = `Title: ${newBook.title}`;
    bookAuthor.textContent = `Author: ${newBook.author}`;
    bookPages.textContent = `Pages: ${newBook.pages}`;
    if(newBook.read==="yes"){
        bookRead.textContent = `read`;
        bookmark.classList.add("fa-solid", "fa-bookmark");
    }else if(newBook.read==="no"){
        bookRead.textContent = `not read yet`;
        bookmark.classList.add("fa-regular", "fa-bookmark");
    }

    readStatus.appendChild(bookmark);
    deleteBook.appendChild(cross);
    info.appendChild(bookTitle);
    info.appendChild(bookAuthor);
    info.appendChild(bookPages);
    read.appendChild(bookRead);

}

// Clear the form input values

function clearForm(){
    document.querySelector("#title").value = "";
    document.querySelector("#author").value = "";
    document.querySelector("#pages").value = "";
    document.querySelector('input[name="read"]:checked').value = "no";
}

/* Add event listener to each delete icon inside the
book elements */

function deleteB(){

    const childs = document.querySelectorAll(".delete");

    childs.forEach(child =>{
        child.addEventListener('click',function(){

            /* Get the book id and compare it to the book
            object title */

            let deleteElement = this.parentElement;
            let deleteId = deleteElement.parentElement.id;

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

                /* If there is a match remove the object from
                the myLibrary array and the html file */

                if(deleteId===title){

                    myLibrary.splice(i,1);

                    const removeBook = document.querySelector(`#${deleteId}`);

                    removeBook.remove();
                }
            }
        });
    });
}

/* Add event listener to each bookmark icon inside the
book elements */

function changeReadStatus(){

    const childs = document.querySelectorAll(".read-status");

    childs.forEach(child =>{
        child.addEventListener('click',function(){

            /* Get the book id and compare it to the book
            object title */

            let readElement = this.parentElement;
            let readId = readElement.parentElement.id;

            for(let i=0; i<=myLibrary.length-1;i++){

                let book = myLibrary[i].title.split(" ");
                
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
                const bookObj = myLibrary[i];

                /* If there is a match change the read status
                of the book by changing the object.read value
                the read text content and the icon of the book */

                if(readId===title){

                    const readIcon = document.querySelector(`#${readId} .fa-bookmark`);
                    const readText = document.querySelector(`#${readId} .bookRead`);
            
                    if(bookObj.read==="no"){

                        bookObj.read = "yes";
                        readText.textContent = `read`;
                        readIcon.classList.remove("fa-regular");
                        readIcon.classList.add("fa-solid");
        
                    }else if(bookObj.read==="yes"){
        
                        bookObj.read = "no";
                        readText.textContent = `not read yet`;
                        readIcon.classList.remove("fa-solid");
                        readIcon.classList.add("fa-regular");
    
                    }
                }
            }
        });
    });
}