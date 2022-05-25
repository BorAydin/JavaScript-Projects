const PageState = function(){
	
  let currentState = new homeState(this);

	this.init = function(){
		this.change(new homeState);
	}

	this.change = function(state){
		currentState = state;
	}

};

// Ana Sayfa Durumu
const homeState = function(){
	document.querySelector('#heading').textContent = null;
	document.querySelector('#content').innerHTML =`
		<div class="jumbotron">
			<h1 classs="display-3">Siteye hoşgeldiniz.</h1>
			<p class="lead">State Pattern örneğidir.</p>
			<hr class="my-4">
			<p class="lead"> Mini projedir.</p>
			<p class="lead"> 
				<a class="btn btn-primary btn-lg" href="#" role="button"> Daha fazla öğren </a>
			</p>
		</div>
		`;
};

// Hakkında Durumu
const aboutState = function(){
	document.querySelector('#heading').textContent = 'Hakkımızda';
	document.querySelector('#content').innerHTML =`
		`;
};

// İletişim Durumu
const contactState = function(){
	document.querySelector('#heading').textContent = 'Bize Ulaşın';
	document.querySelector('#content').innerHTML =`
		<form>
			<div class="form-group">
				<label>Ad:</label>
				<input type="text" class="form-control">
			</div>
			<div class="form-group">
				<label>E-posta:</label>
				<input type="email" class="form-control">
			</div>
			<button type="submit" class="btn btn-primary">Gönder</button>
			</form>
		`;
};

// pageState nesnesi
const page = new PageState();

// Sayfayı ilkleme
page.init();

// UI Değişkenleri
const home = document.getElementById('home'),
			about = document.getElementById('about'),
			contact = document.getElementById('contact');

// Ana Sayfa
home.addEventListener('click', (e) => {
	page.change(new homeState);

	e.preventDefault();
}); 			

// Hakkında
about.addEventListener('click', (e) => {
	page.change(new aboutState);

	e.preventDefault();
});

// İletişim
contact.addEventListener('click', (e) => {
	page.change(new contactState);

	e.preventDefault();
});