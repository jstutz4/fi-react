import { printIntrospectionSchema } from "graphql"

export default function PageSelector(params) {
    function adjustPage(event){
        const option = event.target
        if(option && params.setFunc && params.type == "pages") {
            params.setFunc({name: option.value, id: option.value, change: params.type})
        }
        else if(option && params.setFunc){
            params.setFunc({name: option.selectedOptions[0].innerHTML, id: option.value, change: params.type})
        }
    }

    let options = []
    if(params.type == "pages" && params.data){
        options = params.data.pages.map((page, index) => {
            let selected = ""
            if(params.reset && index == 0){
                selected = "selected"
            }
            return <option key={page.id + page.screenname} value={page.screenname}>{page.screenname} {selected}</option>
        })
    }
    

    if(params.type == "articles" && params.data && params.data[0]){

        options = params.data[0].articles.map((article) => {
            
            return <option key={article.id + article.articletitle} value={article.id}>{article.articletitle} </option>
        })
    }

    return (

        <select name={params.type} onChange={adjustPage}>
            {options}
        </select>
    )
}