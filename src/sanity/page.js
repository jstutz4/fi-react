const call = `*[_type == 'page' && name == $page]
{
  _id, 
  name,
	"nav": articles[]->{"to": slug.current, "name": title},
  articles[]->
  {
      _id, 
      title,
    	"slug": slug.current,
      paragraph[]
      {
        style,
        children[]{marks, text},
        markDefs[]
        {
          _key,
          __type,
          blank,
          href,
          "asset" :reference->
          {
          name,
          "url" : resource.asset->.url
          }
        },
      }, 
      article_video, 
      template_file[]
      {
        name,
        "url": resource.asset->.url
      },
  },
}`

export default call