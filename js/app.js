
const phoneContainer = document.getElementById('phone-container');
const seeMore = document.getElementById('see-more-button');
const loadingImage = document.getElementById('loading-img');
const notFound = document.getElementById('not-found');
let url = '';
let status = true;
let noOfPhone=20;
let phoneHolder = [];

// get search result 

const search = (url,details) =>{
    fetch(url)
        .then(res => res.json())
        .then(data => {
            if(details){
                showPhoneDetailInAWindow(data);
            }
            else{
                loadingImage.style.display = 'block';
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
                        <a class="btn btn-primary" data-bs-toggle="offcanvas" href="#offcanvasExample" role="button" aria-controls="offcanvasExample"><button onclick="showPhoneDetail('${phoneHolder[i].slug}')" class ="btn btn-primary">Details</button></a>
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
                    <a class="btn btn-primary" data-bs-toggle="offcanvas" href="#offcanvasExample" role="button" aria-controls="offcanvasExample"><button onclick="showPhoneDetail('${phoneHolder[i].slug}')" class ="btn btn-primary">Details</button></a>
                </div>
            </div>
        </div>
        `;
        }
    }
    seeMore.style.display = 'none';
} 
// making url for phone details

const showPhoneDetail = phoneName =>{
    url = `https://openapi.programming-hero.com/api/phone/${phoneName}`; 
    search(url,true);
}

// display phone details data

const showPhoneDetailInAWindow = data =>{
    const detailsFeild = document.getElementById('details-container');
    if (data.status) {
        let others =Object.entries(data.data.others).map(x => x.join(' : ')).join('<br>');
        detailsFeild.innerHTML=`
        <div>
            <img src="${data.data.image}" width="250px" alt="">
        </div>
        <div>
            <h4 class="fw-bold">Name : ${data.data.name}</h4>
            <small>${data.data.releaseDate ? data.data.releaseDate : 'Release Date not found'}</small>
            <h5 class="text-center fw-bold"> Main Features</h5>
            <ul>
                <li><span class="fw-bold">Display : </span>${data.data.mainFeatures.displaySize}</li>
                <li><span class="fw-bold">processor : </span>${data.data.chipSet} </li>
                <li><span class="fw-bold">memory : </span> ${data.data.memory} </li>
                <li><span class="fw-bold">storage : </span> ${data.data.storage}</li>
                <li><span class="fw-bold">sensors : </span>${data.data.mainFeatures.sensors.join(', ')}</li>
            </ul>
            <h5 class="text-center fw-bold">Others</h5>
            <P>${others}</P>
        </div>
        `;
    }
    else{
        detailsFeild.innerHTML = `
        <div id="not-found" class="mx-auto text-center" >
                <img src="/img/sade-face.svg" alt="">
                <h2 class="mt-5">Result not found :(</h2>
        </div>
        `;
    }
}

// getiing input from search field and make a search

document.getElementById('search-btn').addEventListener('click', () =>{
    const inputValue = document.getElementById('input-field').value.toLowerCase();
    url=`https://openapi.programming-hero.com/api/phones?search=${inputValue}`;
    phoneContainer.innerHTML = '';
    seeMore.style.display='none';
    phoneHolder =[];
    search(url,false);
})

// see more option click 
seeMore.addEventListener('click', ()=>{
    seeMorePhones();
})
