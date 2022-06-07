// Storage Controller
const StorageCtrl = (function(){

  // Public Metodlar
  return {

    storeItem: function(item){

      let items;

      // LS Kontrolü
      if(localStorage.getItem('items') === null){
        
        items = [];
        
        // Yeni Itemi Ekleme
        items.push(item);
        
        // LS'ı Set Etme
        localStorage.setItem('items', JSON.stringify(items));
  
      } else {

        // LS'den Var Olanı Getirtme
        items = JSON.parse(localStorage.getItem('items'));

        items.push(item);

        // Yeniden Set Etme LS'ı
        localStorage.setItem('items', JSON.stringify(items));

      }
    },

    getItemsFromStorage: function(){
      
      let items;
      
      if(localStorage.getItem('items') === null){
        items = [];
      } else {
        items = JSON.parse(localStorage.getItem('items'));
      }

      return items;

    },

    updateItemStorage: function(updatedItem){

      let items = JSON.parse(localStorage.getItem('items'));

      items.forEach(function(item, index){
        if(updatedItem.id === item.id){
          items.splice(index, 1, updatedItem);
        }
      });

      localStorage.setItem('items', JSON.stringify(items));

    },

    deleteFromStorage: function(id){

      let items = JSON.parse(localStorage.getItem('items'));

      items.forEach(function(item, index){
        if(id === item.id){
          items.splice(index, 1);
        }
      });

      localStorage.setItem('items', JSON.stringify(items));
    
    },

    clearItemsFromStorage: function(){
      localStorage.removeItem('items');
    }
  }
})();

// Item Controller
const ItemCtrl = (function(){

  // Item Constructor
  const Item = function(id, name, calories){
    
    this.id = id;
    this.name = name;
    this.calories = calories;

  }

  // Veri Yapıları / Durum
  const data = {
    
    items : StorageCtrl.getItemsFromStorage(),
    currentItem: null,
    totalCalories : 0

  }

  // Public Metodlar
  return {
    
    getItems: function(){
      return data.items;
    },

    addItem: function(name, calories){

      let ID;

      // ID Oluşturma
      if(data.items.length > 0){
        ID = data.items[data.items.length-1].id + 1;
      } else {
        ID = 0;
      }

      calories = parseInt(calories);

      // Yeni item Oluşturma
      newItem = new Item(ID, name, calories);

      // Item Dizisine Ekleme
      data.items.push(newItem);

      return newItem;

    },

    getItemById: function(id){

      let found = null;

      data.items.forEach(function(item){
        if(item.id === id){
          found = item;
        }
      });

      return found;

    },

    updateItem: function(name, calories){

      calories = parseInt(calories);

      let found = null;

      data.items.forEach(function(item){
        
        if(item.id === data.currentItem.id){
          item.name = name;
          item.calories = calories;
          found = item;
        }
      });

      return found;

    },

    deleteItem: function(id){

      // Idleri Alma
      const ids = data.items.map(function(item){
        return item.id;
      });

      // Indexi Alma
      const index = ids.indexOf(id);

      // Çıkarma
      data.items.splice(index, 1);

    },

    clearAllItems: function(){
      data.items = [];
    },

    setCurrentItem: function(item){
      data.currentItem = item;
    },

    getCurrentItem: function(){
      return data.currentItem;
    },

    getTotalCalories: function(){
      
      let total = 0;

      data.items.forEach(function(item){
        total += item.calories;
      });

      // Veri Yapısındaki Toplam Kaloriyi Set Etme
      data.totalCalories = total;

      return data.totalCalories;

    },

    logData: function(){
      return data;
    }
  }
})();

