// myForm
// let myform = document.querySelector('#myForm');
// elVyberJidla
let elVyberJidla = document.querySelector('#elVyberJidla');
// elInMnozstvi
let elInMnozstvi = document.querySelector('#elInMnozstvi');
// elCelkemKc
let elCelkemKc = document.querySelector('#elCelkemKc');

// elChBio
let elChBio = document.querySelector('#elChBio');
// elChExtra
let elChExtra = document.querySelector('#elChExtra');
// elChLevne
let elChLevne = document.querySelector('#elChLevne');
// elChDarek
let elChDarek = document.querySelector('#elChDarek');

//let nameDoprava = document.getElementsByName('nameDoprava');
//let nameDoprava = document.querySelector('input[name=nameDoprava]:checked');
//let nameDoprava = document.querySelector('input[name=nameDoprava]');
// elDopOsobni
let elDopOsobni = document.querySelector('#elDopOsobni');
// elDopKuryr
let elDopKuryr = document.querySelector('#elDopKuryr');
// elDopPosta
let elDopPosta = document.querySelector('#elDopPosta');

// elInUtrata
let elInUtrata = document.querySelector('#elInUtrata');
// elInEmail
let elInEmail = document.querySelector('#elInEmail');
// elBtnOdeslat
let elBtnOdeslat = document.querySelector('#elBtnOdeslat');

// resMsg
let resMsg = document.querySelector('#resMsg');

let calculate = () => {
  let celkem = 0;
  let cena = 0;
  switch (parseInt(elVyberJidla.value)) {
    case 0: {
      cena = 150;
      break;
    }

    case 1: {
      cena = 120;
      break;
    }

    case 2: {
      cena = 50;
      break;
    }

    case 3: {
      cena = 800;
      break;
    }

    default:
      break;
  }

  if (cena) {
    let mnozstvi = parseInt(elInMnozstvi.value);
    mnozstvi ||= 0;
    /*  */
    celkem = cena * mnozstvi;
    /*  */
    if (elChBio.checked) {
      celkem *= 1.3;
    }

    if (elChExtra.checked) {
      celkem *= 1.5;
    }

    if (elChLevne.checked) {
      celkem *= 0.85;
    }

    if (elChDarek.checked) {
      celkem += 500;
    }

    if (elDopKuryr.checked) {
      celkem += celkem * 0.1;
    }

    if (elDopPosta.checked) {
      celkem += 250;
    }

    elCelkemKc.value = celkem.toFixed(2);
    console.log('Cena za jídlo je : ' + celkem);
  }
  return celkem;
};

/* Výběr jídla */
elVyberJidla.addEventListener('change', () => {
  calculate();
});

/* požadované množství */
elInMnozstvi.addEventListener('input', () => {
  calculate();
});

elChBio.addEventListener('change', e => {
  calculate();
});

elChExtra.addEventListener('change', e => {
  calculate();
});

elChLevne.addEventListener('change', e => {
  calculate();
});

elChDarek.addEventListener('change', e => {
  calculate();
});

elDopKuryr.addEventListener('change', e => {
  calculate();
});

elDopPosta.addEventListener('change', e => {
  calculate();
});

elDopOsobni.addEventListener('change', e => {
  calculate();
});

/* ------------- Kontrola emailu ------------ */
elInEmail.addEventListener('blur', e => {
  let email = elInEmail.value;
  console.log(elInEmail);

  var re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-z]{2,4}$/;
  console.log(re.test(email));

  let elEm = document.querySelector('#emailMessage');

  elInEmail.classList.remove('is-valid');
  elInEmail.classList.remove('is-invalid');

  if (re.test(email)) {
    elEm.innerHTML = 'Email je v pořádku :)';
    elInEmail.classList.add('is-valid');
    elInEmail.classList.remove('is-invalid');
  } else {
    elEm.innerHTML = 'Ooops ... zadej platný email.<br/>.';
    elEm.classList.add('text-primary');
    elInEmail.classList.remove('is-valid');
    elInEmail.classList.add('is-invalid');
  }
});
/* ------------- Kontrola útraty ------------ */
elInUtrata.addEventListener('blur', e => {
  let utrata = parseInt(elInUtrata.value);
  utrata ||= 0;
  celkem = utrata - calculate();

  let elResult = document.querySelector('#elOdpoved');
  elInUtrata.classList.remove('is-valid');
  elInUtrata.classList.remove('is-invalid');

  if (celkem > 0) {
    elResult.innerHTML = `'Po nákupu Vám zůstane ještě ${celkem.toFixed(2)} Kč`;
    elInUtrata.classList.add('is-valid');
    elInUtrata.classList.remove('is-invalid');
  } else {
    elResult.innerHTML = `Ooops ... Na nákup Vám chybí ${celkem.toFixed(2)} Kč`;
    elInUtrata.classList.remove('is-valid');
    elInUtrata.classList.add('is-invalid');
  }
});

/* ------------- Odeeslat objednávku ------------ */
elBtnOdeslat.addEventListener('click', e => {
  let msg = document.querySelector('#resMsg');
  msg.innerHTML =
    'Děkujeme za nákup. Vaše objednávka byla odeslána do našeho centra.';
});
