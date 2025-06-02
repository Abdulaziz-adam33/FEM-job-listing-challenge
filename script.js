const fetchData = function(){
  fetch('/data.json')
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    renderJobs(data)
    // filterJobs(data)
    // filteredJobs(data)
  })
  .catch(error => {
    console.error('Error fetching the JSON data:', error);
  });
}



  const jobList = document.getElementById('job_list')
  const filterSection = document. getElementById('job_filter')
  const filters = document. getElementById('filters')
  const clearBtn = document. getElementById('clear_filters')

  
  const filterTools = []
  // const filteredJobs = []
 

 

  function clearFilters(){
    filterTools.splice(0, filterTools.length)
    fetchData()
    renderFilters()

  }

  function deleteFilter(filterText){
    filterTools.splice(filterTools.indexOf(filterText.innerText), 1)
   filters.innerHTML = ''
   fetchData()
   renderFilters()      
  }

  function renderFilters(){

     if(filterTools.length > 0){
      filterSection.style.display = 'flex'
      filterTools.forEach(item => {

        const filter = document.createElement('div')
        filter.className = 'filter'

        const filterText = document.createElement('p')
        filterText.innerText = item

        const deleteBtn = document.createElement('i')
        deleteBtn.innerHTML = `<img src="./images/icon-remove.svg" alt="" srcset="">`
        
        filters.appendChild(filter)
        filter.appendChild(filterText)
        filter.appendChild(deleteBtn)

        deleteBtn.addEventListener('click', () => {
          deleteFilter(filterText)
        })

        fetchData()

      })    
    }
    else{
        filterSection.style.display = 'none'
        fetchData()
      }

  }

  function filterJob(e){
     filters.innerHTML = ''
    if(!filterTools.includes(e.target.innerText)){
      filterTools.push(e.target.innerText)
      
      renderFilters()
     
      
    }else{
      // fetchData()
      renderFilters()
      

    }    
  }

  function renderJobs(jobs){
   
    jobList.innerHTML = ''

    const filteredJobs = jobs.filter(job => {
  const combinedTools = [
    ...(job.tools || []),
    ...(job.languages || []),
    job.role,
    job.level
  ].map(item => String(item).toLowerCase().trim());

  return filterTools.every(filter => 
    combinedTools.includes((filter).toLowerCase().trim())
  );
});



    filteredJobs.filter(job => {
      
       

        const jobItem = document.createElement('li')
        jobItem.className = 'job'
        jobItem.innerHTML =  `<div class="company">
            <div class="company_logo">
            <img src="${job.logo}" alt="company logo">
            </div>
            <div class="company_info">
              <div class="company_details">
                <div class="company_name, small, bold">${job.company}</div>
                 ${job.new ? '<div class="new highlight">NEW!</div>' : ''}
                ${job.featured ? '<div class="featured highlight">FEATURED</div>' : ''}
              </div>
              <div class="position">
                <h3>${job.position}</h3>
              </div>
              <div class="position_fine_details">
                <div class="posted_at, small, greyColor">${job.postedAt}</div>
                <span></span>
                <div class="contract, small, greyColor">${job.contract}</div>
                <span></span>
                <div class="location, small, greyColor">${job.location}</div>
              </div>
            </div>
          </div>
           <div class="tools">
           ${[
              job.role,job.level,...(job.tools || []),
              ...(job.languages || []),
            ].map(tool => {
              return `<div class='tool'>${tool}</div>`
            }).join('')}
           </div>
           `   
          jobList.appendChild(jobItem)           
    });

    const tool = document.querySelectorAll('.tool')

    tool.forEach(item => {
      item.addEventListener('click', filterJob)
    })

  
  }

  fetchData()

  clearBtn.addEventListener('click', clearFilters)

 