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
        listItem,
        level,
        'image': asset->.url,
        'alt': asset->originalFilename,
        _type,
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