const phoneHolder = [];
const phoneContainer = document.getElementById('phone-container');
const seeMore = document.getElementById('see-more-button');
let url = '';
let status = true;
let noOfPhone=20;
// get search result 

const search = (url,details) =>{
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
    phoneHolder.push(...data.data);
    if(data.status){
        for(let i=0;i<noOfPhone;i++){
            if(phoneHolder[i].phone_name.includes('Watch')){
                noOfPhone++;
                console.log(noOfPhone);
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
}




// getiing input from search field and make a search

document.getElementById('search-btn').addEventListener('click', () =>{
    const inputValue = document.getElementById('input-field').value.toLowerCase();
    url=`https://openapi.programming-hero.com/api/phones?search=${inputValue}`;
    phoneContainer.innerHTML = '';
    search(url,false);
})
