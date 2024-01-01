var data = {
    name: "blah",
    content: "blah blah blah",
    owner: "satvik"

}

const updates = Object.keys(data);
const allowedUpdateKeys = ['name', 'content', 'owner'];

//filter out any updates that are not allowed
// req.body will contain {title: "new title", content: "new content", owner: "some id"}
// we only want to update title and content, so we filter out owner

const invalidUpdates = updates.filter((update) =>
    !allowedUpdateKeys.includes(update));
const finalUpdates = data;
//remove all the keys that are not allowed
invalidUpdates.forEach((update) => delete finalUpdates[update]);

console.log(finalUpdates);