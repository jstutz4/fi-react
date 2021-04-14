const query = `*[_type == 'roadmap'] | order(priority asc)
{
  heading,
  "page": page->.name,
  articlelist[]->{title, "id": slug.current}
}`

export default query