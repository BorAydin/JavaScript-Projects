// Kitap Consturctor
function Book(title, author, isbn) {
  
  this.title = title;
  this.author = author;
  this.isbn = isbn;

}

// UI Constructor
function UI() {}

// Kitap Ekleme

UI.prototype.addBookToList = function(book){
    
  const list = document.getElementById('book-list');
    
  // tr Elementi Oluşturma
  const row = document.createElement('tr');

  // Sütun Ekleme
  row.innerHTML = `
  <td>${book.title}</td>
  <td>${book.author}</td>
  <td>${book.isbn}</td>
  <td><a href='#' class="delete">X</a></td>`

  list.appendChild(row);

}

// Hata Verme - Onaylama
UI.prototype.showAlert = function(message, className){
    
  // div Oluşturma
  const div = document.createElement('div');

  // Sınıf Ekleme
  div.className = `alert ${className}` ; // Çoklu sınıf ekleme tilda yöntemi.

  // Text Ekleme
  div.appendChild(document.createTextNode(message));

  // Ebeveyni Alma
  const container = document.querySelector('.container');
    
  // Formu Alma
  const form = document.querySelector('#book-form');

  // Alert Ekleme
  container.insertBefore(div, form);

  // Timeout 3 sn. Sonra Kaldırma
  setTimeout(function(){
    document.querySelector('.alert').remove();
    }, 3000);

}

// Formu Temizleme
UI.prototype.clearFields = function(){
  
  document.getElementById('title').value = '';
  document.getElementById('author').value = '';
  document.getElementById('isbn').value = '';

}

// Kitap Silme 
UI.prototype.deleteBook = function(target){
  
  if(target.className === 'delete'){
    target.parentElement.parentElement.remove();
  }

}

// Tüm Kitapları Silme
UI.prototype.deleteAll = function(){
   
  const list = document.getElementById('book-list')

  while(list.firstChild != null){
    list.firstChild.remove();
  }

}

// LS Constructor
 function LS() {}

 // LS Kontrol
 LS.prototype.checkLS = function() {
  
  if(localStorage.getItem('books') === null){
     return [];
   } else {
     return JSON.parse(localStorage.getItem('books'));
   }

 }

 // LS'dan Kitapları Alma
 LS.prototype.getBooks = function(){
    
   let books;
   
   const ls = new LS();
  
   books = ls.checkLS();

   return books;

 }

 // LS'a Ekleme
 LS.prototype.addBook = function(book) {
  
  const ls = new LS();
  
  const books = ls.getBooks();

  books.push(book);

  localStorage.setItem('books', JSON.stringify(books));
  
 }

 // LS'dan Gösterim Yapma
 LS.prototype.displayBooks = function() {
  
  const ls = new LS();
  
  const books = ls.getBooks();

  books.forEach(function(book){
    
    const ui  = new UI();
    ui.addBookToList(book);

  });
 }

 //LS'dan Silme
 LS.prototype.removeBook = function(isbn) {
  
  const ls = new LS();
  
  let books = ls.getBooks();

  books.forEach(function(book, index){
    if(book.isbn === isbn){
      books.splice(index,1);
    }
  });

  if(books.length === 0){
    localStorage.clear();
 } else{
   localStorage.setItem('books', JSON.stringify(books));
 }

}

// LS Temizleme
LS.prototype.removeLS = function(){
  localStorage.clear();
}

const ls = new LS();

// DOM için Olay Dİnleyicisi
document.addEventListener('DOMContentLoaded', ls.displayBooks);

// Ekleme için Olay Dinleyicisi
document.getElementById('book-form').addEventListener('submit',function(e){
  
  // Form Değerlerini Alma
  const title = document.getElementById('title').value,
        author = document.getElementById('author').value,
        isbn = document.getElementById('isbn').value;

  const ls = new LS();
  
  const books = ls.getBooks();

  let flag;
        
   books.forEach(function(book){
     if(book.isbn === isbn){
         flag=true;
         };
       })

  // Kitap Nesnesi
  const book = new Book(title, author, isbn);

  // UI nesnesi
  const ui = new UI();

  // Onaylama
  if(title === '' || author === '' || isbn === ''){
    
    // Hata Mesajı
    ui.showAlert('Lütfen tüm alanları doldurun.', 'error');
  
  } else if ( flag === true) {
    
    ui.showAlert('Id eşsiz olmalıdır.', 'error');

  } else {
    
    // Listeye kitap ekleme
    ui.addBookToList(book);

    ls.addBook(book);

    // Başarılı Giriş Gösterimi
    ui.showAlert('Kitap başarılı bir şekilde listeye eklendi.', 'success');

    // Formu Temizleme
    ui.clearFields();
  }

  e.preventDefault();

});

// Listeden Silme için Olay Dinleyicisi
document.getElementById('book-list').addEventListener('click', function(e){

  const ui = new UI();

  const ls = new LS()

  ui.deleteBook(e.target);

  ls.removeBook(e.target.parentElement.previousElementSibling.textContent);

  // Mesaj Gösterimi
  if(e.target.className === 'delete'){
    ui.showAlert('Kitap listeden kaldırıldı.', 'success');
  }

  e.preventDefault();

})

// Hepsini Sil için Olay Dinleyicisi
document.getElementById('clear').addEventListener('click', function(e){
  
  const ui = new UI();

  const ls = new LS();
  
  ui.deleteAll();

  ls.removeLS();

  e.preventDefault();
  
})


