const btnTheme = document.querySelector('.toggle-theme')
const htmlElement = document.documentElement
const icon = document.getElementById('icon')
const inputUrl = document.querySelector('.input-url')
const btnSearch = document.querySelector('.button-search')
const loading = document.querySelector('.loading')
const result = document.querySelector('.result')

btnTheme.addEventListener('click', function() {
   const currentTheme = htmlElement.getAttribute('data-bs-theme')
   const newTheme = currentTheme === 'light' ? 'dark' : 'light'
   htmlElement.setAttribute('data-bs-theme', newTheme)
   if(newTheme === 'dark') {
      icon.classList = 'bi bi-brightness-high'
   } else {
      icon.classList = 'bi bi-moon-stars-fill'
   }
})

btnSearch.addEventListener('click', function() {
   result.innerHTML = ''
   loading.style.display = 'block'
   
   fetch('https://api.ryzumi.vip/api/downloader/ytmp3/?url=' + inputUrl.value)
   .then(response => {
      if(!response.ok){
         loading.style.display = 'none'
         throw new Error(response.statusText)
      } 
      return response.json()
   })
   .then((yt) => {
      let modal = ''
      modal += showResult(yt)
      result.innerHTML = modal
      loading.style.display = 'none'
      inputUrl.value = ''
      
      const btnDownload = document.querySelector('.download')
      btnDownload.addEventListener("click", function() {
         let url = this.getAttribute('data-url')
         const a = document.createElement('a')
         a.href = url
         a.download = ''
         document.body.appendChild(a)
         a.click()
         document.body.removeChild(a)
      })
   })
   .catch(err => {
      alert(err)
      loading.style.display = 'none'
   })
})

function showResult(yt) {
   return `<div class="img">
               <img src="${yt.thumbnail}" alt="thumbnail"> 
            </div>
            <div class="content">
               <h4>${yt.title}</h4>
               <p>Duration : ${Math.floor(yt.lengthSeconds / 60)} menit</p>
               <p>Channel : ${yt.author}</p>
               <p>Views : ${yt.views}</p>
               <p>Upload date : ${yt.uploadDate}</p>
               <p>Quality : ${yt.quality}</p>
               <div class="dnld">
                  <button type="button" class="download" data-url="${yt.url}">Download</button>
               </div>
            </div>`
}