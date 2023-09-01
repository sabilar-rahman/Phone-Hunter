const loadPhone = async (searchText, isShowAll) => {
  const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
  //convert into json
  const data = await res.json();
  const phones = data.data;
  // console.log(phones);

  displayPhone(phones, isShowAll);
}

const displayPhone = (phones, isShowAll) => {
  // console.log(phones);
  const phoneContainer = document.getElementById('phone-container')
  // clear phone conatainer card before adding new carts
  phoneContainer.textContent = '';


  // display show all button if there are more than 12 phone
  const showAllContainer = document.getElementById('show-all-container');

  if (phones.length > 12 && !isShowAll) {
    showAllContainer.classList.remove('hidden');
  }
  else {
    showAllContainer.classList.add('hidden');
  }

  if (!isShowAll) {

    // show up to 12 phone
    phones = phones.slice(0, 12);
  }




  phones.forEach(phone => {
    // console.log(phone);
    //2 create a div
    const phoneCard = document.createElement('div');
    phoneCard.classList = `card card-compact p-4 bg-gray-100 shadow-xl`;
    //3 set innerhtml
    phoneCard.innerHTML = `<figure><img src="${phone.image}" alt="Shoes" /></figure>
        <div class="card-body">
          <h2 class="card-title">${phone.phone_name}</h2>
          <p>If a dog chews shoes whose shoes does he choose?</p>
          <div class="card-actions justify-center">
            <button onclick="showDetail('${phone.slug}')" class="btn btn-primary">Show Details</button>
          </div>
        </div>`;
    // 4 appendchind
    phoneContainer.appendChild(phoneCard);
  });


  //hide loading spinner
  toggleLoadingSpinner(false);

}


//handle search btn 
const handleSearch = (isShowAll) => {
  //spinner call true
  toggleLoadingSpinner(true);
  const searchField = document.getElementById('search-field');
  const searchText = searchField.value;
  console.log(searchText);
  loadPhone(searchText, isShowAll);

}

// spinner 

const toggleLoadingSpinner = (isLoading) => {
  const loadingSpinner = document.getElementById('loading-spinner-btn');
  if (isLoading) {
    loadingSpinner.classList.remove('hidden');
  }
  else {
    loadingSpinner.classList.add('hidden')

  }

}
//
const showDetail = async (id) => {
  // console.log('object',id);
  //load single phone data
  const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
  const data = await res.json();
  const phone = data.data;

  showPhoneDetails(phone);
}


const showPhoneDetails = (phone) => {
  console.log(phone);


  const phoneName = document.getElementById('show-detail-phone-name');
  phoneName.innerText = phone.name;


  const showDetailContainer = document.getElementById('show-detail-container');
  showDetailContainer.innerHTML = `<img src="${phone.image}" alt=""/>
  <p> <span>Storage:</span>${phone?.mainFeatures?.storage} </p>
  <p> <span>GPS:</span>${phone?.others?.GPS || 'No GPS'} </p>

  `

  //show modal
  show_details_modal.showModal()


}

// handle show all

const handleShowAll = () => {
  handleSearch();
}


