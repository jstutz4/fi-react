export default function PageSelector(params) {
    function adjustPage(event){
        const option = event.target
        
        if(option) {
            params.setFunc({name: option.selectedOptions[0].innerHTML, id: option.value, change: params.type})
        }
    }

    let options = []
    if(params.type == "pages"){

        options = params.data.pages.map((page) => {
            return <option key={page.id + page.screenname} value={page.id}>{page.screenname}</option>
        })
    }
    if(params.type == "articles"){

        options = params.data.articles.map((article) => {
            return <option key={article.id + article.articletitle} value={article.id}>{article.articletitle}</option>
        })
    }

    return (

        <select name={params.type} onChange={adjustPage}>
            {options}
        </select>
    )
}