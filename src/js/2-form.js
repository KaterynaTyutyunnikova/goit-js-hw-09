const form = document.querySelector('.feedback-form');
const STORAGE_KEY = 'feedback-form-state';

let formData = {
  email: '',
  message: '',
};

loadFormData();


form.addEventListener('input', event => {
  const { name, value } = event.target;

  formData[name] = value.trim(); 
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
});


form.addEventListener('submit', event => {
  event.preventDefault();

  if (!formData.email || !formData.message) {
    alert('Fill please all fields');
    return;
  }

  console.log(formData);

  form.reset();
  localStorage.removeItem(STORAGE_KEY);
  formData = { email: '', message: '' };
});


function loadFormData() {
  const savedData = localStorage.getItem(STORAGE_KEY);

  if (savedData) {
    try {
      const parsedData = JSON.parse(savedData);

      if (parsedData.email) {
        form.elements.email.value = parsedData.email;
        formData.email = parsedData.email;
      }

      if (parsedData.message) {
        form.elements.message.value = parsedData.message;
        formData.message = parsedData.message;
      }
    } catch (error) {
      console.error('Error parsing localStorage data:', error);
    }
  }
}
