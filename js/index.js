    const form = document.querySelector('#github-form');
    const userList = document.getElementById('user-list')
    const repoList = document.getElementById('repos-list')
    const input = document.querySelector('input#search');

    form.addEventListener('submit', (e)=>{
        e.preventDefault();
        
        fetch(`https://api.github.com/search/users?q=${input.value}`,{
            'Accept': 'application/vnd.github.v3+json'
        })
        .then(response => response.json())
        .then(data => { //DATA FROM SEARCH INPUT
            addUser(data);
        })
        
    })
    
    function addUser (data){
        console.log(data.items)
        for (let i = 0 ; i < data.items.length ; i++){
            let user = document.createElement('li');
            user.innerHTML = data.items[i].login
            userList.appendChild(user)

            let img = document.createElement('img');
            img.setAttribute('src', data.items[i].avatar_url);
            img.setAttribute('alt', data.items[i].login)
            user.appendChild(img)

            let imga = document.createElement('a');
            imga.setAttribute('href',fetchRepo(data.items[i].login))

            let a = document.createElement('a');
            a.setAttribute('href', data.items[i].html_url)
            a.innerHTML = 'Link to Profile'
            user.appendChild(a)
        }
        userList.addEventListener('click', (e)=>{
            fetchRepo(e.target.getAttribute('alt'))
            
        })
        
    }
    
    function fetchRepo(username){
        fetch(`https://api.github.com/users/${username}/repos`)
        .then(response => response.json())
        .then(data => addRepo(data))
        
    }

    function addRepo(data){
        for (let i=0;i < data.length;i++){

            let repo = document.createElement('a')
            repo.setAttribute('href',data[i].html_url)
            repo.innerHTML = data[i].name
            repoList.appendChild(repo)
        } 
    }
       
    
 