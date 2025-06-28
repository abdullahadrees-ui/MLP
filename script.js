// JavaScript to toggle the navigation menu on small screens
function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('show');

    oscillator.frequency.value = initialFreq;
    gainNode.gain.value = initialVol;

}

$('.next-btn').each(function(i) {
  $(this).click(function(event) {
    var x = event.pageX;
    var y = event.pageY;

    var nextIndex = (i + 1) % $('.page').length;
    var currentPage = $('.page').eq(i);
    var nextPage = $('.page').eq(nextIndex);

    var newZ = parseInt(currentPage.css('z-index')) + 1;
    nextPage.css('z-index', newZ);
    nextPage.css('clip-path', 'circle(0% at ' + x + 'px ' + y + 'px)');

    anime({
      targets: nextPage[0],
      update: function(anim) {
        nextPage.css('clip-path', 'circle(' + (anim.progress * 2) + '% at ' + x + 'px ' + y + 'px)');
      }
    });
  });
});


document.getElementById('readLessonBtn').addEventListener('click', function () {
  const lessonText = document.querySelector('#lesson1').innerText;
  const utterance = new SpeechSynthesisUtterance(lessonText);
  utterance.lang = 'en-US'; // You can change this for Urdu, Punjabi, etc.
  speechSynthesis.speak(utterance);
});

function speakLesson(languageCode = 'en-US') {
  const text = document.querySelector('#lesson1').innerText;
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = languageCode;
  speechSynthesis.speak(utterance);
}

// Example: speakLesson('ur-PK') for Urdu

$(document).ready(function () {
  let currentPage = 0;
  const pages = $(".page");

  $(".next-btn").click(function () {
    if (currentPage < pages.length - 1) {
      $(pages[currentPage]).hide();
      currentPage++;
      $(pages[currentPage]).show();
    }
  });

  // Initial hide all except first
  pages.hide();
  $(pages[0]).show();

  // When user selects known language, translate
  $('#knownLanguage').change(function () {
    const selectedLang = $(this).val();
    const t = translations[selectedLang];
    if (t) {
      $('h1:contains("Choose Your Language")').text(t.chooseLanguage);
      $('label[for="knownLanguage"]').text(t.languageYouKnow);
      $('label[for="learnLanguage"]').text(t.languageToLearn);
      $('div.page:nth-of-type(2) h1').text(t.selectProficiency);
      $('#languageText').html(`${t.inLanguage} <strong><span id="selectedLanguage">[Language]</span></strong>`);
      $('div.page:nth-of-type(3) h1').text(t.timeDedication);
      $('div.page:nth-of-type(3) p').html(`${t.forLearning} <strong><span id="selectedLanguage">[Language]</span></strong>`);
      $('#question').text(t.translationQuestion);
      $('div.page:nth-of-type(5) h1').text(t.quizCompleted);
      $('div.page:nth-of-type(5) h4').text(t.yourScore);
      $('div.page:nth-of-type(5) p').text(t.greatJob);
      $('a.btn-success').text(t.continueLearning);
      $('a.btn-outline-primary').text(t.goToHomepage);
      $('div.page:nth-of-type(6) h1').text(t.welcome);
      $('div.page:nth-of-type(6) .next-btn').text(t.startLearning);
    }
  });
});
