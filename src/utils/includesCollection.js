
const includesCollection = (collections, element) => {
  if (collections.length === 0) return false;
 const hasPost = collections.some((collection) => {
    return collection.pickedPosts.includes(element);
 });
 return hasPost;
}

export default includesCollection
