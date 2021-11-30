const formBtn = document.getElementById("form")
const inp = document.querySelector(".inp")
const ul = document.getElementById("app")
const all = document.querySelector(".all")
const comp = document.querySelector(".complete")
const incomp = document.querySelector(".incomplete")

let storage = JSON.parse(localStorage.getItem("nameworks")) || []
let newStorage = []
for(let j of storage){
    if(Object.keys(j).length!=1){
        newStorage.push(j)
    }
}
storage = newStorage

render(storage)

formBtn.addEventListener("submit",(event)=>{
    event.preventDefault()
    let obj = {}
    obj.text = inp.value
    obj.line = false
    storage.push(obj)
    render(storage)
    localStorage.setItem("nameworks",JSON.stringify(storage))
})



function render(lst){
    ul.innerHTML = null
    if(lst.length==0) return
    for(let j of lst){
        let btn = document.createElement("button")
        let span = document.createElement("span")
        let li = document.createElement("li")
        btn.textContent = "X"
        span.textContent = j.text
        li.classList.add("list")

        if(j.line){
            span.classList.add("through")
        }
        
        li.append(span,btn)
        ul.append(li)

        li.addEventListener("click",()=>{
            if(j.line==false){
                j.line = true
                span.classList.add("through")
            }
            else{
                j.line = false
                span.classList.remove("through")
            }
            
            localStorage.setItem("nameworks",JSON.stringify(lst))
        })

        btn.addEventListener("click",()=>{
            delete j.text
            li.remove()
            localStorage.setItem("nameworks",JSON.stringify(lst))
        })
    }
}


all.addEventListener("click",()=>{
    render(storage)
})

comp.addEventListener("click",()=>{
    let newLst = []
    for(let j of storage){
        if(j.line){
            newLst.push(j)
        }
    }
    render(newLst)
})

incomp.addEventListener("click",()=>{
    let newLst = []
    for(let j of storage){
        if(!j.line){
            newLst.push(j)
        }
    }
    render(newLst)
})
