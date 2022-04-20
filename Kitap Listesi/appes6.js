class Book {
  
  constructor(title, author, isbn){
    
    this.title = title;
    this.author = author;
    this.isbn = isbn;

  }

}

class UI {
  
  addBookToList(book){
  
    const list = document.getElementById('book-list');

    const row = document.createElement('tr');

    row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href='#' class="delete">X</a></td>`

    list.appendChild(row);
  
  }

  showAlert(message, className){
 
    const div = document.createElement('div');

    div.className = `alert ${className}` ; // Çoklu sınıf ekleme tilda yöntemi.

    div.appendChild(document.createTextNode(message));

    const container = document.querySelector('.container');
    
    const form = document.querySelector('#book-form');

    container.insertBefore(div, form);

    setTimeout(function(){
      document.querySelector('.alert').remove();
    }, 3000);

  }

  deleteBook(target){
    
    if(target.className === 'delete'){
      target.parentElement.parentElement.remove();
    }

  }

  deleteAll(){
   
    const list = document.getElementById('book-list')

    while(list.firstChild != null){
      list.firstChild.remove();
    }

  }

  clearFields(){
    
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';

  } 

}

class Store{
  
  static getBooks(){
    
    let books;
    
    books = Store.checkLS();

    return books;

  }

  static displayBooks() {
    
    const books = Store.getBooks();

    books.forEach(function(book){
      
      const ui  = new UI();
      ui.addBookToList(book);

    });
  }

  static addBook(book){
   
    const books = Store.getBooks();

    books.push(book);

    localStorage.setItem('books', JSON.stringify(books));

  }

  static removeBook(isbn){
    
    let books = Store.getBooks();

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
  
  static checkLS(){
    
     if(localStorage.getItem('books') === null){
        return [];
      } else {
        return JSON.parse(localStorage.getItem('books'));
      }
    }
  
  static removeLS(){
    localStorage.clear();
  }
}

document.addEventListener('DOMContentLoaded', Store.displayBooks);

document.getElementById('book-form').addEventListener('submit',function(e){
  
  const title = document.getElementById('title').value,
        author = document.getElementById('author').value,
        isbn = document.getElementById('isbn').value;
  
  const books = Store.getBooks();
  
  let flag;
  
  books.forEach(function(book){
    if(book.isbn === isbn){
      flag=true;
    };
  })
  
  const book = new Book(title, author, isbn);

  const ui = new UI();

  if(title === '' || author === '' || isbn === ''){
    
    ui.showAlert('Lütfen tüm alanları doldurun.', 'error');
  
  } else if ( flag === true) {
    
    ui.showAlert('Id eşsiz olmalıdır.', 'error');
  }
  else {
    
    ui.addBookToList(book);

    Store.addBook(book);

    ui.showAlert('Kitap başarılı bir şekilde listeye eklendi.', 'success');

    ui.clearFields();
  }

  e.preventDefault();

});

document.getElementById('book-list').addEventListener('click', function(e){

  const ui = new UI();
  
  ui.deleteBook(e.target);

  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

  if(e.target.className === 'delete'){
    ui.showAlert('Kitap listeden kaldırıldı.', 'success');
  }

  e.preventDefault();

})

document.getElementById('clear').addEventListener('click', function(e){
  
  const ui = new UI();
  
  ui.deleteAll();

  Store.removeLS();

  e.preventDefault();

})

