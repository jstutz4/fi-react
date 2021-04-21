useEffect(() => {
    console.log(
        client.config({
            token: process.env.REACT_APP_TOKEN
        }).delete({
        query: `*[ _type in ["comment"]]{
            _id,
            "refs": count(*[references(^._id)])
          }[refs == 0]{_id}`
    })
    )
}, [])