const myLibrary = [];

function Book(title, author, pages, read){
    if(!new.target){
        console.log("Insert new keyword");
    }

    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;

    this.info = function(){
        console.log(title +" by "+author+" "+ pages+" pages"+" "+read);
    }
}
function addBookToLibrary(){
    
}

function displayBook(){

}
console.log(crypto.randomUUID())