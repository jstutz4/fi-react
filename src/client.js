import sanityClient from '@sanity/client'

export default sanityClient({
    projectId: "2nvjr6az",
    dataset: "production",
    useCdn: true
})
