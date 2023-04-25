document.addEventListener('DOMContentLoaded', async function () {

  const SERVER_URL = 'http://localhost:3000';

  let clients = [];

  // Открытие модального окна с данными клиента при загрузке страницы
  function loadPageWithClientModal() {
    if (window.location.hash.includes('id')) {
      const id = window.location.hash.slice(3);
      changeClientModal(id);
    }
  };
  loadPageWithClientModal();

  // --------- Открытие модального окна
  function modalOpen() {
    // document.querySelector('.error-server').classList.add('is-hidden')
    document.querySelector('.new-client').classList.add('modal-open');
    document.querySelector('.new-client__modal').classList.add('modal-open');
  }

  // --------- Закрытие модального окна
  function modalClose() {
    document.querySelector('.new-client').classList.remove('modal-open');
    document.querySelector('.new-client__modal').classList.remove('modal-open');
    window.location.hash = ''
  }

  // ---------- Кнопка добавить клиента и открытие модального окна добавления клиента
  document.querySelector('.btn__add-client').addEventListener('click', (e) => {

    e.preventDefault();

    if (document.querySelector('.form__error')) {
      document.querySelectorAll('.form__error').forEach((el) => {
        el.remove();
      })
    }

    if (document.querySelector('.error')) {
      document.querySelectorAll('.error').forEach((el) => {
        el.classList.remove('error');
      })
    }

    document.querySelector('.new-client__delete-btn').classList.add('is-hidden');

    document.querySelector('.cancel-btn').classList.remove('is-hidden');

    document.querySelector('.new-client__title').textContent = 'Новый клиент';

    if (document.querySelector('.new-client__id')) {
      document.querySelector('.new-client__id').remove()
    }

    modalOpen();

    document.querySelector('.new-client__form').classList.add('new-client__submit');

    document.querySelectorAll('.form__input').forEach((el) => {

      el.value = '';

      el.classList.remove('is-active');

      el.addEventListener('input', (e) => {

        el.classList.add('is-active');

        if (document.querySelector('.form__error')) {
          e.target.previousSibling.querySelector('.form__error').remove()
        }

        el.classList.remove('error');

      })
    })

    document.querySelectorAll('.new-contact').forEach((el) => {
      el.remove()
    })

    document.querySelector('.add-contact').classList.remove('is-open');

    // ---------- Отправка формы на сервер
    if (document.querySelector('.new-client__form.change-client-submit')) {
      document.querySelector('.new-client__form.change-client-submit').classList.remove('change-client-submit')
    }

    document.querySelector('.new-client__submit').addEventListener('submit', (e) => {
      e.preventDefault();
      newClientSubmit();
    });

  });

  // ---------- Модальное окно добавление нового клиента
  function newClientModal() {

    const newClient = document.createElement('div');
    newClient.classList.add('new-client');

    const newClientModal = document.createElement('div');
    newClientModal.classList.add('new-client__modal');

    const newClientTitle = document.createElement('h2');
    newClientTitle.classList.add('new-client__title');
    newClientTitle.textContent = 'Новый клиент';

    const newClientForm = document.createElement('form');
    newClientForm.id = 'client__form';
    newClientForm.classList.add('new-client__form', 'form');

    const inputSurname = document.createElement('input');
    inputSurname.classList.add('form__input', 'form__input--surname');
    inputSurname.id = 'form__input--surname';

    const labelSurname = document.createElement('label');
    labelSurname.classList.add('new-client__label', 'new-client__label--surname', 'form__label', 'form__label--surname');
    labelSurname.setAttribute('for', 'form__input--surname');
    labelSurname.innerHTML = `Фамилия<span style = "color: #9873FF;">*</span>`;

    const inputName = document.createElement('input');
    inputName.classList.add('form__input', 'form__input--name');
    inputName.id = 'form__input--name';

    const labelName = document.createElement('label');
    labelName.classList.add('new-client__label', 'new-client__label--name', 'form__label', 'form__label--name');
    labelName.setAttribute('for', 'form__input--name');
    labelName.innerHTML = `Имя<span style = "color: #9873FF;">*</span>`;

    const inputLastname = document.createElement('input');
    inputLastname.classList.add('form__input', 'form__input--lastname');
    inputLastname.id = 'form__input--lastname';

    const labelLastame = document.createElement('label');
    labelLastame.classList.add('new-client__label', 'new-client__label--lastname', 'form__label', 'form__label--lastname');
    labelLastame.setAttribute('for', 'form__input--lastname');
    labelLastame.innerHTML = `Отчество`;

    const errorStatus = document.createElement('p');
    errorStatus.classList.add('error-server', 'is-hidden')

    const addContact = document.createElement('div');
    addContact.classList.add('new-client__add-contact', 'add-contact');

    const addContactBtn = document.createElement('a');
    addContactBtn.classList.add('add-contact__btn', 'link-reset');
    addContactBtn.innerHTML = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8.00001 4.66659C7.63334 4.66659 7.33334 4.96659 7.33334 5.33325V7.33325H5.33334C4.96668 7.33325 4.66668 7.63325 4.66668 7.99992C4.66668 8.36659 4.96668 8.66659 5.33334 8.66659H7.33334V10.6666C7.33334 11.0333 7.63334 11.3333 8.00001 11.3333C8.36668 11.3333 8.66668 11.0333 8.66668 10.6666V8.66659H10.6667C11.0333 8.66659 11.3333 8.36659 11.3333 7.99992C11.3333 7.63325 11.0333 7.33325 10.6667 7.33325H8.66668V5.33325C8.66668 4.96659 8.36668 4.66659 8.00001 4.66659ZM8.00001 1.33325C4.32001 1.33325 1.33334 4.31992 1.33334 7.99992C1.33334 11.6799 4.32001 14.6666 8.00001 14.6666C11.68 14.6666 14.6667 11.6799 14.6667 7.99992C14.6667 4.31992 11.68 1.33325 8.00001 1.33325ZM8.00001 13.3333C5.06001 13.3333 2.66668 10.9399 2.66668 7.99992C2.66668 5.05992 5.06001 2.66659 8.00001 2.66659C10.94 2.66659 13.3333 5.05992 13.3333 7.99992C13.3333 10.9399 10.94 13.3333 8.00001 13.3333Z" fill="#9873FF"/>
        </svg> Добавить контакт`;

    const saveBtn = document.createElement('button');
    saveBtn.setAttribute('type', 'submit')
    saveBtn.classList.add('new-client__save-btn', 'save-btn', 'btn-reset');
    saveBtn.textContent = 'Сохранить';

    const cancelBtn = document.createElement('a');
    cancelBtn.classList.add('new-client__cancel-btn', 'cancel-btn', 'link-reset');
    cancelBtn.textContent = 'Отмена';

    const exitBtn = document.createElement('a');
    exitBtn.classList.add('new-client__exit-btn', 'link-reset');
    exitBtn.innerHTML = `<svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M16.2333 1.73333L15.2666 0.766664L8.49991 7.53336L1.73324 0.766696L0.766576 1.73336L7.53324 8.50003L0.766603 15.2667L1.73327 16.2333L8.49991 9.46669L15.2666 16.2334L16.2332 15.2667L9.46657 8.50003L16.2333 1.73333Z" fill="#B0B0B0"/>
        </svg>`;

    const deleteBtn = document.createElement('a');
    deleteBtn.classList.add('new-client__delete-btn', 'delete-btn');
    deleteBtn.textContent = 'Удалить клиента';

    // Добавление нового контакта клиента
    addContactBtn.addEventListener('click', (e) => {
      e.preventDefault();

      if (!document.querySelector('.new-contact')) {
        document.querySelector('.add-contact').classList.add('is-open');
      };

      const newContact = document.createElement('div');
      newContact.classList.add('new-contact');

      const newContactSelect = document.createElement('div');
      newContactSelect.classList.add('new-contact__select');

      const index = Math.floor(Math.random() * 1000);
      newContactSelect.id = `select-${index}`;

      const newContactInput = document.createElement('input');
      newContactInput.classList.add('new-contact__input');
      newContactInput.placeholder = `Введите данные контакта`;

      const newContactBtnDelete = document.createElement('a');
      newContactBtnDelete.classList.add('btn__new-contact', 'link-reset');
      newContactBtnDelete.innerHTML = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8 2C4.682 2 2 4.682 2 8C2 11.318 4.682 14 8 14C11.318 14 14 11.318 14 8C14 4.682 11.318 2 8 2ZM8 12.8C5.354 12.8 3.2 10.646 3.2 8C3.2 5.354 5.354 3.2 8 3.2C10.646 3.2 12.8 5.354 12.8 8C12.8 10.646 10.646 12.8 8 12.8ZM10.154 5L8 7.154L5.846 5L5 5.846L7.154 8L5 10.154L5.846 11L8 8.846L10.154 11L11 10.154L8.846 8L11 5.846L10.154 5Z" fill="#B0B0B0"/>
          </svg>`;

      newContactInput.addEventListener('input', () => {
        newContactInput.classList.remove('new-contact__error');
      });

      newContact.append(newContactSelect);
      newContact.append(newContactInput);
      newContact.append(newContactBtnDelete);
      addContact.insertBefore(newContact, addContactBtn);

      let allNewContacts = document.querySelectorAll('.new-contact');

      if (allNewContacts.length == 10) {
        addContactBtn.classList.add('is-hidden');
      };

      // select
      let newSelect = new CustomSelect(`#${newContactSelect.id}`, {
        name: 'contact',
        targetValue: 'tel',
        options: [['tel', 'Телефон'], ['email', 'Email'], ['facebook', 'Facebook'], ['vk', 'VK'], ['other', 'Другое']],
      });

      let im = new Inputmask("+7(999) 999-99-99");

      if (newSelect.value === 'tel') {
        im.mask(newContactInput);
      }

      newContactSelect.addEventListener('select.change', (e) => {
        const btn = e.target.querySelector('.select__toggle');

        if (btn.value === 'tel') {
          newContactInput.setAttribute('type', 'tel')
          let im = new Inputmask("+7(999) 999-99-99");
          im.mask(newContactInput);
        } else if (btn.value === 'email') {
          newContactInput.setAttribute('type', 'email');
          Inputmask.remove(newContactInput);
        } else {
          newContactInput.setAttribute('type', 'text');
          Inputmask.remove(newContactInput);
        };
      });

    });

    // Закрыть модальное окна по клику на крестик
    exitBtn.addEventListener('click', (e) => {
      e.preventDefault();
      modalClose()
    })

    // Закрыть модальное окна по клику на кнопку "Отмена"
    cancelBtn.addEventListener('click', (e) => {
      e.preventDefault();
      modalClose()
    })

    document.querySelector('.clients__container').append(newClient);
    newClient.append(newClientModal);
    newClientModal.append(errorStatus);
    newClientModal.append(newClientTitle);
    newClientModal.append(newClientForm);
    newClientForm.append(labelSurname);
    labelSurname.append(inputSurname);

    newClientForm.append(labelName);
    labelName.append(inputName);

    newClientForm.append(labelLastame);
    labelLastame.append(inputLastname);

    newClientForm.append(addContact);
    addContact.append(addContactBtn);

    newClientForm.append(saveBtn);
    newClientModal.append(cancelBtn);
    newClientModal.append(exitBtn);
    newClientModal.append(deleteBtn);

  }
  newClientModal();

  // ---------- Отправка данных нового клиента на сервер
  async function newClientSubmit() {

    document.getElementById('client__form').querySelectorAll('input').forEach((el) => {
      el.setAttribute('disabled', 'true')
    })

    let client = {};

    client.lastName = '';

    document.querySelectorAll('.form__error').forEach((el) => {
      el.remove();
    });
    document.querySelectorAll('.new-contact__error').forEach((el) => {
      el.classList.remove('new-contact__error');
    });
    if (document.querySelector('.error')) {
      document.querySelectorAll('.error').forEach((el) => {
        el.classList.remove('error')
      })
    }

    validation();

    if (document.querySelector('.form__error') || document.querySelector('.new-contact__error')) {
      document.getElementById('client__form').querySelectorAll('input').forEach((el) => {
        el.removeAttribute('disabled')
      })
      return
    }

    let saveBtn = document.querySelector('.save-btn');

    saveBtn.innerHTML = `<svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1.00008 6.04008C1.00008 8.82356 3.2566 11.0801 6.04008 11.0801C8.82356 11.0801 11.0801 8.82356 11.0801 6.04008C11.0801 3.2566 8.82356 1.00008 6.04008 1.00008C5.38922 1.00008 4.7672 1.12342 4.196 1.34812" stroke="#B89EFF" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round"/>
          </svg> Сохранить`;

    let surnameClient = document.getElementById('form__input--surname').value.trim().split(' ').join('').toLowerCase();
    let nameClient = document.getElementById('form__input--name').value.trim().split(' ').join('').toLowerCase();
    let lastnameClient = document.getElementById('form__input--lastname').value.trim().split(' ').join('').toLowerCase();

    let correctSurnameClient = surnameClient[0].toLocaleUpperCase() + surnameClient.slice(1);
    let correctNameClient = nameClient[0].toLocaleUpperCase() + nameClient.slice(1);
    if (lastnameClient != '') {
      let correctLastnameClient = lastnameClient[0].toLocaleUpperCase() + lastnameClient.slice(1);
      client.lastName = `${correctLastnameClient}`;
    }
    client.name = `${correctNameClient}`;
    client.surname = `${correctSurnameClient}`;

    client.contacts = [];

    let allNewContacts = document.querySelectorAll('.new-contact');

    for (const contact of allNewContacts) {

      const attr = contact.querySelector('button').getAttribute('value');

      if (attr === 'tel') {
        let telNumber = contact.querySelector('input').value.replace(/[^+\d]/g, '');
        let contactObject = {
          type: 'Телефон',
          value: `${telNumber}`
        }
        client.contacts.push(contactObject);
      }

      if (attr === 'email') {
        let emailContact = contact.querySelector('input').value.trim()
        let contactObject = {
          type: 'Email',
          value: `${emailContact}`
        };
        client.contacts.push(contactObject);
      }

      if (attr === 'facebook') {
        let fbContact = contact.querySelector('input').value.trim()
        let contactObject = {
          type: 'Facebook',
          value: `${fbContact}`
        };
        client.contacts.push(contactObject);
      }

      if (attr === 'vk') {
        let vkContact = contact.querySelector('input').value.trim()
        let contactObject = {
          type: 'ВКонтакте',
          value: `${vkContact}`
        };
        client.contacts.push(contactObject);
      };

      if (attr === 'other') {
        let otherContact = contact.querySelector('input').value.trim()
        let contactObject = {
          type: 'Другое',
          value: `${otherContact}`
        };
        client.contacts.push(contactObject);
      }
    }

    async function postToServer() {

      const response = await fetch(SERVER_URL + '/api/clients', {
        method: 'POST',
        body: JSON.stringify(client),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const error = document.querySelector('.error-server');

        error.classList.remove('is-hidden');

        document.getElementById('client__form').querySelectorAll('input').forEach((el) => {
          el.removeAttribute('disabled')
        })

        if (response.status == 404) {
          error.textContent = 'Запрашиваемый элемент не найден в базе данных';
          return;
        } else if (response.status == 422) {
          const answer = await response.json();
          const messageFromServer = answer[0].message;
          error.textContent = `${messageFromServer}`;
          return;
        } else if (response.status[0] == 5) {
          error.textContent = 'Что-то пошло не так';
          return
        }
      } else {
        document.getElementById('client__form').querySelectorAll('input').forEach((el) => {
          el.removeAttribute('disabled')
        })
        modalClose();
      }
    }

    await postToServer();

    document.querySelector('.new-client__form').classList.remove('new-client__submit');


    async function getThisClient() {
      const response = await fetch(SERVER_URL + '/api/clients');

      const clientsFromServer = await response.json();

      for (const clientFromServer of clientsFromServer) {
        if (client.name == clientFromServer.name && client.surname == clientFromServer.surname && client.lastName == clientFromServer.lastName) {
          client.createdAt = clientFromServer.createdAt;
          client.updatedAt = clientFromServer.updatedAt;
          client.id = clientFromServer.id;
        }
      }
    }

    await getThisClient();

    saveBtn.querySelector('svg').remove();

    let clientArray = [client];

    clients.push(client);

    createTable(clientArray);
  }

  // ---------- Открытие окна удаления клиента
  function deleteModalOpen() {
    document.querySelector('.new-client').classList.add('modal-open');
    document.querySelector('.delete-modal').classList.add('modal-open');
  }

  // ---------- Открытие окна удаления внутри модального окна с клиентом
  function deleteModalOpenInside() {
    document.querySelector('.new-client__modal').classList.remove('modal-open');
    document.querySelector('.delete-modal').classList.add('modal-open');
  }

  // ---------- Закрытие окна удаления клиента
  function deleteModalClose(inOrOut) {
    let cancelBtn = document.querySelector('.delete-modal__cancel-btn');
    let exitBtn = document.querySelector('.exit-btn');
    cancelBtn.classList.add(inOrOut);
    exitBtn.classList.add(inOrOut);

    cancelBtn.addEventListener('click', () => {
      if (cancelBtn.classList.contains('outside')) {
        document.querySelector('.delete-modal').classList.remove('modal-open');
        document.querySelector('.new-client').classList.remove('modal-open');
      } else if (cancelBtn.classList.contains('inside')) {
        document.querySelector('.new-client__modal').classList.add('modal-open');
        document.querySelector('.delete-modal').classList.remove('modal-open');
      }
      document.querySelector('.exit-btn').classList.remove('inside')
      document.querySelector('.delete-modal__cancel-btn').classList.remove('inside')
      document.querySelector('.exit-btn').classList.remove('outside')
      document.querySelector('.delete-modal__cancel-btn').classList.remove('outside')
    })

    exitBtn.addEventListener('click', () => {
      if (exitBtn.classList.contains('outside')) {
        document.querySelector('.delete-modal').classList.remove('modal-open');
        document.querySelector('.new-client').classList.remove('modal-open');
      } else if (exitBtn.classList.contains('inside')) {
        document.querySelector('.new-client__modal').classList.add('modal-open');
        document.querySelector('.delete-modal').classList.remove('modal-open');
      }
      document.querySelector('.exit-btn').classList.remove('inside')
      document.querySelector('.delete-modal__cancel-btn').classList.remove('inside')
      document.querySelector('.exit-btn').classList.remove('outside')
      document.querySelector('.delete-modal__cancel-btn').classList.remove('outside')
    })

  }

  // ---------- Модальное окно редактирования клиента
  async function changeClientModal(id) {
    let response = await fetch(SERVER_URL + `/api/clients/${id}`);

    if (!response.ok) {
      const error = document.querySelector('.error-server');

      modalOpen();

      error.classList.remove('is-hidden');

      if (response.status == 404) {
        error.textContent = 'Запрашиваемый элемент не найден в базе данных';
        return;
      } else if (response.status == 422) {
        const answer = await response.json();
        const messageFromServer = answer[0].message;
        error.textContent = `${messageFromServer}`;
        return;
      } else if (response.status[0] == 5) {
        error.textContent = 'Что-то пошло не так';
        return
      }
    } else {
      let clientFromServer = await response.json();
      let contactsFromServer = clientFromServer.contacts;

      document.querySelector('.add-contact').classList.add('first-click');

      if (document.querySelector('.new-client__form.new-client__submit')) {
        document.querySelector('.new-client__form.new-client__submit').classList.remove('new-client__submit');
      }

      document.querySelectorAll('.new-contact').forEach((el) => {
        el.remove()
      })

      document.querySelector('.add-contact').classList.remove('is-open');

      let modalBox = document.querySelector('.new-client');

      let clientTitle = document.querySelector('.new-client__title')
      clientTitle.textContent = 'Изменить данные ';

      let idInTitle = document.createElement('span');

      idInTitle.classList.add('new-client__id');

      idInTitle.textContent = `ID: ${id}`;

      clientTitle.append(idInTitle);

      let surnameFromServer = document.getElementById('form__input--surname');
      surnameFromServer.value = `${clientFromServer.surname}`;
      surnameFromServer.classList.add('is-active');

      let nameFromServer = document.getElementById('form__input--name');
      nameFromServer.classList.add('is-active');
      nameFromServer.value = `${clientFromServer.name}`;

      let lastNameFromServer = document.getElementById('form__input--lastname');
      lastNameFromServer.classList.add('is-active');
      lastNameFromServer.value = `${clientFromServer.lastName}`;
      document.querySelector('.cancel-btn').classList.add('is-hidden');

      if (document.querySelector('.new-client__submit')) {
        document.querySelector('.new-client__submit').classList.remove('new-client__submit');
      }
      document.querySelector('.new-client__form').classList.add('change-client-submit');

      if (document.querySelector('.new-client__delete-btn.is-hidden')) {
        document.querySelector('.new-client__delete-btn.is-hidden').classList.remove('is-hidden');
      }

      modalOpen();
      console.log(contactsFromServer)

      document.querySelector('.add-contact').addEventListener('click', (e) => {
        if (document.querySelector('.first-click')) {
          document.querySelector('.first-click').classList.remove('first-click');

          for (let i = 0; i < contactsFromServer.length - 1; i++) {
            document.querySelector('.add-contact__btn').click();
          }

          document.querySelectorAll('.new-contact').forEach((elem) => {
            elem.classList.add('for-contact-from-server');
            elem.querySelectorAll('.select__option_selected').forEach((el) => {
              el.classList.remove('select__option_selected');
            })
          })

          for (const contactFromServer of contactsFromServer) {
            const typeOfContact = contactFromServer.type;

            const valueOfContact = contactFromServer.value;

            let newContactBox = document.querySelector('.for-contact-from-server');

            console.log(newContactBox)
            let selectBtn = newContactBox.firstChild.firstChild;
            console.log(selectBtn)
            let newContactInput = newContactBox.childNodes[1];

            if (typeOfContact === 'Телефон') {
              selectBtn.setAttribute('value', 'tel');
              selectBtn.value = 'tel';
              newContactBox.childNodes[1].value = `${valueOfContact}`;
            } else if (typeOfContact === 'Email') {
              selectBtn.setAttribute('value', 'email');
              selectBtn.textContent = 'Email';
              Inputmask.remove(newContactInput);
              selectBtn.selectedIndex = 3;
              newContactBox.childNodes[1].value = `${valueOfContact}`;
            } else if (typeOfContact === 'Facebook') {
              selectBtn.setAttribute('value', 'facebook');
              selectBtn.textContent = 'Facebook';
              Inputmask.remove(newContactInput);
              newContactBox.childNodes[1].value = `${valueOfContact}`;
            } else if (typeOfContact === 'ВКонтакте') {
              selectBtn.setAttribute('value', 'vk');
              selectBtn.textContent = 'VK';
              Inputmask.remove(newContactInput);
              newContactBox.childNodes[1].value = `${valueOfContact}`;
            } else if (typeOfContact === 'Другое') {
              selectBtn.setAttribute('value', 'other');
              selectBtn.textContent = 'Другое';
              Inputmask.remove(newContactInput);
              newContactBox.childNodes[1].value = `${valueOfContact}`;
            }

            newContactBox.classList.remove('for-contact-from-server');
          }
        }
      });

      // Кнопка сохранения изменений
      if (document.querySelector('.change-client-submit')) {
        document.querySelector('.save-btn').addEventListener('click', (e) => {
          e.preventDefault()
          const hash = document.location.hash
          const thisId = hash.slice(3)
          changeClientSubmit(thisId)
        })
      }

      // Кнопка удаления клиента внутри модального окна
      document.querySelector('.new-client__delete-btn').addEventListener('click', (e) => {
        let deleteBtn = document.querySelector('.delete-modal__delete-btn');
        deleteBtn.removeAttribute('id');

        let random = Math.random() * 10000;
        random = Math.round(random);
        deleteBtn.id = random;

        deleteModalOpenInside();

        document.getElementById(random).addEventListener('click', async () => {
          const hash = document.location.hash;
          const thisId = hash.slice(3);
          document.location.hash = '';

          async function deleteFromServer() {
            const response = await fetch(SERVER_URL + `/api/clients/${thisId}`, {
              method: 'DELETE',
            });
          }

          await deleteFromServer();

          document.querySelector('.exit-btn').classList.remove('inside');

          document.querySelector('.exit-btn').classList.add('outside');

          document.querySelectorAll('.tbody__td--id').forEach((el) => {
            if (el.textContent == thisId) {
              el.parentNode.remove();
            }
          })

          for (const client of clients) {
            if (client.id == thisId) {
              const index = clients.indexOf(client);
              if (index !== -1) {
                clients.splice(index, 1);
              }
            }
          }

          document.querySelector('.exit-btn.outside').click();

        })

        deleteModalClose('inside');

      });
    }
  }

  // ---------- Отправка данных редактирования клиента
  async function changeClientSubmit(id) {
    let response = await fetch(SERVER_URL + `/api/clients/${id}`);
    let clientFromServer = await response.json();

    for (const client of clients) {
      if (client.id == id) {
        const index = clients.indexOf(client);
        if (index !== -1) {
          clients.splice(index, 1)
        }
      }
    }

    let contactsFromServer = clientFromServer.contacts;
    document.getElementById('client__form').querySelectorAll('input').forEach((el) => {
      el.setAttribute('disabled', 'true')
    })

    let client = {};
    client.id = clientFromServer.id;
    client.name = clientFromServer.name;
    client.surname = clientFromServer.surname;
    client.lastName = clientFromServer.lastName;
    client.createdAt = clientFromServer.createdAt;
    client.contacts = [];


    document.querySelectorAll('.form__error').forEach((el) => {
      el.remove();
    });

    document.querySelectorAll('.new-contact__error').forEach((el) => {
      el.classList.remove('new-contact__error');
    });

    if (document.querySelector('.error')) {
      document.querySelectorAll('.error').forEach((el) => {
        el.classList.remove('error')
      })
    };

    validation();

    if (document.querySelector('.form__error') || document.querySelector('.new-contact__error')) {
      document.getElementById('client__form').querySelectorAll('input').forEach((el) => {
        el.removeAttribute('disabled')
      })
      return
    }

    let saveBtn = document.querySelector('.save-btn');

    saveBtn.innerHTML = `<svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1.00008 6.04008C1.00008 8.82356 3.2566 11.0801 6.04008 11.0801C8.82356 11.0801 11.0801 8.82356 11.0801 6.04008C11.0801 3.2566 8.82356 1.00008 6.04008 1.00008C5.38922 1.00008 4.7672 1.12342 4.196 1.34812" stroke="#B89EFF" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round"/>
        </svg> Сохранить`;

    window.location.hash = '';

    const surnameClient = document.getElementById('form__input--surname').value.trim().split(' ').join('').toLowerCase();
    const nameClient = document.getElementById('form__input--name').value.trim().split(' ').join('').toLowerCase();
    const lastNameClient = document.getElementById('form__input--lastname').value.trim().split(' ').join('').toLowerCase();

    const newSurnameClient = surnameClient[0].toUpperCase() + surnameClient.slice(1);
    const newNameClient = nameClient[0].toUpperCase() + nameClient.slice(1);

    if (lastNameClient != '') {
      const newLastNameClient = lastNameClient[0].toUpperCase() + lastNameClient.slice(1)
      if (newLastNameClient !== clientFromServer.lastName) {
        client.lastName = `${newLastNameClient}`;
      }
    } else {
      if (clientFromServer.lastName !== '') {
        client.lastName = '';
      }
    }
    if (newSurnameClient !== clientFromServer.surname) {
      client.surname = `${newSurnameClient}`
    }
    if (newNameClient !== clientFromServer.name) {
      client.name = `${newNameClient}`
    }

    if (!document.querySelector('.first-click')) {
      let allNewContacts = document.querySelectorAll('.new-contact');
      for (const contact of allNewContacts) {
        const attr = contact.querySelector('button').getAttribute('value')
        if (attr === 'tel') {
          let telNumber = contact.querySelector('input').value.replace(/[^+\d]/g, '')
          const contactObject = {
            type: 'Телефон',
            value: `${telNumber}`
          }
          client.contacts.push(contactObject)
        }
        if (attr === 'email') {
          let emailContact = contact.querySelector('input').value.trim()
          const contactObject = {
            type: 'Email',
            value: `${emailContact}`
          };
          client.contacts.push(contactObject)
        }
        if (attr === 'facebook') {
          let fbContact = contact.querySelector('input').value.trim()
          const contactObject = {
            type: 'Facebook',
            value: `${fbContact}`
          };
          client.contacts.push(contactObject)
        }
        if (attr === 'vk') {
          let vkContact = contact.querySelector('input').value.trim()
          const contactObject = {
            type: 'ВКонтакте',
            value: `${vkContact}`
          };
          client.contacts.push(contactObject)
        };
        if (attr === 'other') {
          let otherContact = contact.querySelector('input').value.trim()
          const contactObject = {
            type: 'Другое',
            value: `${otherContact}`
          };
          client.contacts.push(contactObject)
        }
      }
    } else {
      delete client.contacts
    }

    async function patchToServer() {
      const response = await fetch(SERVER_URL + `/api/clients/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(client),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const error = document.querySelector('.error-server');
        error.classList.remove('is-hidden');
        document.getElementById('client__form').querySelectorAll('input').forEach((el) => {
          el.removeAttribute('disabled')
        })

        if (response.status == 404) {
          error.textContent = 'Запрашиваемый элемент не найден в базе данных';
          return;
        } else if (response.status == 422) {
          const answer = await response.json();
          const messageFromServer = answer[0].message;
          error.textContent = `${messageFromServer}`;
          return;
        } else if (response.status[0] == 5) {
          error.textContent = 'Что-то пошло не так';
          return
        }
      } else {
        document.getElementById('client__form').querySelectorAll('input').forEach((el) => {
          el.removeAttribute('disabled')
        })
        document.querySelector('.new-client__form').classList.remove('change-client-submit')
        // document.querySelector('.new-client-title_id').remove()
        // document.querySelector('.new-client-title').textContent = 'Новый клиент'
        modalClose();
      }
    }

    await patchToServer();

    async function getThisClient() {
      const response = await fetch(SERVER_URL + `/api/clients/${id}`);
      const clientFromServer = await response.json();

      if (client.name == clientFromServer.name && client.surname == clientFromServer.surname && client.lastName == clientFromServer.lastName) {
        client.updatedAt = clientFromServer.updatedAt;
        client.contacts = clientFromServer.contacts;
      }
    }
    if (saveBtn.querySelector('svg')) {
      saveBtn.querySelector('svg').remove();
    }

    client.createdAt = clientFromServer.createdAt;
    await getThisClient();
    let clientArray = [client];
    document.querySelectorAll('.tbody__td--id').forEach((el) => {
      if (el.textContent == id) {
        el.parentNode.remove();
      }
    })
    createTable(clientArray)
    if (clients[clients.length - 1].id == client.id) {
      return
    } else {
      clients.push(client)
    }
  }

  // ---------- Валидация формы
  function validation() {
    const surnameInputValid = document.getElementById('form__input--surname')
    const labelForSurnameValid = document.querySelector('.new-client__label--surname')
    if (surnameInputValid.value.trim().length === 0) {
      let surnameError = document.createElement('span');
      surnameError.textContent = 'Введите фамилию';
      surnameError.classList.add('form__error')
      labelForSurnameValid.appendChild(surnameError);
      surnameInputValid.classList.add('error')
    }
    if (surnameInputValid.value.search(/\d|^A-Za-zА-Яа-я/) != -1) {
      let surnameError = document.createElement('span');
      surnameError.textContent = 'Фамилия введена некорректно';
      surnameError.classList.add('form__error')
      labelForSurnameValid.appendChild(surnameError);
      surnameInputValid.classList.add('error')
    };
    const nameInputValid = document.getElementById('form__input--name')
    const labelForNameValid = document.querySelector('.new-client__label--name')
    if (nameInputValid.value.trim().length === 0) {
      let nameError = document.createElement('span');
      nameError.textContent = 'Введите имя';
      nameError.classList.add('form__error');
      labelForNameValid.appendChild(nameError);
      nameInputValid.classList.add('error')
    };
    if (nameInputValid.value.search(/\d|^A-Za-zА-яа-я/) != -1) {
      let nameError = document.createElement('span');
      nameError.textContent = 'Имя введено некорректно';
      nameError.classList.add('form__error')
      labelForNameValid.appendChild(nameError);
      nameInputValid.classList.add('error')
    };
    const lastNameInputValid = document.getElementById('form__input--lastname')
    const labelForLastNameValid = document.querySelector('.new-client__label--lastname')
    if (lastNameInputValid.value.search(/\d|^A-Za-zА-яа-я/) != -1) {
      let lastNameError = document.createElement('span');
      lastNameError.textContent = 'Отчество введено некорректно';
      lastNameError.classList.add('form__error')
      labelForLastNameValid.appendChild(lastNameError);
      lastNameInputValid.classList.add('error')
    };
    if (document.querySelector('.new-contact')) {
      document.querySelectorAll('.new-contact').forEach((oneContact) => {
        const newSelect = oneContact.querySelector('button')
        const selectAttr = newSelect.getAttribute('value')
        const oneContactInput = oneContact.querySelector('input')
        if (selectAttr === 'tel') {
          if (oneContactInput.value.replace(/[^+\d]/g, '').length < 12) {
            oneContactInput.classList.add('new-contact__error');
          };
        } else {
          if (oneContactInput.value.trim().length === 0) {
            oneContactInput.classList.add('new-contact__error');
          }
        }
      })
    }
  }

  // ---------- Создание таблицы
  function createTable(array) {
    let table = document.getElementById('tbody');

    for (const client of array) {

      let tbodyRow = document.createElement('tr');
      tbodyRow.classList.add('tbody__row');

      let cellId = document.createElement('td');
      cellId.classList.add('tbody__td', 'tbody__td--id');
      cellId.style.color = '#B0B0B0';
      cellId.textContent = `${client.id}`;
      tbodyRow.append(cellId);

      let cellName = document.createElement('td');
      cellName.classList.add('tbody__td', 'tbody__td--name');
      cellName.textContent = `${client.surname} ${client.name} ${client.lastName}`;
      tbodyRow.append(cellName);

      let cellCreatedAt = document.createElement('td');
      cellCreatedAt.classList.add('tbody__td', 'tbody__td--create');
      let cellCreatedAtDate = document.createElement('span');
      cellCreatedAtDate.style.marginRight = '7px';
      let cellCreatedAtTime = document.createElement('span');
      cellCreatedAtTime.style.color = '#B0B0B0';;

      let clientCreatedAt = new Date(client.createdAt);
      let dateClientCreated = clientCreatedAt.getDate();
      if (dateClientCreated < 10) {
        dateClientCreated = `0${dateClientCreated}`;
      };

      let monthClientCreated = clientCreatedAt.getMonth() + 1;
      if (monthClientCreated < 10) {
        monthClientCreated = `0${monthClientCreated}`;
      };

      let hoursClientCreated = clientCreatedAt.getHours();
      if (hoursClientCreated < 10) {
        hoursClientCreated = `0${hoursClientCreated}`;
      };

      let minutesClientCreated = clientCreatedAt.getMinutes();
      if (minutesClientCreated < 10) {
        minutesClientCreated = `0${minutesClientCreated}`;
      };

      cellCreatedAtDate.innerHTML = `${dateClientCreated}.${monthClientCreated}.${clientCreatedAt.getFullYear()}`;
      cellCreatedAtTime.textContent = `${hoursClientCreated}:${minutesClientCreated}`;

      cellCreatedAt.append(cellCreatedAtDate);
      cellCreatedAt.append(cellCreatedAtTime);
      tbodyRow.append(cellCreatedAt);


      const cellUpdateAt = document.createElement('td');
      cellUpdateAt.classList.add('tbody__td', 'tbody__td--change');
      const cellUpdateAtDate = document.createElement('span');
      cellUpdateAtDate.style.marginRight = '7px';
      const cellUpdateAtTime = document.createElement('span');
      cellUpdateAtTime.style.color = '#B0B0B0';
      const clientUpdateAt = new Date(client.updatedAt);
      const dateClientUpdate = clientUpdateAt.getDate();
      if (dateClientUpdate < 10) {
        dateClientUpdate = `0${dateClientUpdate}`;
      };

      let monthClientUpdate = clientUpdateAt.getMonth() + 1;

      if (monthClientUpdate < 10) {
        monthClientUpdate = `0${monthClientUpdate}`;
      };

      let hoursClientUpdate = clientUpdateAt.getHours();
      if (hoursClientUpdate < 10) {
        hoursClientUpdate = `0${hoursClientUpdate}`;
      };

      let minutesClientUpdate = clientUpdateAt.getMinutes();
      if (minutesClientUpdate < 10) {
        minutesClientUpdate = `0${minutesClientUpdate}`;
      };

      cellUpdateAtDate.innerHTML = `${dateClientUpdate}.${monthClientUpdate}.${clientUpdateAt.getFullYear()}`;
      cellUpdateAtTime.textContent = `${hoursClientUpdate}:${minutesClientUpdate}`;

      cellUpdateAt.append(cellUpdateAtDate);
      cellUpdateAt.append(cellUpdateAtTime);
      tbodyRow.append(cellUpdateAt);

      let cellContacts = document.createElement('td');
      cellContacts.classList.add('tbody__td', 'tbody__td--contacts', 'contacts');

      let clientContacts = [];

      if (client.contacts) {
        clientContacts = client.contacts;
      };

      if (clientContacts.length == 0) {
        tbodyRow.append(cellContacts);
      } else {
        for (const clientContact of clientContacts) {
          let contactLink = document.createElement('a');

          contactLink.classList.add('contacts__link', 'link-reset');

          if (clientContact.type === 'Телефон') {
            contactLink.innerHTML = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g opacity="0.7">
            <circle cx="8" cy="8" r="8" fill="#9873FF"/>
            <path d="M11.56 9.50222C11.0133 9.50222 10.4844 9.41333 9.99111 9.25333C9.83556 9.2 9.66222 9.24 9.54222 9.36L8.84444 10.2356C7.58667 9.63556 6.40889 8.50222 5.78222 7.2L6.64889 6.46222C6.76889 6.33778 6.80444 6.16444 6.75556 6.00889C6.59111 5.51556 6.50667 4.98667 6.50667 4.44C6.50667 4.2 6.30667 4 6.06667 4H4.52889C4.28889 4 4 4.10667 4 4.44C4 8.56889 7.43556 12 11.56 12C11.8756 12 12 11.72 12 11.4756V9.94222C12 9.70222 11.8 9.50222 11.56 9.50222Z" fill="white"/>
            </g>
            </svg>`;

            let tel = clientContact.value;

            const editTel = tel.slice(0, 2) + ' (' + tel.slice(2, 5) + ') ' + tel.slice(5, 8) + '-' + tel.slice(8, 10) + '-' + tel.slice(10);

            tippy(contactLink, {
              content: `Телефон: ${editTel}`
            })

          } else if (clientContact.type === 'Email') {
            contactLink.innerHTML = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path opacity="0.7" fill-rule="evenodd" clip-rule="evenodd" d="M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16ZM4 5.75C4 5.3375 4.36 5 4.8 5H11.2C11.64 5 12 5.3375 12 5.75V10.25C12 10.6625 11.64 11 11.2 11H4.8C4.36 11 4 10.6625 4 10.25V5.75ZM8.424 8.1275L11.04 6.59375C11.14 6.53375 11.2 6.4325 11.2 6.32375C11.2 6.0725 10.908 5.9225 10.68 6.05375L8 7.625L5.32 6.05375C5.092 5.9225 4.8 6.0725 4.8 6.32375C4.8 6.4325 4.86 6.53375 4.96 6.59375L7.576 8.1275C7.836 8.28125 8.164 8.28125 8.424 8.1275Z" fill="#9873FF"/>
            </svg>`;

            tippy(contactLink, {
              content: `E-mail: ${clientContact.value}`
            })

          } else if (clientContact.type === 'Facebook') {
            contactLink.setAttribute('href', `${clientContact.value}`)
            contactLink.setAttribute('target', 'blank')
            contactLink.innerHTML = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g opacity="0.7">
            <path d="M7.99999 0C3.6 0 0 3.60643 0 8.04819C0 12.0643 2.928 15.3976 6.75199 16V10.3775H4.71999V8.04819H6.75199V6.27309C6.75199 4.25703 7.94399 3.14859 9.77599 3.14859C10.648 3.14859 11.56 3.30121 11.56 3.30121V5.28514H10.552C9.55999 5.28514 9.24799 5.90362 9.24799 6.53815V8.04819H11.472L11.112 10.3775H9.24799V16C11.1331 15.7011 12.8497 14.7354 14.0879 13.2772C15.3261 11.819 16.0043 9.96437 16 8.04819C16 3.60643 12.4 0 7.99999 0Z" fill="#9873FF"/>
            </g>
            </svg>`;
            tippy(contactLink, {
              content: `Facebook: ${clientContact.value}`
            })

          } else if (clientContact.type === 'ВКонтакте') {
            contactLink.setAttribute('href', `${clientContact.value}`)
            contactLink.setAttribute('target', 'blank')
            contactLink.innerHTML = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g opacity="0.7">
            <path d="M8 0C3.58187 0 0 3.58171 0 8C0 12.4183 3.58187 16 8 16C12.4181 16 16 12.4183 16 8C16 3.58171 12.4181 0 8 0ZM12.058 8.86523C12.4309 9.22942 12.8254 9.57217 13.1601 9.97402C13.3084 10.1518 13.4482 10.3356 13.5546 10.5423C13.7065 10.8371 13.5693 11.1604 13.3055 11.1779L11.6665 11.1776C11.2432 11.2126 10.9064 11.0419 10.6224 10.7525C10.3957 10.5219 10.1853 10.2755 9.96698 10.037C9.87777 9.93915 9.78382 9.847 9.67186 9.77449C9.44843 9.62914 9.2543 9.67366 9.1263 9.90707C8.99585 10.1446 8.96606 10.4078 8.95362 10.6721C8.93577 11.0586 8.81923 11.1596 8.43147 11.1777C7.60291 11.2165 6.81674 11.0908 6.08606 10.6731C5.44147 10.3047 4.94257 9.78463 4.50783 9.19587C3.66126 8.04812 3.01291 6.78842 2.43036 5.49254C2.29925 5.2007 2.39517 5.04454 2.71714 5.03849C3.25205 5.02817 3.78697 5.02948 4.32188 5.03799C4.53958 5.04143 4.68362 5.166 4.76726 5.37142C5.05633 6.08262 5.4107 6.75928 5.85477 7.38684C5.97311 7.55396 6.09391 7.72059 6.26594 7.83861C6.45582 7.9689 6.60051 7.92585 6.69005 7.71388C6.74734 7.57917 6.77205 7.43513 6.78449 7.29076C6.82705 6.79628 6.83212 6.30195 6.75847 5.80943C6.71263 5.50122 6.53929 5.30218 6.23206 5.24391C6.07558 5.21428 6.0985 5.15634 6.17461 5.06697C6.3067 4.91245 6.43045 4.81686 6.67777 4.81686L8.52951 4.81653C8.82136 4.87382 8.88683 5.00477 8.92645 5.29874L8.92808 7.35656C8.92464 7.47032 8.98521 7.80751 9.18948 7.88198C9.35317 7.936 9.4612 7.80473 9.55908 7.70112C10.0032 7.22987 10.3195 6.67368 10.6029 6.09801C10.7279 5.84413 10.8358 5.58142 10.9406 5.31822C11.0185 5.1236 11.1396 5.02785 11.3593 5.03112L13.1424 5.03325C13.195 5.03325 13.2483 5.03374 13.3004 5.04274C13.6009 5.09414 13.6832 5.22345 13.5903 5.5166C13.4439 5.97721 13.1596 6.36088 12.8817 6.74553C12.5838 7.15736 12.2661 7.55478 11.9711 7.96841C11.7001 8.34652 11.7215 8.53688 12.058 8.86523Z" fill="#9873FF"/>
            </g>
            </svg>`;
            tippy(contactLink, {
              content: `VK: ${clientContact.value}`
            })

          } else if (clientContact.type === 'Другое') {
            contactLink.innerHTML = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path opacity="0.7" fill-rule="evenodd" clip-rule="evenodd" d="M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16ZM3 8C3 5.24 5.24 3 8 3C10.76 3 13 5.24 13 8C13 10.76 10.76 13 8 13C5.24 13 3 10.76 3 8ZM9.5 6C9.5 5.17 8.83 4.5 8 4.5C7.17 4.5 6.5 5.17 6.5 6C6.5 6.83 7.17 7.5 8 7.5C8.83 7.5 9.5 6.83 9.5 6ZM5 9.99C5.645 10.96 6.75 11.6 8 11.6C9.25 11.6 10.355 10.96 11 9.99C10.985 8.995 8.995 8.45 8 8.45C7 8.45 5.015 8.995 5 9.99Z" fill="#9873FF"/>
            </svg>`;
            tippy(contactLink, {
              content: `Другое: ${clientContact.value}`
            })
          }

          cellContacts.append(contactLink);
        }
      }

      if (clientContacts.length <= 5) {
        tbodyRow.append(cellContacts);
      } else {
        let thisContactsLinks = cellContacts.querySelectorAll('.contacts__link');
        for (let i = 4; i < thisContactsLinks.length; i++) {
          thisContactsLinks[i].classList.add('is-hidden');
        };

        let contactLinkMore = document.createElement('a');

        contactLinkMore.classList.add('contacts__link--more');

        contactLinkMore.textContent = `+${clientContacts.length - 4}`;

        cellContacts.append(contactLinkMore);

        tbodyRow.append(cellContacts);

        cellContacts.querySelector('.contacts__link--more').addEventListener('click', (e) => {
          e.preventDefault();

          for (let sibling of e.target.parentNode.children) {
            sibling.classList.remove('is-hidden');
          }
          e.target.remove();
        })
      };

      let cellActions = document.createElement('td');
      cellActions.classList.add('tbody__td', 'tbody__td--actions');

      let changeClientBtn = document.createElement('button');
      changeClientBtn.classList.add('btn__change-client', 'btn-reset');
      changeClientBtn.innerHTML = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g opacity="0.7">
      <path d="M2 11.5002V14.0002H4.5L11.8733 6.62687L9.37333 4.12687L2 11.5002ZM13.8067 4.69354C14.0667 4.43354 14.0667 4.01354 13.8067 3.75354L12.2467 2.19354C11.9867 1.93354 11.5667 1.93354 11.3067 2.19354L10.0867 3.41354L12.5867 5.91354L13.8067 4.69354Z" fill="#9873FF"/>
      </g>
      </svg>Изменить`;

      let deleteClientBtn = document.createElement('button');
      deleteClientBtn.classList.add('btn__delete-client', 'btn-reset');
      deleteClientBtn.innerHTML = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g opacity="0.7">
      <path d="M8 2C4.682 2 2 4.682 2 8C2 11.318 4.682 14 8 14C11.318 14 14 11.318 14 8C14 4.682 11.318 2 8 2ZM8 12.8C5.354 12.8 3.2 10.646 3.2 8C3.2 5.354 5.354 3.2 8 3.2C10.646 3.2 12.8 5.354 12.8 8C12.8 10.646 10.646 12.8 8 12.8ZM10.154 5L8 7.154L5.846 5L5 5.846L7.154 8L5 10.154L5.846 11L8 8.846L10.154 11L11 10.154L8.846 8L11 5.846L10.154 5Z" fill="#F06A4D"/>
      </g>
      </svg>Удалить`;

      cellActions.append(changeClientBtn);
      cellActions.append(deleteClientBtn);
      tbodyRow.append(cellActions);

      table.append(tbodyRow);
    };

    // Кнопка изменения клиента
    document.querySelectorAll('.btn__change-client').forEach((btn) => {
      btn.addEventListener('click', async (e) => {
        e.preventDefault();

        if (document.querySelector('.form__error')) {
          document.querySelectorAll('.form__error').forEach((el) => {
            el.remove();
          })
        }

        if (document.querySelector('.error')) {
          document.querySelectorAll('.error').forEach((el) => {
            el.classList.remove('error');
          })
        }

        let target = e.target.closest('.btn__change-client');

        const targetRow = target.parentNode.parentNode;

        target.innerHTML = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3.00008 8.04008C3.00008 10.8236 5.2566 13.0801 8.04008 13.0801C10.8236 13.0801 13.0801 10.8236 13.0801 8.04008C13.0801 5.2566 10.8236 3.00008 8.04008 3.00008C7.38922 3.00008 6.7672 3.12342 6.196 3.34812" stroke="#9873FF" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round"/>
          </svg>Изменить`;

        target.classList.add('is-animated');

        let idClient = targetRow.querySelector('.tbody__td--id').textContent;
        window.location.hash = `id${idClient}`;


        await changeClientModal(idClient)
        target.innerHTML = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g opacity="0.7">
        <path d="M2 11.5002V14.0002H4.5L11.8733 6.62687L9.37333 4.12687L2 11.5002ZM13.8067 4.69354C14.0667 4.43354 14.0667 4.01354 13.8067 3.75354L12.2467 2.19354C11.9867 1.93354 11.5667 1.93354 11.3067 2.19354L10.0867 3.41354L12.5867 5.91354L13.8067 4.69354Z" fill="#9873FF"/>
        </g>
        </svg>Изменить`;

        target.classList.remove('is-animated');
      })
    });

    // Кнопка удаления клиента
    document.querySelectorAll('.btn__delete-client').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const target = e.target.closest('.btn__delete-client');
        let deleteBtn = document.querySelector('.delete-modal__delete-btn');
        deleteBtn.removeAttribute('id');

        let id = target.parentNode.parentNode.querySelector('.tbody__td--id').textContent;


        let random = Math.random() * 10000;
        random = Math.round(random);
        deleteBtn.id = random;
        deleteModalOpen();

        deleteModalClose('outside');

        document.addEventListener('click', (e) => {
          if (e.target == document.getElementById(random)) {
            const thisId = id;

            async function deleteFromServer() {
              const response = await fetch(SERVER_URL + `/api/clients/${thisId}`, {
                method: 'DELETE',
              });

              document.querySelectorAll('.tbody__td--id').forEach((el) => {
                if (el.textContent == thisId) {
                  el.parentNode.remove()
                }
              });
              for (const client of clients) {
                if (client.id == thisId) {
                  const index = clients.indexOf(client);
                  if (index !== -1) {
                    clients.splice(index, 1)
                  }
                }
              }
            };

            deleteFromServer();

            document.querySelector('.exit-btn.outside').click()
          } else {
            return
          }
        })
      })
    });
  };


  // Кнопка закрытия формы
  document.querySelector('.new-client__exit-btn').addEventListener('click', (e) => {
    e.preventDefault();
    modalClose();
  });

  // ---------- Индикатор загрузки таблицы
  function preloadTable() {
    const preloaderRow = document.createElement('tr');
    const preloaderTable = document.createElement('td');
    preloaderTable.colSpan = '6';

    preloaderTable.classList.add('table-preload');

    preloaderTable.innerHTML = `<svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clip-path="url(#clip0_121_2401)">
      <path d="M14.0002 50.0005C14.0002 69.8825 30.1182 86.0005 50.0002 86.0005C69.8822 86.0005 86.0002 69.8825 86.0002 50.0005C86.0002 30.1185 69.8823 14.0005 50.0003 14.0005C45.3513 14.0005 40.9082 14.8815 36.8282 16.4865" stroke="#9873FF" stroke-width="8" stroke-miterlimit="10" stroke-linecap="round"/>
      </g>
      <defs>
      <clipPath id="clip0_121_2401">
      <rect width="100" height="100" fill="white"/>
      </clipPath>
      </defs>
      </svg>`;
    document.querySelector('.table__tbody').append(preloaderRow);
    preloaderRow.append(preloaderTable);
  }

  // ---------- Сортировка Вверх
  function sortUp(field) {
    let sortedClients = clients.sort((a, b) => (a[field] >= b[field] ? 1 : -1))
    createTable(sortedClients)
  }

  // ---------- Сортровка Вниз
  function sortDown(field) {
    let sortedClients = clients.sort((a, b) => (a[field] < b[field] ? 1 : -1))
    createTable(sortedClients)
  }

  // ---------- Окно подтверждения удаления клиента
  function deleteClient() {
    const deleteBox = document.createElement('div');
    deleteBox.classList.add('delete-modal');

    const deleteTitle = document.createElement('p');
    deleteTitle.classList.add('delete-modal__title');
    deleteTitle.textContent = 'Удалить клиета';

    const deleteText = document.createElement('p');
    deleteText.classList.add('delete-modal__descr');
    deleteText.textContent = 'Вы действительно хотите удалить данного клиента?'

    const deleteBoxBtn = document.createElement('button');
    deleteBoxBtn.classList.add('delete-modal__delete-btn', 'btn-reset');
    deleteBoxBtn.textContent = 'Удалить';

    const cancelDeleteBox = document.createElement('a');
    cancelDeleteBox.classList.add('delete-modal__cancel-btn', 'btn-reset')
    cancelDeleteBox.textContent = 'Отмена';

    const exitBtn = document.createElement('a');
    exitBtn.classList.add('exit-btn', 'link-reset');
    exitBtn.innerHTML = `<svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M16.2333 1.73333L15.2666 0.766664L8.49991 7.53336L1.73324 0.766696L0.766576 1.73336L7.53324 8.50003L0.766603 15.2667L1.73327 16.2333L8.49991 9.46669L15.2666 16.2334L16.2332 15.2667L9.46657 8.50003L16.2333 1.73333Z" fill="#B0B0B0"/>
      </svg>`;

    deleteBox.append(deleteTitle);
    deleteBox.append(deleteText);
    deleteBox.append(deleteBoxBtn);
    deleteBox.append(cancelDeleteBox);
    deleteBox.append(exitBtn);
    document.querySelector('.new-client').append(deleteBox);
  }
  deleteClient();

  // ---------- Загрузка страницы с таблицей клиентов
  async function loadTable(sortVar, field) {
    if (!document.querySelector('.tbody__row')) {
      document.querySelector('.btn__add-client').classList.add('is-hidden');
      preloadTable();
    } else {
      document.querySelectorAll('.tbody__row').forEach((el) => {
        el.remove();
      })
    }

    const response = await fetch(SERVER_URL + '/api/clients');

    const clientsFromServer = await response.json();

    clients = [];

    for (const client of clientsFromServer) {
      clients.push(client);
    }

    if (sortVar === 'up') {
      sortUp(field);
    } else if (sortVar === 'down') {
      sortDown(field);
    }

    if (document.querySelector('.table-preload')) {
      document.querySelector('.table-preload').remove();
    }

    document.querySelector('.btn__add-client').classList.remove('is-hidden');
  }

  await loadTable('up', 'id');

  // ---------- Сортировка по id, дате создания и изменения
  function sotrByField(classname, field) {

    document.querySelector(classname).addEventListener('click', () => {

      if (!document.querySelector('.tbody__row')) {
        document.querySelector('.btn__add-client').classList.add('is-hidden');
        preloadTable();
      } else {
        document.querySelectorAll('.tbody__row').forEach((el) => {
          el.remove()
        })
      }

      document.querySelector(classname).classList.toggle('sort-down');

      if (document.querySelector(classname + '.sort-down')) {
        sortDown(field)
      } else {
        sortUp(field)
      }
    })
  }

  sotrByField('.thead__th--id', 'id');
  sotrByField('.thead__th--create', 'createdAt');
  sotrByField('.thead__th--change', 'updatedAt');

  // ---------- Сортировка по имени
  document.querySelector('.thead__th--name').addEventListener('click', () => {

    if (!document.querySelector('.tbody__row')) {
      document.querySelector('.btn__add-client').classList.add('is-hidden');
      preloadTable();
    } else {
      document.querySelectorAll('.tbody__row').forEach((el) => {
        el.remove()
      })
    }

    document.querySelector('.thead__th--name').classList.toggle('sort-down');

    if (document.querySelector('.thead__th--name.sort-down')) {
      let sortedClients = clients.sort((a, b) => ((a['surname'] + ' ' + a['name'] + ' ' + a['lastName']) < (b['surname'] + ' ' + b['name'] + ' ' + b['lastName'])) ? 1 : -1);
      createTable(sortedClients)
    } else {
      let sortedClients = clients.sort((a, b) => ((a['surname'] + ' ' + a['name'] + ' ' + a['lastName']) > (b['surname'] + ' ' + b['name'] + ' ' + b['lastName'])) ? 1 : -1);
      createTable(sortedClients)
    }
  })

  // ---------- Поиск с автозаполнением
  function autocomplete() {
    let input = document.getElementById('header__input');
    let autoBox = document.querySelector('.header__autocomplete');
    let autoList = document.createElement('div');
    autoList.classList.add('autocomplete-list');
    autoBox.append(autoList)

    let currentFocus;
    
    input.addEventListener('input', (e) => {
      let clients = [];

      const allClients = document.querySelectorAll('.tbody__td--name');

      for (const client of allClients) {
        const clientName = client.textContent;
        clients.push(clientName);
      };

      if (document.querySelector('.in-search')) {
        document.querySelector('.in-search').classList.remove('in-search');
      }

      let inputValue = input.value;

      closeAllItems();

      if (!inputValue) {
        return false;
      }

      currentFocus = -1;

      for (let i = 0; i < clients.length; i++) {

        if (clients[i].toLowerCase().includes(inputValue.toLowerCase())) {
          const index = clients[i].toLowerCase().indexOf(inputValue.toLowerCase());

          const indexLast = index + inputValue.length;

          let autoItem = document.createElement('div');

          autoItem.classList.add('autocomplete-item');

          autoItem.innerHTML = `${clients[i].slice(0, index)}<strong>${clients[i].slice(index, indexLast)}</strong>${clients[i].slice(indexLast)}<input type='hidden' value='${clients[i]}'>`;

          autoItem.addEventListener('click', (e) => {
            if (document.querySelector('.in-search')) {
              document.querySelector('.in-search').classList.remove('in-search');
            }

            input.value = e.target.querySelector('input').value;

            closeAllItems();

            document.querySelectorAll('.tbody__td--name').forEach((el) => {
              if (el.textContent == input.value) {
                el.parentNode.classList.add('in-search');
                let row = document.querySelector('.in-search');
                row.scrollIntoView({ block: "center", behavior: "smooth" });
              }
            })
          })

          autoList.append(autoItem);
        }
      }
    })

    input.addEventListener('keydown', (e) => {

      let items = document.querySelectorAll('.autocomplete-item');

      if (e.key == 'ArrowDown') {
        currentFocus++;
        addActive(items)
      } else if (e.key == 'ArrowUp') {
        currentFocus--;
        addActive(items)
      } else if (e.key == 'Enter') {
        e.preventDefault();
        if (currentFocus > -1) {
          if (items) {
            items[currentFocus].click();
          };
        } else {
          let autoItem = document.createElement('div');
          autoItem.classList.add('autocomplete-item')
          autoItem.textContent = 'Нет совпадений';
          autoList.append(autoItem);
        }
      };
    });

    function addActive(el) {
      if (!el) {
        return false;
      }
      removeActive(el);
      if (currentFocus >= el.length) {
        currentFocus = 0;
      }
      if (currentFocus < 0) {
        currentFocus = el.length - 1;
      }
      el[currentFocus].classList.add('autocomplete-active');
    };

    function removeActive(el) {
      for (let elem of el) {
        elem.classList.remove('autocomplete-active');
      }
    }

    function closeAllItems(elem) {
      let allItems = document.querySelectorAll('.autocomplete-item').forEach((el) => {
        if ((elem != el) && (elem != input)) {
          el.parentNode.removeChild(el);
        }
      })
    }


    document.addEventListener('click', (e) => {
      closeAllItems(e.target)
    });
  };
  autocomplete();

  document.addEventListener('click', (e) => {
    const target = e.target;
    if (!target.closest('.header__input') && !target.closest('.autocomplete-item')) {
      if (document.querySelector('.in-search')) {
        document.querySelector('.in-search').classList.remove('in-search')
      }
    }

  })

  // ---------- Закрытие модального окна по клику снаружи + кнопка сохранить и кнопка удалить контакт
  document.querySelector('.new-client').addEventListener('click', (e) => {
    e.preventDefault()

    const target = e.target;

    if (target.closest('.new-client__label')) {
      const attr = target.closest('.new-client__label').getAttribute('for');
      document.getElementById(`${attr}`).focus();
    }

    if (target.closest('.save-btn')) {
      if (document.querySelector('.new-client__submit')) {
        newClientSubmit();
      }
    }

    if (target.closest('.btn__new-contact')) {
      e.preventDefault();

      let targetBtn = target.closest('.btn__new-contact').parentNode;

      targetBtn.remove();

      allNewContacts = document.querySelectorAll('.new-contact');

      if (allNewContacts.length < 10) {
        document.querySelector('.add-contact__btn').classList.remove('is-hidden')
      };

      if (allNewContacts.length == 0) {
        document.querySelector('.add-contact').classList.remove('is-open')
      }
      return
    }

    if (!target.closest('.new-client__modal') && !target.closest('.delete-modal') && !target.closest('.add-contact')) {
      if (document.querySelector('.inside')) {
        document.querySelector('.new-client__modal').classList.add('modal-open');
        document.querySelector('.delete-modal').classList.remove('modal-open');
        document.querySelectorAll('.inside').forEach((el) => {
          el.classList.remove('inside');
        })
      } else if (document.querySelector('.outside')) {
        document.querySelector('.delete-modal').classList.remove('modal-open');
        document.querySelector('.new-client').classList.remove('modal-open');
        document.querySelectorAll('.outside').forEach((el) => {
          el.classList.remove('outside');
        })
      } else if (!document.querySelector('.inside') && !document.querySelector('.outside')) {
        modalClose();
      }

    }
  })

  // ---------- Изменение цвета при клике сортировки
  function colorSort() {

    const theadId = document.querySelector('.thead__th--id');
    const theadName = document.querySelector('.thead__th--name');
    const theadCreate = document.querySelector('.thead__th--create');
    const theadChange = document.querySelector('.thead__th--change');

    theadId.addEventListener('click', () => {
      theadId.classList.add('is-color');
      theadName.classList.remove('is-color');
      theadCreate.classList.remove('is-color');
      theadChange.classList.remove('is-color');
    })

    theadName.addEventListener('click', () => {
      theadName.classList.add('is-color');
      theadId.classList.remove('is-color');
      theadCreate.classList.remove('is-color');
      theadChange.classList.remove('is-color');
    })

    theadCreate.addEventListener('click', () => {
      theadCreate.classList.add('is-color');
      theadName.classList.remove('is-color');
      theadId.classList.remove('is-color');
      theadChange.classList.remove('is-color');
    })

    theadChange.addEventListener('click', () => {
      theadChange.classList.add('is-color');
      theadCreate.classList.remove('is-color');
      theadName.classList.remove('is-color');
      theadId.classList.remove('is-color');
    })
  }
  colorSort();

});
