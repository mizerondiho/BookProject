const myLibrary = [];

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

function Shelve(book){
    
}
const bookShelf = document.getElementsByClassName('book-display')[0];
const shelveContainer = [];
const totalShelve = 5;
initializeShelveSpace();

function initializeShelveSpace(){
        shelveContainer.push(document.getElementById('divider-1'));
        shelveContainer.push(document.getElementById('divider-2'));
        shelveContainer.push(document.getElementById('divider-3'));
        shelveContainer.push(document.getElementById('divider-4'));
        shelveContainer.push(document.getElementById('divider-5'));
}

let currentShelfIndex = 0;   // which shelf we're currently filling
let booksOnCurrentShelf = 0; // how many books are on that shelf so far
const maxBooksPerShelf = 5;  // capacity of each shelf

function addToShelve(bookCard){
    if(currentShelfIndex >= shelveContainer.length){
        console.log("SHELVE FULL");
        return;
    }

    shelveContainer[currentShelfIndex].appendChild(bookCard);
    booksOnCurrentShelf++;

    if(booksOnCurrentShelf >= maxBooksPerShelf){
        currentShelfIndex++;     // move to next shelf
        booksOnCurrentShelf = 0; // reset count for new shelf
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
    book.info();
    console.log("books:"+myLibrary);
    const bookCard = buildBookUI(book);
    addToShelve(bookCard);
    document.querySelector('form').reset();
}

function buildBookUI(book){
    const bookCard = document.createElement('div');
    bookCard.style.width = '60px';
    bookCard.style.height = '100px';
    bookCard.style.border = '1px solid #000';
    bookCard.style.padding = '6px';
    bookCard.style.boxSizing = 'border-box';
    bookCard.style.display = 'flex';
    bookCard.style.flexDirection = 'column';
    bookCard.style.justifyContent = 'space-between';
    bookCard.style.alignItems = 'center';
    bookCard.style.fontFamily = 'sans-serif';
    const randomHue = Math.floor(Math.random() * 360);
    bookCard.style.background = `hwb(${randomHue} 21% 39%)`;

    const titleEl = document.createElement('div');
    titleEl.textContent = book.title;
    titleEl.style.writingMode = 'vertical-rl';
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

    const pagesEl = document.createElement('div');
    pagesEl.textContent = `${book.pages} pages`;
    pagesEl.style.fontSize = '10px';

    metaContainer.appendChild(authorEl);
    metaContainer.appendChild(pagesEl);
    bookCard.appendChild(titleEl);
    bookCard.appendChild(metaContainer);

    return bookCard;
}