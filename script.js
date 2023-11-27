// FwxC0sFaDQbsYGOjPKlrG3ffqWyeLDrHHWKkBp1fvlGX2wuEsLsRv1MN
const apiKey="FwxC0sFaDQbsYGOjPKlrG3ffqWyeLDrHHWKkBp1fvlGX2wuEsLsRv1MN";
const imagesWrapper=document.querySelector(".images");
const showMore=document.querySelector(".load-more");
const searchInput=document.querySelector(".search-box input");

let searchTerm=null;
const perPage=15;
let currentPage=1;
const downloadImg=(imgURL)=>{
 fetch(imgURL).then(res=>res.blob()).then(file=>{
  const a=document.createElement('a');
  a.href=URL.createObjectURL(file);
  a.download=new Date().getTime();
  a.click();
 }).catch(()=>alert("Failed too download image!"))

}
const generateHtml=(images)=>{
    imagesWrapper.innerHTML+=images.map(img=>
        `<li class="card">
            <img src="${img.src.large2x}" alt="img">
            <div class="details">
                <div class="photographer">
                    <span class="material-symbols-outlined">
                    photo_camera
                    </span>
                    <span>${img.photographer}</span>
                </div>
                <button onclick="downloadImg('${img.src.large2x}')">
                    <span class="material-symbols-outlined">
                        download
                    </span>
                </button>
            </div>
        </li>`
    ).join("");
}
const getImages=(apiurl)=>{
    showMore.innerHTML="Loading...";
    showMore.classList.add("disabled");
    fetch(apiurl,{
        headers:{Authorization:apiKey}
    }).then(res=>res.json()).then(data=>{
        // console.log(data)
        generateHtml(data.photos);
        showMore.innerHTML="Show More";
        showMore.classList.remove("disabled");
    }).catch(()=>alert("failed to load images!"));
}
const loadMoreImages=()=>{
    currentPage++;
    let apiUrl=`https://api.pexels.com/v1/curated?page=${currentPage}&per_page=${perPage}`
    apiUrl=searchTerm?`https://api.pexels.com/v1/search?query=${searchTerm}&page=${currentPage}&per_page=${perPage}`:apiUrl;
    getImages(apiUrl);
}
const loadSearchImages=(e)=>{
    if(e.target.value==="")return searchTerm=null;
 if(e.key==="Enter"){
    // console.log("Enter key pressed");
    currentPage=1;
    searchTerm=e.target.value;
    // console.log(searchTerm)
    imagesWrapper.innerHTML="";
    getImages(`https://api.pexels.com/v1/search?query=${searchTerm}&page=${currentPage}&per_page=${perPage}`);
 }
}
getImages(`https://api.pexels.com/v1/curated?page=${currentPage}&per_page=${perPage}`);
showMore.addEventListener("click",loadMoreImages);
searchInput.addEventListener("keyup",loadSearchImages);
