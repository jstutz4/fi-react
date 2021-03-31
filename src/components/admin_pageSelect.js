import gql from "graphql-tag";
import { useQuery } from '@apollo/react-hooks';

export default function PageSelector(params) {
    const getPages = gql`
        query pages {
            pages{
            id,
            screenname
            }
        }
    `

    let { data, loading, error }  = useQuery(getPages);

    if(loading){
        return (
            <select name="">
                    <option value="-1">--Data Loading--</option>
                </select>
        )
    }
    if(error) return <section>we have an error</section>

    let options = []
    if(params.pageName = "pages"){

        options = params.data.pages.map((page) => {
            return <option key={page.id + page.screenname} value={page.id}>{page.screenname}</option>
        })
    }
    if(params.pageName = "articles"){

        options = params.data.articles.map((article) => {
            return <option key={article.id + article.screenname} value={article.id}>{article.screenname}</option>
        })
    }

    return (

        <select name={params.pageName}>
            {options}
        </select>
    )
}