// UI Controller
const UICtrl = (function(){

  const UISelectors = {
    
    itemList: '#item-list',
    listItems: '#item-list li',
    addBtn: '.add-btn',
    updateBtn: '.update-btn',
    deleteBtn: '.delete-btn',
    backBtn: '.back-btn',
    clearBtn: '.clear-btn',
    itemNameInput: '#item-name',
    itemCaloriesInput: '#item-calories',
    totalCalories: '.total-calories'

  }

  // Public Metodlar
  return {

    populateItemList: function(items){

      let html = '';

      items.forEach(function(item){
        
        html += `<li class="collection-item" id="item-${item.id}">
        <strong>${item.name}: </strong> <em>${item.calories} Kaloriler</em>
        <a href="#" class="secondary-content">
          <i class="edit-item fa fa-pencil"></i>
        </a>
        </li>`;
      });

      // Itemleri Listeye Ekleme
      document.querySelector(UISelectors.itemList).innerHTML = html;

    },

    getItemInput: function(){

      return{
        
        name: document.querySelector(UISelectors.itemNameInput).value,
        calories: document.querySelector(UISelectors.itemCaloriesInput).value,

      }
    },

    addListItem: function(item){

      // Listeyi Gösterme
      document.querySelector(UISelectors.itemList).style.display = 'block';

      const li = document.createElement('li');
      li.className = 'collection-item';
      li.id = `item-${item.id}`;
      li.innerHTML = `<strong>${item.name}: </strong> <em>${item.calories} Kaloriler</em>
      <a href="#" class="secondary-content">
        <i class="edit-item fa fa-pencil"></i>
      </a>`;

      // Itemi Ekleme
      document.querySelector(UISelectors.itemList).insertAdjacentElement('beforeend', li);

    },

    updateListItem: function(item){

      let listItems = document.querySelectorAll(UISelectors.listItems);

      // Node Listesini Diziye Döndürme
      listItems = Array.from(listItems);

      listItems.forEach(function(listItem){

        const itemID = listItem.getAttribute('id');

        if(itemID === `item-${item.id}`){
          
          document.querySelector(`#${itemID}`).innerHTML = `<strong>${item.name}: </strong> <em>${item.calories} Kaloriler</em>
          <a href="#" class="secondary-content">
            <i class="edit-item fa fa-pencil"></i>
          </a>`;

        }
      });
    },

    deleteListItem: function(id){

      const itemID = `#item-${id}`;
      const item = document.querySelector(itemID);
      item.remove();

    },
  
    clearInput: function(){
      
      document.querySelector(UISelectors.itemNameInput).value = '';
      document.querySelector(UISelectors.itemCaloriesInput).value = '';

    },

    addItemToForm: function(){
      
      document.querySelector(UISelectors.itemNameInput).value = ItemCtrl.getCurrentItem().name;
      document.querySelector(UISelectors.itemCaloriesInput).value = ItemCtrl.getCurrentItem().calories;
      UICtrl.showEditState();

    },

    removeItems: function(){

      let listItems = document.querySelectorAll(UISelectors.listItems);

      // Node Listesini Diziye Döndürme
      listItems = Array.from(listItems);

      listItems.forEach(function(item){
        item.remove();
      });
    },

    hideList: function(){
      document.querySelector(UISelectors.itemList).style.display = 'none';
    },

    showTotalCalories: function(totalCalories){
      document.querySelector(UISelectors.totalCalories).textContent = totalCalories;
    },

    clearEditState: function(){

      UICtrl.clearInput();
      document.querySelector(UISelectors.updateBtn).style.display = 'none';
      document.querySelector(UISelectors.deleteBtn).style.display = 'none';
      document.querySelector(UISelectors.backBtn).style.display = 'none';
      document.querySelector(UISelectors.addBtn).style.display = 'inline';

    },

    showEditState: function(){

      document.querySelector(UISelectors.updateBtn).style.display = 'inline';
      document.querySelector(UISelectors.deleteBtn).style.display = 'inline';
      document.querySelector(UISelectors.backBtn).style.display = 'inline';
      document.querySelector(UISelectors.addBtn).style.display = 'none';
      
    },

    getSelectors: function(){
      return UISelectors;
    }
  }
})();

