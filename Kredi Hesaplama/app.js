// Submit için Olay Dinleyicisi
document.getElementById('loan-form').addEventListener('submit', function(e){

  if(amount.value === '' || interest.value === '' || years.value === '' ){
    
    showError('Lütfen boş alan bırakmayınız.')

  } else {
    
    document.getElementById('loading').style.display = 'block';

    document.getElementById('results').style.display = 'none';

    setTimeout(calculateResults, 1000);
   
  }

  e.preventDefault();

});

// Sonuçları Hesaplama 
function calculateResults(){

  // UI Değişkenleri
  const amount = document.getElementById('amount');
  const interest = document.getElementById('interest');
  const years = document.getElementById('years');
  const monthlyPayment = document.getElementById('monthly-payment');
  const totalPayment = document.getElementById('total-payment');
  const totalInterest = document.getElementById('total-interest');

  const principal = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value) / 100 / 12;
  const calculatedPayments = parseFloat(years.value) * 12;

  // Aylık Ödeme Hesaplama
  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principal*x*calculatedInterest)/(x-1);

  if(isFinite(monthly)){ // isFinite sayının sınır aşımını kontrol eder.  5e-324, 1.79E+308 arası gibi 
    
    monthlyPayment.value = monthly.toFixed(2); // toFixed Float sayılarda noktadan sonra kaç basamağın göstereceğini belirler.
    totalPayment.value = (monthly * calculatedPayments).toFixed(2);
    totalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2);

    document.getElementById('loading').style.display = 'none';
    document.getElementById('results').style.display = 'block';

  } else {

    showError('Lütfen tekrardan kontrol ediniz.');

  }
}

function showError(error){

  const errorDiv = document.createElement('div');

  const card = document.querySelector('.card');
  const heading = document.querySelector('.heading');

  errorDiv.className = 'alert alert-danger';

  errorDiv.appendChild(document.createTextNode(error));

  card.insertBefore(errorDiv, heading);

  setTimeout(function(){
    document.querySelector('.alert').remove();
  }, 3000);
  
}