const testimonialsContainer = document.querySelector('.testimonial-container')
const testimonial = document.querySelector('.testimonial')
const userImage = document.querySelector('.user-image')
const username = document.querySelector('.username')
const role = document.querySelector('.role')

const testimonials = [
  {
    name: 'Hidra',
    position: 'Rapçi',
    photo:'https://yt3.ggpht.com/wp0s_x_pDcoDpxe6Vb_GV_4q0n0k1Jt0QHqC4eGUCSrCTFvXbxZ41Ju7T0Jqyf268V-iwIIMxEU=s88-c-k-c0x00ffffff-no-rj',
    text: "Önümüzde, ne yollar var. Bunlar kim, ne boktanlar ? Tutmaz kin, sanarsın daher biri kıskanır haksız da, sayılmazlar. Bu seviyeye gelmek zor kankam çok çalış öğren yollardan bizden, tarih yazanlardan. Bu mikrofonla ilk kaydı Hidrhyme'ın ilk düşüncem Freestyle'dı lirik yazdım çiz line'ı hepsi Hip-hop israfı, rapçilerin güç kaybı. Artık Hidra yeni çocuk değil rap'in üstadı Bitch! Benim gibi diz Rhyme'ı konuş, yine diss yazmış çocuk maskülist Kahro gibi tezat hepsi lirik yazıyorum demek yapıyorum istasyon bitsin aga.Gözümde canlanan kominist proto ataist bir salâ didişip bok atar, kopyalar bişi değil o kadar kişiliksiz adam dolu pis piyasan konu kitli tamam."
  },
  {
    name: 'ŞHNŞH',
    position: 'Rapçi',
    photo:'https://saloniksv.com/i/content/4962_1_sehinsah-1121x642px.jpg',
    text: "Olamaz (Olamaz) 'Olamaz' deme olacak (Grrrr). Diplomalısın, işsizsin yok toleransın, hissizsin. Police ol (Police ol) Birçok açıdan incindin ol köle, satıl, iyi giyimli bir office boy (Grrr). Bibloysan açık meclis, gir koş, köşe kap, senindir bir pozisyon. Jonglör oluca'n, ülke sirk gibi yandaşa bonkör, el açın indirsin komisyon. Hukuk bu mu ? Çukur yuttu (Hop) buyurdu kurt, kuzu suçlu (Hrr!) kuruldu düzen uyuttu bütün ulusu durum bu! (Hu) Kurusun huyu, gurursuz huzur bulduğu pulmuş umduğu Yuh, yuh, yuh! Soyan vurguncu olan tutucu yobaz tutulmuş yazar. Bu mutsuzluğun umutsuzluğun vücut buluşunun unsur şu uzun put! Kuşkusuz! Tutuklusunuz, duyun gurur!"
  },
  {
    name: 'Şanışer',
    position: 'Rapçi',
    photo:'https://i.scdn.co/image/ab6761610000e5eb655759d93a8fdc582afc3565',
    text: "Ne zaman mutlu olmaya diksem gözümü ne zaman güzel şeylere dönsem yüzümü içimden bi' şeyler sökülür. Sahnelerde yalandan gülümserim de ah, şu içimde hеp gökler dökülür. Kurumuş göller köpürür. Gizlerim şеytanlarımı, bilmez çoğunuz. Beklemem, bilirim, inmez gökten çözümü gülümserim kör etse dahi insanlığa olan öfkem gözümü çünkü başarılı görünmem gerek iyi giyinmeli, iyi konuşmalıyım insanların hayatına bi' renk katmalıyım bebek. Tek isteği yok olmak olan umutsuz bi' tip olduğumu saklamalıyım. Çünkü bilet satmamız gerek (Bilet satmamız gerek) İyi çıkmalıyım ekranda güler yüzlü çekmeliyim hikâyeler, reklamlar, dökemem tek damla yaş çıldırtsa da her gece kafamın içindeki adi şeytanlar, şeytanlar..."
  },
  {
    name: 'Sokrat St',
    position: 'Rapçi',
    photo:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxxoZzDZ3uRyYBa_FFmbDvtvCwJuDpTFVxmg&usqp=CAU',
    text: "Sokrat çok karamsar (Evet) Sokrat alkoliğin teki (Evet) Biraz hasta gibi de biri (Evet) En azından içimde kötü niyet yok (Ama sen)Hi, Pollyanna, hazır ol hayatın dayağına sen otur zam gelir ayağına saraya güneş sana yağmur artık götüne bi' don bile pahalı cümle içi bi' marijuana suç ama Yalıkavak'ta marinada (Neyse) Siktir et onu bunu bari sen sıfıra onlar her şeye sahip amcaya telefonu göster cahil bunlar saf değil sade acayip uçuyoruz diye diye gitgide batıyoruz. Bakanlar bizde arıyo' hatayı hiç elimde değildi ben de buraya doğdum. Ok arada yaraya arada paraya doğru ama sonum ya anamın evi ya karakoldu. Tekrar doğdum, dünümü yakarak oldu. Artık hayalim yok. En azından elimdekini koruma çabam var. Açlıktan ağzı kokan insanlar bizi nasıl bulabilir karamsar?"
  },
]

let idx = 1

function updateTestimonial(){
  
  const { name, position, photo, text } = testimonials[idx]

  testimonial.innerHTML = text
  userImage.src = photo
  username.innerHTML = name
  role.innerHTML = position

  idx++

  if(idx > testimonials.length -1 ){
    idx = 0
  }
}

setInterval(updateTestimonial, 10000)