// App Controller
const App = (function(ItemCtrl, StorageCtrl, UICtrl){

  // Olay Dinleyicileri
  const loadEventListeners = function(){

    // UI Seçicilerini Alma
    const UISelectors = UICtrl.getSelectors();

    // Item Ekleme Olayı
    document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit);

    // Enter Tuşunu İnaktif Etme
    document.addEventListener('keypress', function(e){

      if(e.keyCode === 13 || e.which === 13 ){
        
        e.preventDefault();
        return false;

      }
    });

    // Düzenleme İkonu Tıklama Olayı
    document.querySelector(UISelectors.itemList).addEventListener('click', itemEditClick);

    // Item Düzeltme Olayı
    document.querySelector(UISelectors.updateBtn).addEventListener('click', itemUpdateSubmit);

    // Item Silme Olayı
    document.querySelector(UISelectors.deleteBtn).addEventListener('click', itemDeleteSubmit);

    // Geri Butonu Tıklama Olayı
    document.querySelector(UISelectors.backBtn).addEventListener('click', UICtrl.clearEditState);

    // Hepsini Silme Olayı
    document.querySelector(UISelectors.clearBtn).addEventListener('click', clearAllItemsClick);

  }

  const itemAddSubmit = function(e){

    // Girişleri Alma
    const input = UICtrl.getItemInput();

    const items = ItemCtrl.getItems();

    var flag = true;

    items.forEach(function(item){
      if(item.name === input.name){
        flag = false;
      }
    })

    // Kontrol
    if(input.name !== '' && input.calories !== '' && input.calories > 0 && flag == true){ 
     
      // Ekleme
      const newItem = ItemCtrl.addItem(input.name, input.calories)

      // Itemi UI Listesine Ekleme
      UICtrl.addListItem(newItem);
      
      // Toplam Kaloriyi Alma
      const totalCalories = ItemCtrl.getTotalCalories();

      // Toplam Kaloriyi Gösterme
      UICtrl.showTotalCalories(totalCalories);

      // LS'e Kaydetme
      StorageCtrl.storeItem(newItem);

      // Giriş Alanlarını Temizleme
      UICtrl.clearInput();

    } else {
      alert('Bu besini daha önce girdiniz.');
      UICtrl.clearInput();
    }

    e.preventDefault();

  }

  const itemEditClick = function(e){

    if(e.target.classList.contains('edit-item')){

      // Item id'yi Alma (item-0, item-1)
      const listId = e.target.parentNode.parentNode.id;

      // Diziye Bölerek Alma
      const listIdArr = listId.split('-');

      // Sayı Tarafını Alma
      const id = parseInt(listIdArr[1]);
      
      // Item'i Alma
      const itemToEdit = ItemCtrl.getItemById(id);

      // Anlık Item'i Set Etme
      ItemCtrl.setCurrentItem(itemToEdit);

      // Itemi Forma Ekleme
      UICtrl.addItemToForm();

    }

    e.preventDefault();

  }

  const itemUpdateSubmit = function(e){

    // Girişleri Alma
    const input = UICtrl.getItemInput();

    // Güncelleme
    const updatedItem = ItemCtrl.updateItem(input.name, input.calories);

    // UI Güncelleme
    UICtrl.updateListItem(updatedItem);

    const totalCalories = ItemCtrl.getTotalCalories();
    UICtrl.showTotalCalories(totalCalories);

    // LS'ı GÜncelleme
    StorageCtrl.updateItemStorage(updatedItem);

    UICtrl.clearEditState();

    e.preventDefault();
    
  }

  const itemDeleteSubmit = function(e){

    // Anlık(İşlem Yapılacak) Itemi Alma
    const currentItem = ItemCtrl.getCurrentItem()

    // Veri Yapısından Silme
    ItemCtrl.deleteItem(currentItem.id);

    // UI'dan Silme
    UICtrl.deleteListItem(currentItem.id);

    const totalCalories = ItemCtrl.getTotalCalories();
    UICtrl.showTotalCalories(totalCalories);

    // LS'dan Silme
    StorageCtrl.deleteFromStorage(currentItem.id);

    UICtrl.clearEditState();

    e.preventDefault();

  }

  const clearAllItemsClick = function(){

    ItemCtrl.clearAllItems();

    const totalCalories = ItemCtrl.getTotalCalories();
    UICtrl.showTotalCalories(totalCalories);

    UICtrl.removeItems()

    StorageCtrl.clearItemsFromStorage();

    UICtrl.hideList();

  }

  // Public Metodlar
  return {

    init: function(){

      UICtrl.clearEditState();

      // Veri Yapısından Itemleri Getirtme
      const items = ItemCtrl.getItems();

      // Item Listesi Kontrolü
      if(items.length ===0 ){
        UICtrl.hideList();
      } else {
        // Listeyi Itemlerle Doldurma
      UICtrl.populateItemList(items);
      }

      const totalCalories = ItemCtrl.getTotalCalories();
      UICtrl.showTotalCalories(totalCalories);

      // Olay Dinleyicilerini Yükleme
      loadEventListeners();
      
    }
  }
})(ItemCtrl, StorageCtrl, UICtrl);

// App'i Başlatma
App.init();