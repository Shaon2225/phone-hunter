let phoneHolder = [];
const phoneContainer = document.getElementById('phone-container');
const seeMore = document.getElementById('see-more-button');
const loadingImage = document.getElementById('loading-img');
const notFound = document.getElementById('not-found');
let url = '';
let status = true;
let noOfPhone=20;

// get search result 

const search = (url,details) =>{
    loadingImage.style.display = 'block'
    fetch(url)
        .then(res => res.json())
        .then(data => {
            if(details){
                showPhoneDetails(data);
            }
            else{
                showPhone(data);
            }
        })
}

// show phones in display

const showPhone = data =>{
    loadingImage.style.display = 'none';
    phoneHolder.push(...data.data);
    if(data.status){
        noOfPhone=20;
        notFound.style.display = 'none';
        for(let i=0;i<noOfPhone;i++){
            if(phoneHolder[i].phone_name.includes('Watch')){
                noOfPhone++;
                continue;
            }
            else{
            phoneContainer.innerHTML += `
            <div class="card border-0">
                <div class="mt-4 mx-2 border-0 rounded shadow">
                    <div class="card border-0" style="width: 18rem;">
                        <img src="${phoneHolder[i].image}" class="card-img-top " id="card-image" alt="">
                    </div>
                    <div class="card-body">
                        <h5 class="card-title fw-bold">${phoneHolder[i].phone_name}</h5>
                        <p class="card-text">
                            <h6>Brand : ${phoneHolder[i].brand}</h6>
                        </p>
                        <a href="#" class="btn btn-primary">Details</a>
                    </div>
                </div>
            </div>
            `;
            }
        }
        
        seeMore.style.display = 'block';
    }
    else{
        // not found
        notFound.style.display = 'block';
    }
}

// seeMore phones 

const seeMorePhones = ()=>{
    for(let i=noOfPhone;i<phoneHolder.length;i++){
        if(phoneHolder[i].phone_name.includes('Watch')){
            noOfPhone++;
            continue;
        }
        else{
        phoneContainer.innerHTML += `
        <div class="card border-0">
            <div class="mt-4 mx-2 border-0 rounded shadow">
                <div class="card border-0" style="width: 18rem;">
                    <img src="${phoneHolder[i].image}" class="card-img-top " id="card-image" alt="">
                </div>
                <div class="card-body">
                    <h5 class="card-title fw-bold">${phoneHolder[i].phone_name}</h5>
                    <p class="card-text">
                        <h6>Brand : ${phoneHolder[i].brand}</h6>
                    </p>
                    <a href="#" class="btn btn-primary">Details</a>
                </div>
            </div>
        </div>
        `;
        }
    }
    seeMore.style.display = 'none';
} 
// display phone details

const showPhoneDetails = data =>{

}


// getiing input from search field and make a search

document.getElementById('search-btn').addEventListener('click', () =>{
    const inputValue = document.getElementById('input-field').value.toLowerCase();
    url=`https://openapi.programming-hero.com/api/phones?search=${inputValue}`;
    phoneContainer.innerHTML = '';
    phoneHolder =[];
    // phoneContainer.style.display = 'none';
    search(url,false);
})

// see more option click 
seeMore.addEventListener('click', ()=>{
    seeMorePhones();
})