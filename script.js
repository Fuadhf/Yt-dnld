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
   
   fetch('https://ytdlpyton.nvlgroup.my.id/download/audio?url=' + inputUrl.value)
   .then(response => {
      if(!response.ok){
         loading.style.display = 'none'
         throw new Error(response.statusText)
      } 
      console.log(response)
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
               <p>${yt.message}</p>
               <div class="dnld">
                  <button type="button" class="download" data-url="${yt.download_url}">Download</button>
               </div>
            </div>`
}