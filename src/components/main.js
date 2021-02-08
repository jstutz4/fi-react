import Article from '../components/article'
import ArticleNav from '../components/articleNav'
import articleLinkHelper from '../components/articleLinkHelper'

export default function Main(props, articleNav, article, activeArticle, setActiveArticle){
    return(
        <section className="article">
        <ArticleNav>
            {articleLinkHelper({"links": articleNav}, activeArticle, setActiveArticle)}
        </ArticleNav>
        {Article(article)}
        </section>
    )
}