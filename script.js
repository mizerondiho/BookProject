const myLibrary = [];
const bookContainer = document.getElementsByClassName('book-display')[0];
const messageBoxContainer = document.getElementsByClassName('message-box')[0];

function messageBox(message){
    messageBoxContainer.replaceChildren();
    const messageElement = document.createElement('h1');
    messageElement.textContent = message; 
    messageBoxContainer.appendChild(messageElement);
}

function Book(title, author, pages, read, id){
    if(!new.target){
        console.log("Insert new keyword");
    }

    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = id

    this.info = function(){
        console.log(title +" by "+author+" "+ pages+" pages"+" "+read + "ID "+ id);
    }
}

Book.prototype.toggleRead = function(){
    this.read = !this.read;
}

function displayBook(){
    bookContainer.replaceChildren(); 
    for (let index = 0; index < myLibrary.length; index++) {
        bookContainer.appendChild(buildBookUI(myLibrary[index]));
    }
}

const addBookBtn = document.getElementById('addBookBtn');
addBookBtn.addEventListener('click', addBookToLibrary);

function addBookToLibrary(){
    const author = document.getElementById('author').value;
    const title = document.getElementById('title').value;
    const pages = Number(document.getElementById('pages').value);
    const date = document.getElementById('datePublished').value;
    const id = crypto.randomUUID();
    const book = new Book(title, author, pages, false, id);

    myLibrary.push(book);
    document.querySelector('form').reset();
    displayBook();

    messageBox("Book "+title+ " added :)");
}
function deleteFromLibrary(id){
    const index = myLibrary.findIndex(b => b.id === id);
    
    messageBox("book "+ myLibrary[index].title + " deleted");
    if(index !== -1){
        myLibrary.splice(index, 1);
    }
    displayBook();

}

function changeReadStatus(id){
    const index = myLibrary.findIndex(b => b.id === id);
    if(index !== -1){
        myLibrary[index].toggleRead();
    }

    console.log("read ststu changed too" + myLibrary[index].read);
    displayBook();
}

function buildBookUI(book){
    const bookCardContainer = document.createElement('div');
    // use a two-row grid: top row fixed 50px, bottom row matches bookCard height (120px)
    bookCardContainer.style.display = 'grid';
    bookCardContainer.style.gridTemplateColumns = '1fr 30px';
    bookCardContainer.style.gridTemplateRows= '35px 1fr';
    bookCardContainer.style.rowGap = '0px';
    bookCardContainer.style.width = '60px';

    const deleteBtn = document.createElement('button');
        deleteBtn.textContent = "x";
        deleteBtn.style.backgroundColor = 'rgba(255,0,0,0.2)';
        deleteBtn.style.borderRadius = '25px';
        deleteBtn.style.width = '20px';
        deleteBtn.style.height = '20px';
        deleteBtn.style.marginBottom = 'auto';
        deleteBtn.style.marginTop = 'auto';
        deleteBtn.style.borderStyle = 'none';
        deleteBtn.style.color = 'white';
        deleteBtn.style.textAlign = 'center';
        deleteBtn.style.marginLeft = 'auto';
        deleteBtn.style.transition = 'background-color 0.2s';
    deleteBtn.addEventListener('mouseenter', () => {
        deleteBtn.style.backgroundColor = 'rgba(255,0,0,0.8)';
    });
    deleteBtn.addEventListener('mouseleave', () => {
        deleteBtn.style.backgroundColor = 'rgba(255,0,0,0.1)';
    });
    deleteBtn.addEventListener('click', () => {
        deleteFromLibrary(book.id);
    })

    const readButton = document.createElement('button');
    readButton.style.background = 'white';
    readButton.style.width = '100%';
    readButton.style.borderStyle = 'none';
    readButton.style.height = '100%';
    
    switch (book.read) {
        case true:
            readButton.textContent = 'read';
            
            break;
    
        default:
            readButton.textContent = 'not read';
            break;
    }
    readButton.addEventListener('click', () => {
        changeReadStatus(book.id);
    })

    const bookCard = document.createElement('div');
    bookCard.style.width = '60px';
    bookCard.style.height = '120px';
    bookCard.style.border = '0px solid #000';
    bookCard.style.padding = '6px';
    bookCard.style.boxSizing = 'border-box';
    bookCard.style.display = 'flex';
    bookCard.style.flexDirection = 'column';
    bookCard.style.justifyContent = 'space-between';
    bookCard.style.alignItems = 'center';
    bookCard.style.fontFamily = 'sans-serif';
    bookCard.style.gridRow = '2';
    bookCard.style.background = 'red';

    

    const titleEl = document.createElement('div');
    titleEl.textContent = book.title;
    titleEl.style.textAlign = 'center';
    titleEl.style.fontSize = '12px';
    titleEl.style.flex = '1';
    titleEl.style.display = 'flex';
    titleEl.style.alignItems = 'center';
    titleEl.style.justifyContent = 'center';

    const metaContainer = document.createElement('div');
    metaContainer.style.width = '100%';
    metaContainer.style.textAlign = 'center';

    const authorEl = document.createElement('div');
    authorEl.textContent = book.author;
    authorEl.style.fontSize = '10px';
    authorEl.style.whiteSpace = 'nowrap';
    authorEl.style.overflowWrap = 'break-word';

    /*const pagesEl = document.createElement('div');
    pagesEl.textContent = `${book.pages} pages`;
    pagesEl.style.fontSize = '10px';*/

    bookCardContainer.appendChild(readButton);
    metaContainer.appendChild(authorEl);
    //metaContainer.appendChild(pagesEl);
    bookCard.appendChild(titleEl);
    bookCard.appendChild(metaContainer);

    bookCardContainer.appendChild(deleteBtn);
    bookCardContainer.appendChild(bookCard);

    return bookCardContainer;
}

